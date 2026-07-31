# Temple Daylight

The design system for **In the Path of Love** — the Namadwaar / Global Organisation for Divinity
kiosk. Tokens live in [`src/styles/theme.css`](../src/styles/theme.css) as a Tailwind v4 `@theme`
block; that file is the source of truth and this document explains it.

## Context

The app runs unattended on a **landscape 1920×1080 touchscreen** in an ashram or temple hall, in
daylight, at a viewing distance of roughly one to two metres, for visitors who did not choose to use
it and will not read instructions. Every decision below follows from those five facts.

## Brand & style

Reverent, warm, unhurried. The reference is not a dashboard but a **printed devotional book** —
sandal-paper stock, letterpress ink, saffron and kumkum pigment, a gold rule under the chapter
title. Interactions should feel deliberate and grounded; nothing bounces, nothing jitters.

The system is a **light** theme, deliberately. An earlier dark spec exists in
`stitch_path_of_love_kiosk/devotional_kiosk_system/DESIGN.md`, kept as layout reference only. A hall
with daylight and overhead lighting defeats a dark screen — reflections wash out low-luminance
surfaces first, so an ivory canvas with near-black ink stays legible where obsidian does not.

## Colour

Surfaces are **warm neutrals, never grey**. That is the whole trick: against a slightly cream paper,
saffron and vermilion read as *pigment applied to a surface* rather than as accent colours in a UI.
Against grey they would read as brand chrome.

| Token | Value | Role |
| --- | --- | --- |
| `surface` | `#FAF4E8` | page canvas — sandal-paper ivory |
| `surface-raised` | `#FFFDF8` | cards and panels |
| `surface-sunk` | `#F0E5D2` | inset wells, directory columns, map backdrop |
| `surface-tint` | `#F7EAD6` | hovered / selected rows |
| `line` | `#E3D3B6` | hairline dividers |
| `line-strong` | `#C9AE84` | card borders, photo frames |
| `ink` | `#2B1A0E` | primary text — **15.2:1** on surface |
| `ink-muted` | `#6B4E32` | secondary text — **7.4:1** |
| `ink-faint` | `#8C7355` | captions and decoration — large sizes only |
| `saffron` | `#E8871E` | fills, pins, large display type |
| `saffron-deep` | `#B4560B` | text-safe at ≥24px |
| `saffron-ink` | `#7A3906` | text-safe at any size — **9.0:1** |
| `kumkum` | `#C42A21` | vermilion accent, badges, the active map pin |
| `gold` | `#B08A2E` | kolam line work — decorative only, never text |
| `tulsi` | `#4F6B2A` | secondary accent |
| `indigo` | `#253559` | map landmass |
| `on-saffron` | `#FFF8EC` | text on saffron fills |

**Contrast rule.** Body text targets ≥7:1, display type ≥4.5:1. Saffron has three steps for exactly
this reason: `saffron` is a *fill*, `saffron-deep` is safe for headings, and only `saffron-ink` is
safe for body-size text. Reaching for `saffron` as a text colour is the easiest way to break the
system.

## Typography

- **Noto Serif** — display and headings. The bookish, literary voice the content deserves.
- **Inter** — all UI, navigation, and body copy. Sans-serif holds up better at distance and under
  glare.

Both are **self-hosted** from `src/assets/fonts/`. There is no Google Fonts request at runtime; the
kiosk has to survive an unplugged cable.

| Token | Size / line-height | Family |
| --- | --- | --- |
| `text-display-xl` | 72 / 78 | serif |
| `text-display-lg` | 56 / 64 | serif |
| `text-headline` | 40 / 48 | serif |
| `text-title` | 30 / 38 | serif |
| `text-body-lg` | 22 / 34 | sans |
| `text-body` | 20 / 30 | sans |
| `text-label` | 18 / 24, `0.08em`, uppercase | sans |

**18px is the floor.** Nothing smaller exists in the scale, because nothing smaller is readable at
kiosk distance. If a layout needs 14px text to fit, the layout is wrong.

## Layout & touch

- 8px base unit. `--space-gutter: 32px`, `--space-edge: 48px`.
- The 48px edge margin is **bezel safety** — fingers approaching the screen edge hit the frame.
- `--touch-min: 64px`, enforced by the `touch-target` utility. Every interactive element clears it in
  both axes, including map pins and tab strips.
- Flat hierarchy: users move sideways through stages, never down through folders.
- Scrollbars are hidden. `EdgeFadeScroll` supplies gradient masks at the scroll boundaries as the
  affordance instead.

## Elevation

**Depth is paper, not glass.** There is no `backdrop-filter` anywhere in this system — glassmorphism
on a light canvas produces muddy, low-contrast surfaces and costs GPU on kiosk hardware.

A raised surface is a 1px warm hairline (`line-strong`) plus a warm, low-contrast shadow:

```
--shadow-1: 0 2px 8px  rgb(90 55 20 / .08)   /* rows, chips        */
--shadow-2: 0 12px 32px rgb(90 55 20 / .12)  /* cards, panels      */
--shadow-3: 0 24px 64px rgb(90 55 20 / .16)  /* the one hero layer */
```

Shadows are warm-brown, never neutral black — a grey shadow on cream paper reads as dirt.

## Photography

The hardest problem in a light theme. On a dark canvas a photo blends in and a bottom scrim carries
white text; on ivory the same photo becomes a bright rectangle floating on bright paper, and white
overlay text collapses.

1. Photos sit **inside a frame** — `radius-lg`, a 1px `line-strong` hairline, and a subtle inner
   warm vignette (the `photo-frame` utility) so the image edge is defined against the paper.
2. Card labels sit on an **ivory footer plate below the image**, in ink — not on a scrim over it.
   This reads more strongly at distance than white-on-photo ever did.
3. Where text genuinely must overlay an image — the attract screen, detail heroes — use the
   `--color-scrim` gradient and `on-saffron` text. That is a *deliberate* dark island inside a light
   layout, not an accident.
4. Selection is a 3px `saffron` frame, never a glow.

## Ornament — kolam

South Indian identity carried entirely in vector and CSS. No ornament image files ship.

- **`KolamRule`** — an SVG divider: a pulli (dot) lattice with a single looping stroke in `gold`.
  Sits under page titles and between sections.
- **`KolamFrame`** — four SVG corner brackets on a container. Used on heroes, the password card, and
  the QR tiles.
- **Pulli grid** — the `pulli` utility, a 24px radial-gradient dot lattice at ~16% gold. Applied to
  sunk surfaces for texture that survives at viewing distance.

Ornament is always `gold` or `line`, never ink, and never carries information. In high-contrast mode
the pulli grid is switched off entirely, because decoration becomes noise for the people who need
that mode.

## Motion

Page changes are a **crossfade plus a slight scale** (0.98 → 1) over ~400ms on `--ease-temple`. The
previous horizontal slide reads as jitter on a large fixed screen. Press feedback is `scale(0.98)`.
`prefers-reduced-motion` collapses all of it.

## High-contrast mode

The Accessibility control in the nav bar sets `data-contrast="high"` on `<html>`, which **overrides
the token values in place** (`:root[data-contrast="high"]` in `theme.css`). No component branches on
it. Surfaces go pure white, ink goes near-black, hairlines become ink, shadows become solid outlines,
saffron drops to its darkest step, and the kolam texture turns off. It resets when the idle timeout
returns the kiosk to the attract screen, so the next visitor starts from the default.
