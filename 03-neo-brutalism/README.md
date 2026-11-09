# Thunk: neo-brutalism portfolio template

A one-page portfolio template for a fictional designer, Bea Kowalczyk. She designs packaging, posters and type in Manchester. Every name, client, project and quote on the page is made up.

Files: `index.html`, `styles.css`, `script.js`, `README.md`. There is no build step. Open `index.html` in a browser.

## Style

Neo-brutalism. Flat colour blocks on a cream ground. Thick ink outlines on almost everything. Hard offset shadows with zero blur. Heavy grotesk type at poster scale. Stickers set at small angles. Buttons press flat into an ink plate when you click them.

It is not raw brutalism: the type is styled, the grid is deliberate and the palette is warm. Corners are square everywhere. Transitions are short and mechanical, between 70 and 120ms.

Design dials: variance 8, motion 4, density 5.

## Hero approach

The headline is two stacked slabs set like a staircase. "Loud packs." sits on a cobalt slab, tilted one degree. "Louder posters." sits on a paper slab below it, shifted right. The two empty corners hold the stickers: a lime "Booking from January" and a pink "Manchester, UK".

Under the headline there is one line of intro, one button ("See the work") and a fan of three poster proofs. Each proof links to its project. The hero sits on a cutting-mat grid. The headline is two lines from 1024px to 1600px wide and three lines on a 375px phone. The fit maths is in a comment at the top of `styles.css`.

## Page order

1. Header with a sticky nav (one line from 1024px)
2. Hero: staircase slabs, stickers, poster fan
3. Ticker band "On the desk" (the only marquee)
4. Selected work: a pile of folder cards that stick and stack as you scroll
5. About: a back-of-pack panel with ruled cells
6. Services: a vertical tab control panel
7. Kind words: a comic strip with speech bubbles
8. Contact: a fill-in-the-blanks sentence form
9. Footer: a sticker sheet with a dashed kiss-cut line

## Colours

Edit the tokens on `:root` in `styles.css`. Each colour has one job. Keep ink text on every fill.

| Token | Hex | Job |
| --- | --- | --- |
| `--cream` | `#FFF4DE` | Page ground |
| `--cream-deep` | `#F5E3BF` | Placeholder wells, initials blocks |
| `--paper` | `#FFFFFF` | Slabs, cards, inputs, stickers |
| `--ink` | `#111111` | All text, borders, shadows and plates |
| `--ink-soft` | `#3D3D3D` | Secondary text on light fills only |
| `--yellow` | `#FFD23F` | Do: primary actions only |
| `--pink` | `#FF7EB6` | Look here: labelling stickers, the About warning, errors |
| `--lime` | `#B6F36B` | State: availability, selected tab, current nav item, success |
| `--cobalt` | `#5B7CFF` | Big panel: hero slab A and the ticker band only |

There are no gradients and no fifth colour. The cutting mat, hatching and halftone dots are thin ink lines at low opacity.

### Contrast

| Pair | Ratio |
| --- | --- |
| Ink on cream | 17.31:1 |
| Ink on paper | 18.88:1 |
| Ink on cream-deep | 14.95:1 |
| Ink on lime | 14.41:1 |
| Ink on yellow | 13.08:1 |
| Ink on pink | 8.01:1 |
| Ink on cobalt | 5.19:1 |
| Ink-soft on cream | 9.96:1 |
| Ink-soft on paper | 10.86:1 |
| Ink-soft on yellow | 7.52:1 |
| Ink-soft on lime | 8.29:1 |

Do not put `--ink-soft` on pink (4.61:1) or cobalt (2.99:1). Ink borders and the ink focus ring reach at least 5.19:1 on every surface.

## Fonts

- Archivo (variable width 62 to 125, weight 400 to 900) for display, body and buttons.
- Space Mono 400 and 700 for stickers, chips, labels and data.

Both come from Google Fonts under the SIL Open Font License. To swap them, edit the `<link>` in `index.html` and the `--font-display` and `--font-mono` tokens. Space Grotesk was the first pick from the search, but it stops at weight 700, which is too light for the slabs. Archivo's width axis gives one family two voices: expanded 900 for the posters and normal width for reading.

If you change the display font, measure the hero widths again. The maths is in the comment at the top of `styles.css`.

## Search results used (ui-ux-pro-max)

- Design system, "neo brutalism portfolio": brutalism style with sharp corners, 700+ type, visible 2 to 4px borders and a visible grid. Space Grotesk as the heading pick. The scroll-triggered storytelling pattern, kept readable without scroll effects. The stagger list motion, shortened here to 120ms with a 60ms stagger.
- Style, "neo brutalism": radius 0, heavy weights, visible borders. The pure primaries were the starting point. This template warms them into yellow, pink, lime and cobalt on cream.
- Typography, "brutalist bold portfolio": Space Mono as a secondary label face. It is used for every sticker, chip and data line.
- Colour, "neo brutalism bold": pink and cyan flat fills with black text. Pink stayed. Cyan became cobalt so the big panels read as one heavy block.

## Replace the images

There are 9 placeholders. Search for `data-placeholder="true"` or the comment `Replace with Envato Elements image`.

