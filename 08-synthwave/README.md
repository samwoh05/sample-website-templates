# Night Shift LP: a synthwave portfolio template

## What it is

A one-page portfolio for a fictional motion designer and title sequence director, Rhea Valcourt, based in Lisbon. The whole page is a 12-inch synthwave album sleeve. The hero is the front cover, the showreel is the record sliding out, the about section is the inner sleeve, the work is a tracklist with Side A and Side B, the services are a synth hardware panel, the quotes are liner-note thank-yous, the contact form is a booking card and the footer is the back sleeve with a catalogue number (RV-08).

Style: synthwave (outrun, retrowave). A sliced sunset sun, a perspective neon grid driving toward you, wireframe mountains, chrome lettering with a hard reflection line and one hot-pink neon script. No palm trees, no cassettes, no VHS interface.

Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 4.

All people, clients, bands, studios and quotes are fictional.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Markup for every section, the mountain SVG, inline icons and the 8 placeholders (plus 6 hidden copies for the desktop "now playing" screen). |
| `styles.css` | Tokens, the hero layer stack, the chrome rule, section layouts, placeholders, motion and reduced motion. |
| `script.js` | Vanilla JS, loaded with `defer`. Intro start, nav state, mobile menu (a modal dialog that makes the page behind it inert), pause toggle, hero pause, tracklist screen, reveals, Lisbon clock and the demo form. About 220 lines. |
| `README.md` | This file. |

No framework, no build step, no image files. Google Fonts is the only external request.

## How to run it

Open `index.html` in a browser. A local server also works (for example `python3 -m http.server` in this folder) but is not needed.

## Hero approach

The hero is the front cover of the record. Layers, bottom to top:

1. Sky: the hero background is the `--sky` gradient, deep indigo to a violet band that stops hard at the horizon.
2. Stars: `.hero::before`, two tiles of 1px radial-gradient dots, masked to the top 55%. Static.
3. Sun: `.sun-wrap` holds the glow (`filter: drop-shadow`, because a mask on the child would clip a box-shadow). The inner `.sun` is a yellow, orange, magenta, purple gradient circle. The slices are a `mask-image` gradient (`--sun-mask`) whose transparent gaps get wider toward the base. The sun centre sits 28% of its own height above the horizon (`translate(-50%, -78%)`), so the bottom 22% is hidden by the floor. `.sun::after` is the shimmer, which inherits the mask.
4. Mountains: one inline SVG, `preserveAspectRatio="none"`, two low ridges with a valley gap so the sun stays clean. Cyan stroke with `vector-effect: non-scaling-stroke`. Hidden under 600px.
5. Floor: `.floor` is opaque, so the sun really sinks behind it. It sets `perspective: 760px` from the top edge. `.plane` is a 300% wide magenta grid drawn with two linear gradients and tilted with `rotateX(71deg)`. A short mask fade lets the lines run almost to the horizon. The drive animation moves it by `translateY` of exactly one tile (56px, 40px on phones), so the loop is seamless. Transform only.
6. Horizon line: a 2px pale pink bar with a magenta glow at `top: var(--horizon)`.
7. The name: `h1` with "Rhea" in Mr Dafoe and VALCOURT in chrome. The box around VALCOURT is centred on the horizon (`top: var(--horizon); translateY(-50%)`). The chrome gradient has a hard dark band at 50%, so the reflection line inside the letters lands on the real horizon and the two read as one line.
8. Cover furniture: mono chips, the tagline panel and the yellow "Now booking" sticker. All reading text sits on near-solid chips, never on the sun or grid.
9. Scanlines: `.hero::after`, very low opacity.

The chrome trick: VALCOURT is two stacked spans. `.chrome` carries the gradient with `background-clip: text`. `.chrome-shadow` sits directly behind it with a 6px dark `-webkit-text-stroke` (a 3px dark outline outside every glyph) plus a two-step purple extrusion and a magenta glow. The outline keeps the silhouette readable over the bright sun, grid and horizon. Fallbacks: a flat pale fill when `background-clip: text` is not supported, and `CanvasText` in forced colours mode.

The name is sized with container query units: `font-size: calc(100cqi / 5)`, so it spans the 1320px container edge to edge at every width (about 69px at 375, 141px at 768, 264px at 1440).

The intro runs once, in CSS, after `script.js` adds `.is-ready` (fonts loaded, or 1200ms). The sun rises into place, VALCOURT fades in, then "Rhea" powers on. "Rhea" then dips faintly once every 11 seconds. Without JS the cover is static and complete.

## Page order

| Section | On the sleeve | Layout |
|---------|---------------|--------|
| Hero | Front cover | Full-bleed scene, name across the horizon, tagline panel bottom left, sticker bottom right |
| Showreel | Record sliding out | Full container 16:9 frame with letterbox bars; pulls up over the hero from 1024px |
| About | Inner sleeve | Tilted 4:5 portrait in cols 1-5, staggered text and an LCD spec list in cols 7-12 |
| Selected work | Tracklist | Sticky "now playing" screen left, Side A and Side B lists right, a "Turn over" band between |
| Services | Synth panel | One hardware panel with four channel strips at 4/3/3/2 of 12 |
| Quotes | Liner notes | Neon "thanks", one big quote in cols 1-8, two smaller quotes offset in cols 9-12 |
| Contact | Booking card | Mini cover with "Book the night shift" left, form right |
| Footer | Back sleeve | Catalogue line, credits, links, barcode, cropped chrome VALCOURT |

