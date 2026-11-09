# Light Table: a glassmorphism portfolio template

## What it is

A one-page portfolio for a fictional colour and light designer, Leonor Brito Lund, based in Lisbon. She plans daylight, light scenes and colour for public interiors: libraries, baths, terminals and wards. The page is a light table. Frosted panes of glass sit over a painted colour field, and the field changes with the hour: morning for the hero and about, noon for the work and services, dusk for the quotes, contact and footer. The same glass looks different at a different hour, which is her craft.

Style: glassmorphism. Light frosted panes with a 1px light border, a top lip highlight, layered depth and a vivid background. One smoke pane (the Lens) and smoke quote panes for contrast. No purple anywhere, no aurora blobs, no rainbow gradient.

Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 5, VISUAL_DENSITY 4.

All people, clients, buildings and quotes are fictional. The email uses the `.example` domain.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | Markup for every section, the mobile menu dialog, three copies of the light control, inline SVG icons and the 6 image placeholders. |
| `styles.css` | Tokens, the field and its three hours, glass panes, the hero layer stack, section layouts, placeholders, motion, breakpoints and fallbacks. |
| `main.js` | Vanilla JS, loaded with `defer`. Hour logic, nav current section, menu dialog, edge light pointer rig, reveals and the demo form. About 210 lines. No scroll listeners. |
| `favicon.svg` | Three overlapping translucent discs (vermilion, saffron, teal). |
| `README.md` | This file. |

No framework, no build step, no image files. Google Fonts is the only external request.

## How to run it

Open `index.html` in a browser. A local server also works (for example `python3 -m http.server` in this folder) but is not needed.

## Hero approach

The hero is the light table itself. Layers, back to front:

1. Field: `.field`, a fixed layer (`inset: -10%`, `z-index: -2`) with three stacked children, `.field__morning`, `.field__noon` and `.field__dusk`. Gradients only, never `filter: blur`. Morning is always painted underneath; noon and dusk fade in on top, so a change of hour never dips to the ink background. A fourth child, `.field__marks`, adds two static hard-edged marks (a solid sun disc and a teal ring) so every pane has a crisp edge behind it to frost. `.field::before` is a dim layer used only in dark mode. `.field::after` is a static SVG `feTurbulence` grain at 10% opacity.
2. Giant name: "Brito Lund" in Bricolage Grotesque 800 at `clamp(112px, 21vw, 340px)`, ink, `aria-hidden`. It sits `clamp(24px, 4vh, 40px)` from the bottom of the hero and runs under the lower edge of the Slab, so "Lund" reads frosted through the glass. Not animated.
3. Ghost sheets: two `div.ghost` the size of the Slab, 10% paper with a 35% white border and no backdrop blur. They fan out at -1deg and 1.5deg like acetate on a light table. Cheap depth.
4. Shard (1200px and up): a narrow far pane, rotated -2deg, that holds only the light control, stacked as four discs.
5. Slab: the main clear pane at columns 7 to 12, rotated -3deg from the bottom left. Tier 1 glass (paper at 62%), `blur(22px) saturate(160%)`, a 1px 65% white border, a deep shadow and a 2px inner lip. `::before` is a static refraction ring masked to the 1px border. It holds four text elements: the eyebrow, the h1, a 13-word lede, and the primary CTA "Start a project" with a text link to the work. Its top and height come from `--slab-top` and `--slab-h`, which scale with the viewport so the hero fits a 1366x768 screen.
6. Lens: a 240px smoke circle that overlaps the Slab only inside its padding. "Now on site: Casa Azulejo Reading Room". This is the page's only status flag. A conic rim at 50% opacity, masked to the ring.
7. Nav: a floating clear bar, 16px from the top. No filled button in it, so the hero CTA stays the only primary action.

Edge light: each hero pane has a `span.edge` masked to its 1px border ring. Inside it a 320px white radial disc follows the pointer (`--ex`, `--ey`, rAF throttled, fine pointers only). The border lights up near the pointer and the text area is never brightened. The pointer is mapped into each pane's own rotated frame (the Slab's -3deg, the Shard's -2deg, read from the computed transform), so the light stays under the cursor on a tilted pane. The Lens drifts up to 12px against the pointer. On leave, the discs return to the top-left corner.

