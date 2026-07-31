/**
 * Automated checks that matter for a public kiosk and are easy to regress:
 * text contrast, touch-target size, minimum type size, and — most importantly —
 * that the whole app still works with the network cut.
 *
 *   node scripts/audit.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

const BASE = process.argv[2] || 'http://localhost:5173/';

const MIN_TOUCH = 64;
const MIN_FONT = 18;
const MIN_CONTRAST_BODY = 7;
const MIN_CONTRAST_LARGE = 4.5;
const LARGE_PX = 24;

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]) {
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  );
}

function contrast(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

function parseRgb(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (parts.length >= 4 && parts[3] < 0.95) return null; // translucent: skip
  return parts.slice(0, 3);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
await context.addInitScript(() =>
  sessionStorage.setItem('nd-kiosk-auth', 'true')
);

const page = await context.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.locator('[aria-label="Touch to explore"]').click();
await page.waitForTimeout(900);

const SCREENS = [
  'Institutions',
  'Activities',
  'Global Presence',
  'Connect & Support',
];

const problems = [];

async function auditCurrent(label) {
  const found = await page.evaluate(
    ({ MIN_TOUCH, MIN_FONT }) => {
      const out = { small: [], tiny: [], text: [] };

      for (const el of document.querySelectorAll('button, [role="button"], a')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.width < MIN_TOUCH || r.height < MIN_TOUCH) {
          out.small.push({
            tag: el.tagName,
            text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 40),
            w: Math.round(r.width),
            h: Math.round(r.height),
          });
        }
      }

      // Walk visible text nodes, sampling the effective background by climbing
      // to the first ancestor with a non-transparent background-color.
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent.trim();
        if (!text) continue;
        const el = node.parentElement;
        if (!el || seen.has(el)) continue;
        seen.add(el);

        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        const cs = getComputedStyle(el);
        const size = parseFloat(cs.fontSize);
        if (size < MIN_FONT) {
          out.tiny.push({ text: text.slice(0, 40), size: Math.round(size) });
        }

        let bgEl = el;
        let bg = 'rgba(0, 0, 0, 0)';
        while (bgEl) {
          const c = getComputedStyle(bgEl).backgroundColor;
          if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) {
            bg = c;
            break;
          }
          bgEl = bgEl.parentElement;
        }

        // Skip text sitting on imagery — its background is a photograph, not a
        // colour, so a computed-style comparison would be meaningless.
        let overImage = false;
        for (let p = el; p; p = p.parentElement) {
          if (p.classList?.contains('photo-frame') || p.tagName === 'NAV') break;
          const bgi = getComputedStyle(p).backgroundImage;
          if (bgi && bgi !== 'none' && bgi.includes('url(')) overImage = true;
        }
        if (overImage) continue;

        out.text.push({
          text: text.slice(0, 40),
          size: Math.round(size),
          fg: cs.color,
          bg,
        });
      }
      return out;
    },
    { MIN_TOUCH, MIN_FONT }
  );

  for (const s of found.small) {
    problems.push(`${label}: touch target ${s.w}x${s.h} — "${s.text}"`);
  }
  for (const t of found.tiny) {
    problems.push(`${label}: ${t.size}px text — "${t.text}"`);
  }
  for (const t of found.text) {
    const fg = parseRgb(t.fg);
    const bg = parseRgb(t.bg);
    if (!fg || !bg) continue;
    const ratio = contrast(fg, bg);
    const need = t.size >= LARGE_PX ? MIN_CONTRAST_LARGE : MIN_CONTRAST_BODY;
    if (ratio < need) {
      problems.push(
        `${label}: contrast ${ratio.toFixed(1)}:1 (need ${need}) at ${t.size}px — "${t.text}"`
      );
    }
  }
}

await auditCurrent('home');
for (const screen of SCREENS) {
  await page.locator(`button:has-text("${screen}")`).first().click();
  await page.waitForTimeout(900);
  await auditCurrent(screen);
  await page.locator('button:has-text("Home")').first().click();
  await page.waitForTimeout(700);
}

// The QR codes must actually decode. A code that silently stops encoding looks
// identical in a screenshot to one that works, which is how the previous build
// shipped four decorative SVGs that scanned as nothing.
console.log('\n--- QR codes ---');
await page.locator('button:has-text("Connect & Support")').first().click();
await page.waitForTimeout(1200);

let decoded = 0;
// qrcode.react renders the title as a child <title> element, not an attribute.
for (const svg of await page.locator('svg:has(> title)').all()) {
  const title = (await svg.locator('> title').textContent()) ?? '';
  if (!title.includes('QR code')) continue;
  const png = PNG.sync.read(await svg.screenshot());
  const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  if (result) {
    decoded++;
    console.log(`  ${title} -> ${result.data}`);
  } else {
    problems.push(`QR: "${title}" did not decode`);
  }
}
if (decoded === 0) problems.push('QR: no QR codes found on the Connect screen');

// The contrast control must re-theme the page, and say so to assistive tech.
console.log('\n--- contrast toggle ---');
const contrastButton = page.locator('button[aria-label="High contrast mode"]');
const before = await page.evaluate(
  () => getComputedStyle(document.body).backgroundColor
);
await contrastButton.click();
await page.waitForTimeout(400);
const after = await page.evaluate(() => ({
  bg: getComputedStyle(document.body).backgroundColor,
  attr: document.documentElement.dataset.contrast,
}));
console.log(`  ${before} -> ${after.bg} (data-contrast="${after.attr}")`);
if (after.bg === before) problems.push('contrast: toggling did not change the theme');
if (after.attr !== 'high') problems.push('contrast: data-contrast was not set');
if ((await contrastButton.getAttribute('aria-pressed')) !== 'true') {
  problems.push('contrast: aria-pressed did not flip');
}
await contrastButton.click();
await page.waitForTimeout(300);
await page.locator('button:has-text("Home")').first().click();
await page.waitForTimeout(500);

// Offline: everything must still render from the bundle.
//
// Blocking only external hosts rather than using setOffline, since the app is
// being served over localhost — cutting the whole network would just fail the
// page load and prove nothing.
console.log('\n--- offline check ---');
const origin = new URL(BASE).origin;
const blocked = [];
await context.route('**/*', (route) => {
  const url = route.request().url();
  if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) {
    return route.continue();
  }
  blocked.push(url);
  return route.abort();
});
const offlineFailures = [];
page.on('requestfailed', (r) => {
  if (!r.url().startsWith(origin)) return; // an intentionally blocked host
  offlineFailures.push(r.url());
});
await page.reload({ waitUntil: 'load' });
await page.locator('[aria-label="Touch to explore"]').click();
await page.waitForTimeout(800);
await page.locator('button:has-text("Global Presence")').first().click();
await page.waitForTimeout(1500);

const offlineOk = await page.evaluate(() => {
  const paths = document.querySelectorAll('svg path');
  const serif = getComputedStyle(document.querySelector('h1')).fontFamily;
  return { mapPaths: paths.length, serif };
});
console.log(`map paths drawn offline: ${offlineOk.mapPaths}`);
console.log(`heading font offline:    ${offlineOk.serif}`);
console.log(
  `external hosts requested:  ${blocked.length ? blocked.join(', ') : 'none'}`
);
if (offlineFailures.length) {
  offlineFailures.forEach((u) => problems.push(`offline: failed request ${u}`));
}
if (blocked.length) {
  problems.push(
    `offline: app reached for external hosts: ${[...new Set(blocked)].join(', ')}`
  );
}
if (offlineOk.mapPaths < 50) {
  problems.push('offline: world map did not draw');
}
if (!offlineOk.serif.includes('Noto Serif')) {
  problems.push('offline: Noto Serif did not load');
}

console.log('\n--- results ---');
if (problems.length === 0) {
  console.log('PASS — no issues found.');
} else {
  console.log(`${problems.length} issue(s):`);
  problems.forEach((p) => console.log('  ' + p));
}

await browser.close();
process.exit(problems.length ? 1 : 0);
