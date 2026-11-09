# Halvorsen, Issue 07: editorial design portfolio template

## What this is

A one-page editorial design portfolio for a fictional documentary photographer and picture editor, Noor Halvorsen, based in Rotterdam. The whole page is one issue of a fictional photo magazine called HALVORSEN: "Issue 07, The Night Shift Issue". Screen one is a newsstand cover. Everything after it is the inside pages, each with a running head, a page folio and a numbered place in the contents.

- **Style:** Editorial design (print magazine translated to the web): visible 12-column grid (hairline columns run the full height of every chapter), masthead and folio lines, huge display serif against small mono utility type, decks, bylines, drop caps, pull quotes, captions with credits, hairline rules and a numbered contents page.
- **Hero approach:** a magazine cover. The masthead "HALVORSEN" fills the measure edge to edge at every width, the way a printed nameplate fills the trim, and its lower part overlaps the cover photograph on the right. Cover lines with their page numbers run down the left rail. The main cover line "Photographs made after dark" is set on two hand-broken lines, each on its own paper band over the photo's left edge. A barcode and price block sits on the photo's bottom-right corner. From 1024px up the whole cover, including the "Read the contents" link and the barcode, fits one screen at 1024×768, 1280×800 and 1440×900. On load, the nine masthead letters rise into place (the only hero interaction).
- **Design dials:** variance 8, motion 4, density 4.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All markup and copy. The barcodes and the end mark are inline SVG. |
| `styles.css` | Tokens at the top (colour, spacing, grid, type), then base, grid, placeholders, folio bar, then the pages in order, then motion and print. |
| `script.js` | Deferred vanilla JS, about 125 lines: masthead rise, chapter reveals and hairlines, folio counter and bar, reading progress rule, coupon validation. No libraries. |
| `README.md` | This file. |

## How to run

Open `index.html` in a browser. There is no build step and nothing to install. With JavaScript off, every element is visible in its final state, the sticky folio bar is left out, and the coupon falls back to a plain form. If `script.js` fails to load, the inline head script removes the `js` class after 3 seconds, so headings hidden for the reveal come back.

## Page plan

| Page | Section | What is on it |
| --- | --- | --- |
| p. 01 | Cover (`header`) | Folio line, masthead (`h1`), cover photo, three cover lines with page numbers, main cover line, "Read the contents" link, barcode block |
| p. 02 | Contents | Contents rows led by large red page numbers (03 to 08), a classified line to the coupon, an issue note |
| p. 03 | Profile | Byline, two text columns with a column rule, drop cap, pull quote, portrait with caption, fact box |
| p. 04 | Features | Slim section bar. Night Shift, Waalhaven (full-bleed figure, display headline on a paper band, two-column excerpt). The Bakers of Spoorstraat (tall figure, narrow text column) |
| p. 05 | Features | Slim section bar. Low Water (three-image strip). Ferry Regulars (contact sheet with frame numbers) |
| p. 06 | Short items | Slim section bar. Picture desk, Delta Weekly and Sodium Light, two-up with a vertical rule |
| p. 07 | Listings | Four classified notices in ruled newspaper columns (4, 2 or 1 by width), red run-in labels, first line in small caps |
| p. 08 | Letters | One promoted letter as a full-width pull quote, two more letters in two columns. Each is a `figure` with the quote in `blockquote` and the signature in `figcaption` |
| p. 09 | Reply coupon and colophon | Dashed "Cut along the line" coupon form, colophon, closing folio with the red end mark |

## Change the name and copy

All copy is in `index.html`. Search for "Halvorsen" to change the name. It appears in the title, the meta description, the masthead (nine letter spans plus the screen-reader text inside the `h1`), the running heads, the folio bar, the byline, captions, letters and the colophon. If you change the masthead length, keep one `<span class="l" style="--i:N">` per letter and adjust the divisor in `--mh` (see "Things to tweak"). The demo email is `desk@halvorsen.example`. Change the `aria-label` of each placeholder when you change a project.

