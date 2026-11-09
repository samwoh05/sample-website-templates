# Flavour Select: a Y2K portfolio template

Design read: a bright 2000-era gadget catalogue on a bubblegum-white page. One frosted candy plastic player is the hero toy, with steel chrome display type, glossy jelly controls and raspberry used only for actions.

Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 5.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Semantic markup, the icon sprite, all decorative SVG and the 10 placeholders. |
| `styles.css` | Tokens on `:root`, mobile-first layout, the flavour swap, motion, reduced motion and forced colours. The fit maths sits in the top comment. |
| `script.js` | Vanilla, loaded with `defer`. Skip buttons, the `data-flavour` mirror, the pointer light, the menu, the active nav link, reveals, the services draw, the chat arrival and the demo form. |
| `README.md` | This file. |

No build step, no framework, no image files.

## Hero approach

The hero is an asymmetric split. The left column holds the availability chip, the two-line chrome H1 "Shiny things that work.", one line of subtext, the "See the work" button, a "Say hello" text link and a hint. The right column holds the Gumdrop Player: a frosted candy plastic music player with an iridescent groove disc, an LCD, a jelly "Open" control, two skip buttons, a chrome orbit ring with a bead, and four flavour drops underneath.

How the swap works:

- The four flavour drops are real radio buttons (`name="flavour"`) inside a `fieldset`. Tab enters the group once and the arrow keys move between flavours.
- In browsers with `:has()`, rules such as `.player:has(#f-lime:checked)` set `--spin`, `--progress` and `--sparkle`, show the lime tint layer, show LCD panel 2 and show "Open" link 2. No JS is needed.
- `script.js` mirrors the checked radio into `data-flavour` on `.player`. Browsers without `:has()` use `.player[data-flavour="lime"]` rules instead. The two sets of rules sit in separate `@supports` blocks, so they never both apply.
- With no `:has()` and no JS, the flavour row and hint are hidden. Blueberry stays on screen and every project is still in Work.
- The sparkle stars use `animation-name: var(--sparkle)`. There are four identical keyframes with different names, so a flavour change replays the pop with no JS.

To add a flavour you need: one radio plus label in `.flavours`, one `.shell__tint--x` layer, one `.lcd__track--n` panel, one `.open--n` link, one `--spin` and `--progress` value in both `@supports` blocks, and one `sparkle-x` keyframe. Also add the project title to the `tracks` array in `script.js`.

Fit maths (also in the top comment of `styles.css`):

- 1366x768: header 88 + top padding 32 + device about 452 to 468 + gap 16 + flavour row 76 + bottom padding 48 = about 728. The left column is about 520 tall.
- 1440x900: about 760.
- The device width is `min(clamp(300px, 30vw, 420px), calc((100svh - 300px) / 1.18))`, so short screens get a smaller toy.
- The H1 is two lines at desktop and three at most at 375px. There is no scroll cue.

## Page order and layout families

| Section | Layout family |
|---------|---------------|
| Header | Floating chrome pill bar, sticky. A `details` menu under 880px. |
| Hero `#top` | Asymmetric split with an interactive product toy. |
| About `#about` | Offset split: pill portrait plus an LCD spec sheet. Eyebrow "Hello". |
| Selected work `#work` | Media player tracklist (an ordered list in one frame). Eyebrow "Tracklist". |
| Services `#services` | Radial orbit diagram around a chrome sphere. Unrolls into a beaded line on phones. |
| Kind words `#kind-words` | Sticky heading column plus an IM chat window. |
| Contact `#contact` | Centred open flip phone. Eyebrow "Say hi". |
| Footer | Full-bleed brushed chrome band with an oversized wordmark. |

There are three eyebrows for seven sections. Track numbers are content, not section numbering.

## Fonts

One Google Fonts request with preconnect.

| Font | Weights | Job | Why |
|------|---------|-----|-----|
| Unbounded | 700, 800 | H1, H2, H3, wordmark, LCD title, avatar initials | Wide, rounded jelly geometry that can carry a chrome fill. |
| Manrope | 400 to 700 | Body, nav, labels, buttons | Clean and readable at 17px. |
| Space Mono | 400, 700 | LCD, chips, track numbers, small labels, eyebrows | Gadget readout feel. Never used for paragraphs. 13px minimum. |

Syncopate (from the Kinetic Motion search result) was considered and dropped: it is all caps and too thin to carry chrome. Orbitron was avoided because the cybercore template used that family in spirit.

## Colour tokens

