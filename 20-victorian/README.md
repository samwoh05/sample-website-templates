# 20 Victorian: "Wrenfield & Daughter: the great show bill"

Template 20 in the collection. A one-page portfolio for **Ada Wrenfield**, a fictional letterer, poster artist and wood-type printer working from the Calder Works in Scarrow Bridge, a made-up mill town in the Pennines. All people, clients, projects and quotes are fictional samples. The email uses the `.example` domain so it can never reach a real inbox.

## Style

**Victorian**: a run of letterpress printed matter from one jobbing print shop. The first screen is a two-colour show bill (black and vermilion on cream stock) pasted on a timber hoarding. Every later section is a smaller piece from the same press: a bill, a programme index, a tariff card, a type case, a column of notices, an order docket and an imprint. The type is loud wood letter (fat face, extended slab, Tuscan) with Caslon text, Old Standard small caps, dot leaders, thick-thin rules, a manicule, fleurons, an asterism and a hand-press printer's device. Everything is upright, square and on the grid. The only rotated element on the page is the hero snipe.

How it stays apart from its siblings:
- 04 Scrapbook: no tape, polaroids, index cards, handwriting or tilt. The snipe is the single rotated element.
- 11 Editorial design: no masthead, cover photo, barcode or cover lines.
- 15 Maximalism: no wallpaper, gilt frames, ribbons, cartouche or tassel. One cream stock and two inks.
- 16 Luxury typography: no proof plate, registration marks, Cormorant, monogram or seal. This page is loud wood letter, and its misregister is a bold colour offset, not a fine engraving.

## Files and how to run it

- `index.html`, `styles.css`, `script.js` (vanilla, `defer`, about 150 lines), `README.md`.
- Open `index.html` in a browser. No build step and no frameworks.
- One hidden inline SVG sprite at the top of `<body>` holds every ornament as a `<symbol>` on a 24 box: `#i-manicule`, `#i-fleuron`, `#i-corner`, `#i-asterism`, `#i-star`, `#i-arrow-down`, `#i-arrow-right` and `#i-press`. Paths carry no stroke width of their own; the using `<svg class="ico">` sets 1.5, so the family stays at one stroke. Every decorative use is `aria-hidden="true" focusable="false"`.

## Hero approach

The hero is a `<header>` holding the bill. The bill is a `.sheet` inset 24px from the viewport on a paper-deep hoarding with plank seams every 160px. The sheet has a cream ground with faint foxing in the top-left and bottom-right corners, a ragged pasted top and bottom edge (a CSS mask with a 2px wave), a thick-thin printed border and four corner fleurons (one symbol flipped three ways, gold with an ink outline). Its content is a 12-column grid whose text edges sit on the same lines as the page `.wrap`.

From top to bottom:
1. **Header strip** between two hairlines: "No. 20" in an SVG oval, the shop line in the centre (hidden under 1280), and the five-link nav on the right. The nav wraps instead of collapsing, so it needs no JS. Under 1024 it moves to its own row.
2. **Arc kicker**: "The celebrated" set on an SVG `<textPath>` with about 8 degrees of rise. Under 1024 it becomes a flat italic line. Both are `aria-hidden`.
3. **The name.** ADA in Abril Fatface, printed twice: an ink working offset 5px right and 4px down, and the vermilion working over it. The ink copy is `aria-hidden`. WRENFIELD in Holtwood One SC runs the full measure, pulled up so its cap tops hit ADA's baseline, with a cream knockout stroke (`paint-order: stroke fill`, with a text-shadow fallback). The visible text reads "Ada Wrenfield" and the full accessible h1 is "Ada Wrenfield, letterer and wood-type printer". The capitals come from `text-transform`, so screen readers do not spell them out.
4. **Manicule rule**, the role line ("Letterer" in Rye, then the rest in Old Standard caps), the lede and the two actions: the tear-off ticket "Book a commission" and "See the six bills".
5. **Oval portrait** placeholder on the right with a gold second ring. WRENFIELD crosses its lower-left third. A vermilion **snipe**, "Now booking for 2027", is pasted across its top at -8deg and runs off the right edge, clipped by the hero's `overflow: clip`.
6. **Particulars**: a `<dl>` with dot leaders (show bills 14, playbills 9, labels 22, fascias 9, wood typefaces 41, booking for the 2027 season: Open). The last row is the real-text twin of the snipe.
7. **Imprint foot** between hairlines: "Printed at the Calder Works, Scarrow Bridge" and "Turn over for the work".

