# 21 Cyberpunk: Sector Vell Nightshift

## What this is

A one-page portfolio template for an invented motion and signage designer, Rika Vantrel, who works in the invented megacity of Hakuro Bay. All names, places, companies and clients are fictional.

Style: cyberpunk, read as "high tech, low life". One street-level block at 23:47 in the rain: stacked neon signs, a wet asphalt reflection, a holographic ad, a corporate notice ticker over hazard tape, HUD readouts and chromatic glitch slices.

Dials (taste-skill): DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 6.

## Files

- `index.html`: all markup, an inline SVG icon sprite and the ripple filter
- `styles.css`: tokens, layout, components, motion, reduced-motion rules
- `script.js`: menu, hero boot and glitch timers, Pause street control, scroll reveals, demo form validation
- `README.md`: this file

There is no build step. Open `index.html` in a browser.

## Concept and sections

Each section imitates one piece of street infrastructure.

| Section | Street object | Notes |
| --- | --- | --- |
| Hero (`#top`) | Sign canyon | Vertical sign tower, the name as a neon sign, holo ad strip, HUD panel, AR tags that link into the page, wet asphalt reflection, notice ticker |
| About (`#about`) | Corporate tenancy notice | Portrait placeholder, notice panel with facts, punched "lost and found" ticket |
| Work (`#work`) | Sign tower | Five chamfered cards bolted at different heights |
| Services (`#services`) | Vending kiosk menu board | Coded rows with prices, plus a vertical kiosk sign |
| Clients (`#clients`) | Paste-up posters on brick | Three taped quotes, all marked as fictional |
| Contact (`#contact`) | Payphone terminal | Demo form that sends nothing, plus a direct lines plaque |
| Footer | Hazard-striped loading bay | Giant outline word, footer nav, legal lines |

## Hero approach

The hero is built only from HTML, CSS and inline SVG. Layers from back to front: two radial colour washes, rain, the sign tower (cols 1-2), the holo strip, the HUD panel, the h1 sign, the AR tags, the lede and actions, the asphalt band with its mirrored copy of the name, and the ticker band.

The h1 is real text: `RIKA` in solid magenta neon and `VANTREL` as a hollow cyan tube. The chromatic ghost copies are `aria-hidden` spans, not pseudo-element content, so the heading's accessible name stays "RIKA VANTREL".

Below 1024px the composition reflows into one column: eyebrow, tower chips, name, two HUD lines, tag chips, lede, status, buttons, asphalt band, ticker.

## Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Chakra+Petch:wght@400;600&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap&text=%E5%A4%9C%E5%B8%82%E9%9B%BB%E8%84%B3%E4%BF%AE%E7%90%86%E5%96%B6%E6%A5%AD%E4%B8%AD%E5%8F%97%E4%BB%98%E5%87%BA%E5%8F%A3" rel="stylesheet">
```

- Big Shoulders Display 800/900: the name, h2, h3 and project numbers
- Chakra Petch 400/600: body, buttons, nav, form labels. Body is 16-17px at line-height 1.65
- Share Tech Mono: labels, HUD, meta, prices, ticker, placeholder labels. Never below 14px
- Dela Gothic One: decorative CJK only, always `aria-hidden`

Dela Gothic One is loaded as a text subset with only these glyphs: 夜市電脳修理営業中受付出口. If you change any decorative CJK, add the new characters (URL-encoded) to the `&text=` parameter, or they will fall back to a system font.

## Colour tokens

Dark only. Light mode is not recommended for this style.

| Token | Hex | Role |
| --- | --- | --- |
| `--bg` | #07080F | Near-black, blue-tinted ground |
| `--panel` | #0F1222 | Opaque panels |
| `--panel-2` | #161A2E | Raised rows, hover fills, ticket, plaque |
| `--fg` | #E8EDF7 | Body text |
| `--muted` | #A0ABC2 | Secondary text, hints, meta |
| `--mag` | #FF3D8B | Actions, the RIKA neon |
| `--cyan` | #2BE4F0 | Tube light, HUD, focus rings |
| `--amber` | #FFB224 | Sodium hazard, labels, prices |
| `--danger` | #FF6B6B | Form errors |
| `--edge` | #5A6584 | Component boundaries and input borders (3:1 non-text) |
| `--line` | #1E2440 | Decorative rules and the footer outline word only |
| `--hazard` | amber / bg stripes | Hazard tape |

## Contrast table

Computed with the WCAG relative luminance formula.

| Pair | Ratio |
| --- | --- |
| fg on bg / panel / panel-2 | 17.03 / 15.83 / 14.65 |
| muted on bg / panel / panel-2 | 8.66 / 8.05 / 7.45 |
| mag on bg / panel / panel-2 | 5.99 / 5.57 / 5.15 |
| cyan on bg / panel / panel-2 | 12.81 / 11.91 / 11.02 |
| amber on bg / panel / panel-2 | 11.08 / 10.31 / 9.54 |
| danger on bg / panel / panel-2 | 7.20 / 6.70 / 6.20 |
| bg text on mag fill (primary button) | 5.99 |
| bg text on cyan fill (ghost button and tag hover) | 12.81 |
| bg text on amber fill (notice bar, skip link) | 11.08 |
| amber on the holo strip (#2C2212) | 8.66 |
| edge on bg / panel (boundaries) | 3.45 / 3.21 |

Forbidden pairs: fg text on mag fill (2.84), amber on mag (1.85), any text in `--line` (1.31).

## Replacing placeholders

Search for `data-placeholder="true"` or the comment `<!-- Replace with Envato Elements image -->`. Swap each `div.ph` for an image and keep the aspect ratio:

```html
<img src="images/portrait.jpg" alt="Rika at her workbench bending an LED strip" width="1200" height="1500" loading="lazy">
```

The hero has no image, so there is no LCP image to worry about.

| # | Label | Size | Where |
| --- | --- | --- | --- |
| 1 | Portrait, Rika at the workbench | 1200x1500 | About |
| 2 | Project cover, Night Market 9 Wayfinding | 1600x1000 | Work 01 |
| 3 | Project cover, Kessa Labs Lobby Hologram | 1600x1000 | Work 02 |
| 4 | Project cover, Line 4 Transit Ident | 1200x1200 | Work 03 |
| 5 | Project cover, Ramen Saito-Kubo Street Sign | 1200x1500 | Work 04 |
| 6 | Project cover, OFFLINE/ON Title Sequence | 2400x1000 | Work 05 |

## Editing copy

- The name appears in the h1, in its two ghost spans per line, and in the reflection copy inside `.hero__reflection`. Update all of them together, plus the `<title>`, the footer word and the legal line.
- The ticker text exists twice: the real copy and an `aria-hidden` duplicate used for the loop. Keep them identical.
- The HUD readout is decorative flavour text in `.hud`. Each row has a `.hud__sep` used only in the two-line mobile layout.
- Section code labels (`02 // TENANCY NOTICE` and so on) are plain text.

