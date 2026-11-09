# 16 · Luxury typography · "Planche I"

A one-page portfolio for **Aurèle Marchetti**, a fictional engraver and identity designer in Geneva. Type does the luxury work: a monumental italic monogram cut like a steel die, true small caps, hairline rules, a near-monochrome paper and ink palette and one gilt accent. The page reads as a maison’s plate book: every section is a numbered *planche* (plate).

Plain HTML, CSS and vanilla JS. No frameworks, no build step. Open `index.html` in a browser.

## Files

- `index.html`: markup, inline SVG icon sprite, all copy
- `styles.css`: tokens, components, motion and breakpoints
- `script.js`: load sequence, scroll reveals, seal pause, work preview, letter tabs, form validation
- `README.md`: this file

## Style

**Luxury typography.** Couture house, perfumer, fine jewellery catalogue and private bank stationery as references. Taste-skill dials: DESIGN_VARIANCE 7 (asymmetric hero, mirrored work index), MOTION_INTENSITY 4 (slow ease-out reveals, 600 to 1200ms, no springs), VISUAL_DENSITY 2 (spacious, 128 to 192px section padding).

## Hero approach

An engraver’s proof inside a printed plate frame with corner registration crosshairs. The text stack (plate mark, h1, gilt rule, role in small caps, lede, two links) sits on the left: the h1 is set at up to 6.5rem (the largest type on the page after the monogram) and spans eight columns, while the role, lede and links hold to 36ch. The folio and scroll mark sit centred at the foot of the plate, clear of the text column. A single Cormorant italic “A” at up to 64rem bleeds off the bottom right, built from three stacked spans: the filled ink glyph, a paper-coloured 1px stroke offset to read as an engraved inner hairline, and a gilt stroke offset the other way as a die edge. A gilt seal with “Aurèle Marchetti · Genève · MMXI · Gravure & identité” on a circular text path (one run, stretched to the circumference with `textLength`) turns once every 120 seconds and has a visible pause control. Size drama: 12px caps against a glyph of roughly 900px. On tablets the monogram turns paper-2 so it sits behind the text; on phones it becomes a full-width watermark behind the headline and the seal is hidden. Short desktop screens (under 820px tall) step the h1 down so both links stay above the fold.

## Fonts

| Role | Family | Notes |
|---|---|---|
| Display and body | Cormorant (300 to 700, roman and italic) | `kern`, `liga`, `onum` on body; `dlig` on headings via `.dlig`; body at 20px, line-height 1.55, 66ch measure; Cormorant has no opsz axis, so reading paragraphs use weight 500 and only 2.5rem and up use 300 |
| Small caps | Cormorant SC (400, 500) | True small caps, tracking 0.12 to 0.16em |
| Micro labels, notes, hints | Jost (300 to 500) | Uppercase 12px at 0.24em for labels; 16px for notes and form hints |

None of these were used by earlier templates in the collection (Cormorant is the display family, distinct from Cormorant Garamond used before).

## Palette and contrast

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | #F6F2EA | paper |
| `--color-bg-alt` | #EDE6D9 | paper-2, about band, placeholders, form card |
| `--color-text` | #15120F | ink |
| `--color-text-muted` | #5C554C | stone |
| `--color-accent` | #7A5A12 | gilt |
| `--color-rule` | #CFC6B6 | decorative hairlines |
| `--color-border-strong` | #807970 | inputs, frames |
| `--color-inverse-bg` | #15120F | noir |
| `--color-inverse-text` | #E9E2D4 | bone |
| `--color-inverse-muted` | #A39A8C | ash |
| `--color-inverse-accent` | #C9A55A | gilt-light |
| `--color-error` | #9E3B2E | errors |

| Pair | Ratio (WCAG 2.x) |
|---|---|
| ink on paper | 16.71:1 |
| ink on paper-2 | 15.04:1 |
| stone on paper | 6.58:1 |
| stone on paper-2 | 5.92:1 |
| gilt on paper | 5.70:1 |
| gilt on paper-2 | 5.13:1 |
| paper on gilt (button hover) | 5.70:1 |
| bone on noir | 14.48:1 |
| gilt-light on noir | 8.01:1 |
| ash on noir | 6.72:1 |
| error on paper | 6.03:1 |
| border-strong on paper | 3.85:1 (non-text, meets 3:1) |
| border-strong on paper-2 (form card) | 3.46:1 (non-text, meets 3:1) |
| rule on paper | 1.52:1 (decorative only, never a sole boundary) |