## Replace the placeholders

Search for `data-placeholder="true"`. Each slot has an HTML comment `<!-- Replace with Envato Elements image -->` right before it. There are 15. Each label ends with the pixel size in a `<span class="dim">`, which never breaks across lines.

| # | Where | Label | Size | Aspect ratio |
| --- | --- | --- | --- | --- |
| 1 | Cover | Night crane crew under floodlights, Kade 7 | 1600x2000 | 4 / 5 (cropped to 4 / 3 from 1024px up) |
| 2 | Profile, p. 03 | Photographer with camera on a quay at dusk | 900x1200 | 3 / 4 |
| 3 | Feature 4.1, Night Shift | Container terminal at night, cranes lit | 2400x1350 | 16 / 9 |
| 4 | Feature 4.2, Bakers | Baker at a deck oven before dawn | 1000x1500 | 2 / 3 |
| 5 | Feature 5.1a, Low Water | Exposed groyne, Lobith | 1200x900 | 4 / 3 |
| 6 | Feature 5.1b, Low Water | Pilot on the bridge | 1200x900 | 4 / 3 |
| 7 | Feature 5.1c, Low Water | Barge at half load | 1200x900 | 4 / 3 |
| 8 to 13 | Feature 5.2, Ferry Regulars | Commuter portraits, frames 07, 12, 19, 23, 41, 58 | 600x750 each | 4 / 5 |
| 14 | Short item 6.1 | Newspaper spread, Delta Weekly | 1400x1000 | 7 / 5 |
| 15 | Short item 6.2 | Book cover, Sodium Light | 1000x1300 | 10 / 13 |

To swap one in:

1. Replace the `<div class="ph" ...>` with an `<img>` that has a real `alt`, `width`, `height` and `loading="lazy"` (not on the cover image).
2. Keep the same `aspect-ratio` and add `width: 100%; height: auto; object-fit: cover;` so the layout does not shift.
3. The tint, halftone, crop marks and label chip belong to `.ph` only. They go away with the `div`. To keep crop marks around a real photo, wrap it in an element with the `marks` class (the strip and the contact sheet already do this).
4. The cover is supplied at 4:5 but shown at 4:3 on wide screens. Use `object-position` to choose the crop.
5. In the contact sheet, keep the `<span class="frame">` chip inside each `.cell`.

## Fonts and palette

**Fonts** (Google Fonts, `display=swap`, with preconnect):

| Role | Family | Used for |
| --- | --- | --- |
| Display | Playfair Display 700, 900, 700 italic, 900 italic | Masthead, cover lines, H2, feature headlines (the largest type inside the issue), contents numerals, drop caps, pull quotes |
| Body | Source Serif 4 (opsz axis) 400, 400 italic, 600 | Body, decks, captions, letters, small-cap signatures, notice openings, colophon text |
| Utility | JetBrains Mono 400, 500 | Folios, kickers, captions' figure numbers and credits, meta lines, form labels, placeholder labels, colophon kicker and folio |

Scale contrast does the work: the masthead runs at about 206px at 1440 against 12px mono folios. Inside the issue, feature headlines (up to 7rem for Night Shift, 4.5rem for the others) outrank the slim section bars (2.5rem) of the feature chapters. Contents, Profile, Listings, Letters and Send a brief keep the full 5rem opener. Body copy is 18px (17px under 640px) at line-height 1.6 with old-style figures. Folios, meta lines and contents numerals use tabular lining figures.

**Palette.** Ink, paper and one printer's red. No gradients except the halftone dots, no shadows, no radius. Light theme only (`color-scheme: light`), because it is printed paper.

