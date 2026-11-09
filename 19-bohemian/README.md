# 19 Bohemian: "The dye line"

Template 19 in the collection. A one-page portfolio for **Tamsin Oduya**, a fictional natural dyer and block printer working from The Old Dairy in Lewes, East Sussex. All people, clients, projects and quotes are fictional samples. The email uses the `.example` domain so it can never reach a real inbox.

## Style

**Bohemian**: layered handmade textiles on an oat ground. Kilim borders, a block-printed boteh (paisley) repeat, suzani rosettes, ikat strips with feathered edges, a woven stripe runner, macrame knots, fringe and tassels, a pressed fern, flat textile arches, paper grain and a weave texture on every placeholder. The palette is sun-faded earth: madder red, rust, terracotta, saffron, olive, walnut, indigo and faded rose.

The idea comes from the subject: **on this page the visitor dyes the hero cloth.** Four dye pots sit under the headline. Pick one and the new colour climbs the cloth from the hem, the way cloth takes up a dye bath.

How it stays apart from its siblings:
- 04 Scrapbook: no tape, polaroids, index cards or marker type. Pegs hold dyed cloth on a cord, not paper on a board, and two of the five pieces hang straight, so the line reads as washing drying rather than a collage.
- 15 Maximalism: no gilt, frames, wallpaper swatches, ribbons or bell-pull. Tassels only appear on cloth hems and are yarn tassels (a saffron pom, a wrapped rose neck, rust and rose strands), not drawing-room tassels with a turned head. The page keeps generous oat space.
- 05 Surrealism: no horizon, sky or door. The arches are flat textile grounds.
- 01 Claymorphism: no inner shadows or puffy shapes. One soft shadow, only under hanging cloth.
- 17 Conceptual sketch and 18 Ethereal: no pencil lines, mist or light. The control is a set of radio "pots", not a fader.

## Files and how to run it

- `index.html`, `styles.css`, `script.js` (vanilla, `defer`, under 150 lines), `README.md`.
- Open `index.html` in a browser. No build step and no frameworks.
- One hidden inline SVG sprite at the top of `<body>` holds the shared patterns (`#kilim`, `#suzani`, `#fringe`, `#fringe-knots`), the boteh (`#boteh-shape` and `#boteh-mark`) and symbols (`#fern`, `#knot`, `#tassel`, `#rosette`, `#i-alert`). It is hidden by zero size, not `display:none`, which would break pattern fills in some browsers.

## Hero approach

The hero is asymmetric: headline, sub and dye pots on the left (columns 1 to 7), a hanging cloth on the right (columns 8 to 12). The cloth is all CSS and SVG, `aria-hidden`, and built back to front:

1. A rose-pale arch, offset right and down, bleeding past the container edge, with a pressed fern peeking out from behind the cloth.
2. A woven stripe runner, tilted -4deg, crossing behind the lower cloth with a short fringe at its left end.
3. A macrame V-hanger (four walnut cords from a wrapped ring), a walnut dowel with turned end caps and two macrame knots tying the cloth on.
4. The cloth: a dyed and woven base, a boteh print in a second colour (a paisley with a curled tip, an inner echo, a centre dot and a two-dot border; rows face alternate ways, and a 0.5 ghost copy sits 3px off for hand misregistration), a kilim band near the top, the hidden "rise" layer for the next dye, and a thin saffron wet line.
5. A walnut fringe with a wrapped bundle every 48px, and two yarn tassels at the corners.

**The live thing:** "Dye the cloth" is a `<fieldset>` of four native radios (Madder, Weld, Indigo, Walnut), each drawn as a 64px pot. Arrow keys move between them because they are native radios. The checked pot lifts 4px, gets a dashed ring underneath and a bold label, so the state does not rely on colour. A visually hidden `role="status"` line says, for example, "Cloth dyed with indigo. Deep blue." It stays empty on load.