## Changing the name and projects

The name appears in three places:

1. The hero `h1` in `index.html` ("Rhea" in `.script`, the surname twice: once in `.chrome-shadow`, once in `.chrome`).
2. The footer `.footer__crop`, again twice.
3. The nav monogram (`RV`) and its `aria-label`.

Also update the `<title>`, the meta description, the catalogue line and the small print.

If the surname is longer or shorter than VALCOURT, retune the divisor in `font-size: calc(100cqi / 5)`. It appears twice in `styles.css` (`.name` and `.footer__crop`). Rule of thumb: divisor = letters x 0.62. Check that the word does not overflow the container at 375, 768 and 1440.

Projects: each track is an `article.track` inside an `ol.track-list`.

- `data-track` (A1 to B3) links the row to its copy in the "now playing" screen. Keep it matching.
- `data-time` is the runtime the screen shows. Update the visible runtime in `.track__time` too.
- The Side A total ("07:48 elapsed") in the "Turn over" band is typed by hand. Add up the Side A runtimes again if you change them.
- The track code (A1) appears twice in `.track__code` and once as hidden text inside the `h4`. The visible title sits in `.track__name` inside the link.
- Each track title links to `href="#"`, and the whole card is the hit area. Put the real project page URL in each link. Until then `script.js` cancels clicks on `#` links so the page does not jump to the top.

## Fonts and palette

One Google Fonts request:

- Kanit 800 and 900 italic (only the italic faces are requested): the chrome name, headings, track titles.
- Mr Dafoe: the neon script, used exactly three times ("Rhea", "thanks", "night shift"). Never reading text.
- Red Hat Text 400, 500, 700: body copy, 17px (16px under 600px), line-height 1.6. The 700 weight also draws the big chrome quote mark, because Kanit italic renders it as two slashes.
- IBM Plex Mono 500 and 600: labels, LCD readouts and numbers, tabular figures, never under 12px.

ui-ux-pro-max returned no synthwave font pairing, so this pairing is a judgement call. None of these fonts is used elsewhere in the collection.