| Token | Hex | Job |
|-------|-----|-----|
| `--bg` | #FDF2F8 | Page |
| `--surface` | #FFFFFF | Cards, bubbles, inputs, lid |
| `--surface-tint` | #FCE7F3 | Nav, chips, phone base, reply bubble |
| `--aqua-frost` | #CFFAFE | Hero blob, chat window body |
| `--lcd` | #E6F4EC | LCD screens and the spec sheet |
| `--ink` | #0F172A | Text |
| `--ink-soft` | #475569 | Secondary text |
| `--lcd-dim` | #3B5249 | Small LCD labels |
| `--steel-mid` | #64748B | Chrome type gradient stop, input borders |
| `--action` | #BE185D | The one action colour: buttons, links, checked ring |
| `--action-deep` | #9D174D | Hover, error text |
| `--pink` | #EC4899 | Decoration only |
| `--gold` | #D97706 | Sparkle cores and the flare dot only |
| `--chrome-1` to `--chrome-6` | #F8FAFC, #E2E8F0, #CBD5E1, #94A3B8, #475569, #1E293B | Chrome rims, strips, hinge, beads, footer |
| Blueberry | #BAE6FD, #38BDF8, #0284C7 | Track 1 tint and drop |
| Lime | #D9F99D, #A3E635, #65A30D | Track 2 tint and drop |
| Tangerine | #FED7AA, #FB923C, #EA580C | Track 3 tint and drop |
| Bubblegum | #FBCFE8, #F472B6, #DB2777 | Track 4 tint and drop |

`--irid` is a conic gradient of the four light flavours. It is decoration only. There is no purple.

Contrast (WCAG ratios):

| Pair | Ratio |
|------|-------|
| ink on bg / surface / surface-tint | 16.35 / 17.85 / 15.19 |
| ink on aqua-frost / lcd / chrome-2 | 15.95 / 15.74 / 14.48 |
| ink-soft on bg / surface / surface-tint | 6.94 / 7.58 / 6.45 |
| lcd-dim on lcd | 7.44 |
| white on action / action-deep | 6.04 / 7.88 |
| action on bg / surface / surface-tint / lcd | 5.53 / 6.04 / 5.14 / about 5.3 |
| action-deep on surface-tint | about 7.0 |
| ink on blue / lime / tangerine / bubblegum mids | 8.33 / 11.84 / 7.89 / 6.74 |
| #64748B on bg | 4.36 (input borders and large type only) |

Rule: text never sits on a gradient or on translucent plastic. It sits on surface, lcd, surface-tint, bg or a solid flavour mid. Nothing at #94A3B8 or lighter is used for text.

