# 15 Maximalism: "Palazzo Plum, the over-decorated house"

A one-page portfolio for a fictional surface pattern and interior designer, Ottavia Plum of Casa Plum in Naples (Chiaia). Plain HTML, CSS and a small vanilla script. No frameworks, no build step, no external images. Open `index.html` in a browser.

Files: `index.html`, `styles.css`, `script.js`, `README.md`.

## Style

Lavish interior and wallpaper maximalism. The page is one over-decorated Neapolitan apartment you walk through room by room, and every room has its own wallpaper, trim and colour clash:

| No. | Room | Content | Wallpaper | Trim at top |
|---|---|---|---|---|
| 0 | Vestibule | nav | ink rail | brass rail and bullion fringe |
| 1 | Salon | hero | damask, switchable | velvet valance |
| 2 | Library | about | chintz on lilac | rope cord |
| 3 | Long Gallery | work | oxblood silk damask | egg-and-dart cornice |
| 4 | Haberdashery | services and skills | cobalt polka | scalloped pelmet |
| 5 | Powder Room | fictional client quotes | regency stripe, fish-scale dado | bullion fringe |
| 6 | Writing Desk | contact (demo form) | cobalt chintz, walnut desk | gilt dado rail |
| 7 | The Floor | footer | perspective checkerboard | gilt rail |

Gilded frames hung salon style, damask against stripe against chintz against checkerboard, velvet swags, tassels, a high-contrast decorative serif colliding with a fat display face, and a script ornament. All depth comes from soft hang shadows, mouldings and velvet gradients. It deliberately avoids the signatures of other templates in this collection: no tape, polaroids or torn paper (04), no hard offset shadows, stickers or thick black outlines (03), no candy plastic or chrome (06), no system windows or terminal text (02), no long shadows (05).

Text rule: body and UI text never sits on a pattern. It sits on a solid plaque (cream with a gold-deep inner line, ink, oxblood, cobalt or emerald). Display words also sit on solid ribbons, cartouches or bands.

Design dials (taste-skill): **DESIGN_VARIANCE 9**, **MOTION_INTENSITY 6**, **VISUAL_DENSITY 8**.

## Hero approach: "The Salon Wall"

The hero is a room elevation, not a centred headline. Back to front: a damask wall with an egg-and-dart cornice, a gilt chair rail, a striped dado, a perspective checkerboard floor and a scalloped velvet valance with bullion fringe and two tassels.

- **Name collision.** "OTTAVIA" is set in Shrikhand on a solid ink swallowtail ribbon with a pink and oxblood extrude. "Plum" is Bodoni Moda italic 900 on an oxblood oval cartouche with a gilt rim, pulled up so it collides with the ribbon. The h1 reads "Ottavia Plum". The size is `clamp(3.25rem, 17cqi, 9.5rem)` against the headline container; "OTTAVIA" was checked to fit inside the ribbon at 320, 375, 414, 640, 768, 1024, 1280, 1440 and 1920.
- **Salon hang.** Five linked frames (arch, oval, octagon, landscape, square) plus two miniature pattern swatches hang from brass nails on picture cords, each with its own tilt and parallax depth. On phones it becomes a two-frame collage plus a square; at 768 a cluster of three.
- **Re-papering.** Three native radios ("Emerald Damask", "Cobalt Chintz", "Pink Regency") on a pinked fabric-sample card swap the wallpaper. With JS, six wallpaper drops unroll over the old paper with a back.out overshoot and a polite live region announces the new paper. Without JS, `:has()` swaps the wall instantly.
- **Bell-pull.** The right valance tassel is a real button ("Ring for new wallpaper") that cycles the colourways. On phones it sits under the frames as a labelled button. It stays hidden without JS.
- **Actions.** A pink enamel plaque ("See the rooms") and a brass price tag on a cord ("Commission a pattern · from €2,400") that swings on hover and focus.
- **Marquee.** A tangerine ribbon with bullion fringe, alternating Shrikhand and Bodoni italic, with a 44px pause/play button.

## Fonts

One Google Fonts request, `display=swap`, with preconnect:

```
https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=DM+Mono:wght@400;500&family=Pinyon+Script&family=Shrikhand&display=swap
```