## Making the form live

1. Set `action` to your form service URL and add `method="post"`.
2. Remove the demo handler at the end of `script.js` (the `submit` listener), or replace the success branch with a `fetch` call.
3. Remove the "DEMO FORM: NOT CONNECTED" text in `.terminal__display`.
4. Keep the labels, hint ids and `<field>-error` ids so the error messages stay announced.

## Project links

Each work card links to its own id (`#work-01` to `#work-05`), because the template has no case study pages. Point each `.work-card__link` href at a real page. The whole card is clickable through the link's `::after` overlay.

## Motion and accessibility

- Hero boot runs once (about 2.2s): the tower boxes flicker on in sequence (one dip per 600ms), the name powers on over 900ms, then the HUD, tags and lede rise in. Nothing flashes more than 3 times per second.
- Chromatic split pulse: 300ms, at 7s, 14s and 21s, then it stops. Hovering the name or focusing inside the hero runs one pulse, with a 2s cooldown. The base text is always fully visible underneath.
- Rain, holo flicker and ticker are ambient. The "Pause street" button controls all three (its visible label switches between Pause street and Play street). Ambient motion stops by itself after 24s.
- Animations use transform and opacity only. Hover transitions are 150-200ms.
- `prefers-reduced-motion: reduce` shows the final lit state, stops all animation, shows the ticker as static text, hides the Pause street button and shows reveals immediately.
- Focus: 3px cyan outline with offset. Magenta buttons add a bg-coloured ring inside the outline. Chamfered shapes are clipped on inner layers, so focus rings are never clipped.
- `scroll-padding-top: 80px` keeps anchors and focus clear of the sticky header.
- Without JS, all content shows, the nav shows as a wrapping list (the header scrolls away below 1024px), the street is static with the notice shown as plain text, and the form posts to `#`.

## Browser notes

- The hollow name and project numbers use `-webkit-text-stroke` inside `@supports`. Without it they fall back to solid text.
- The reflection uses an SVG `feTurbulence` filter. Where that is unsupported it shows an unrippled mirror.
- The page relies on `overflow: clip` to stop decorative layers causing horizontal scroll. The desktop AR tags use `subgrid`.

## ui-ux-pro-max results used

1. `--design-system "cyberpunk portfolio"`: the CTA in the hero and repeated in the contact section, CTA label contrast of 4.5:1 or more, independent focus and boundary visibility, a static final hero under reduced motion, and its checklist (no emoji icons, cursor pointer, 150-300ms hovers, responsive checks). Its Swiss style, blue palette and fonts were off topic and were not used.
2. `--domain style "cyberpunk"`: neon on dark, HUD, subtle glitch, scanlines (as a static 0.035 texture), angular shapes. Matrix green was dropped.
3. `--domain typography`: an uppercase condensed display face for headings with a mono for data. Orbitron and JetBrains Mono were swapped for Big Shoulders Display and Share Tech Mono, and the body stays in sentence case at 16px or larger.
4. `--domain color` ("neon dark gaming"): near-black blue ground, light cool foreground, one hot accent for actions. The violet primary was not used, and every pair was recomputed.
5. Quick-reference rules: contrast, focus states, skip link, heading order, colour not the only indicator, reduced motion, 44px targets, tabular numbers, aspect-ratio placeholders, font-display swap, no zoom lock, pause control for motion over 5s, flash limits.
6. Pro-rules checklist: one SVG icon family at one stroke width, decorative icons hidden, named icon buttons, press feedback without layout shift, semantic tokens, hints and errors next to fields.

## Things to tweak

- Swap `--mag` and `--cyan` for another neon pair, then recheck the contrast table.
- Change the tower glyphs (remember the Dela Gothic One `&text=` subset).
- Edit or remove HUD rows, the holo strip text and the ticker notices.
- Remove the scanline texture by deleting `body::after`.
- Change the auto-stop delay (24000ms) or the pulse times in `script.js`.

## Licence and credits

Big Shoulders Display, Chakra Petch, Share Tech Mono and Dela Gothic One are served by Google Fonts under the SIL Open Font License. No third-party images are included.
