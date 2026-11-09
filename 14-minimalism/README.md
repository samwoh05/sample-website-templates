# 14 Minimalism: "Full stop"

A one-page portfolio for a fictional wayfinding and signage designer, Tove Arendsen. Plain HTML, CSS and vanilla JS. No frameworks, no build step. Open `index.html` in a browser.

Files: `index.html`, `styles.css`, `main.js`, `README.md`.

## Style

Minimalism with a Swiss grid. Paper and ink, one family, one accent, no cards, no shadows, no gradients except the hairline in the image placeholders. Border-radius is 0 everywhere except the circles. Two thin SVG glyphs only (the plus on work rows and the select chevron), both 1.5px stroke in `currentColor`.

Design dials (taste-skill): DESIGN_VARIANCE 4, MOTION_INTENSITY 3, VISUAL_DENSITY 2.

## Hero approach

The hero is one short sentence set small: "Tove Arendsen designs signs that tell people where to go, and then stop talking". Its full stop is drawn as a huge vermilion circle. The sentence and the circle stand on one full-width 1px ink line, like objects on a floor. About 70% of the viewport stays empty. There are no buttons, no scroll cue and no subtitle. The real period sits inside the h1 as visually hidden text, so screen readers still get a full sentence.

The dot returns at small sizes: nav hover marker, work-row hover marker, quote marks, the contact heading, the form success message and the footer.

- 1200px and up: dot is `min(62vw, 74svh, 880px)`, right edge at 6vw.
- 1024 to 1199px: `min(56vw, 70svh)`.
- Below 1024px: the layout stacks (wordmark, nav, sentence in flow). The dot is cropped 20% past the right edge and the hero clips it, so the page never scrolls sideways.

## Fonts

One family: **Archivo** (Google Fonts, variable `wdth` 100 to 125 and `wght` 400 to 700, `display=swap`). Fallback: "Helvetica Neue", Arial, sans-serif. Archivo is a grotesque that reads like signage, which suits the persona. H2s use `wdth` 112 as the single expressive register. Indexes, years and labels use `font-variant-numeric: tabular-nums`.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | #F7F6F3 | page background |
| `--surface` | #FFFFFF | form field fill only |
| `--ink` | #111111 | text, ground line, button fill (17.5:1 on paper) |
| `--ink-2` | #3A3A38 | secondary text, input rule, button hover (10.6:1) |
| `--muted` | #5A5A57 | labels, hints, captions (6.4:1 on paper) |
| `--line` | #DCDAD5 | hairlines and placeholder borders, decorative only |
| `--accent` | #C8341C | the only accent: dots, link underline, focus ring, errors (4.9:1 on paper) |

Hex values appear only in the `:root` block of `styles.css`. The accent is never used as a fill behind text.

## ui-ux-pro-max results used

- **Design system: "Minimalism & Swiss Style".** Taken as the base: 12-column grid (8 at tablet, 1 on phones), max-width 1200px, radius 0, no shadows, clean 1px borders, single accent, spacious 8px scale from 24 to 96px.
- **Typography: "Minimalist Portfolio" (Archivo + Space Grotesk).** I kept Archivo and dropped Space Grotesk. The alternative "Minimal Swiss" (Inter, single family) made the case for one family; Archivo's width axis gives headings a second voice without a second typeface, and it looks more like sign lettering than Inter does.
- **Color: "Portfolio/Personal, Monochrome + blue accent".** Kept the structure (near-black primary, dark grey secondary, light border, one accent) and adapted it: a warm off-white paper instead of #FAFAFA, and signal vermilion #C8341C instead of blue #2563EB, because red dots and black type are the language of wayfinding. All text pairs pass 4.5:1.
- **UX: "Reduced Motion" (high severity).** Under `prefers-reduced-motion: reduce` there is no hero animation, no scroll reveal (the observer is not even created), transitions drop to 0.01ms, and smooth scrolling is off. Everything renders in its final state.

## Motion

- Hero load (pure CSS): the sentence fades in over 400ms, the dot settles from scale 0.96 over 600ms with a 150ms delay, anchored at its bottom so it lands on the floor.
- Scroll reveal: opacity 0 and 12px rise, 350ms ease-out, 40ms stagger, once per element. Only applies when JS has run (`main.js` adds the `.js` class itself, so if the script fails to load nothing stays hidden) and motion is allowed.
- Hovers: 200ms on colour, opacity, background-size and transform. Nothing shifts layout. Hover styles sit inside `@media (hover: hover)` so taps on touch screens do not leave them stuck; keyboard focus shows the same states.

## Accessibility notes

Skip link first in the DOM, landmarks (header with `nav aria-label="Main"`, main, footer), one h1 and sequential headings, 2px accent focus ring with 3px offset on every interactive element, 44px minimum targets, native `<details>` for work rows, labelled form fields with a visible "All fields are required" note, hints and errors linked through `aria-describedby` (errors are not live regions, so focus on the first invalid field announces them once), errors prefixed with "Error:" so colour is not the only signal, and focus moved to the first invalid field or to the status message. The contact form is a demo: it sends nothing.

## Image placeholders

Every image is a styled placeholder: a `div.ph` with `role="img"`, `aria-label`, `data-placeholder="true"` and a declared aspect ratio, preceded by `<!-- Replace with Envato Elements image -->`. Swap the div for an `<img>` with `width`, `height` and `alt`.

| Fig. | Where | Ratio | Content | Size (px) |
|---|---|---|---|---|
| 01 | About, portrait | 4:5 | Tove Arendsen on site with a printed sign mockup, natural light | 960 x 1200 |
| 02 | Work, Sint Aldric Hospital | 3:2 | Level 4 junction sign, photographed at eye height | 1200 x 800 |
| 03 | Work, Veerhaven tram line | 3:2 | Stop totem and timetable panel, daylight | 1200 x 800 |
| 04 | Work, Hollow objects | 3:2 | Room 3 entrance wall with room text | 1200 x 800 |
| 05 | Work, Lindeholm University Library | 3:2 | Floor number cut into stair-core wall, level 4 | 1200 x 800 |
| 06 | Work, Arendsen Sign | 3:2 | Specimen sheet, three weights and arrow set | 1200 x 800 |
| 07 | Work, featured | 16:9 | Veerhaven tram line, stop 9 at dusk, totem and canopy band | 2400 x 1350 |

Optional: an Open Graph image at 1200 x 630 showing the dot on paper (not included).

## Things to tweak

- **Accent:** change `--accent` once on `:root`. Keep it at 4.5:1 or more on `--paper`, since it is also used for error text.
- **Dot size:** the `--d` custom property on `.hero`, per breakpoint. On phones it is also capped by `calc(var(--hero-h) - var(--ground) - 270px)` so it never runs into a longer sentence; raise or lower 270px if you change the hero copy length.
- **Floor height:** `--ground` on `.hero`.
- **Sentence baseline:** `.hero-line` uses `margin-bottom: -0.3em` at 1024px and up to put its last baseline about 16px above the floor. Adjust if you switch fonts.
- **Section rhythm:** `--sec-pad` and `--head-gap` on `:root`.
- **Work rows:** remove `open` from the first `<details>` to start with all rows closed.
- **Copy:** all names, clients, projects and quotes are fictional. Replace them before publishing.