| Token | Family | Role |
|---|---|---|
| `--f-display` | Shrikhand | The loud face: hero "OTTAVIA", room numerals, lot numbers, spine numbers, drawer names, door plate, marquee |
| `--f-serif` | Bodoni Moda | Emphasis word in every H2 (italic 600), hero "Plum" (italic 900), quotes, drop cap, lot titles, tagline |
| `--f-sans` | Bricolage Grotesque | Body and UI. Kickers, nav and plain heading words use the 75% width axis at 800, uppercase |
| `--f-mono` | DM Mono | Museum labels, placeholder tags, hints, prices, materials lines. 13px minimum, tabular numerals |
| `--f-script` | Pinyon Script | Ornament only: "OP" monogram, "with compliments", the signature and the footer flourish. Never running text, decorative copies are `aria-hidden` |

Mixing rule: every H2 pairs Bricolage condensed uppercase plain words with one Bodoni italic `<em>`, and a Shrikhand room numeral (aria-hidden) sits beside it. Not used: Inter, Playfair, Archivo, Fraunces.

## Palette

Light theme only. Tokens live on `:root` in `styles.css`.

| Token | Hex | Use |
|---|---|---|
| `--ink` | #2A0A2E | aubergine, main text, rail, dark plaques |
| `--cream` | #FFF4DE | plaques, form sheet, placeholders |
| `--cream-2` | #F7E6C4 | zebra rows, input hover |
| `--emerald` | #0B6E4F | default salon wall, success |
| `--oxblood` | #7A0E2A | gallery wall, buttons, errors, velvet |
| `--silk` | #6A0B24 | tone-on-tone damask |
| `--cobalt` | #1F3BFF | haberdashery, desk chintz, H2 band |
| `--pink` | #FF3D8B | enamel CTA, stripe, blooms |
| `--tangerine` | #FF7A1A | marquee, harlequin, buds |
| `--chartreuse` | #C8F031 | ribbon type, polka, focus inner ring, footer strip |
| `--turquoise` | #2EC4B6 | fish-scale, drawer |
| `--lilac` | #C9A7FF | library chintz ground |
| `--gold` | #E2B437 | gilt |
| `--gold-deep` | #8A6410 | gilt shadow, inner lines, restricted labels |
| `--gold-light` | #FFE08A | gilt highlight, text on dark |

Walnut (decorative only): #4A2A18, #5A3420, #6E4128. Semantic tokens: `--surface`, `--text`, `--action-bg`, `--action-text`, `--action-hover-bg`, `--cta-enamel`, `--error`, `--success`, `--ring-inner`, `--ring-outer`.

### Contrast (WCAG 2.x, computed)

| Pair | Ratio | Use |
|---|---|---|
| ink on cream | 16.29 | body text |
| ink on cream-2 | 14.45 | zebra rows, hover |
| cream on ink | 16.29 | footer text |
| cream on oxblood | 10.00 | submit, gallery heading |
| cream on silk | 11.41 | |
| cream on cobalt | 6.15 | haberdashery H2 band |
| cream on emerald | 5.73 | |
| oxblood on cream | 10.00 | errors, links, numerals |
| emerald on cream | 5.73 | success message |
| cobalt on cream | 6.15 | links in plaques |
| ink on pink | 5.33 | enamel CTA |
| ink on tangerine | 6.82 | marquee |
| ink on gold | 9.16 | drop cap, door plate |
| ink on gold-light | 13.78 | price tag, hover states |
| ink on chartreuse | 13.51 | footer strip |
| ink on turquoise | 8.20 | |
| ink on lilac | 8.85 | |
| gold on ink | 9.16 | nav, footer links, manifesto |
| gold-light on ink | 13.78 | kickers, plaques |
| pink on ink | 5.33 | powder room numeral, link underline |
| chartreuse on ink | 13.51 | "OTTAVIA" |
| gold-light on oxblood | 8.46 | "Plum", gallery kicker |
| gold-light on silk | 9.66 | |
| gold on oxblood | 5.62 | gallery numeral |
| chartreuse on oxblood | 8.30 | |
| gold-light on cobalt | 5.21 | haberdashery H2 emphasis |
| chartreuse on cobalt | 5.10 | haberdashery numeral |
| gold-deep on cream | 4.92 | restricted: DM Mono 500 labels only (materials lines) |

Banned as text: cream on pink 3.06, cream on tangerine 2.39, cream on turquoise 1.99, pink on cobalt 2.01, cobalt on ink 2.65, ink on gold-deep 3.31, chartreuse on cream 1.21. Use only at 24px and up: gold-light on emerald 4.85, chartreuse on emerald 4.75.

Colourway swaps change only the wall and dado variables. Text grounds never change, so every pair holds in every scheme. Colour is never the only signal: errors use an icon plus text, pressed filter pills get a check icon plus an underline, the active nav link gets a fringe underline, the selected swatch gets a check badge plus a bold label.