| Where | Label | Size | Ratio |
| --- | --- | --- | --- |
| Hero fan 1 | Fizzbank cans poster | 800x1000 | 4:5 |
| Hero fan 2 | Late Shift Market poster | 800x1000 | 4:5 |
| Hero fan 3 | Brickbat Display specimen | 800x1000 | 4:5 |
| Work 1 | Fizzbank can range on a shelf | 1600x1000 | 16:10 |
| Work 2 | Late Shift Market poster wall | 1600x1000 | 16:10 |
| Work 3 | Plumbline record sleeves | 1600x1000 | 16:10 |
| Work 4 | Kettleworth Library floor sign | 1600x1000 | 16:10 |
| Work 5 | Brickbat Display specimen sheet | 1600x1000 | 16:10 |
| About | Portrait of Bea at the Riso | 800x1000 | 4:5 |

Swap each placeholder for an `<img>` with real alt text. Keep the aspect ratio and use `object-fit: cover`, so the image fills the cell when the card is taller or shorter than the image. In the work pile and the About panel the image fills its whole cell, so cover is required there.

Optional: add an `og:image` at 1200x630 for link previews. It is not rendered on the page.

## Links

- Project buttons point to `#work` and carry `data-placeholder-link="true"`. Replace the `href` with the real case study URL when the pages exist.
- Social links (Instagram, Are.na, Behance, LinkedIn) point to `#` and carry `data-placeholder-link="true"`. `script.js` stops those clicks so the page does not jump to the top. Add real profile URLs and remove the attribute.
- The email uses the reserved `.example` domain. Replace `hello@beakowalczyk.example` in the footer.

## Contact form

The form is a demo. It sends nothing. `script.js` stops the submit, checks the three required blanks and shows an inline status. On success it thanks the visitor by first name and resets.

To make it work, set `action` and `method` for your form service and remove the demo success branch in `script.js` (the block after the error check in the submit handler). Without JavaScript, the browser's own validation runs.

## Services prefill

Each "Ask about" button carries a `data-service` value. With JavaScript, a click sets the Project type select to that value, scrolls to the form and focuses Your name. Keep the `data-service` values in step with the select options.

## Motion

Only transform and opacity animate. Colour and layer changes are instant.

- Hero stamp: the slabs, then the three posters, drop in on load in reading order. CSS only, and it always ends visible.
- Sticker slap: the hero stickers land last. The form status sticker reuses it.
- Press: buttons lift 2px on hover and sit flush on the plate when pressed or selected.
- Poster straighten: fan posters and footer stickers straighten when hovered or focused.
- Ticker: a 45 second loop. It pauses on hover, on focus and with the pause button. The button needs JavaScript, so without it the ticker is a static wrapped list.
- Work pile: CSS `position: sticky` only. No scroll listeners.
- Tab change: the new service panel drops 8px into place.
- Comic panels: they rise in with a short stagger when the strip scrolls into view.
- Mobile menu: the panel drops 8px into place.

With reduced motion on, nothing animates, the ticker becomes a static wrapped list, the comic panels are visible from the start and every state still changes instantly.

To turn the ticker off, delete the `html.js .ticker__track` animation rule in `styles.css`, or remove the ticker section from `index.html`.

## Sticky pile

The pile runs at 1280px wide and 760px tall and up. From 1024px outside that range the first card runs full width and the other four sit in a 2x2 grid. Below 1024px the cards are a plain list. Do not add `overflow: hidden`, `auto` or `scroll` to any parent of `.stack`, or the pile stops sticking. Use `overflow-x: clip` instead.

To add or remove a project, update `--i` on each `.stack__item` (0, 1, 2 and so on). The folder tabs step 20% to the right per card, which fits five. For six cards, change the step to about 16% in the `.proj__client` rule inside the pile media query.

## Accessibility

Checked:

- Contrast for every text and fill pair (table above).
- A 4px ink focus ring with a 4px gap on every focusable element.
- A skip link to the main content.
- One h1, then an h2 per section, h3 for projects and service panels, h4 for "You get".
- Keyboard tabs: arrow keys, Home and End, with a roving tabindex.
- Visible labels on every field, errors next to each field, a polite live status and the right input types.
- No horizontal scroll down to 320px. Below 360px the Menu label is visually hidden but stays as the button's name.
- `scroll-padding-top` on `html` keeps focused fields and anchor targets clear of the sticky header.
- Reduced motion and forced colours.
- A focused card in the pile rises above later cards, so its button is never hidden.
- Pile cards have a minimum height, not a fixed one, so larger text grows the card instead of spilling out.
- A hint above the form says every blank is needed unless it says optional.
- Every section is readable with JavaScript off. The services panels stack and the nav wraps.

## Things to tweak

- Copy: all text lives in `index.html`.
- Availability sticker: change "Booking from January" in the hero.
- Ticker items: edit both lists in the ticker section. The second list is a hidden copy for the loop, so keep them the same.
- Palette: keep one job per colour and keep ink text on every fill.
- Hero headline: if you change the words, check that each slab stays on one line at 1024px.

## Credits

Icon geometry is drawn for this template. All names, clients, projects and quotes are fictional.
