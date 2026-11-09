# The Porto Album: scrapbook portfolio template

Bold scrapbook: one illustrator's travel album, with poster-size marker type on taped paper objects, warm kraft and cream stocks, and terracotta only where you can click.

Dials: DESIGN_VARIANCE 9 (asymmetric, overlapping, broken grid). MOTION_INTENSITY 3 (load settle, two pencil draws, hover straighten, envelope seal; nothing loops). VISUAL_DENSITY 5 (each section has one big object and 2 to 4 small ones).

A one-page portfolio for a fictional illustrator, Juno Varela, who draws maps, menus, book covers and live events in Porto. Every person, business, project and quote on the page is made up. Real Porto and Lisbon place names are used as geography only.

## Files

- `index.html`: the page. Semantic HTML5, one h1, skip link, inline SVG icons.
- `styles.css`: tokens on `:root`, mobile first, all textures in CSS.
- `script.js`: menu toggle, the work reveal, and the demo form. Vanilla, deferred, under 150 lines.
- `README.md`: this file.

There is no build step. Open `index.html` in a browser.

## Style and hero approach

Scrapbook. Every section is one physical paper object held down by one visible fastener. Nothing floats.

The hero is one big taped polaroid. The photo window holds the hero placeholder, a perforated stamp and a postmark. The H1 "Your place, drawn by hand." is written on the polaroid's chin in marker, with a pencil underline that draws itself under "by hand." A lined index card overlaps the right frame and holds the intro and the only hero button, "See the work". A cream ticket stub, clipped to the card, carries the availability status. A pencil note points at the button.

The H1 is 2 lines from 768px up and at most 3 lines at 375px. The hero fits the first viewport at 1440x900 and 1366x768.

Page order: Hero (big polaroid), About (notebook page with a photo booth strip and margin facts), Selected work (graph paper route with five connected stops), Services (fold-out map with a kraft cover), Quotes (poster quote, postcard, luggage tag), Contact (letter in a kraft envelope), Footer (kraft back cover with label-maker links).

## Fonts: four voices

One Google Fonts request: Permanent Marker, Caveat, Newsreader and Courier Prime.

| Voice | Font | Job |
| --- | --- | --- |
| Marker | Permanent Marker 400 | H1, H2, H3 and the poster quote. Never below 24px. |
| Pencil | Caveat 600 and 700 | Short notes, the signature, "Olá!", quote names, margin facts. Never below 22px. |
| Prose | Newsreader 400, 400 italic, 500 | All paragraphs. 18px, line height 1.65, 62ch max. |
| Typed | Courier Prime 400 and 700 | Nav, buttons, labels, tags, client lines, the index card, the ticket, the form, small print. |

Why: the bold angle needs a loud headline voice, and a felt-tip marker is the loudest honest tool in a scrapbook. Kalam reads too polite at poster size. Courier Prime is the album's typed voice, as on labels, tickets and letters. Newsreader carries the reading, because long monospace paragraphs tire the eye. Caveat is the pencil, kept small and rare so the marker stays dominant. Rejected: Patrick Hand as body (a handwriting body face fails the legibility rule) and Quicksand (a rounded app sans that reads as product UI).

## Palette

Every colour has one job. Terracotta marks buttons and links. The footer links are black label-maker tape, so the accent stays on the main actions. Masking tape means it is held down. Sage washi means status. Kraft is a paper stock. Everything else is ink on paper.

