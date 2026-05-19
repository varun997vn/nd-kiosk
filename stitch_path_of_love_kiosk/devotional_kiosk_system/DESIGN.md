---
name: Devotional Kiosk System
colors:
  surface: '#151311'
  surface-dim: '#151311'
  surface-bright: '#3c3936'
  surface-container-lowest: '#100e0c'
  surface-container-low: '#1d1b19'
  surface-container: '#221f1d'
  surface-container-high: '#2c2927'
  surface-container-highest: '#373432'
  on-surface: '#e8e1dd'
  on-surface-variant: '#dcc2b0'
  inverse-surface: '#e8e1dd'
  inverse-on-surface: '#33302d'
  outline: '#a38c7c'
  outline-variant: '#554336'
  surface-tint: '#ffb77f'
  primary: '#ffb77f'
  on-primary: '#4e2600'
  primary-container: '#e27d18'
  on-primary-container: '#4c2500'
  inverse-primary: '#924c00'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#e3beb8'
  on-tertiary: '#422a26'
  tertiary-container: '#b18f89'
  on-tertiary-container: '#412925'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb77f'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#e3beb8'
  on-tertiary-fixed: '#2b1613'
  on-tertiary-fixed-variant: '#5b403c'
  background: '#151311'
  on-background: '#e8e1dd'
  surface-variant: '#373432'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
  label-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  touch-target-min: 64px
  gutter: 32px
  margin-edge: 48px
  stack-gap: 24px
---

## Brand & Style
The design system is centered on a **Cinematic Devotional** aesthetic, designed specifically for high-traffic physical kiosks. The personality is reverent, warm, and inviting, aiming to create a moment of sanctuary for the user. 

The visual style blends **Minimalism** with **Tactile Elegance**. We utilize expansive, high-contrast backgrounds to make the devotional content feel epic and storied. Every interaction must feel intentional and grounded, avoiding the "jitter" of standard mobile web interfaces in favor of sweeping, fluid transitions that mimic the slow pan of a camera. The interface is optimized for high-legibility under varying lighting conditions, ensuring that "In the Path of Love" remains accessible to all pilgrims and visitors.

## Colors
The palette is rooted in the earth and the sun. 

- **Primary (Deep Saffron):** Used for primary actions and highlights, symbolizing energy and devotion.
- **Secondary (Rich Gold):** Reserved for ornamental accents, iconography, and high-level status indicators.
- **Tertiary (Earthy Umber):** Used for container backgrounds and subtle separators to maintain warmth without the coldness of pure grey.
- **Neutral (Obsidian Black):** The primary canvas color. This deep, warm black ensures the golds and saffrons "glow" on the kiosk screen, maximizing legibility and reducing eye strain in dimmed environments.

All text should maintain a minimum contrast ratio of 7:1 against backgrounds to ensure visibility for users with visual impairments.

## Typography
The typography system balances the literary authority of a serif with the functional clarity of a modern sans-serif. 

- **Titles & Display:** Use **Noto Serif**. This provides a sophisticated, "bookish" quality to the devotional content. 
- **UI & Navigation:** Use **Inter** (Bold). Because this is a touch-screen kiosk, the sans-serif is used for all functional elements to ensure no loss of legibility at a distance.
- **Scale:** The minimum font size is locked at **18px**. For kiosk environments, we prioritize large-scale headers to attract users from a distance and readable body text for up-close interaction.

## Layout & Spacing
The layout follows a **Fixed Grid** model optimized for a vertical kiosk orientation (usually 1080x1920). 

- **Structure:** 12-column grid with a substantial 48px outer margin to prevent fingers from hitting the bezel.
- **Touch Targets:** Every interactive element must adhere to a **64px minimum** height/width. 
- **Flat Hierarchy:** We avoid deep nesting. Users move through horizontal "Stages" rather than vertical "folders." 
- **Scrollbars:** Scrollbars are hidden. Instead, we use "edge fading" (gradients) to indicate that more content exists beyond the viewport, encouraging natural swiping gestures.

## Elevation & Depth
This design system avoids traditional drop shadows in favor of **Tonal Layers and Ambient Glows**.

- **Surface Tiers:** We use different shades of Earthy Umber to indicate depth. The "base" is the darkest, while interactive cards are slightly lighter.
- **Glow Effects:** Instead of shadows, focused elements emit a subtle Saffron glow, suggesting a "light from within" rather than a light source from above.
- **Glassmorphism:** For the persistent bottom navigation, a heavy backdrop blur (32px) is used to maintain a cinematic overlay feel without obscuring the background imagery.

## Shapes
Shapes are defined by **Softened Geometry**. We use a 0.5rem (8px) base radius for standard components and 1rem (16px) for large containers. 

The goal is to feel organic and "human-made" rather than industrial. Buttons should feel like smooth stones or tiles. Hard corners are strictly avoided to maintain the gentle, devotional tone of the brand.

## Components
Consistent styling for the kiosk environment:

- **Buttons:** Massive targets (min 64px height). Primary buttons use a Saffron-to-Gold gradient. Secondary buttons use a thick 2px Gold border with no fill.
- **Persistent Bottom Nav:** A fixed bar at the base of the screen, housing the "Home," "Path," and "Heart" icons. Height is 96px to ensure easy thumb-reach.
- **Cards:** Large, imagery-focused containers with text overlays. Text is always placed on a gradient scrim to ensure legibility against complex images.
- **Input Fields:** Large text entry areas with 24px padding. Since kiosks use on-screen keyboards, inputs should occupy the top half of the screen to remain visible while the keyboard is active.
- **Lists:** High-density lists are avoided. Instead, use "Feature Strips" where each list item is at least 80px tall with clear separators.
- **Transitions:** All component states use fluid transitions (approx 400ms). Page changes use a "Cross-fade + Slight Scale" to mimic cinematic editing.