Between 900 and 1199px the Lens moves into the empty left column at 200px. At 375px the giant name moves to the top on two lines at 22vw, the Slab is full width and unrotated, one ghost sheet remains and the Lens shrinks to a small circle at the top right ("Now on site / Porto"). The primary CTA sits above a 667px fold. The Shard is hidden; the light control lives in the menu dialog and the footer.

## The light control

`fieldset.hour` with native radios: Follow scroll (default), 7:00, 12:00, 18:00. Each radio is a 44px disc painted with its hour. The checked one gets a 2px ink ring, a centre dot and an underlined label, so state never depends on colour alone. Keyboard focus adds a second ink outline 5px outside that ring, so focus and checked look different. It appears in the Shard, the mobile menu and the footer, and `main.js` keeps all three in sync. A manual choice overrides scrolling until "Follow scroll" is picked again, and is stored in `localStorage` under `lbl09-hour`.

Without JS the radios still work through `body:has(input[value="noon"]:checked)` rules.

## Page order

| Section | Hour | Layout |
|---------|------|--------|
| Hero | Morning | Layer stack above |
| About | Morning | Statement on the field in cols 1 to 5, tall clear pane in cols 7 to 12 dropped 96px |
| Work | Noon | Bento: 8 + 4 (offset 64px), 5 + 7, full bleed 21:9. Clear caption bars overlap each plate by 32px and hang 24px past its left edge |
| Services | Noon | Four glass fins at 0, 48, 96 and 48px offsets, each with a coloured top band |
| Words | Dusk | Big smoke quote in cols 1 to 8, two smaller smoke quotes in cols 9 to 12 |
| Contact | Dusk | Heading and note in cols 1 to 5, form pane in cols 6 to 12 |
| Footer | Dusk | Clear bar inset 16px, links, light control, small print |