At 1440x900 both actions and the particulars sit inside the first screen. At 1024 the particulars move under the actions in two columns. Under 1024 the hero stacks: strip, kicker, ADA, WRENFIELD, the oval (280px, with WRENFIELD overlapping its top edge), role, lede, actions, particulars, proof button. At 375 the buttons go full width, and the dl leaders hide so each value drops to its own line.

### Measuring WRENFIELD

The word must fill the measure at every width without overflowing. Its size is:

```
font-size: min(9rem, calc(100cqi / (9 * var(--wren-adv))));
```

`100cqi` is the h1's own inline size (the h1 is a size container), so the measure is exact at any width. A `100vw` version sits above it as a fallback. `--wren-adv` is the average advance of the nine capitals. I measured it from the Holtwood One SC font file: the advances of W, R, E, N, F, I, E, L, D add up to 7.605em, so 0.845em per capital. The token is set to **0.87**, which leaves about 3% for kerning and rounding. If you change the face or the word, re-measure: set the word at 100px in a browser, divide `getBoundingClientRect().width` by 900, round up a little, and put the result in `--wren-adv`. At 1440 the cap of 9rem applies.

Checked with `document.documentElement.scrollWidth === clientWidth` at 375, 768, 1024 and 1440: no sideways scroll at any of them.

## Fonts

Google Fonts:
```
https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Holtwood+One+SC&family=Rye&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap
```
- **Abril Fatface** (fat face): ADA, h2, the drop cap, prices, years, big numerals, the case letters and quote marks.
- **Holtwood One SC** (extended slab): WRENFIELD, h3 and card titles, the button labels, the booking strip and the footer bill line.
- **Rye** (Tuscan): three uses only. "Letterer" in the hero, the snipe and the Bill No. 5 title.
- **Libre Caslon Text**: body, lede, quotes and inputs. Body text asks for oldstyle figures; tables and prices use lining tabular figures.
- **Old Standard TT**: labels, kickers, nav (small caps), leaders, the imprint, form labels, hints and errors.
- Fallbacks: `Georgia, serif` for the display faces, `Georgia, "Times New Roman", serif` for the text faces.
- No other template in the collection uses these fonts.

| Role | Size |
|---|---|
| ADA | `clamp(6rem, 13vw, 12rem)`, line-height 0.8 |
| WRENFIELD | measured, see above, capped at 9rem, line-height 0.86 |
| "Letterer" | Rye `clamp(2rem, 4.2vw, 3.75rem)` |
| h2 | `clamp(2.5rem, 5vw, 4.5rem)`, line-height 1 |
| h3 | 1.375rem (1.25rem under 768) |
| Body | 1.1875rem (19px), 1.0625rem (17px) under 768, line-height 1.65, measure 64ch |
| Lede | italic 1.375rem, 1.1875rem under 768, measure 38ch |
| Labels and kickers | Old Standard 700, 0.8125rem, caps, 0.18em tracking |
| Small print and hints | 0.875rem to 0.9375rem, never below 14px |

To swap fonts, change the Google Fonts link and the five `--f-*` tokens in `:root`, then re-measure `--wren-adv`.

## Palette and contrast

All colours are tokens in `:root` in `styles.css`; components use the tokens, not raw hex. `color-scheme` is light only, because a printed bill is paper.