All text pairs pass AA at every size.

## ui-ux-pro-max results used

- `--design-system "luxury typography portfolio"` returned Liquid Glass and the retry returned Brutalism: both off-topic and discarded. Only the generic parts were kept: the Feature-Rich Showcase structure (hero, six works, services, social proof, call to action), Stagger List motion with the final state rendered at once under reduced motion, and the checklist (no emoji icons, pointer cursor, 150 to 300ms hover transitions, 4.5:1 contrast, visible focus, reduced motion, tests at 375, 768, 1024 and 1440).
- Style search “luxury typography”: Exaggerated Minimalism (oversized type, extreme negative space, one accent) shaped the hero. Kinetic Typography was kept to a single slow seal rotation with a pause button, and no split letters.
- Typography search: the Luxury Serif pairing (Cormorant with a geometric sans) was used, with Jost in place of Montserrat. Playfair and Inter were rejected.
- Colour search “luxury premium gold”: the premium black and gold direction, warmed to paper and ink, with the gilt deepened to #7A5A12 so it passes 4.5:1 on both paper bands.
- UX: smooth anchor scroll only without reduced motion, no horizontal scroll, labelled placeholders.

## Placeholders

Every placeholder is a hatched paper-2 box with an inset hairline frame and corner ticks, `data-placeholder="true"`, `role="img"` with an `aria-label`, and a preceding `<!-- Replace with Envato Elements image -->` comment.

| ID | Where | Content | Size |
|---|---|---|---|
| P1 | About portrait | Engraver at the bench, burin in hand, raking window light | 720 × 900 |
| P2 | Work III | Flacon label for Maison Ferrand-Lisle, macro on cotton paper | 1200 × 800 |
| P3 | Work IV | Engraved watch caseback, script detail, raking light | 1200 × 800 |
| P4 | Work V | Blind-embossed letterhead and cypher, overhead | 1200 × 800 |
| P5 | Work VI | Open jewellery catalogue spread set in small caps | 1200 × 800 |
| P6 | Work VII | Room number engraved in brass on Carrara marble | 1200 × 800 |
| P7 | Work VIII | Letterpress lookbook pages fanned on linen | 1200 × 800 |

P2 to P7 appear twice: inline in each work row (shown below 1024px or on touch, with `role="img"`) and in the floating preview frame (fine pointers at 1024px and up, inside an `aria-hidden` aside). Only one copy is ever displayed. The floating frame is sized to the numeral column and appears over the numeral side of the hovered row, so it never covers the title, description or year. Replace both with the same image.

## Accessibility notes

- One h1, an h3 for each of the six projects, skip link, landmarks, DOM order equals visual order; the header is not sticky so nothing hides focused content.
- Visible 2px focus ring everywhere (gilt-light inside the dark services section).
- Targets are at least 44px with 8px or more between them.
- The seal has a pause control whose label changes (“Pause the seal” / “Turn the seal”); it does not also use `aria-pressed`. Under reduced motion the seal does not turn and the control is hidden.
- Letters use the WAI tabs pattern (arrow keys, Home, End, roving tabindex) and never rotate on their own. Each tab shows its numeral and is named for screen readers, for example “Letter 1, Maison Ferrand-Lisle”.
- The form has labels, hints, inline errors with icon and text, and an error summary that takes focus when there is more than one problem. Fixing a field also removes it from the summary. It sends nothing and says so.
- All clients, houses and quotes are fictional and marked as such (footnote and footer).

## Things to tweak

- **Name and initial:** change “A” in `.hero__monogram`, `.seal-centre` and `.colophon__mark`, and the seal text in the `<textPath>`.
- **Accent:** swap `--color-accent` and `--color-inverse-accent` for a jewel tone (a deep emerald such as #1F5A45 passes on paper); recheck contrast.
- **Monogram placement:** `.hero__monogram` `right` and `bottom` move the glyph; `--t-monogram` sets its size.
- **Seal speed:** `seal-turn 120s` in `.seal-text`.
- **Motion:** durations live in `--dur-reveal` and `--dur-hero`; easing in `--ease-lux` and `--ease-out`.
- **Work rows:** each `li.index__row` has `data-index` that matches a `data-preview` placeholder in the aside; keep them in step when adding rows.
- **Form:** wire `#enquiry` to a real endpoint and remove the demonstration note and status message.