Tokens live on `:root` in `styles.css`. Components use tokens only. Raw hex sits on `:root`, either as a token or inside the documented gradients (`--sky`, `--sun-fill`, `--sun-mask`, `--sun-strip`, `--divider-sun`, `--chrome-fill`). Effect tokens: `--chrome-deep` (#3B1C75) and `--chrome-mid` (#7F8CD6) for the chrome extrusion and knobs, `--chrome-pale` (#DCE6FF) for the chrome fallback, `--horizon-core` (#FFE3F4) for both horizon lines and `--letterbox` (#000000) for the showreel bars. Glows use `rgba()` versions of the neon colours. Mask gradients use `#000` only as an alpha value, never as a colour. Layers use the `--z-*` scale, including `--z-horizon`, `--z-scanlines` and `--z-reel`.

| Token | Value | Job |
|-------|-------|-----|
| `--night-900` | #0B0620 | Page |
| `--night-800` | #140A33 | Panels, tracklist band, form |
| `--night-700` | #22104F | Raised panels, placeholders, row hover |
| `--lcd` | #05030F | LCD strips, inputs, footer |
| `--sky-horizon` | #4A1170 | Decorative only |
| `--ink` | #F4EEFF | Main text |
| `--ink-muted` | #B9AEDB | Secondary text |
| `--ink-faint` | #7A6BB0 | Borders and barcode only, never text |
| `--magenta` | #FF2E97 | Grid, glows, decorative borders |
| `--magenta-text` | #FF4FA8 | Pink as text: labels, links, script |
| `--cyan` | #2DE2E6 | LCD values, runtimes, focus |
| `--sun-yellow` | #FFD319 | Sticker, submit, skip link fills |
| `--sun-orange` | #FF8B2C | Side titles |
| `--sun-purple` | #8A2BE2 | Decorative |
| `--on-accent` | #0B0620 | Text on yellow, cyan and pink fills |
| `--focus` | #2DE2E6 | Focus ring |
| `--error` | #FF8A8A | Error text and borders |
| `--success` | #7CF5C4 | Demo status message |
| `--border` | #3A1F7A | Decorative dividers only |
| `--border-input` | #7A6BB0 | Control edges |
| `--border-hot` | #FF2E97 | Tagline panel, form, placeholders |

Contrast ratios, computed with the WCAG formula. Columns are night-900 / night-800 / night-700 / lcd:

| Text | Ratios |
|------|--------|
| `--ink` | 17.45 / 16.52 / 14.76 / 18.04 |
| `--ink-muted` | 9.56 / 9.05 / 8.08 / 9.88 |
| `--magenta-text` | 6.54 / 6.19 / 5.53 / 6.76 |
| `--cyan` | 12.38 / 11.72 / 10.46 / 12.80 |
| `--sun-yellow` | 13.74 on night-900 |
| `--sun-orange` | 8.46 on night-900, 8.01 on night-800 |
| `--error` | 8.72 / 8.26 / 7.37 / 9.02 |
| `--success` | 14.81 on night-900 |
| `--on-accent` on fills | 13.74 on yellow, 12.38 on cyan, 6.54 on pink |

Rules to keep:

- `--ink-faint` is 4.29 on night-900. It fails body text, so it is only used for borders and the barcode.
- `--border-input` is 4.44 on `--lcd` and 4.07 on night-800, so it passes the 3:1 rule for control edges. Do not use `--border` (1.6:1) on controls.
- The cyan focus ring is at least 10.4:1 against every dark surface.

## ui-ux-pro-max results used

Searched on 2026-10-07.

- `"synthwave portfolio" --design-system` returned Minimalism and Swiss with a blue accent. Off-topic, rejected.
- Retried `"retro-futurism neon 80s" --design-system`: 3D and Hyperrealism (partly relevant) and the "Neon purple + rose action" palette (#7C3AED, #A78BFA, #F43F5E on #0F0F23). Used as a tonal reference for the dark surfaces. Its suggested pattern (a feature-heavy page with a CTA in the hero and at the bottom) was replaced with the sticker and the booking card. Its accessibility flag (high risk: contrast, keyboard, focus, reduced motion) drove the checks above.
- `"synthwave" --domain style`: 0 results. Retried `"retro-futurism neon" --domain style`: matched "Retro-Futurism" (synthwave, 80s, neon glow, CRT scanlines). Used: neon glow through text-shadow and box-shadow, scanlines through a pseudo-element overlay, deep dark background. Scanline opacity was cut far below the suggested 0.3 to keep text readable. The glitch and hue-rotate effects were left out.
- `"retro 80s neon portfolio" --domain typography`: Pixel Retro (already used by 07), Archivo and Space Grotesk (Archivo already used by 03) and Retro Vintage (not synthwave). No verified synthwave font pairing was found, so the fonts above are a judgement call.
- `"synthwave" --domain color`: 0 results. Retried `"neon music entertainment dark" --domain color`: Music Streaming, Arcade and Retro Game, Music Creation. Used as a tonal reference for the night surfaces and muted text.
- Rules applied from the pre-delivery checklist: 4.5:1 text contrast, visible focus, skip link, heading order, 44px targets, no horizontal scroll at 375px, semantic tokens, tabular numbers, transform and opacity motion only, reduced motion, labelled form fields with linked errors and an error summary.

## Placeholders

Each placeholder is a styled box with `data-placeholder="true"`, `role="img"`, an `aria-label` with its size and an `<!-- Replace with Envato Elements image -->` comment right before it. Swap the `div` for an `img` with the same `aspect-ratio` and a real `alt`.

| # | Placeholder | Size | Where |
|---|-------------|------|-------|
| 1 | Showreel poster | 1920x1080 (16:9) | Showreel band |
| 2 | Studio portrait | 1200x1500 (4:5) | About |
| 3 | Project cover: Low Tide Signal | 1600x1000 (16:10) | Track A1 |
| 4 | Project cover: Arcadia Freight | 1600x1000 (16:10) | Track A2 |
| 5 | Project cover: Velvet Interstate | 1600x1000 (16:10) | Track A3 |
| 6 | Project cover: Hour of the Lantern | 1600x1000 (16:10) | Track B1 |
| 7 | Project cover: Cobalt Mile | 1600x1000 (16:10) | Track B2 |
| 8 | Project cover: Neon Almanac | 1600x1000 (16:10) | Track B3 |

Covers 3 to 8 also appear in the desktop "now playing" screen as `aria-hidden` copies (`data-placeholder="true" data-copy="screen"`, each with the same Replace comment). Use the same image for the copy and the row.

Optional: an Open Graph image, 1200x630, as a commented-out `og:image` meta tag in the `head`.

## Things to tweak

- `--horizon` (58%, 56% under 768px): moves the horizon, the sun, the floor, the mountains and the name together.
- `--tile` and `--drive`: grid tile size and loop speed. Keep the keyframe distance equal to one tile or the loop will jump.
- `perspective` on `.floor` and `rotateX(71deg)` on `.plane`: how steep the floor looks. Change the keyframes too if you change the angle.
- `--sun-mask`: the slice positions. Gaps widen toward the base; keep the top half solid.
- `--chrome-fill`: the chrome stops. The hard dark stop at 48% to 50% is the reflection line; it must stay at 50% to meet the horizon.
- The flicker: `@keyframes flicker` and the `11s` duration on `.name .script`.
- The catalogue number RV-08: the cover chip, the synth panel name, the footer catalogue line, the barcode and the menu label.
- The pause toggle stores its state in `localStorage` under `rv08-motion`.