Every section opens with a sentence-case `h2`. There are no numbered section labels; the hero eyebrow is the only eyebrow. Projects are `article`s, not links, so there are no dead hrefs and no hover lift (only the caption bar's light ring shows on hover). The contact intent uses one label everywhere: "Start a project" on the hero CTA and the submit button; the nav item keeps the section name, Contact.

## Fonts and palette

One Google Fonts request:

- Bricolage Grotesque (opsz 12 to 96, 500 to 800): giant name (800, opsz 96), headings (700, opsz 48), h3 and quotes (600 and 500).
- Instrument Sans 400 to 600: body copy, 17px (16px under 900px), line-height 1.65, measure up to 64ch.
- Fragment Mono 400: eyebrow, meta lines, placeholder labels, form legends. Uppercase, tracking 0.08em, never under 13px.

None of these fonts is used elsewhere in the collection.

Tokens live on `:root` in `styles.css`. Components use tokens only; no raw hex appears outside `:root`.

| Token | Value | Job |
|-------|-------|-----|
| `--ink` | #0E1A2B | Text, CTA fill, page background |
| `--ink-2` | #1B2638 | Secondary text on clear glass |
| `--paper` | #FFF8EC | Text on the CTA, focus halo |
| `--on-smoke` | #FFF8EC | Text on smoke glass |
| `--ember` | #6E1702 | Links, errors, tick icons |
| `--vermilion` | #FF4A1C | Field only |
| `--flame` | #FF6A2E | Field only |
| `--apricot` | #FF8A3D | Field only |
| `--saffron` | #FFB000 | Field, quote glyph |
| `--sun` | #FFF1D6 | Field hotspot and sun disc |
| `--teal` | #00897B | Field and teal ring |
| `--deep-teal` | #00524A | Placeholder art only (removed from the field so tier 2 glass passes contrast) |
| `--tile`, `--coral`, `--umber` | #9CC9D9, #FF7A59, #3B2418 | Placeholder art only |
| `--glass-near` | paper at 62% | Tier 1: Slab, form, nav, footer bar, menu |
| `--glass-clear` | paper at 42% | Tier 2: about pane, work bars, service fins, contact note |
| `--glass-ghost` | paper at 10%, no blur | Tier 3: ghost sheets |
| `--glass-smoke` | ink at 64% | Lens and quotes |

Contrast rules (worst cases):

- Ink on tier 2 glass (42%): about 7:1 over teal, 7.7:1 over vermilion. Ink-2: at least 4.8:1. Ember: at least 4.9:1 (worst case teal). Tier 1 glass is higher on every pair.
- Paper on smoke glass at 64%: about 5.4:1 over the sun hotspot, higher elsewhere.
- CTA, paper on ink: 17.6:1.
- Rule A: text under 24px never sits on the bare field. It goes on a pane or a folio chip (86% paper, no blur).
- Rule B: text on the bare field is ink only, at 30px or larger (h2s and the statement).
- Rule C: clear panes carry ink, ink-2 and ember. Smoke panes carry paper only, plus the decorative saffron quote glyph.

Focus ring: `outline: 3px solid var(--focus-ring)` (ink) at a 3px offset, with a 3px `--focus-halo` (paper) `box-shadow` inside it. Components that set their own shadow cannot remove the outline; `.btn:focus-visible` keeps its drop shadow under the halo and `.swatch:focus-visible` uses a 5px offset.

## Dark mode

`@media (prefers-color-scheme: dark)` redefines the tokens only. Panes become dark glass (ink #0E1A2B at 62% for tier 2, 72% for tier 1), text becomes #F3EADB with #C9D3E0 secondary and #FFB59A links, and smoke panes go deeper (74%). `--field-dim` lays a 50% night layer over the field, so the same hours read as evening. Borders, rules, inputs, shadows, lips and the focus halo all have dark values. Approximate worst cases: body text 8.7:1, secondary 6.9:1, links 6.1:1 on dark glass over the brightest dimmed field; bare-field h2s at least 3.3:1 (large text).

## ui-ux-pro-max results used

- `"glassmorphism" --domain style`: verified match. Used: backdrop blur 10 to 20px (here 14, 18 and 22px by depth plane, 12px on phones), translucent panes in three tiers (paper at 62% near, 42% mid, 10% for the ghost sheets; above the suggested 15 to 30% on the text panes because body text sits on them, with hard-edged field marks behind so the blur still reads), a subtle 1px light border, a vivid background and a text contrast check. Its accessibility flags (contrast 4.5:1, keyboard, visible focus, reduced motion) drove the checks below.
- `"glassmorphism portfolio" --design-system`: returned Minimalism and Swiss Style with a monochrome and blue palette. Off-topic, not used. Only its generic notes were kept: CTA label contrast against the button fill, static final state under reduced motion, 200 to 250ms hovers and a 30 to 50ms stagger.
- Typography search: returned Archivo with Space Grotesk ("Minimalist Portfolio", already used by a sibling, so avoided) and Inter ("Spatial Clear", suggested for glass interfaces). Inter was not used because it is the default AI stack; Instrument Sans gives similar legibility on moving backgrounds, with Bricolage Grotesque as the display face.
- Color domain: no glassmorphism match, and the retry returned generic portfolio palettes. The palette is custom, built as a warm painted field (vermilion, saffron, teal) under paper and ink glass.
- Rules applied from the pre-delivery checklist: 4.5:1 text contrast, visible focus, skip link, one h1 and sequential headings, 44px targets, no horizontal scroll at 375px, semantic tokens, one SVG icon family at 1.5px stroke, transform and opacity motion only, reduced motion, labelled form fields with hints and linked errors (each error is a `role="alert"` so it is announced on blur), an `aria-live` status. Type scale: h1 (`clamp(38px, 3.5vw, 52px)`) stays above h2 (`clamp(32px, 3.2vw, 48px)`), the statement and h3.

## Placeholders

Each placeholder is a styled box with `data-placeholder="true"`, `role="img"`, an `aria-label`, a visible label in the form "Reading room, blue tile and lamp light - 1600x1000" and an `<!-- Replace with Envato Elements image -->` comment right before it. The CSS art is a stand-in that matches the project. Swap the `div` for an `img` with `width`, `height`, `loading="lazy"`, `decoding="async"` and a real `alt`. The plate keeps its `aspect-ratio`.

| ID | Where | Ratio | Export size |
|----|-------|-------|-------------|
| IMG-ABOUT | About pane | 4:5 | 800x1000 |
| IMG-P1 | Work: Casa Azulejo Reading Room | 16:10 | 1600x1000 |
| IMG-P2 | Work: Salinas Public Baths | 3:4 | 900x1200 |
| IMG-P3 | Work: Cais 9 Ferry Terminal | 4:5 | 1000x1250 |
| IMG-P4 | Work: Orchard Room, Hospital do Vale | 16:10 | 1400x875 |
| IMG-P5 | Work: Seven Hours of Orange | 21:9 | 2100x900 |
| OG | Commented-out `og:image` meta in the `head` | 1.91:1 | 1200x630 |

On phones every work plate is 4:5 except IMG-P5 (16:10), so also export a 4:5 crop or use `object-fit: cover`.

## Motion

- Arrival, once: field fade, Slab rises 32px, ghosts, Lens scales from 0.94, Shard fades. About 1.1s. `will-change` is dropped on `animationend`.
- Edge light and Lens drift (fine pointer only, 900px and up). Pane rects are read inside the rAF tick, so there is no scroll or resize listener.
- Time of day: an IntersectionObserver on each section's `data-hour` sets `body[data-hour]`; the field crossfades over 900ms.
- Reveals: 16px rise with opacity, 40ms stagger capped at 6.
- Micro: button lift and press (`scale(.98)`, no layout shift), work bar light ring on hover, nav underline.
- Reduced motion: no arrival, no pointer tracking, no drift, no reveals, no hover transforms. The field stays at morning unless the visitor picks an hour, then it swaps instantly. Nothing auto-plays.

## Fallbacks

- No `backdrop-filter`: panes go to 94% paper and 92% ink.
- `prefers-reduced-transparency`: same as above, ghost sheets go clear.
- `prefers-contrast: more`: solid panes with a 2px ink border, edge light off.
- `forced-colors`: field, edge lights and ghosts hidden, panes get `CanvasText` borders.
- No JS: everything visible and static, the light radios still work, the nav links show inline on phones and the form shows "Demo form. Nothing is sent."

## Things to tweak

- The hours: the three gradient stacks on `.field__morning`, `.field__noon` and `.field__dusk`, plus their phone versions inside `@media (max-width: 899px)`. Deep teal is kept out of the field so tier 2 glass passes contrast.
- Which hour a section uses: its `data-hour` attribute.
- Glass strength: `--glass-near` (tier 1), `--glass-clear` (tier 2), `--glass-smoke` and the `--blur-*` tokens. Re-check contrast if you go below 62% near, 42% clear or 64% smoke, or if you put deep teal back in the field.
- The hard-edged marks behind the glass: `.field__marks` (sun disc size and position, ring size and stroke).
- Dark mode: the token block under `@media (prefers-color-scheme: dark)` and `--field-dim`.
- Radius rule: 28px for section panes, plates and quotes (`--r-xl`), 20px for nested or bar-shaped glass such as the nav, work bars, contact note, footer bar, Shard and about image (`--r-lg`), 14px for inputs (`--r-md`), 8px for chips (`--r-sm`), pill for buttons, circle for the Lens and swatches.
- The tilt: `rotate(-3deg)` on `.slab` and the ghost transforms.
- Where the giant name tucks under the Slab: `bottom` on `.giant` together with `--slab-top` and `--slab-h`. If you add copy to the Slab, nudge these so 120 to 180px of the name stays under the glass.
- Edge light size and strength: the 320px disc and `--edge-glow`.
- Menu, hour key and copy: the hour override is stored under `lbl09-hour`.
