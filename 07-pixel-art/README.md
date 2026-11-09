# World 1-1, Rotterdam: a pixel art portfolio template

## What it is

A one-page portfolio for a fictional pixel artist, Juno Achterberg. The page is the first level of a 16-bit side-scroller, set at night in a harbour city. Each section is a different game screen.

Style: pixel art. One NES-like palette on deep ink, a 4px grid, hard edges, notched box-shadow borders and no rounded corners. All motion runs on `steps()`.

Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 5.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Markup, the hero scene SVG, the Pip sprite sheet, the brick tile and ground pattern, and the 10 placeholders. |
| `styles.css` | Tokens for both themes, layout, the box-shadow glyphs, motion and reduced motion. |
| `script.js` | Vanilla JS, loaded with `defer`. Brick name, intro, Pip, reveals, nav state, menu, theme toggle, shop prefill and the demo form. |
| `README.md` | This file. |

There is no framework, no build step and no image file.

## How to run it

Open `index.html` in a browser. A local server also works but is not needed.

## Hero approach

The hero is a side-scroller level called World 1-1.

- The sky, harbour skyline, gantry cranes, harp bridge, tower block and water are one inline SVG with `shape-rendering="crispEdges"` and integer coordinates. It is 360x204 art pixels. `script.js` sets `--k` on the hero to the smallest whole number that covers it, so one art pixel is exactly 2, 3, 4 or 5 CSS px. The SVG is anchored bottom right, above the ground strip.
- Under 768px the lit tower block (`<g class="tower">`) is hidden so it never sits behind the name.
- The name is built from brick tiles. `script.js` reads `data-name`, looks up a 5x7 glyph per letter and places one `<use href="#brick">` per lit cell. The brick is drawn on a 5x5 art-pixel grid. JUNO is row 1. ACHTERBERG is row 2, offset 2 tiles to the right from 1024px up, so the rows step like platforms.
- Tiles are 5px under 768, 10px at 768, 15px at 1024 and 20px from 1440. On a 5-unit brick that is exactly 1x, 2x, 3x and 4x. ACHTERBERG is 295, 590, 885 and 1180px wide.
- Pip, a 16x16 hooded sprite with a stylus, drops onto the name after the bricks land. Pip stands on the last letter of the last row at every width. Pip's art pixel is 4px, and 8px from 1024. A 1-pixel slate rim keeps the dark outline visible on the night sky.
- Pip is a button. Each press makes Pip jump, pops a coin and shows the next line in a speech bubble. The bubble is an `aria-live` region. Below 1024 it sits under the name, lined up with Pip. From 1024 it floats to Pip's left. The coin is hidden under 768.
- A game HUD lists shipped titles, years, base and opening date. On phones it moves below the text panel, and on short phones it drops to two items. All reading text sits on solid panels, never on the sky.
- A brick ground strip closes the hero. The scroll cue sits on it.

## Page order

| Section | Game screen | Layout |
|---------|-------------|--------|
| Hero | World 1-1 | Left-leaning level with the HUD, brick name and one text panel |
| About | Character sheet | Staggered 5/6 split, stat list and segmented stat bars |
| Selected work | Level-select map | Panels alternate either side of a dotted path |
| Services | Shop menu | One dialogue panel with a cursor list and prices |
| Clients | NPC dialogue | Three offset RPG text boxes |
| Contact | Save screen | 4/8 split with a save slot and the form |
| Footer | Credits | Three credit columns and a brick ground strip |

## How to change the name

1. Edit `data-name="JUNO ACHTERBERG"` on the `h1`.
2. Edit the text in `.hero__name-text` inside the same `h1`. Screen readers read this text. It also shows when JavaScript is off.

Supported glyphs are A to Z, space and hyphen. A space starts a new brick row. Rows do not shrink, because that would break the whole-number scale. Keep each word to 10 letters or fewer, or split it with a space or hyphen.

Also update the monogram bitmap if the initials change. It is the `mono` glyph in `styles.css`.

## How to edit projects

Each project is an `<li class="level">` inside `<ol class="levels">`.

