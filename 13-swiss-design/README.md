# 13 Swiss design: "Konzert / Index"

A one-page portfolio template for a fictional Basel graphic designer, Anja Velten. Plain HTML, CSS and a small vanilla script. No framework, no build step. Open `index.html` in a browser.

## Style

International Typographic Style (Swiss design). Visible mathematical grid, asymmetric layout, flush-left ragged-right text, one grotesk family, contrast through size and weight, numbered sections with hairline rules, black and white with one signal red. No shadows, no gradients, no rounded corners.

The concept: the page opens as a Swiss concert poster and then turns into an exhibition catalogue. Every section below the hero is a numbered chapter (01 to 05) with a rule, a caption column and "Fig." captions. The 12-column grid can be shown on screen with the Grid button in the header or footer.

## Hero approach

A Konzert poster hero on the 12-column grid:

- A red field (cols 1 to 7) sits flush under the header. Its bottom edge is computed from the name size, so it always ends in the middle of the second name line.
- The name is set in Archivo 800 at `clamp(5rem, 15vw, 15.5rem)` with line-height 0.82. "Anja" sits on red, "Velten." straddles the red edge, and the full stop is red on paper. No text is duplicated or clipped.
- An index of works (cols 9 to 12) lists the five projects with numbers and years and links to each catalogue entry.
- A black field (cols 10 to 12) runs from the top of "Velten." to the bottom of the hero, with a meta strip rotated to read bottom to top and a red hairline as the poster alignment line.
- A meta row on paper: availability, studio address and a live Basel clock.
- At 768 the red field spans 6 of 8 columns and the index moves below the meta row. At 375 the red field bleeds to the viewport edges, the black field becomes a 56px band and the index follows as its own block.

## Fonts

Archivo (Google Fonts) at 400, 500, 700 and 800, `display=swap`, with preconnect. Fallback: "Helvetica Neue", Arial, sans-serif. Tabular figures are on for the whole page so numbers, years and the clock align. Display numerals (section and work numbers, the services numeral, the hero name, the contact title and the footer mark) switch back to proportional figures so they set tight.

Type scale (px): 12 caption, 13 label caps, 16 small, 18 body (17 on mobile), 22 lead, 24 h3 on mobile, 32 h3, clamp(40, 5vw, 72) h2, 56 section numerals, hero name as above, up to 240 services numeral.

## Palette

All colours are tokens on `:root` in `styles.css`. No raw hex appears in component rules.

| Token | Value | Use and contrast |
| --- | --- | --- |
| `--paper` | #FAFAFA | Background |
| `--ink` | #09090B | Text, black fields (hero block, contact block), about 19.6:1 on paper |
| `--muted` | #52525B | Secondary text, about 7.4:1 on paper and 6.7:1 on wash |
| `--rule` | #E4E4E7 | Decorative hairlines only |
| `--wash` | #EEEEEE | Placeholder fill |
| `--signal` | #D52B1E | Swiss red, about 4.8:1 on paper both ways. Text on red is 16px or larger. Ink on red only for display type of 48px and up |
| `--signal-ink` | #A31E14 | Small red text, numbers under 16px and errors on paper, about 7.3:1 |

There is one black (`--ink`) for text and both black fields. The neutrals are plain greys with no blue cast, so the only colour on the page is the red.

Red is used for: the hero field, the services block, the full stop in the name, the mobile menu panel, the submit button, the quote marks, the form error glyph, and hover and focus marks (nav underline, index bar, work year fill, grid overlay).

## ui-ux-pro-max results used

- Design system "Minimalism & Swiss Style": clean, functional, high contrast, geometric, grid based, subtle 200ms hovers, clear type hierarchy.
- The Museum/Gallery mono palette: #FAFAFA / #09090B, with border #E4E4E7. The result's slate muted #475569 and wash #E8ECF0 were swapped for neutral greys #52525B and #EEEEEE so the greys match the zinc blacks, and #18181B was dropped so the page has a single black.
- The swiss domain rules: 12 columns, border-radius 0, no shadows, no gradients, a single accent, weights 400 to 700 (800 added for the display name).
- The typography result: Archivo from the "Minimalist Portfolio" pairing, used here as a single family.
- The UX results: sequential heading hierarchy (one h1, h2 per section, h3 per item) and the quick-reference checklist (4.5:1 contrast, visible focus, skip link, labelled fields, reduced motion, 44px targets, no horizontal scroll, 16px minimum body, 8px spacing scale, declared aspect ratios).
- The red accent is a style-knowledge fallback, because no verified red palette matched in the colour search.

