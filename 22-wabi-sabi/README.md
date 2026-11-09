# 22 Wabi-sabi: The Mended Bowl

## What this is

A one-page portfolio template for Ines Moriya, an invented ceramicist and object designer with a small studio in Porto. Every person, business, address and quote is fictional. The email uses the reserved `.example` domain.

Style: wabi-sabi, the Japanese idea that things are beautiful because they are imperfect, temporary and unfinished. The page reads like a small-press studio catalogue that has been handled a lot: numbered sections (ii. to vi.), numbered plates, wide margins and offsets that never quite line up, though each one is deliberate.

Dials (taste-skill v2): DESIGN_VARIANCE 7, MOTION_INTENSITY 3, VISUAL_DENSITY 2.

## Files

- `index.html`: markup, a small SVG sprite (torn edges, wavy underline, hairline, brush stroke, error mark), the inline hero bowl and the ensō
- `styles.css`: tokens, grid, textures, components, motion and reduced-motion rules
- `script.js`: hero settle sequence, repair toggle, menu sheet, scroll reveal, active nav and demo form validation (about 130 lines, no libraries)
- `README.md`: this file

There is no build step. Open `index.html` in a browser.

## Hero approach

One very large tea bowl (chawan) drawn in inline SVG fills most of the first screen. It is cropped by the right edge of the page and tilted a few degrees. The body is hand-thrown rather than perfect: straight-ish walls, a rim with small uneven undulations, the left rim higher than the right, one flank fuller than the other and a foot ring set off-centre and tilted. It has a dark ash glaze (mottling stretched vertically, so it reads as glaze running down), a lighter ash drip with wobbly edges (feTurbulence plus feDisplacementMap), throwing rings and an unglazed clay foot with a speckle filter. It is cracked into three pieces, joined by one thin kintsugi gold seam. That seam is the only strong accent on the page. Gold comes back later only as small static marks (nav hairline, index seam, divider, quote dots, submit hairline, the plate 3 mend and the footer crack).

The text sits left, with a ragged three-line H1. The middle line steps in by half an em, as if set by hand. On desktop the rim of the bowl tucks about 30px behind the end of the H1's first line, the caption ("Fired in an anagama...") runs vertically in column 1 with its foot level with the links, and the repair toggle sits just under the foot of the bowl. The eyebrow, H1, lede, links and toggle all fit in the first screen from 1024x768 up. Below 1024px the caption becomes a normal line and the toggle follows the links. On phones the bowl is cropped on its left so the whole seam stays in view.