| Token | Hex | Use |
|---|---|---|
| `--paper` | #F3E6C8 | page ground |
| `--paper-light` | #FAF3E1 | the bill, cards, docket, notices band |
| `--paper-deep` | #E6D2A6 | hoarding, work and order bands, placeholders |
| `--ink` | #24140F | text, black working, borders |
| `--ink-soft` | #4A3328 | secondary text |
| `--oxblood` | #7A1C17 | h2, button hover fill, errors |
| `--vermilion` | #A82A1E | red working, primary fill, snipe, booking strip |
| `--gold-text` | #8A5A10 | small card labels on paper-light only |
| `--gold-ornament` | #B8862B | fleurons and rules; text only on night |
| `--teal` | #2E5B58 | links on light grounds, focus ring, "Letterer" |
| `--night` | #1E1512 | footer |

| Pair | Ratio | Use |
|---|---|---|
| ink on paper / paper-light / paper-deep | 14.35 / 16.05 / 11.96 | body text |
| ink-soft on paper / paper-light / paper-deep | 9.45 / 10.57 / 7.87 | secondary text |
| oxblood on paper / paper-light / paper-deep | 8.46 / 9.46 / 7.05 | h2, errors |
| vermilion on paper / paper-light | 5.63 / 6.29 | prices, numerals, drop cap |
| vermilion on paper-deep | 4.69 | passes, but never used for text (thin margin under the grain) |
| teal on paper / paper-light / paper-deep | 6.16 / 6.89 / 5.13 | links, focus ring |
| gold-text on paper / paper-light | 4.78 / 5.34 | small labels |
| gold-text on paper-deep | 3.98 | **fails**, banned |
| paper-light on vermilion / oxblood | 6.29 / 9.46 | button labels, snipe, booking strip |
| paper on night / paper-light on night | 14.48 / 16.20 | footer text |
| gold-ornament on night | 5.54 | footer links and focus ring |
| gold-ornament on paper / paper-light | 2.62 / 2.93 | ornament only, never text |
| ink on vermilion | 2.55 | not used; the booking strip focus ring is paper-light |

Every input, card and button has a 2px ink border, so boundaries never rely on colour alone. No violet or lavender anywhere.

**Grain:** a fixed `body::after` with an SVG `feTurbulence` noise (baseFrequency 0.85, two octaves), opacity 0.10, `mix-blend-mode: multiply`. The footer sits above it (`position: relative`, `z-index: 60`, `isolation: isolate`), so the night stock stays clean. **Foxing:** two radial gradients of paper-deep at 50% on the hero sheet only.

## ui-ux-pro-max results used