| Token | Hex | Use | Contrast (WCAG 2.x, computed) |
| --- | --- | --- | --- |
| `--paper` | `#F3EFE6` | Page background, paper bands, label chips | Base |
| `--ink` | `#151413` | Text, rules, button fill | 16.03:1 on paper, 13.87:1 on tint |
| `--ink-soft` | `#4A4640` | Decks, captions, meta lines, hints | 8.17:1 on paper, 7.06:1 on tint |
| `--red` | `#B3121F` | Kickers, notice labels, contents page numbers, drop caps, credits, required asterisk, errors, focus ring, progress rule, end mark | 6.05:1 on paper, 5.24:1 on tint |
| `--tint` | `#E6DFD0` | Placeholder stock, fact box ground | Background only |
| `--grid` | `rgba(21,20,19,.08)` | Column hairlines | Decorative only |
| Paper on ink | | Button label, "Classified" chip | 16.03:1 |

Red text never sits on ink. Selection is paper text on red (6.05:1).

## Motion

- **Masthead rise (hero):** each letter moves from `translateY(.12em)` (scales with the masthead) and opacity 0, opacity 400ms and transform 450ms, 45ms stagger, `cubic-bezier(.2,.7,.2,1)`. The whole run takes 810ms.
- **Hairlines:** each chapter's column lines run its full height, fade out over the last 15% with a mask, and draw down once (`scaleY`, 450ms, 20ms stagger) when the chapter opener is 20% in view. A scroll check also reveals any opener the reader jumped past (End key, scrollbar drag), so no heading stays hidden.
- **Reveals:** kicker, H2, deck and the first figure of each chapter rise 16px and fade in, 300ms, 60ms stagger, once.
- **Folio bar:** hidden while the cover is in view. It shows "p. 04 of 09" and updates through an IntersectionObserver. A 2px red rule along its bottom tracks reading progress with `scaleX`, updated with `requestAnimationFrame`.
- **Hover:** title and contents underline rules scale in from the left (200ms), link underline offsets change (150ms), the button inverts (150ms).
- Only `transform` and `opacity` animate, apart from the button's colour invert. Under `prefers-reduced-motion: reduce` everything renders in its final state and transitions are off. The progress rule and the folio counter still update, instantly.

## Connect the form

The reply coupon does not send anything. `script.js` validates it on submit, shows inline errors and an error summary that takes focus, then replaces the form with a success message.

To make it real:

1. Set the form's `action` to your form service (Formspree, Netlify Forms, Basin or your own endpoint). `method="post"` is already set.
2. In the submit handler in `script.js`, after validation passes, send the data with `fetch` and show `#success` when it returns.
3. Remove the "Demo form: nothing is sent." line.

## Accessibility notes

- Skip link ("Skip to contents"), one `h1` (the masthead, with a full text name in `.sr-only`), an `h2` per chapter and an `h3` per project, notice, fact box and error summary. No skipped levels.
- Landmarks: `nav` (the fixed folio bar, labelled "Folio"), `header`, `nav` (the contents list, labelled "Contents"), `main`, `section` with `aria-labelledby`, `footer`. Project titles are plain headings, not links to themselves.
- Focus: `outline: 3px solid` red with a 2px offset on every link, button and field. `scroll-padding-top: 56px` keeps targets clear of the folio bar.
- Targets: contents rows are at least 56px tall, form fields and the button 48px, the folio "Contents" link, the `mailto:` contact link and "Back to the cover" 44px.
- Form: labels above fields, required fields marked with a hidden red asterisk plus visible "(required)" text, `autocomplete` and input types set, the brief hint linked with `aria-describedby`, errors below fields prefixed "Error:" and linked through `aria-describedby` with `aria-invalid`, and an error summary (no live-region role, so it is announced once) that takes focus and links to each field.
- Barcodes and the end mark are `aria-hidden` with `focusable="false"`. Contact-sheet frame chips are hidden from screen readers because each placeholder's `aria-label` already names the frame.
- Every bleed is clipped by its own container (`overflow-x: clip` on the cover, each chapter and the full-bleed figure), never by `body`. Checked at 375, 768 and 1440 with no horizontal scroll.

## ui-ux-pro-max results used