**The repair toggle.** "See it before the repair" is a native `<button>`. Its label names the action and swaps to "See it mended" (so it has no `aria-pressed`: a toggle button's label must not change with its state). Pressing it fades the gold seam out over 600ms, shows the bare dark cracks and moves the loose shard 6px further out. The line under the button changes to "Cracked in the kiln, 2024. Mended in the studio, 2025." (in an `aria-live` span), and the SVG `<desc>` (linked with `aria-describedby`, the `<title>` is the name) is rewritten so screen readers hear the new state. A "How mending works" link goes straight to the Mending service. Without JS the toggle is hidden and the bowl shows mended.

**Editing the crack.** The cracks are two paths with class `b-crack`. The gold seam is four paths with class `seam` (two at 2.5px in `--gold-light`, two 1px highlights in `--gold-glint`). The seam paths must use exactly the same `d` as the crack paths. The loose shard is the shape in `#mask-shard` and `#clip-shard` (keep those two identical): its inner edges must follow the crack points, and its outer side may run past the bowl, because the shard is also clipped by `#clip-body`. If you redraw the crack, update all three places. If you redraw the body, `#clip-body` and `.b-body` share one `d`. The shard pivots around its own centre (`transform-origin: 668px 520px` in bowl units).

## Fonts

Google Fonts, one request:

`https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap`

- Display: **Shippori Mincho** 400/500 (H1 to H3, quotes, wordmark, section markers). This follows the database's "Japanese Elegant" direction (Noto Serif JP plus Noto Sans JP), with a quieter Mincho in place of Noto Serif JP. Fallback: "Noto Serif JP", serif.
- Body and UI: **Zen Kaku Gothic New** 400/500. Fallback: system-ui, sans-serif.
- 500 is the heaviest weight anywhere. Sizes use `clamp()` from 375px to 1440px: H1 44 to 88, H2 32 to 52, H3 22 to 28, lede 18 to 21, body 16 to 17 (line-height 1.7, 62ch), meta 12 to 13 (letter-spacing 0.12em, tabular figures).

## Palette and contrast

**Source note.** ui-ux-pro-max returned no verified wabi-sabi colour match (the colour domain gave 0 results for "wabi-sabi" and "artisan ceramics earthy handmade", and an off-topic agriculture palette for "earth"). This palette is a fallback taken from the database's "Nature Distilled" style and desaturated toward ash, sumi and clay. Terracotta #C67B5C and sand #D4C4A8 from that entry are not used as text, or at all.

| Token | Hex | Use | Measured contrast |
| --- | --- | --- | --- |
| `--paper` | #EEE8DC | page ground | |
| `--paper-deep` | #E3DACB | Studio, Services, Contact | |
| `--sumi` | #2A2723 | text, button fill | 12.18 on paper, 10.73 on paper-deep, 9.63 on linen |
| `--ash` | #5E5848 | secondary text, meta | 5.80 on paper, 5.11 on paper-deep |
| `--rust` | #8A4B2F | links, errors, form error status | 5.50 on paper, 4.85 on paper-deep |
| `--moss` | #555C49 | success status | about 5.8 on paper, 5.1 on paper-deep |
| `--glaze` / `--glaze-shade` / `--glaze-lip` / `--glaze-run` | #3E3A33 / #34302A / #4A453D / #6E685E | bowl only | decorative |
| `--clay` / `--linen` / `--line` | #A88B6C / #D9CFBD / #CFC5B3 | foot, swatches, hairlines | decorative only |
| `--gold` | #8F6D2C | gold marks on light grounds | 3.92 on paper (graphics only, never text) |
| `--gold-light` | #C9A458 | seam on the bowl, gold on cedar | 4.81 on glaze, 6.39 on cedar, 6.32 on sumi |
| `--gold-glint` | #E3C98A | 1px highlight on the hero seam | decorative |
| `--cedar` | #2A2622 | Words and footer ground | |
| `--on-cedar` | #E9E2D4 | text on cedar | 11.65 |
| `--on-cedar-dim` | #A39B8E | secondary text on cedar | 5.46 |
| paper on sumi | | "Send the letter" label | 12.18 |

Deviation: the brief gave moss as #5C6350, which measured 4.52:1 on paper-deep, too close to the limit once the grain layer sits on top. It was darkened to #555C49. Placeholder labels sit on a small paper chip so ash text stays at 5.8:1 over the textured fill. The grain layer (multiply at 9%) darkens the ground by a few percent, which lowers every ratio slightly; all text pairs still clear 4.5:1.

Components use tokens only. The only literal colours outside `:root` are inside `data:` URIs (the field stroke uses sumi #2A2723 and the clay noise uses the clay values), where CSS variables cannot reach. The radio rings are masks, so their colour is still `var(--sumi)`.

## Texture techniques (no image files)

- **Paper grain:** `body::before`, fixed, an SVG `feTurbulence` tile (fractalNoise, baseFrequency 0.8, 3 octaves, desaturated) at 9% multiply. Every texture tile sets its filter region to the exact tile size (`filterUnits='userSpaceOnUse'`) and is drawn at the size it is shown, so `stitchTiles` joins the edges without seams. On cedar sections a second grain sits at 12% soft-light. It is static and never animated.
- **Washi fibres:** a stretched turbulence (baseFrequency "0.02 0.4") at 5% on paper-deep grounds and placeholders.
- **Torn edges:** three 2560 x 24 SVG paths in the sprite (`#tear-a`, `#tear-b`, `#tear-c`) made of soft curves at uneven spacing (8 to 60px) with a few fibre spurs. They use `preserveAspectRatio="xMinYMax slice"`, so they are never stretched: the tooth size is the same at 375 and 1440, and wider screens just show more of the edge. They are filled with the section's own ground colour and placed at the top of Studio, Services, Words, Contact and the footer. Neighbours never repeat. The footer and Contact flip theirs horizontally.
- **Edges:** placeholders use three `clip-path` polygons (`.edge-a`, `.edge-b`, `.edge-c`), 16 to 18 points each, nudged 1 to 4px off a rectangle. Swatches, the button and quote dots use their own irregular polygons. There are no border-radius tokens and no pills. Form fields get a 2px radius on the top corners only.
- **Ensō:** one filled, tapered path (about 15px wet at the lower left, thinning to 2px), roughened with a small `feDisplacementMap`, plus a dry-brush copy of the tail broken into bristle streaks by a stretched `feTurbulence` used as an alpha mask.
- **Shadows:** only two. A blurred ellipse under the bowl (sumi at 8%) and a soft `0 18px 30px -22px` sumi shadow under the Studio portrait. No other gradients apart from the blurred shading inside the bowl glaze.

## Placeholders

Every image is a styled box with `data-placeholder="true"`, `role="img"`, an `aria-label`, a visible label with its exact size, and an `<!-- Replace with Envato Elements image -->` comment directly above it. Space is reserved with `aspect-ratio`, so nothing shifts when you swap in a real image.

| Where | Intended content | Size |
| --- | --- | --- |
| Studio | Portrait of Ines at the wheel, hands in focus | 960 x 1200 |
| Plate 1 | Five tea bowls on linen, side light | 1600 x 1200 |
| Plate 2 | Plated dish on slate counter, overhead | 1600 x 2000 |
| Plate 3 | Mended jug on plinth, gold seam visible, gallery wall | 1600 x 1067 |
| Plate 4 | Paper pendant lit at dusk | 1200 x 1600 |
| Plate 5 | Three vases against limewashed wall | 1600 x 1200 |

To swap one in, replace the `div.ph` (keep its `edge-*` class on a wrapper if you want the hand-made edge) with:

```html
<img class="edge-b" src="images/kasa.jpg" alt="Five tea bowls on linen, side light" width="1600" height="1200" style="aspect-ratio: 1600 / 1200; width: 100%; height: auto; object-fit: cover" loading="lazy">
```

Reuse the `aria-label` text as the `alt` text. Keep the aspect ratio. The plate 3 gold mend mark (`.plate__mend`, a dark shard with a gold crack) overlaps the image's lower right corner and can stay.

## Motion

At most two things move in any view, and nothing moves on its own after load.

1. **Hero, once on load.** The loose shard starts at `translate(14px, -10px) rotate(2.5deg)` and invisible, then settles over 1600ms (after 400ms) with `--ease-settle` (`cubic-bezier(0.22, 0.61, 0.36, 1)`). Then the seam draws itself from rim to foot (stroke-dashoffset 1 to 0, 2000ms). It never loops.
2. **Scroll reveal.** H2s and plate images rise 12px and fade in over 900ms when 20% is in view (IntersectionObserver, unobserved after firing). Captions do not animate.
3. **Hover, 220ms.** Wavy underlines redraw, plate placeholders lift 3px, gold hairlines appear under nav links and plate titles, the index seam fragment appears and the title darkens with a hairline text-shadow (not a weight change, so wrapped titles never re-break), and the submit hairline lengthens from 40% to 80%. No scale, no glow.
4. **The toggle**, 600ms, only when pressed.

No parallax, marquees, autoplay, cursor effects or scroll-jacking, so no pause control is needed.

**Reduced motion** (`prefers-reduced-motion: reduce`): every duration becomes 0.01ms. The shard renders settled and the seam fully drawn. Reveals are visible from the start (the observer is never attached). The toggle swaps instantly.

**Without JS** everything is visible and mended. Hidden starting states only apply under `html.js`, and the toggle is hidden. A tiny inline script in `<head>` adds `js` early (no flash) and takes it away again if `script.js` fails to load (`onerror`) or has not added `js-ready` within 2.5s, so a missing or broken script can never leave headings, plates or the seam invisible.

## Navigation and accessibility

- Skip link "Skip to the work" is the first focusable element.
- The header never sticks, so it cannot cover focused elements.
- Desktop nav links sit 0, 2, 1, 3 and 0px lower than each other. The active link (set by scroll position) gets `aria-current`, weight 500 and a crooked gold hairline, so colour is not the only signal. Each link reserves its bold width with a hidden copy (`data-text` plus `::after`), so nothing shifts as the weight changes. Checked radio labels do the same.
- Below 1024px a "Menu" text button opens a full-height paper sheet with focus trapped inside. Esc or "Close" closes it and returns focus to the button. Choosing a link also closes it.
- Focus: 2px sumi outline, 3px offset, with a 6px paper halo (on cedar, an on-cedar outline with a cedar halo). It is never removed and never depends on hover. Radios move the ring to their label with `:has()`; browsers without `:has()` keep the ring on the input itself.
- Decorative SVG is `aria-hidden` and `focusable="false"`. The bowl is `role="img"` with a title and desc.
- Touch targets are at least 44px with at least 8px between them.
- Errors show an open-circle mark plus text, checked radios show an ink dot, and links are underlined.

## The form

There is no backend. `script.js` validates on submit and then on blur, sets `aria-invalid`, shows the error under each field (linked with `aria-describedby`), moves focus to the first invalid field, and on success shows "Thank you. Your letter is on my desk. I'll write back within a week." in the `role="status"` line before resetting the form.

To connect a real endpoint (Formspree, Netlify Forms, Basin or your own), add `action` and `method="post"` to `<form id="letter-form">`. Then in `script.js`, at the comment "No backend in this template", replace the success lines with a `fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })` and show the thank-you message once the response is ok.

## Layout and breakpoints

- 375 (base): 4 columns, 16px gutters. 768: 8 columns, 40px margins. 1024: 12 columns, 56px margins. 1440: 80px margins, 1280px max content.
- Each section heading starts on a different column (Studio 3, Work 1, Services 7, Words 2, Contact 5), so the left edge wanders down the page.
- Section markers sit just left of their H2 (one gutter away, at cap height) from 1024px up, and inline above the H2 below that.
- Vertical text (hero caption, Services note, footer note) turns horizontal below 1024px.
- Checked with headless Chrome at 320x640, 375x812, 768x1024, 667x375 and 812x375 (landscape), 1024x768, 1280x720, 1440x900 and 1920x1080: `scrollWidth` equals the viewport width at each, the whole seam sits inside the viewport, and the text never overlaps the seam or the foot. Short landscape screens (560 to 1023px wide, up to 560px tall) put the text beside a smaller bowl, so the H1 is in the first view.

## Things to tweak

- **Bowl position:** `.bowl` in styles.css (`width`, `left`/`right`, `top`, `rotate`) per breakpoint. On mobile, `.hero__text { padding-top }` keeps the text clear of the seam. If you move the bowl, move this too. From 1024px up the bowl reads `--bowl-w`, `--bowl-left` and `--bowl-top` from `.hero`, and the toggle is placed from the same values, so change them there.
- **Glaze colour:** change `--glaze`, `--glaze-lip`, `--glaze-run` and `--glaze-shade` together. Mottling strength is `.b-mottle { opacity }`.
- **Grain strength:** `body::before { opacity }`.
- **Section rhythm:** `--pad-a` and `--pad-b` (64/104 on mobile, 104/168 on desktop). The 240px pause after the hero is the hero's `padding-bottom` at 1024px and up (Studio itself keeps the normal `--pad-b`, so the pause is not doubled).
- **Copy:** keep it plain and first person. There are no em-dashes or en-dashes anywhere. Use "to" for ranges.

## ui-ux-pro-max results used

- `--design-system 'wabi-sabi portfolio'`: generic Minimalism and Swiss Style with a blue accent, judged off-topic. Its general rules were kept: CTA label at 4.5:1 or better on its fill, focus visible on its own, static final hero state under reduced motion, 200 to 250ms hover, tested at 375/768/1024/1440.
- `--domain style`: "wabi-sabi" gave 0 results. "organic natural earthy texture" matched **Nature Distilled** (muted earthy palette, grain overlay at about 0.1, natural ease-out, humanist type, varied organic radii) and **Organic Biophilic** (natural textures, organic curves, soft natural shadows). Nature Distilled is the base, desaturated toward ash, sumi and clay.
- `--domain typography`: "calm japanese serif elegant" gave **Japanese Elegant** (Noto Serif JP plus Noto Sans JP). Used as the direction, with Shippori Mincho and Zen Kaku Gothic New.
- `--domain color`: no verified match (see the palette note above).
- `--domain ux 'reduced motion animation'` and the quick-reference and pre-delivery checklists: 1 to 2 animated elements per view, transform/opacity/stroke-dashoffset only, contrast, focus, skip link, sequential headings, 44px targets, visible labels, errors below fields with `aria-describedby`, `aria-live` status, semantic input types with autocomplete, `min-height: 100dvh` instead of 100vh, `font-display: swap`, reserved media space.