| Token | Hex | Job |
| --- | --- | --- |
| `--ground` | `#F3EAD7` | Page ground (also on `html`) |
| `--sheet` | `#FFFDF7` | Photo paper, cards, letter, postcard, map |
| `--cream` | `#FFFBEB` | Notebook, ticket stub, success slip |
| `--graph` | `#FBF8F0` | Work sheet |
| `--kraft` | `#C4A77D` | Kraft stock: map cover, stop 3 card, tag, envelope, footer |
| `--kraft-deep` | `#B08F5F` | Envelope flap and pocket (decorative) |
| `--tape` | `#EDE3C9` (88% alpha) | Masking tape, tags, placeholder labels |
| `--washi` | `#B7C9A8` | Status tape only |
| `--rule` | `#C9D9E8` | Notebook rules (decorative) |
| `--margin` | `#E9B8B0` | Notebook margin line (decorative) |
| `--ph` | `#EFE6D2` | Placeholder fill |
| `--ink` | `#1F1A17` | Text |
| `--pencil` | `#4A4A4A` | Secondary text, pencil drawings |
| `--accent` | `#9A3412` | Buttons, links, focus ring |
| `--accent-press` | `#7C2D12` | Hover and pressed state |
| `--on-accent` | `#FFFDF7` | Text on terracotta |
| `--status` | `#065F46` | Status text |
| `--status-dot` | `#047857` | Status dot |
| `--error` | `#A11D2E` | Form errors, always with an icon and text |
| `--field-border` | `#57504A` | Input borders |
| `--field-bg` | `#FFFFFF` | Input and radio fill |
| `--placeholder` | `#6A625B` | Placeholder text |
| `--metal` | `#6B7075` | Paper clip stroke (decorative) |
| `--ink-soft` | `#3A322D` | Label-maker tape hover |

Measured contrast (WCAG):

| Pair | Ratio |
| --- | --- |
| Ink on ground / sheet / cream / graph | 14.41 / 16.94 / 16.62 / 16.24 |
| Ink on tape / washi / kraft | 13.49 / 9.79 / 7.53 |
| Pencil on ground / sheet / cream | 7.41 / 8.71 / 8.55 |
| Accent text on ground / sheet / tape | 6.11 / 7.18 / 5.72 |
| On-accent on accent / accent-press | 7.18 / 9.21 |
| Error on sheet / ground | 7.56 / 6.43 |
| Field border on sheet (non-text) | 7.79 |
| Sheet on ink / ink-soft (label-maker tape) | 16.94 / 12.33 |
| Focus ring on ground (non-text) | 6.11 |
| Ink focus ring on kraft (non-text) | 7.53 |

Pencil on kraft is only 3.87, so pencil text never sits on kraft. Accent text on kraft is 3.19, so links on kraft are ink with an underline, and the focus ring turns ink on kraft (map cover, stop 3 card, footer) and on fields that show an error.

Type sizes: body text is 18px, form labels 16px. Tags, the ticket label, placeholder labels and the footer heading are 14px bold uppercase Courier. They are one to three words long, so they stay at 14px.

## Tilt, fasteners and paper stocks

Tilt tokens: `--t-a -3deg`, `--t-b -1.5deg`, `--t-c -0.6deg`, `--t-d 1deg`, `--t-e 2deg`, `--t-f 4deg`. Every rotated object has the class `tilt` and sets `--r` to one token. The rotation is multiplied by `--tilt-k`, which is 1 from 768px and 0.5 below. Large text sheets never go past 0.6deg.

Fasteners: masking tape (the default), sage washi (status only), a paper clip SVG, or four kraft photo corners. Each pasted object uses exactly one kind.

To add a new pasted object:

1. Pick a paper stock (`--sheet`, `--cream`, `--graph` or `--kraft`).
2. Add `class="tilt" style="--r: var(--t-d)"` with one tilt token.
3. Add one fastener, for example `<span class="tape tape--card" aria-hidden="true"></span>` positioned over its top edge.
4. Use `--shadow-paper`. If the object has a masked edge, put `filter: var(--drop)` on a wrapper instead.

Corner radius is 2px everywhere (`--radius`). Circles appear only on decorative shapes.

## Placeholders

Seven image slots. Each is a styled box with `data-placeholder="true"`, `role="img"`, an `aria-label` and the comment `<!-- Replace with Envato Elements image -->` directly before it.