- **Style search "editorial magazine": Editorial Grid / Magazine.** Used directly: asymmetric grid, pull quotes, drop caps through `::first-letter` (4.2em, with `initial-letter: 3` where supported), multi-column text with `column-count` and `column-rule`, `figure` and `figcaption`, bylines, section dividers, high contrast black and white with one accent. Its checklist (asymmetric grid, editorial type, styled pull quotes, drop caps, large images, mobile reflow) was run before delivery.
- **Typography: Magazine Style pairing (Libre Bodoni + Public Sans).** Considered and replaced. The build uses the "Minimalist Monochrome Editorial" pairing from the same search (Playfair Display 900 + Source Serif 4 + JetBrains Mono), because a serif body and a mono utility face read more like a printed magazine than a sans body. The Magazine Style row's role split (high-contrast display serif over a quiet text face) was kept.
- **Colour: Magazine/Blog row (editorial black `#18181B`, accent pink `#EC4899` on `#FAFAFA`).** The structure was kept: near-black ink, off-white paper, one accent. The pink was rejected because it fails 4.5:1 as text on light paper and reads as a lifestyle brand. It became printer's red `#B3121F` (6.05:1 on paper), and the paper warmed to `#F3EFE6`.
- **Design-system run "editorial magazine portfolio" (variance 8, motion 4, density 4): returned Brutalism.** Partly off-target. Kept: 0px corners everywhere, a visible grid (the column hairlines), bold display type and large blocks (the masthead, the full-bleed figure, the heavy rules over each classified notice). Rejected: raw system fonts, harsh colour blocking and deliberately rough layout. Its "Scroll-Triggered Storytelling" pattern was kept as chapters with a progress indicator (the sticky folio counter and the red progress rule), with reduced motion rendering the final state. Its "Stagger List 300-450ms" motion note set the masthead and reveal timings.
- **Checklist items applied:** 4.5:1 text, 3px visible focus rings, skip link, sequential headings, hidden decorative SVGs, labelled fields with errors below and `aria-describedby`, required indicators, `autocomplete` and input types, error summary with focus on a failed submit, targets of 44px or more, no horizontal scroll at 375, body text at 17px or more with line-height 1.6, transform and opacity animation, `prefers-reduced-motion`, `font-display: swap`, `aspect-ratio` on every placeholder, `cursor: pointer` on links and buttons, hover transitions between 150ms and 300ms, one primary call to action per view.

## Things to tweak

- **Masthead size:** `--mh` in `:root` is `calc((min(100vw, var(--maxw) + 2 * var(--margin)) - 2 * var(--margin)) / 6.05)`. It sizes the word from the capped page measure, so HALVORSEN runs from the left to the right edge of the 12-column grid at every width and stops growing past 1440px. The divisor is the word's width in ems (about 6.03 at -.04em tracking). Measure your own name and change it if you change the name.
- **Cover photo crop on wide screens:** `.cover-photo .ph { aspect-ratio: 4 / 3 !important; }` in the 1024px media query keeps the cover inside one viewport. Remove it for the full 4:5 portrait cover.
- **Accent:** change `--red`, then recheck contrast against `--paper` and `--tint`. Keep it at 4.5:1 or above.
- **Grid hairlines:** `--grid` sets their strength. Set it to `transparent` for a cleaner page.
- **Chapter spacing:** `--section` (128px, 96px at tablet, 64px at mobile).
- **Issue details:** the cover folio ("Issue 07 | October 2026 | Rotterdam edition | €0,00"), the folio bar and the colophon. The total page count "of 09" is in `script.js` and in `#folio-num`.
- **Drop cap depth:** `initial-letter: 3` in the `@supports` block. The float fallback uses `4.2em`.

## Credits

- Fonts: Playfair Display, Source Serif 4 and JetBrains Mono (SIL Open Font License).
- No icon set. The barcodes and the end mark are hand-built SVG.
- All names, publications, organisations, quotes and the email domain are fictional. Waalhaven, Maashaven, Rotterdam-Zuid, Lobith and the Lower Rhine are real places used as settings only.
