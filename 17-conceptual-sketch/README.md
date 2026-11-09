# 17 - Conceptual Sketch portfolio template

A one-page portfolio for a fictional industrial designer, **Oda Rennick** (Rennick Objects, Rotterdam). The idea is "the page is the pad": every section is a numbered concept sheet (Sheet 01/06 to 06/06) with crop marks, a circled sheet number, a blue construction rule and a pencil rule that draws on.

Plain HTML, CSS and a small vanilla script. No frameworks, no build step. Open `index.html` in a browser.

| File | What it holds |
|---|---|
| `index.html` | All markup, the shared SVG defs and the authored hero drawing |
| `styles.css` | Tokens in `:root`, layout, sheet chrome, motion and reduced-motion rules |
| `script.js` | Draw gating, section reveals, Show working toggle, nav state, viewBox swap, CTA boil, quote leaders, form validation |

## Style

**Conceptual sketch.** A designer's ideation sheet in progress: graphite on warm layout paper, light blue non-photo construction drawn first, confident dark line work over it, loose hatching for shade, leader-line annotations, dimension lines with arrowheads, circled numbers, crossed-out alternatives, "v1 / v2 / option B" iterations and a red-pencil markup layer.

It stays clear of the sibling templates: no tape, polaroids, post-its, stickers, kraft paper or collage (Scrapbook #04), and no offset drop shadows of any kind (Neo-brutalism #03). Depth comes only from hatching, line weight and a second pencil pass on frames and buttons.

## Hero approach

The hero is one big ideation drawing in inline SVG (`viewBox 0 0 1200 640`). The designer's initials, **ODA**, are drawn as heavy extruded block letters in one-point perspective:

- **Layer A** blue construction: horizon line, vanishing point "VP 1" at (930,148), 14 fading rays, construction boxes, cap and base lines, ellipse guides for the O and a three-point arc for the D bowl.
- **Layer B** a ghost "option A" with a pointed apex.
- **Layer C** the final letters. Each glyph is a `<symbol>`. Back faces are the same symbol scaled 0.86 toward the vanishing point, filled with a hatch pattern, so the extrusion is true one-point perspective. Connector strokes, then front faces, then a re-trace pass offset by 1.5px.
- **Layer D** about 70 short hand-hatching strokes.
- **Layer E** red-pencil critique: circled O counter ("counter too tight. open 4mm"), crossed option A, "v2 / rounder bowl", a 950 dimension line ("fits one A3 sheet") and a swoosh arrow down to the CTA.
- **Layer F** circled graphite annotations 1-3 (light, depth, sits flat). Decorative construction notes, dropped under 960px.

Under 640px the SVG notes would render at about 7px in the narrow crop, so the hero hides the SVG text and prints the three red critiques as an HTML list (`.red-crit`) in red ink under the drawing.

Below the drawing: the struck draft headline "I design products." (v1), the real h1 (v2) sitting on blue cap and baseline guides, a red underline under "work" as the last stroke drawn, a CTA with a second pencil pass, a numbered margin-note list and a drafting title block.

The full sequence runs once in about 3.4s after fonts load. The h1, lede, CTA, margin notes and title block are visible from the first frame. Section titles and process steps fade in on scroll (opacity/transform only) and render immediately under reduced motion.

## Fonts

One Google Fonts request with `display=swap`. Three families, one role each:

| Font | Weights | Role |
|---|---|---|
| Kalam | 700 | h1, h2, h3, button text |
| Kalam | 400 | handwritten annotations, callouts, quotes |
| Patrick Hand | 400 | body copy and form inputs |
| IBM Plex Mono | 500 | the "printed drafting" voice: sheet numbers, title blocks, dimension labels, meta lines, kickers, placeholder labels. Always uppercase, 0.08em tracking |

## Palette and contrast

All colours are tokens in `:root`. Nothing else in the CSS uses raw hex.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--paper` | #F6F1E6 | page background | - |
| `--paper-deep` | #ECE3D0 | placeholders, title blocks, Work and Contact bands, mobile menu | - |
| `--graphite` | #2B2A28 | text and line work | 12.7:1 on paper, 11.2:1 on deep |
| `--graphite-soft` | #5A574F | secondary text, mono meta | 6.4:1 / 5.7:1 |
| `--marker` | #161514 | h1, heaviest hero strokes | 16.2:1 |
| `--nonphoto` | #8BBCE0 | construction lines only | 1.8:1, decorative, never text or focus |
| `--blue-ink` | #1F4E8C | links, focus ring, blue margin notes | 7.4:1 / 6.5:1 |
| `--red-pencil` | #D8402F | markup strokes only | 3.97:1 on paper, 3.51:1 on deep; passes 3:1 for graphics, never text |
| `--red-ink` | #A8261B | any red text: errors, red notes, checked radio | 6.3:1 / 5.6:1 |
| `--hatch` | rgba(43,42,40,.55) | hatching | decorative |

Rejected: kraft #C4A77D (too close to Scrapbook), purples and decorative gradients.

## ui-ux-pro-max results used

- **Style: Anti-Polish / Raw Aesthetic** (creative portfolios): hand-drawn elements, paper texture, unfinished look, sketch reveal, slight jitter. Used for the paper noise layer, the line-drawing reveals and the wobble filters.
- **Style: Sketch Hand-Drawn**: wobbly per-corner border radii, 2-3px pencil borders, small rotations on annotations, SVG scribble and arrow overlays, the error jiggle (-2deg / 2deg).
- **Typography: Kalam + Patrick Hand** (sketch match), with IBM Plex Mono added as a third family for one clear role, the drafting labels.
- **Design-system pattern: Hero + value prop + features + CTA**, with the CTA placed deep (Contact, sheet 06) and hero motion disabled under reduced motion with the final state rendered.
- **Colour:** no verified palette match was found for a sketch portfolio (the closest database result was an off-topic dark purple app palette and was rejected). The palette here is derived from the two style results above and checked for contrast.
- **Pre-delivery checklist:** inline SVG icons with one stroke weight, no emoji, cursor pointer on clickables, 150-300ms hover transitions, 4.5:1 text contrast, visible focus, reduced motion, 44px touch targets, visible labels, errors tied with `aria-describedby`, skip link, sequential headings, decorative SVG `aria-hidden`.

## Placeholders

Every image slot is a styled frame, not a photo. Search for `data-placeholder="true"` or the comment `<!-- Replace with Envato Elements image -->`.

| # | Where | Label and size | Intended content |
|---|---|---|---|
| 1 | About | Portrait, studio light - 800x1000 | Oda at the bench, hands visible, pencil in hand |
| 2 | Work 01 | Project cover - 1600x1000 | Hob Kettle on a gas ring, side light |
| 3 | Work 02 | Project cover - 1200x1500 | Tilt Lamp on an oak desk at dusk |
| 4 | Work 03 | Stool sketch v1 - 800x800 | Scan of the first stool sketch |
| 5 | Work 03 | Stool sketch v2 - 800x800 | Scan of the second sketch, more cuts |
| 6 | Work 03 | Stool final, stacked - 1600x800 | Five Pell stools stacked, plain wall |
| 7 | Work 04 | Project cover - 1500x1000 | Quay Bench on a wet promenade, people sitting |
| 8 | Work 05 | Project cover - 1200x1200 | Dial Radio on a kitchen counter, hand on the knob |
| - | `<head>` | Social card - 1200x630 | og:image, add `<meta property="og:image" content="...">` |

To replace one: swap the `<div class="ph" ...>` for an `<img>` (or wrap the `<img>` in the same `.ph` frame to keep the pencil border). Keep the `aspect-ratio` from the size, add `width` and `height` attributes, and write real alt text that describes the photo. The hero drawing is authored SVG, not a placeholder.

## Things to tweak

**Swap the persona.** Name, role, studio, email and hours appear in the hero copy, the title blocks, the About sheet, the contact sheet and the footer. The monogram "O.R." is in the header. Project titles, one-liners and meta lines live in each `<article id="p-0n">`.

**Edit tokens.** Change colours, type scale, spacing and radii in `:root` only. If you change a text colour, re-check it against both `--paper` and `--paper-deep` for 4.5:1.

**Retune draw timings.** Every animated stroke has `pathLength="1"` and reads `--delay` and `--d` (duration) from an inline style, for example `style="--delay:900ms;--d:500ms"`. Custom properties inherit, so setting them on a group retimes the whole group. To switch off the hero sequence, remove the `is-ready` trigger in `script.js` and add `is-ready` to `<html>` directly, or remove the `pre-draw` loop.

**Change the giant letters.** Edit the three `<symbol id="glyph-o|glyph-d|glyph-a">` paths inside the hero SVG. Front faces sit in x 60-1010, y 190-560. Back faces follow automatically because they reuse the same symbol with `translate(930 148) scale(.86) translate(-930 -148)`. If you move the vanishing point, change those numbers, the VP cross, the rays and the connector strokes together.

**Show working.** The toggle above the drawing adds `is-clean` to `<html>`, which fades every element with class `.c-blue` on every sheet: hero guides, h1 guides, section rules, placeholder diagonals, dot grids and quote brackets. Its state is saved in `localStorage` (key `oda-working`). Add `.c-blue` to any new construction line to include it.

**Mobile crop.** Under 640px the script swaps the hero `viewBox` to `40 110 1000 480` so the letters render larger. The values live in `data-vb-wide` and `data-vb-narrow` on the SVG.

**Links to replace.** The five project title links point at `projects/hob-kettle.html`, `projects/tilt-lamp.html`, `projects/pell-stool.html`, `projects/quay-bench.html` and `projects/dial-radio.html`. The footer links point at `sketchbook.html` and `newsletter.html`. Each has a `<!-- Replace with ... URL -->` comment. Swap them for your real pages.

**Filters.** The wobble filters are budgeted to about a dozen groups. Do not apply them to text, large placeholders or form fields.

## Notes

- The contact form is non-functional. It validates on submit, shows inline errors and then replaces itself with a status box that says it sent nothing. Wire it to your own endpoint if you need it.
- Without JavaScript every drawing renders in its final state and the mobile index menu still works (it is a `<details>` element).
- With `prefers-reduced-motion: reduce` nothing draws on, nothing boils or jiggles, and hover draws become opacity changes.
- Motion is transform/opacity only, with one deliberate exception: the line draws animate `stroke-dashoffset` on SVG strokes, because a pencil line drawing on is the style. It is limited to SVG strokes and switched off under reduced motion.
- All names, clients, quotes and projects are fictional. Rennick Objects, Varde Housewares, Kade Furniture Co., Harbour Works and Hollis Audio do not exist.