Chrome display type: solid ink first, then inside `@supports (background-clip: text)` a dark steel gradient (#334155, #0F172A, #64748B, #334155, #0F172A) clipped to the glyphs. Depth comes from `filter: drop-shadow`, not `text-shadow`, because a text shadow shows through transparent glyphs. Forced colours mode drops the gradient and uses CanvasText.

## Gloss recipe

The `.jelly` class is shared by buttons, the skip buttons, the Menu toggle, the flavour drops, the Open control, the services discs and the chat avatars.

- A three-stop base gradient of the material (`--j-top`, `--j-mid`, `--j-deep`).
- `inset 0 -3px 6px` of the deep tone at 50%, plus `inset 0 1px 0` white.
- A `::before` highlight band: top 4px, 10% in from each side, 45% tall, pill radius, white fading to clear.

The band is what separates Y2K jelly from glassmorphism. `backdrop-filter` is used on the nav only, with a solid fallback.

## Motion

All motion lives inside `@media (prefers-reduced-motion: no-preference)`. Default styles are the final states.

1. Shell tint crossfade, 400ms.
2. Disc and orbit bead turn to the new track, 700ms.
3. LCD panel fades in and rises 8px, 300ms after an 80ms delay.
4. Progress bar grows to its place in the set, 500ms.
5. Sparkle stars pop once per change, 520ms.
6. Jelly press: lift on hover, squash on press, spring back.
7. Pointer light: the specular blob and the flare follow the pointer inside the hero, clamped to 40px. Fine pointers only.
8. Device entrance on load, 600ms. Only hidden at the start when JS is running.
9. H1 chrome sheen sweeps once on load, 1400ms.
10. Section reveals with one IntersectionObserver. Hidden only under `html.js`. Without IntersectionObserver everything shows at once.
11. Services orbit draws once in view, then the four bubbles pop with an 80ms stagger.
12. Chat messages arrive once in view with a short typing row before each.
13. Tracklist cover gets one holographic sweep per hover or focus.
14. Form status fades in and its check pops.

Reduced motion: no sheen, no entrance, nothing hidden, no typing dots, no pointer light, no tweens (the bead jumps), sparkles sit still at full size. `script.js` checks `matchMedia('(prefers-reduced-motion: reduce)')` before adding pointer handlers, hidden states or typing delays. Nothing loops and nothing flashes.

## Placeholders

There are 10. Each is a `div.ph` with `data-placeholder="true"`, `role="img"`, an `aria-label` and the comment `<!-- Replace with Envato Elements image -->` directly before it.

| # | Where | Label | Size |
|---|-------|-------|------|
| 1 | Hero LCD, track 1 | Tidepool app screen | 800x500 |
| 2 | Hero LCD, track 2 | Radio Kweek player screen | 800x500 |
| 3 | Hero LCD, track 3 | Orbit Launderette kiosk screen | 800x500 |
| 4 | Hero LCD, track 4 | Pop Quiz Late scoreboard frame | 800x500 |
| 5 | About | Portrait of Noa at the studio desk | 1000x1250 |
| 6 | Work, track 1 | Tidepool project cover | 1600x1000 |
| 7 | Work, track 2 | Radio Kweek project cover | 1600x1000 |
| 8 | Work, track 3 | Orbit Launderette project cover | 1600x1000 |
| 9 | Work, track 4 | Pop Quiz Late project cover | 1600x1000 |
| 10 | Work, track 5 | Silverscreen sticker set cover | 1600x1000 |

To swap one: search for `data-placeholder="true"`, replace the `div.ph` with an `<img>` that keeps the label as its `alt` text, and delete the comment. Give the image `width: 100%`, `height: 100%`, `object-fit: cover` and the same radius (`--r-s`, or `--r-pill` for the portrait). The LCD images fill the flexible slot above the title.

Everything else (device, disc, orbits, sphere, sparkles, phone, chrome, avatars) is CSS or inline SVG.

## Footer wordmark

The oversized "noa.c" uses the bright liquid chrome gradient. It is decorative and `aria-hidden`. The dark outline comes from four stacked `drop-shadow` filters, not `-webkit-text-stroke`: Unbounded has overlapping contours, and a text stroke draws those inner overlaps as stray lines through the letters.

## Links

- The hero "Open" control jumps to that project's row in the tracklist (`#track-1` to `#track-4`).
- "View project" links point at `#work`. Swap them for real case study pages.
- Instagram, Vimeo and Read.cv go to `#`. Replace them with real profile URLs.
- The email uses the reserved `.example` domain.

## Form wiring

The form is a demo. `script.js` adds `novalidate`, checks the name, the email pattern and the message, shows inline errors with an icon, sets `aria-invalid`, links errors with `aria-describedby` and focuses the first bad field. A valid submit shows "Thanks. This is a demo form, so nothing was sent." in a `role="status"` region. Submit is always prevented. Without JS, native validation runs and the form posts to `#contact`.

To make it real, set `action` and `method` for your form service and remove the `preventDefault` branch in `script.js`.

## Fictional persona

Noa Castellanos, interface and motion designer in Rotterdam, is fictional. So are the clients and quotes: "Kelp and Co." (Ines Varga), "Radio Kweek" (Dario Mensah), "Orbit Launderette" and "Pop Quiz Late" (Lotte Brandsma). The projects Tidepool, Radio Kweek, Orbit Launderette, Pop Quiz Late and Silverscreen are made up for this template.

## ui-ux-pro-max results used

- Design system search "y2k aesthetic portfolio": the Hero-Centric Design pattern was kept, so the hero carries the page. Its Brutalism styling, grey and safety orange colours and Archivo / Space Grotesk type were dropped as off-topic.
- Style search "y2k chrome glossy": the Y2K Aesthetic effects list was used. Metallic linear gradients, glossy buttons, 3D chrome, bubble shapes, sparkles and drop-shadow glow. The neon hex values were not used as text colours, and chrome is kept for display type and decoration so text stays at 4.5:1.
- Typography search: Kinetic Motion was the closest result. Space Mono was kept. Syncopate was swapped for Unbounded.
- Colour search "fashion music gen z": the Wardrobe palette is the source of #BE185D (action), #FDF2F8 (page) and #0F172A (ink), plus #EC4899 and #D97706 as decoration. Chrome silver and a frosted aqua were added.

## Things to tweak

- The availability date "February 2027" in the hero chip.
- The H1 slope: `clamp(2.125rem, 1rem + 3.4vw, 4rem)` on `.hero__title`. If you change the words, measure the first line at 1366 and 1440.
- The pointer light clamp (40px) in `script.js`.
- The orbit tilt: `rotate(-12deg)` on `.orbit__plane` and in the two orbit SVGs. The bead counter-rotation uses the same angle and the `scaleY` ratio.
- The device size cap: `--dev-w` on `.player` at 1024px and up.