**Signature move, the dye rise:** the new dye and print climb from the hem over 1400ms with the wet line riding the edge. It uses two opposite `translateY` transforms (outer from 100%, inner from -100%), so the pattern never stretches. When it lands, the hero's `data-dye` changes, the rise layer hides again without a transition, and the fringe and tassels sway once.

At 768 the pots stack beside the cloth. At 1440x900 and 1024x768 the pots and the "See the work" link both sit inside the first screen. At 375 the page is one column: text, pots in a row of four, cloth (4:5, capped at 48svh), then actions. The arch stays an arch behind the cloth, and the runner is a 48px band tilted -3deg across its lower third. Below 360 the pots shrink to 52px so the row keeps its 16px gutter.

## Fonts

Google Fonts:
```
https://fonts.googleapis.com/css2?family=Young+Serif&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Alegreya+Sans+SC:wght@500;700&display=swap
```
- Display: **Young Serif** 400 for headings, numerals, the wordmark and quotes. Fallback `Georgia, "Times New Roman", serif`.
- Body: **Alegreya Sans** 400, 500, 700 and italic 400. Fallback `"Gill Sans", "Trebuchet MS", sans-serif`.
- Labels: **Alegreya Sans SC** 500 (700 for the checked pot), letter-spacing 0.06em.
- No other template in the collection uses these fonts.

| Token | Size | Use |
|---|---|---|
| `--fs-label` | 0.9375rem (15px) | small caps labels only |
| `--fs-small` | 1rem | captions, notes, footer |
| `--fs-body` | 1.125rem | body, line-height 1.65, measure 62ch |
| `--fs-lead` | 1.3125rem | hero sub and section intros |
| `--fs-h4` | 1.5rem | work titles, ledger names |
| `--fs-h3` | 2rem | sub-headings |
| `--fs-h2` | `clamp(2.5rem, 1.6rem + 2.6vw, 3.5rem)` | section headings |
| `--fs-h1` | `clamp(2.75rem, 1.2rem + 4.6vw, 5.25rem)` | hero headline |

To swap fonts, change the Google Fonts link and the three `--font-*` tokens in `:root`.

## Palette and contrast

All colours are tokens in `:root` in `styles.css`. There is no pure black or white. Ratios use the WCAG 2.x formula.

| Token | Hex | Use |
|---|---|---|
| `--oat` | #F3EADB | page ground |
| `--cream` | #FAF4E8 | form panel, button text |
| `--linen` | #E7DAC2 | panels, placeholder fill |
| `--ink` | #2D2118 | text |
| `--ink-soft` | #5A4636 | secondary text |
| `--rust` | #8C3313 | links, button fill, errors |
| `--indigo` | #283A63 | quotes ground, focus ring |
| `--olive` | #535E27 | small caps labels |
| `--walnut` | #5B4330 | rules, cords, dowel, glyphs |
| `--terracotta` | #B65A3A | decoration, display numerals 32px and up |
| `--saffron` | #D7A13A | decoration and fills |
| `--saffron-on-indigo` | #E6B95E | eyebrow and focus ring on the indigo quotes ground |
| `--rose` | #C9938A | decoration, ghost print on the h1 |
| `--rose-pale` | #E8C9C2 | hero arch |

| Pair | Ratio | Use |
|---|---|---|
| ink on oat / cream / linen | 13.11 / 14.28 / 11.33 | body text |
| ink-soft on oat / linen | 7.45 / 6.43 | secondary text |
| rust on oat / cream / linen | 6.78 / 7.38 / 5.85 | links, stamp, errors |
| cream on rust | 7.38 | button label |
| olive on oat / linen | 5.87 / 5.07 | small caps labels |
| walnut on oat | 7.69 | captions |
| oat on indigo / on the suzani field | 9.39 / 7.60 | quotes section text |
| saffron-on-indigo on indigo / on the suzani field | 6.11 / 4.95 | eyebrow and focus ring on indigo |
| saffron on indigo / on the suzani field | 4.82 / 3.90 | not used for text |
| indigo on oat | 9.39 | focus ring on light grounds |
| ink on rose-pale | 10.11 | text over the arch |
| terracotta on oat | 3.90 | display numerals at 2rem only, never body text |
| saffron on oat / rose on oat | 1.95 / 2.19 | decoration only |

