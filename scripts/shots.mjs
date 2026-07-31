/**
 * Screenshots every screen of the kiosk at its native 1920x1080.
 *
 * The app uses MemoryRouter, so there are no URLs to visit — the script has to
 * walk the UI the way a visitor would. Auth is pre-seeded rather than typed on
 * the keypad, since the passcode is not the thing under test.
 *
 *   node scripts/shots.mjs [baseUrl] [outDir]
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:5173/';
const OUT = process.argv[3] || 'shots';
const CONTRAST = process.env.CONTRAST === 'high';

mkdirSync(OUT, { recursive: true });

// The environment ships a Chromium that may not match this Playwright's pinned
// revision, so point at it directly rather than triggering a download.
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});

await context.addInitScript(() => {
  sessionStorage.setItem('nd-kiosk-auth', 'true');
});

const page = await context.newPage();
const failures = [];
page.on('requestfailed', (r) => failures.push(r.url()));
page.on('console', (m) => {
  if (m.type() === 'error') console.error('  console:', m.text());
});

await page.goto(BASE, { waitUntil: 'networkidle' });

if (CONTRAST) {
  await page.evaluate(() => {
    document.documentElement.dataset.contrast = 'high';
  });
}

const suffix = CONTRAST ? '-hc' : '';
let step = 0;

async function shot(name) {
  await page.waitForTimeout(900);
  const file = `${OUT}/${String(++step).padStart(2, '0')}-${name}${suffix}.png`;
  await page.screenshot({ path: file });
  console.log(file);
}

async function tap(selector) {
  await page.locator(selector).first().click();
  await page.waitForTimeout(700);
}

await shot('attract');

// Attract screen: tapping anywhere enters the app.
await page.locator('[aria-label="Touch to explore"]').click();
await shot('home');

const PILLARS = ['Institutions', 'Activities', 'Global Presence', 'Connect & Support'];
const DETAILS = { Institutions: true, Activities: true };

for (const pillar of PILLARS) {
  await tap(`button:has-text("${pillar}")`);
  await shot(pillar.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''));

  if (DETAILS[pillar]) {
    // First row of the directory / first tile of the mosaic.
    const row = page.locator('main button, ul li button, [role="list"] button').first();
    if (await row.count()) {
      await row.click();
      await shot(`${pillar.toLowerCase()}-detail`);
      await tap('button:has-text("Back")');
    }
  }

  await tap('button:has-text("Home")');
}

if (failures.length) {
  console.error('\nFAILED REQUESTS:');
  failures.forEach((u) => console.error('  ' + u));
} else {
  console.log('\nNo failed requests.');
}

await browser.close();