Focus ring on every ground: `outline: 3px solid var(--ink); outline-offset: 3px; box-shadow: 0 0 0 3px var(--chartreuse)`, so a chartreuse inner ring sits inside an ink outer ring.

## ui-ux-pro-max results used

- **Design system (`--design-system "maximalism creative portfolio"`).** It returned Brutalism (Archivo and Space Grotesk, neutral plus pink), which is off-topic for maximalism, and a retry with "maximalist pattern-clash portfolio" returned Brutalism again. Only its generic parts were used: the **Feature-Rich Showcase** structure (hero, six works, services, social proof, CTA), the **Stagger List** motion (300 to 450ms, back.out overshoot, final state rendered under reduced motion) and its checklist (no emoji icons, pointer cursor, 150 to 300ms hover transitions, 4.5:1 contrast, visible focus, reduced motion, test at 375, 768, 1024 and 1440).
- **Style (`--domain style "maximalism"`): Gen Z Chaos / Maximalism.** Borrowed selectively: marquee, z-index layering, rotation, `mix-blend-mode` multiply (linen overlay) and screen (frame glint, mirror sheen), `saturate()` on wallpaper layers only. Jitter, stickers and random placement were rejected to keep clear of the neo-brutalism and scrapbook templates. Its HIGH accessibility risk drove the solid-plaque text rule.
- **Typography (`--domain typography "maximalist bold expressive display"`).** Lexend Mega with Public Sans, Bebas Neue with Source Sans 3, and the Inter, Playfair italic and JetBrains Mono tri-stack were considered. Shrikhand, Bodoni Moda, Bricolage Grotesque and DM Mono, plus Pinyon Script, were chosen as the maximalist equivalent: a several-face stack with the same poster logic.
- **Colour (`--domain color "vibrant creative bold"`, after "maximalist jewel saturated" returned nothing).** The Creative Agency palette was the base: #EC4899 became `--pink`, #831843 became `--oxblood`, #0891B2 became `--turquoise`, #FDF2F8 became `--cream`. It was widened into a clashing jewel and candy palette, with every text pair checked (table above).
- **UX rule (High): auto-moving content needs a pause control.** The marquee has a 44px pause/play button with `aria-pressed`, pauses on hover, and becomes a static wrapped row under reduced motion.
- **Pro-rules pre-delivery checklist.** One SVG sprite in a single ornamental line family (1.75px stroke, currentColor), no emoji, pressed states that do not shift layout, semantic colour tokens, 44px targets, focus order equal to visual order, labels, hints and errors near fields with `aria-describedby`, a focused error summary on multi-error submit, decorative icons `aria-hidden`, a 4/8px spacing rhythm and a 66ch measure.

## Image placeholders

Every image is a styled placeholder: a cream box with a fine 45deg hatch and a centred DM Mono tag that names the content and the exact size. Each one is preceded by `<!-- Replace with Envato Elements image -->`, carries `data-placeholder="true"`, `role="img"`, an `aria-label` and an inline `aspect-ratio`.

| No. | Where | Content | Size (px) |
|---|---|---|---|
| 1 | Hero, arch frame | Portrait of Ottavia in the studio | 1200x1500 |
| 2 | Hero, oval frame | Pomegranate Riot wallpaper detail | 700x900 |
| 3 | Hero, octagon frame | Bar Fortunato tile detail | 600x600 |
| 4 | Hero, landscape frame | Teatro Minimo opera set | 1000x700 |
| 5 | Hero, square frame | Tutti Frutti plate | 800x800 |
| 6 | Library, arch frame under swags | Ottavia at her pattern table | 1000x1400 |
| 7 | Gallery lot 01, rect | Project cover: Pomegranate Riot room set | 1600x1000 |
| 8 | Gallery lot 02, octagon | Bar Fortunato interior | 1200x1200 |
| 9 | Gallery lot 03, oval | Sirens of Posillipo textile drape | 900x1200 |
| 10 | Gallery lot 04, landscape | Teatro Minimo stage, wide | 1200x800 |
| 11 | Gallery lot 05, square | Tutti Frutti table setting | 1000x1000 |
| 12 | Gallery lot 06, arch | The Parrot Suite bedroom | 1000x1300 |
| 13 | Powder Room, mirror | Client portrait: Livia Sorrentino | 400x400 (shown at 88px) |
| 14 | Powder Room, sampler | Client portrait: Teo Marangoni | 400x400 (shown at 88px) |
| 15 | Powder Room, cameo | Client portrait: Ada Ferri | 400x400 (shown at 88px) |
| README only | `<head>` | Open Graph share image | 1200x630 |