- `--shift` on the `li` sets the extra vertical offset on wide screens.
- `level--right` and `level--left` set the side of the path. Keep them alternating.
- The palette strip is the `<ul class="swatches">`. Each `li` takes a colour through `--c`. Update the matching `<p class="sr-only">Palette: ...</p>` line too.

## How to edit services and prices

Each service is an `<li class="menu__item">` in the shop panel. The link's `data-service` value must match an option in the Project type select. Clicking the row then selects that option in the form.

## How to recolour

Tokens sit on `:root` in `styles.css`. The day theme is defined twice with the same values: once inside `@media (prefers-color-scheme: light)` and once on `:root[data-theme="light"]`. Change both. The hero and the footer ground keep the night palette in both themes.

| Token | Night | Day | Job |
|-------|-------|-----|-----|
| `--ink` | #0F172A | #F4EBD0 | Page background |
| `--ink-2` | #192134 | #E9DCB5 | Panels, nav, form panel |
| `--text` | #FFFFFF | #0F172A | Body text |
| `--muted` | #94A3B8 | #4B5563 | Meta text |
| `--line` | #000000 | #0F172A | Pixel borders |
| `--field-line` | #94A3B8 | #0F172A | Input, select and radio edges (6.96:1 at night) |
| `--action` | #DC2626 | #DC2626 | Fill for the hero button and the submit button only |
| `--blue` | #2563EB | #2563EB | Name tabs, form title strip |
| `--score` | #22C55E | #166534 | Eyebrows, HUD values, prices, stat bars |
| `--coin` | #FACC15 | #FACC15 | Fills only |
| `--focus` | #FACC15 | #0F172A | Focus outline |
| `--error` | #F87171 | #B91C1C | Error text |

Contrast ratios, computed with the WCAG formula:

| Text on background | Ratio |
|--------------------|-------|
| #FFFFFF on #0F172A | 17.85 |
| #FFFFFF on #192134 | 16.05 |
| #94A3B8 on #0F172A | 6.96 |
| #94A3B8 on #192134 | 6.26 |
| #22C55E on #0F172A | 7.83 |
| #22C55E on #192134 | 7.04 |
| #FFFFFF on #DC2626 | 4.83 |
| #FFFFFF on #2563EB | 5.17 |
| #0F172A on #FACC15 (skip link) | 11.66 |
| #F87171 on #0F172A | 6.45 |
| #F87171 on #192134 | 5.80 |
| #0F172A on #F4EBD0 | 15.00 |
| #0F172A on #E9DCB5 | 13.07 |
| #4B5563 on #F4EBD0 | 6.35 |
| #4B5563 on #E9DCB5 | 5.53 |
| #166534 on #F4EBD0 | 5.99 |
| #166534 on #E9DCB5 | 5.22 |
| #B91C1C on #F4EBD0 | 5.44 |
| #B91C1C on #E9DCB5 | 4.74 |
| #0F172A on #F5D0A9 (speech bubble) | 12.31 |

Rules to keep:

- Red is a fill. Red text on ink is 3.70 and fails.
- Yellow is never text.
- #22C55E is never text in the day theme. Use #166534.
- Text never sits on the sky. Put it on a solid panel.

## Fonts

Press Start 2P for headings, labels, buttons, HUD values and prices. VT323 for body text, quotes, inputs and captions. Both come from Google Fonts in one request with `display=swap`, and both use the SIL Open Font License. The fallback is `ui-monospace, monospace`.

Press Start 2P is drawn on an 8px grid, so it is only crisp at multiples of 8. Use sizes of 16, 24, 32 or 40px only, with px line heights. It is very wide, so keep labels short. VT323 body text is 22px, and 24px from 1280px.

## How to replace placeholders

Search for `data-placeholder="true"`. Each placeholder has the comment `<!-- Replace with Envato Elements image -->` above it and a label with the target size. Replace the `div` with an `img` of the same aspect ratio and write real alt text.

