# In the Path of Love — Namadwaar kiosk

A touchscreen kiosk presenting the institutions and outreach work of **Namadwaar / Global
Organisation for Divinity**, inspired by HH Maharanyam Sri Sri Muralidhara Swamiji.

It runs unattended on a **landscape 1920×1080** panel in an ashram or temple hall, for visitors who
did not choose to use it and will not read instructions. Everything about it — the light palette, the
18px type floor, the 64px touch minimum, the fact that no asset is fetched at runtime — follows from
that.

## Contents

Four pillars, reachable from the home dashboard:

| Screen | What it holds |
| --- | --- |
| **Institutions** | 9 ashrams, temples and mandapams, on an interactive map of India |
| **Activities** | 6 outreach pillars — heritage, veda patasalas, goshalas, healthcare, annadaanam, model villages |
| **Global Presence** | 57 Namadwaar centres across 8 countries, on a zoomable world map |
| **Connect & Support** | Publications, 7 registered trusts, contact details and scannable QR codes |

An attract loop draws visitors in when the kiosk is idle; a two-stage inactivity timeout returns to
it at 90 seconds, resetting display settings so the next person starts fresh.

## Running it

```bash
npm install --legacy-peer-deps    # react-simple-maps@3 peers on React 16–18
npm run dev
```

`--legacy-peer-deps` is required and is what CI uses too.

```bash
npm run build      # production bundle
npm run preview    # serve the bundle
npm run lint
```

## Verifying it

Two Playwright scripts, both pointed at a running dev or preview server. Chromium is expected at
`/opt/pw-browsers/chromium`; override with `CHROMIUM_PATH`.

```bash
node scripts/shots.mjs http://localhost:5173/ shots     # screenshot every screen at 1920×1080
CONTRAST=high node scripts/shots.mjs http://localhost:5173/ shots   # ...in high-contrast mode

node scripts/audit.mjs http://localhost:5173/           # the checks that matter
```

`audit.mjs` walks every screen and fails on:

- text below **7:1** contrast (4.5:1 at ≥24px), sampled against its real computed background
- any text under **18px**
- any interactive element under **64px** in either axis
- a **QR code that does not decode** — one that silently stops encoding looks identical in a
  screenshot to one that works
- the contrast toggle failing to re-theme the page or flip `aria-pressed`
- **any request to an external host**, and the world map or the vendored serif failing to render
  with external hosts blocked

Run it before shipping a palette or layout change. The scripts click through the UI rather than
visiting URLs, because the app uses `MemoryRouter` — there are no URLs to visit.

## Design

The visual system is **Temple Daylight**, documented in [`docs/DESIGN.md`](docs/DESIGN.md) and defined
as Tailwind v4 `@theme` tokens in [`src/styles/theme.css`](src/styles/theme.css). That file is the
source of truth; the doc explains the reasoning.

Two notes for anyone editing it:

- Tailwind's source detection is **disabled** (`@import "tailwindcss" source(none)`), with sources
  declared explicitly. The repo contains `stitch_path_of_love_kiosk/`, 13 design prototypes full of
  *dark-theme* Tailwind classes, plus 165KB of `.md`/`.txt` source content. Auto-detection scanned
  all of it and tripled the CSS bundle.
- Global element styles must live in `@layer base`. Unlayered rules outrank every layered Tailwind
  utility, so an unlayered `* { padding: 0 }` silently defeats `px-*` everywhere.

## Offline

The kiosk must render correctly with the cable unplugged, so nothing is fetched at runtime:

- **Fonts** — Noto Serif and Inter are self-hosted from `src/assets/fonts/`.
- **World map** — `src/assets/countries-110m.json`, imported through Vite rather than pulled from a
  CDN.
- **India map** — `src/assets/india.geo.json`, one country extracted from the 756KB world atlas by
  `npm run data:india` so the app ships 57KB instead of the whole world to draw one outline.

## Structure

```
src/
  components/ui/      the design system: PageShell, Panel, ImageCard, Directory,
                      TouchButton, EdgeFadeScroll, Kolam ornaments, QRTile…
  components/         chrome: TopBar, NavigationBar, InactivityManager,
                      RippleEffect, PasswordGateway, IndiaMap
  pages/              the eight routes
  context/            kiosk display settings (high contrast)
  lib/                richText renderer, kiosk runtime (fullscreen, wake lock)
  styles/theme.css    the token layer
  data.js             institutions          activitiesData.js  activities
  namadwaarData.js    global centres        connectData.js     publications, trusts, QR links
scripts/              extract-india, shots, audit
docs/DESIGN.md        the design system, explained
stitch_path_of_love_kiosk/   original Stitch prototypes, kept as layout reference
```

## Known gaps

- **QR payloads** are the bare platform domains (`https://facebook.com` and so on) that were already
  declared in the old code. The codes scan correctly but land on each platform's home page rather
  than on Namadwaar's own pages. Replace the `url` values in `src/connectData.js` with the
  organisation's canonical page URLs.
- **The Fiji centre's address is unknown.** What was recorded was Sydney's address verbatim; it is
  `null` and the directory shows "Address to be confirmed".
- **Institution coordinates** are town centroids, accurate to within a few kilometres — fine at map
  scale, worth confirming against the trust's records if precision ever matters.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`.