- `--design-system "victorian portfolio"`: used the Hero + Features + CTA pattern with the call to action in the hero and repeated deep in the page (the booking strip and the order docket), button labels at 4.5:1 or better against their fill, focus rings visible apart from component edges, and a static final hero under reduced motion. Its style (Minimalism and Swiss), colours (zinc and blue #2563EB) and fonts (Archivo, Space Grotesk) were **off topic** and not used.
- `--domain style "victorian"`: **0 results**. The retry "ornate vintage heritage" matched Vintage Analog / Retro Film and Retro-Futurism. Used from Vintage Analog: the cream ground, a paper grain at low opacity and sepia warmth. Its VHS, light leak and polaroid parts are the wrong era and were left out. Retro-Futurism was **off topic**.
- `--domain typography "victorian portfolio"`: result 2, "Academia" (Cormorant Garamond, Crimson Pro, Cinzel), gave the idea of wide-tracked caps labels and a drop cap. Cormorant is already used in the collection, so the faces were swapped: Old Standard TT carries the tracked caps and Abril Fatface the drop cap. The retry "classic elegant serif vintage" returned Retro Vintage (Abril Fatface + Merriweather) and Editorial Classic (Cormorant Garamond + Libre Baskerville); Abril Fatface comes from there.
- `--domain color "victorian"`: **0 results**. The retry "antique heritage burgundy" matched Brewery/Winery (#7C2D12, #B91C1C, #A16207 on #FEF2F2, text #450A0A). Used as the direction: an oxblood and vermilion pair with an aged gold on a warm paper ground, and warm-tinted ink instead of slate. Every pair was recomputed (table above).
- Quick-reference and pro-rules checklist: skip link, one h1 and sequential headings, banner, nav, main and contentinfo landmarks, labels with `for`, hints and errors tied with `aria-describedby`, errors in words with a "Required:" prefix and an icon so colour is not the only cue, focus on the first invalid field, a `role="status"` success line, 44px targets with 8px spacing, `cursor: pointer` on clickables, hover transitions of 180 to 200ms, one SVG icon family at a 1.5 stroke, `aspect-ratio` on every media box, `font-display: swap`, no zoom lock, no sideways scroll at 375, body text at 19px (17px on phones), line-height 1.65, measure 64ch, and only transform and opacity in keyframes.

## Placeholders

Eight placeholders, each a `div` with `data-placeholder="true"`, `role="img"` and an `aria-label` that matches its visible label, preceded by `<!-- Replace with Envato Elements image -->`. Each has a fixed `aspect-ratio` (no layout shift), an engraved crosshatch over paper-deep, a 2px ink border and a cream label tag.

| Where | Label | Ratio |
|---|---|---|
| Hero oval | Portrait of Ada at the press - 800x1000 | 4:5 |
| About | Workshop with type cases - 1200x900 | 4:3 |
| Bill No. 1 | Moorend Show bill on a market wall - 1600x1000 | 16:10 |
| Bill No. 2 | Lantern Hall playbill series - 1200x1500 | 4:5 |
| Bill No. 3 | Grimshaw's Tonic label sheet - 1200x900 | 4:3 |
| Bill No. 4 | Oddfellows Row gilt fascia - 1200x900 | 4:3 |
| Bill No. 5 | Specimen book spread - 1200x900 | 4:3 |
| Bill No. 6 | Whitecroft Band concert bill - 1600x900 | 16:9 |

To replace one:
1. Search for `data-placeholder="true"`. Each one follows a `<!-- Replace with Envato Elements image -->` comment.
2. Put an `<img>` inside the `.ph` box with `alt`, `width`, `height` and `style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"`, or swap the box for the image and keep the same `aspect-ratio` class (`r-16x10`, `r-4x5` and so on). The hero oval keeps its round shape through `border-radius: 50%`; add `overflow: hidden` to `.ph--oval` once a photo is in.
3. Remove the `.ph__label` span, and remove `data-placeholder`, `role` and `aria-label` from the box.
4. To make photos sit with the inks, add this class to each `<img>`:

```css
.print-image { filter: sepia(.2) contrast(.95); }
```

All ornament (fleurons, manicule, corners, rules, crosshatch, planks, perforations, grain, foxing and the press device) is CSS or inline SVG drawn for this page. Nothing is hot-linked and there are no stock images.

## Motion

- Only `transform` and `opacity` animate in keyframes. Hover states also transition `box-shadow`, `background-color` and `background-size` for 180 to 200ms. Easing is `--ease: cubic-bezier(.2,.7,.2,1)`.
- **Press-in, once, about 0.85s:** `script.js` adds `.js-press` to `<html>` when reduced motion is not requested. The vermilion ADA starts 12px right and 9px up at 0.85 opacity and settles onto its registered place over 700ms. The ink working never moves, so the final misregister is the fixed 5px/4px offset. The hero lines land from 1.03 scale with a 70ms stagger. When it ends, the class comes off again.
- **"Pull another proof":** the button under the particulars sets a random offset of 4 to 14px in each direction (random sign) and plays the registration again over 600ms. Clicks during a run are ignored. The button only appears when JS runs and motion is allowed.
- **h2 reveal:** an IntersectionObserver fades each section h2 up 12px over 400ms, once. The hidden start state only exists under `.js-reveal`, which only `script.js` adds.
- **Landing mark:** following a row in the programme of bills gives that bill a 3px teal outline for 2 seconds, so you can see where you landed.
- **Hover:** buttons step up 2px with a deeper shadow and press down on click; links draw their underline; index rows draw an underline under the title. Cards are not links, so they do not lift.
- No loops, no parallax, no carousels. Nothing moves for longer than 5 seconds, so no pause control is needed.
- With `prefers-reduced-motion: reduce`, or without JS, nothing is hidden or moved: everything renders in its final state with the 5px/4px misregister, and the proof button stays hidden.

## Form

**The form sends nothing.** A boxed note above the button says so ("This form is a demonstration. It sends nothing."). It is laid out as an order docket with a perforated top edge. Your name, email, kind of work and particulars are required; number of copies is optional. On submit `script.js` checks the required fields and that the email has an @, shows an error under each bad field (each starts with "Required:" and has an asterism icon), sets `aria-invalid` with a 3px oxblood left border, and moves focus to the first one. Errors clear as you fix them. A valid submit hides the button and writes "Thank you. This is a demo form, so nothing was sent. Write to ada@wrenfield.example instead." into a `role="status"` region that is always in the page. Connect it to a form service before using it for real.

## Browser notes

- `paint-order` with `-webkit-text-stroke` makes the WRENFIELD knockout; browsers without `paint-order` get eight text shadows instead.
- The drop cap uses `initial-letter: 5` (with the `-webkit-` form for Safari). Other browsers get a floated 5.6em capital in the same ink square.
- Uses container query units (`cqi`), `100svh`, `overflow: clip`, `aspect-ratio`, CSS masks and `color-mix()`, which current evergreen browsers support. Without the mask the sheet edge is straight.
- Tested widths: 375, 768, 1024 and 1440.

## Things to tweak

- **Misregister:** the 5px/4px offset is the `transform` on `.w-ink`. The press-in start offset is in `@keyframes register`.
- **Grain:** `opacity` on `body::after` (0.10 now).
- **Snipe:** `top`, `right`, `width` and the -8deg rotation on `.snipe`. Change the text in the snipe and in the last particulars row together.
- **Accent:** change `--vermilion` and `--oxblood` together, then recheck paper-light on both (keep at least 4.5:1) and vermilion on paper.
- **Hoarding:** the plank pitch is the 160px in the two `repeating-linear-gradient`s on `.hero` and `.section--hoarding`.
- **Work layout:** the column spans on `.bill--1` to `.bill--6`.
- **Type case:** `grid-template-columns` on `.case` (2fr 1.5fr 1.5fr 2fr at full width, two columns under 1280).

## Changes from the build spec

- The type case uses 2fr 1.5fr 1.5fr 2fr instead of 2fr 1fr 1fr 2fr, and switches to two columns under 1280 instead of under 768, so labels such as "Letterpress printing" fit their compartments.
- The booking strip heading caps at 2.75rem instead of 3.25rem, so the heading and button share one row at 1440.
- The drop cap has no separate leaf flourish, because it is drawn with `::first-letter`, which cannot hold a child element.
- `--wren-adv` is 0.87, measured from the font file, below the 1.05 to 1.2 the spec expected.

## Credits

Ada Wrenfield, Wrenfield & Daughter, the Calder Works, Scarrow Bridge, Moorend Agricultural Show, The Lantern Hall, Grimshaw's Tonic Waters, Oddfellows Row, Whitecroft Brass Band and every quoted person are fictional, made for this portfolio template.

## Run log line for STYLES.md

```
2026-11-05: 20-victorian built (Wrenfield & Daughter: a two-colour wood-letter show bill pasted on a hoarding, ADA in a red working misregistered over black above a full-measure WRENFIELD, a snipe, a programme of bills, a tariff card, a type case and an order docket)
```
Then tick row 20.