The three 88px portrait rings are too small for the full label, so their visible tag reads "Portrait · 400x400" and the full name is in the `aria-label` and in this table.

To swap one in: replace the `.ph` element with `<img src="..." alt="..." width="W" height="H" style="aspect-ratio: W / H; width: 100%; height: auto; object-fit: cover; border-radius: inherit">`, keeping it inside `.frame__mat` so the gilt frame, mat and glint stay. Octagon frames clip their image automatically.

## Motion

- Stagger List: entries run 300 to 450ms with back.out (`--ease-back: cubic-bezier(.34,1.56,.64,1)`), staggered 60 to 70ms, triggered by IntersectionObserver. Pre-animation states apply only under `html.js.motion`, so without JS everything is visible.
- Hero load: the valance drops, frames stagger in from a 4deg over-tilt, the ribbon unfurls, the cartouche pops last.
- One rAF loop (passive listeners, transforms only, paused when the salon and powder room are offscreen) drives scroll parallax (frames, valance lift, fringe sway, quote drift) and pointer tilt on fine pointers only. `will-change` is set on frames only while the pointer is inside the hero.
- Wallpaper drift uses `animation-timeline: view()` inside `@supports`; elsewhere the paper stays still.
- Frames straighten, glint and swap their mat on hover and focus. Drawers slide 250ms. The submit bell wobbles on a valid send.
- `prefers-reduced-motion: reduce`: no animations or transitions, the marquee becomes a static wrapped row with its button hidden, the rAF loop is not run, re-papering swaps instantly and frames rest at their tilt. The script also listens for changes to the setting.
- `forced-colors: active`: pattern layers are hidden, frames get a CanvasText border, plaques use Canvas and CanvasText, focus uses Highlight.

## Accessibility notes

Skip link ("Skip to the salon") first in the DOM; landmarks: header, nav "Rooms", main, one section per room with `aria-labelledby`, footer. One h1 (the hero name), an h2 per room, h3 per lot, drawer and quote group. 44px minimum targets (the rail CTA is 44px rather than 40px for this reason). Horizontal scrollers (bookshelf and filter row on phones) are labelled regions with `tabindex="0"` and a visible hint. The demo form uses visible labels, "Required" chips, DM Mono hints, inline errors with an icon, `aria-invalid`, a focused error summary when two or more fields fail, and a polite status line: "Message noted. Ottavia will reply within 3 working days. (This demo form does not send anything.)" Nothing is sent. All names, clients and quotes are fictional and marked "(fictional)" and `data-fictional="true"`.

## Things to tweak

- **Colourways.** Each scheme is a `[data-scheme="..."]` block in `styles.css` that sets `--wall`, the three motif layers (`--l1-mask`, `--l1-col`, and so on) and `--dado`. To add a fourth, copy a block, add a radio and label in the "Re-paper the salon" fieldset, add its name to `names` in `script.js`, and add a matching `html:not(.js) .salon:has(#cw-...)` block for the no-JS path.
- **Tile sizes.** `--damask-w`, `--damask-h` and `--chintz-tile` per breakpoint on `:root`; CSS patterns scale with `--t` (0.6 on phones, 1 from 768px).
- **Hero frames.** Positions live in `.hang__item--1` to `--7` (grid column, row and width) per breakpoint. Each frame's lean is the inline `--tilt`, and `--tilt-k` scales every tilt down on smaller screens.
- **Tilt range.** Change the inline `--tilt` values or `--tilt-k`.
- **Damask motif.** `--uri-damask` is one url-encoded SVG mask (half a pomegranate medallion, mirrored with `<use>`). Swap it for any black-on-transparent SVG.
- **Saturation.** Wallpapers use `filter: saturate(1.15)`; lower it on `.paper`, `.salon__dado`, `.room__paper--polka` and `.room__paper--stripe`.
- **Footer strip.** It is static. To animate it, reuse the marquee markup and keyframes and give it its own pause button.
- **Calmer motion.** Add `data-motion="calm"` to `<html>` to switch off parallax and pointer tilt while keeping the entrance animations.
- **Replacing placeholders.** See "Image placeholders" above. Keep the `aspect-ratio` so the frames do not jump.
- **Copy.** Every name, client, address and quote is invented. Replace before publishing.

## Notes

- `styles.css` is about 95KB uncompressed (about 20KB gzipped), above the ~60KB guideline, because of the pattern library, frame system and per-breakpoint layouts. Strip sections you do not need or minify it for production.
- Tested in Chromium at 320, 375, 414, 640, 768, 900, 1024, 1280, 1440 and 1920px (no horizontal scroll), with reduced motion, and with JavaScript disabled.