| # | Slot | Size |
| --- | --- | --- |
| 1 | Hero photo, Juno sketching by the river | 2000x800 |
| 2 | Photo booth strip, four frames of Juno | 400x1200 |
| 3 | Market map unfolded on a stall counter | 1600x1100 |
| 4 | Tasca menu with plate drawings | 1000x1250 |
| 5 | Three book covers fanned on a table | 1200x1500 |
| 6 | Live drawings pinned to the factory wall | 1600x1000 |
| 7 | Tram zine, open spread | 2000x900 |

To swap in a real image: search for `data-placeholder="true"`, replace the `div.ph` with an `<img>` that keeps the description as its `alt` text, and delete the comment. Give the image `width: 100%`, `height: 100%` and `object-fit: cover`. The hero window keeps its clamped height. Stamps, postmarks, clips, the compass and the scale bar are inline SVG drawings, not images.

## Links and form

- Case study links ("Read the story", "Flip through the zine") point to `#work` and carry `data-placeholder-link="true"`. Point them at real pages when they exist.
- Social links (Instagram, Behance, Newsletter) point to `#` until real profiles exist.
- The contact form is a demo and sends nothing. Without JS, native `required` and `type="email"` validation runs. With JS, the script adds `novalidate`, shows inline errors and a status line that counts the fields to fix, then plays the seal and shows a slip that says nothing was sent. To use it, set the form `action` to a form service, remove the demo submit handler in `script.js` and remove the demo line in the slip.

Quotes, people and businesses are fictional.

## Motion

Every animation has a reason. Easing `cubic-bezier(.2, .7, .2, 1)`, 150 to 520ms. No loops, no marquee, no parallax, no scroll listeners.

1. Hero settle: the polaroid, card, ticket, stamp and tapes are laid on the page. The H1 never fades.
2. Hero underline draw under "by hand." (stroke-dashoffset).
3. Work stops paste in via IntersectionObserver. Content is hidden only under `html.js`. Every stop is revealed at once if the observer is missing, and a 2000ms timeout reveals any stop left.
4. Route connectors draw when the next stop lands (stroke-dashoffset on an SVG mask).
5. Hover: label-maker links straighten and lift. A work stop straightens and lifts when its link is hovered or focused, since only the link is clickable.
6. Envelope seal: the letter drops in, the flap closes, a postmark stamps, then the slip fades up.
7. Mobile menu fades and slides 8px.
8. Buttons: colour change and a 1px press.

Items 2 and 4 are the "sketch reveal" exception to the transform and opacity rule. They animate small inline SVG paths and paint only.

With `prefers-reduced-motion: reduce`, everything renders at rest: no settle, lines fully drawn, no hidden stops, an instant envelope swap, and hover keeps only the shadow change.

## Browser support and testing

Masks, `clip-path`, `mask-composite` and `aspect-ratio` need current evergreen browsers. Where masks are missing, torn and perforated edges fall back to straight ones. No content depends on a mask.

Tested at 375x812, 768, 1024, 1366x768 and 1440x900 in Chromium: no console errors, no horizontal scroll, hero inside the first viewport.

## Things to tweak

- Name, copy and projects: all in `index.html`.
- Colours and tilt: the tokens at the top of `styles.css`.
- Status date: search for "March 2027" (hero ticket). The contact washi label says "Usually booked six weeks ahead".
- Connector positions: `.connector--1` to `.connector--4` in `styles.css`, as percentages of the route.

## Search results used

The ui-ux-pro-max design-system search returned an off-topic Brutalism result and was not used. Its pre-delivery checklist was applied. The style reference is "Anti-Polish / Raw Aesthetic" (hand-drawn, collage, tape overlays, small rotation, sketch reveals), plus the sticker layering idea from "Gen Z Chaos" without its neon or jitter. The terracotta `#9A3412` and cream `#FFFBEB` come from the "Recipe and Cooking" colour result. Typography results (Caveat with Quicksand, Kalam with Patrick Hand) were weighed and replaced by the four-voice pairing above.