Every dye pot has a 1.5px ink outline, so even the pale weld liquid has a boundary above 3:1.

**Dyes** live on `.hero[data-dye]`:

| Dye | `--dye` | `--print` | Status text |
|---|---|---|---|
| madder (default) | #A8432A | #F3EADB | Cloth dyed with madder. Brick red. |
| weld | #D3A43C | #5B4330 | Cloth dyed with weld. Ochre yellow. |
| indigo | #2F4373 | #E7DAC2 | Cloth dyed with indigo. Deep blue. |
| walnut | #6A4C35 | #E9C9A0 | Cloth dyed with walnut. Warm brown. |

**To add or change a dye:** add one CSS block such as `.hero[data-dye="woad"] { --dye: #...; --print: #...; }`, add one entry to the `DYES` map at the top of `script.js` with the same two hex values and a status line, and copy one `.pot-choice` block in `index.html` with the new value and liquid colour.

## ui-ux-pro-max results used

- `--design-system "bohemian portfolio"`: used the Hero + Features + CTA pattern with the call to action repeated deep in the page (under the services ledger, in Contact and in the footer), button label contrast of at least 4.5:1, focus rings visible apart from component edges, and a static final hero under reduced motion. Its style match (Minimalism and Swiss, blue #2563EB) and fonts (Archivo, Space Grotesk) were off topic and not used.
- `--domain style "bohemian"`: **0 results**. The retry "organic earthy handmade" matched Nature Distilled and Organic Biophilic. Used from them: the terracotta, sand, clay, cream and olive base, grain at about 0.1 opacity, varied border radius, a natural ease-out curve and one soft shadow. The palette was pushed toward bohemian with saffron, indigo and faded rose, and terracotta was kept off body text because #C67B5C fails 4.5:1 on cream.
- `--domain typography`: no result fitted bohemian, and every suggestion is already used in the collection, so there was **no verified font match**. Young Serif and Alegreya Sans come from the brief.
- `--domain color "bohemian"`: **0 results**. The retry "earthy warm terracotta" matched Recipe and Cooking (#9A3412 on #FFFBEB). Used as the direction for the accessible rust accent (#8C3313) on a warm cream ground, with the ink tinted brown instead of slate.
- Quick-reference and pro-rules checklist: skip link, sequential headings with one h1, banner, main and contentinfo landmarks, labels with `for`, errors under fields tied with `aria-describedby`, focus on the first invalid field, a `role="status"` success line, 44px targets with 8px spacing, one inline SVG icon family at a 1.5px stroke, decorative SVGs `aria-hidden`, `aspect-ratio` on every media box, `font-display: swap`, no zoom lock, no horizontal scroll at 375, body text at 18px.

## Placeholders

Seven placeholders with a woven linen fill, an inset stitched border and an oat label tag. Work pieces also have a pinked bottom edge (a static CSS mask), a full-width kilim selvedge along the top, a 22% tint of the dye named in `--dye` on each `<article>`, and a faint boteh print at 0.12 opacity. The label tag stays oat with ink text on every tint.

| Where | Label | Ratio |
|---|---|---|
| About | Tamsin in the dye garden - 1200x1500 | 4:5 |
| About, dye notebook | Carved pearwood block, top view - 800x800 | 1:1 |
| Work 01 | Madder Room curtains - 1600x1000 | 16:10 |
| Work 02 | Indigo linen drying - 1200x1500 | 4:5 |
| Work 03 | Weld swatch book spread - 1600x1000 | 16:10 |
| Work 04 | Orchard Wife costume detail - 1200x1200 | 1:1 |
| Work 05 | Walnut table linen - 1200x1500 | 4:5 |

To replace one:
1. Search for `data-placeholder="true"`. Each one follows a `<!-- Replace with Envato Elements image -->` comment.
2. Put an `<img>` inside the `.ph` box with `alt`, `width`, `height` and `style="width:100%;height:100%;object-fit:cover"`, or replace the box with the image and keep the same `aspect-ratio`.
3. Remove the `.ph__label` span, and remove `data-placeholder`, `role` and `aria-label` from the box.

The hero cloth is CSS and SVG, not a placeholder.

## Motion

- Only `transform` and `opacity` move. Easing is `--ease: cubic-bezier(.2,.7,.2,1)`.
- **Load, once, under 1.6s:** the cloth unrolls from the dowel (two opposite transforms over 900ms), the headline lines fade up with an 80ms stagger, then the pots with a 60ms stagger, then the actions.
- **Dye rise:** see the hero section above. A second pick during a rise finishes the current one at once and starts the new one.
- **Scroll reveals:** an IntersectionObserver at 0.15, once per element. Blocks fade up 12px with a 60ms stagger, work pieces settle from their tilt plus 3deg, and the services kilim band slides in 24px.
- **Hover:** work pieces lift 4px and their pegged corner sways once. Nav links get a woven stripe underline that grows with `scaleX`.
- Nothing loops, so no pause control is needed.
- Load motion sits behind `html.js` (set by a one-line script in `<head>`) and `prefers-reduced-motion: no-preference`. Scroll reveals sit behind `html.js-ready`, which only `script.js` sets, so if `script.js` fails to load nothing is left hidden. The dye pots stay hidden until `script.js` runs, because they do nothing without it. Without JS, or with reduced motion, everything renders in its final state. With reduced motion the dye swap is instant and the status line still updates.

## Form

**The form sends nothing.** It says so in a note under the button. Name, email and the message are required and carry a rust asterisk, explained by a line at the top of the form; project type and timeline are optional selects. On submit it checks the required fields and the email pattern, shows an error with a small alert glyph under each bad field, sets `aria-invalid`, and moves focus to the first one. Errors clear as you type. A valid submit resets the form and writes "Thank you. Tamsin reads post on Fridays and will reply within a week." into a `role="status"` line. Connect it to a form service before using it for real.

## Browser notes

- `mask` is written with its `-webkit-` prefix. The work placeholder tints use `color-mix()`. The ikat strips use feathered gradient stops, a weft-line mask and a 0.4px blur.
- Uses `100svh`, `overflow: clip` and `aspect-ratio`, which current evergreen browsers support.
- Tested widths: 375, 768, 1024 and 1440.

## Things to tweak

- **Default dye:** change `data-dye` on `.hero` and move `checked` to the matching radio.
- **Print:** the boteh path is `#boteh-shape` in the sprite. The cloth uses its own copies of the pattern (`#boteh-base`, `#boteh-rise`, 60x68 tiles), and the work placeholders use the same path in a data URI in `styles.css`, because a pattern takes its colour from where it is defined, not where it is used.
- **Rise speed:** the 1400ms on `.cloth__rise`, `.cloth__rise-inner` and `.cloth__wet.is-wet`.
- **Runner:** `bottom`, `height` and the rotation on `.runner`. The stripe colours are in `--stripe`.
- **Grain:** `opacity` on `body::before` (0.10 now).
- **Accent:** change `--rust` and `--rust-deep` together and recheck the button label (keep at least 4.5:1).
- **Work layout:** grid columns and `--drop` on `.piece--1` to `.piece--5`, and `--tilt` inline on each piece.

## Credits

Tamsin Oduya, The Old Dairy, Halfpenny Barn, Hearne & Slow, Kestle Touring Company, Quince & Crumb and every quoted person are fictional, made for this portfolio template.

## Run log line for STYLES.md

```
2026-11-03: 19-bohemian built (The dye line: "Colour from the garden, printed by hand." beside a hanging boteh-printed cloth that visitors re-dye from four radio dye pots, the colour rising from the hem, with kilim, fringe, tassels and a drying-line work section)
```
Then tick row 19.