## Image placeholders

Every placeholder is a `<figure class="ph" data-placeholder="true">` preceded by `<!-- Replace with Envato Elements image -->`. The box has a declared aspect ratio, a diagonal hairline, a label and a size tag. Replace the `.ph__box` div with an `<img>` that keeps the same aspect ratio and a real `alt` text.

| No. | Placeholder | Size | Ratio | Where |
| --- | --- | --- | --- | --- |
| 1 | Portrait, studio | 1200x1500 | 4:5 | About (Fig. 1) |
| 2 | Klangraum 26 cover, season poster wall | 1600x1000 | 16:10 | Work 01 (Fig. 2) |
| 3 | Rheinlicht cover, festival identity | 1200x1500 | 4:5 | Work 02 (Fig. 3) |
| 4 | Atlas der Brücken spread | 1600x1000 | 16:10 | Work 03 (Fig. 4) |
| 5 | Fabrik Ost cover, signage | 1200x1500 | 4:5 | Work 04 (Fig. 5) |
| 6 | Ziffer cover, type specimen | 1600x1000 | 16:10 | Work 05 (Fig. 6) |
| 7 | Social share image | 1200x630 | 1.91:1 | `og:image` meta tag only, path `og-image.png` (file not included) |

## Interaction and accessibility notes

- Grid overlay: off by default. Toggle with the header button or the footer button. Both keep the fixed label "Grid" and report their state with `aria-pressed`; the on state is filled red. There is no single-key shortcut. The state is saved in `localStorage` under `swiss-grid`. It reveals column by column with `steps(12)`.
- Motion is limited to clip-path reveals on load, rules drawing in once, and 200ms colour and transform hovers. `prefers-reduced-motion: reduce` removes all of it. Content never fades and never hides without JavaScript.
- Landmarks: header, nav, main, footer. Skip link first. Focus rings are 3px ink, or 3px paper on red and black blocks. `scroll-padding-top` keeps focused targets clear of the sticky header.
- If `script.js` fails to load or throws, a small inline fallback removes the `js` classes on page load, so the nav and section rules show in their no-JS form. Without JS the header is not sticky below 1024px, so anchor targets are never hidden under a tall header.
- The hero name size below 1024px mixes rem and vw, so it still responds to browser text zoom.
- The contact form is a demo. Name, email and message are marked "(required)" in their labels. It validates required fields and the email format, marks fields with `aria-invalid`, shows text plus a "!" glyph, and announces success in a polite live region.

## Things to tweak

- `--signal` and `--signal-ink` to change the accent. Keep `--signal` at 4.5:1 against paper if you use it for text.
- `--name` (the clamp on `:root` and per breakpoint) to resize the hero name for a longer or shorter name.
- The red field's bottom ratio, `0.45` in `.hero__mast::before`, to move the red edge up or down through the second line.
- Grid tokens per breakpoint: `--cols`, `--gutter`, `--margin` at 12 / 8 / 4 columns.
- Grid overlay default and the `swiss-grid` localStorage key in `script.js`.
- The clock time zone (`Europe/Zurich`) in `script.js`.
- Persona, projects, client quotes and the email `studio@anjavelten.example` (the `.example` domain is non-routable on purpose).
- Form endpoint: set `action` and `method="post"` on the form and connect a form service, then remove the demo handler. The demo form uses `action="#contact"` with no method so a no-JS submit stays on the page.
- Footer social links point to `https://example.com/...` placeholders. Replace them with real profile URLs or remove them.
- Add `og-image.png` (1200x630) next to `index.html`.