| Placeholder | Size | Aspect | Count |
|-------------|------|--------|-------|
| Portrait of Juno at the desk | 800x1000 | 4/5 | 1 |
| Project cover (Lanternfall, Brine and Bolt, Maasnacht posters, Pocket Herbarium, Ferrous) | 1600x1000 | 16/10 | 5 |
| Studio desk detail | 600x600 | 1/1 | 1 |
| Client avatar | 128x128 | 1/1 | 3 |

For pixel art images, keep `image-rendering: pixelated` and scale by whole numbers.

## How to redraw Pip

Pip is one SVG in `.pip__window`, 64x16 units. It holds 4 frames of 16x16, built from `<rect>` runs: idle, blink, squash and jump. The script picks a frame through `data-frame` on `.pip` (0 to 3), and CSS slides the sheet by 25% per frame. Keep each frame inside its own 16-unit column.

Colours: #0F172A outline, #2563EB hood, #F5D0A9 face, #FACC15 stylus tip, #FFFFFF eyes and stylus. The #94A3B8 rim is a CSS `drop-shadow` with no blur on `.pip__window`.

The bubble lines are the `lines` array in `script.js`.

## How to connect the form

The form is a demo. It validates, fills the save bar and says that nothing was sent. To send it, open `script.js`, find the comment in the submit handler and post `new FormData(form)` to your form service. Then change the status message and remove the "Demo form" note in `index.html`.

## Motion

Base CSS shows every final state. `script.js` adds `html.motion-ok` only when the visitor has no reduced-motion preference, and every hidden starting state lives under that class. The intro (brick drop and Pip landing) plays once, and only when the page opens at the top with no hash. Loops stop after a few cycles. Only `transform` and `opacity` animate.

## Accessibility notes

- Skip link, one `h1`, sequential headings, and the landmarks header, nav, main and footer. Every section has `aria-labelledby`.
- The brick name and Pip art are `aria-hidden`. The `h1` holds the real name as text.
- HUD numbers with leading zeros carry a screen reader value, so "038" reads as 38.
- Every control has a visible 4px focus ring: yellow at night and in the hero, ink in the day theme.
- Targets are at least 44px. Radio rows are 44px tall and keep the native input focusable.
- Required fields carry a visible * and a hint above the form. Timeline is labelled optional.
- Form errors sit under each field, are linked with `aria-describedby`, set `aria-invalid`, and use a left bar and an "!" mark as well as colour. Focus moves to the first invalid field. The result is announced in a `role="status"` region.
- The Menu button under 600px uses `aria-expanded` and closes on Escape or link click.
- The theme toggle is a button with `aria-pressed`. The choice is saved in `localStorage` when storage is available.
- With reduced motion on, everything is static. With JavaScript off, the name shows as text, the nav shows all links and the form shows a note.

## Design sources

These results from the ui-ux-pro-max search shaped the build:

- Pattern: hero-centric design with one primary action and a visible cue to the next section.
- Style: pixel art. NES-style limited palette, `image-rendering: pixelated`, box-shadow pixel borders, blinking cursor, frame-by-frame sprites and instant state changes.
- Type: the Pixel Retro pairing, Press Start 2P with VT323.
- Colour: the Arcade and Retro Game palette (#DC2626, #2563EB, #22C55E on #0F172A), cut down to a limited palette and checked for contrast.
- Checklist: SVG icons only, pointer cursor, visible focus, 4.5:1 text, reduced motion, labels on inputs, errors linked to fields, live status and no horizontal scroll at 375, 768, 1024 and 1440.

## Things to tweak

- Swap the scene city. The skyline is plain `<rect>` elements in the hero SVG, grouped by layer colour.
- Change the bubble lines and the HUD facts to suit the new owner.
- Remove Pip by deleting `.pip`. The rest of the hero still works.
- Add a sixth level by copying an `li.level` and continuing the side pattern.
- Change tile sizes in the `--tile` values per breakpoint. Keep them multiples of 5 so the brick scales by whole numbers.
- Each project ends with "Case notes on request". Swap it for a link once a case page exists.

All clients, studios and people on this page are fictional.
