# 12-bento-box: Signal block

A bento box portfolio template for a fictional designer. All names, clients and quotes are invented.

The fictional owner is Marta Kovač, an independent brand and type designer in Rotterdam. Her clients, projects, quotes and the email domain `martakovac.example` do not exist.

## Files

- `index.html`: all content and markup.
- `styles.css`: tokens, the shared grid, tiles and every layout.
- `script.js`: optional behaviour (clock, reshuffle, reveal, copy button, form checks), loaded with `defer`. The page works without it.
- `README.md`: this file.

No frameworks and no build step. Open `index.html` in a browser.

## Style

- Style name: Bento box grid ("Signal block").
- One 6-column grid, one 16px gap and one radius family (24px tiles, 16px media, 12px inputs). The top bar, every section and the footer are built from tiles on that grid.
- Each tile does one job: one big word, one number, one image or one short block of text.
- Warm neutral canvas, white paper tiles, near-black ink tiles for weight, and signal orange used sparingly: at most one orange tile per section, and none in the contact section.
- Sections open differently. About and Sample quotes put the label tile on the right edge, Selected work opens with a full-width label row, and Services and Contact start top left.

## Hero approach

The hero is the grid. Seven tiles fill a 6 x 5 block at desktop: name (4x3), portrait (2x3), role (2x2), status (1x1), Rotterdam time (1x1), stats (2x1) and a featured project (2x2). In the markup, status and time come straight after the name, so on phones they sit in the first screen.

The "Reshuffle grid" button in the name tile cycles three layouts. Every tile keeps its span in all three, so the move is a translate-only FLIP animation over 480ms. The name tile, which holds the `h1` and the button, stays in the top row in every layout, so reading order and visual order start in the same place. The DOM order never changes, so keyboard focus stays on the button. A hidden status line announces "Layout 2 of 3". With reduced motion the layout swaps instantly. The button appears at 1024px and up, and only with JavaScript on.

Trade-off: in layout "b" the name tile moves to the right half of the top row, so the button moves under the pointer. Remove layout "b" from `layouts` in `script.js` if that matters for your audience.

## Fonts and palette

Fonts (Google Fonts, `display=swap`, with preconnect):

- Space Grotesk 500 and 700 for display type, headings, figures and quotes.
- Archivo 400 to 700 (width axis 62 to 125) for body text and the wide uppercase labels (`font-stretch: 118%`).

Palette tokens in `:root`:

| Token | Value | Use |
|---|---|---|
| `--canvas` | #EEEBE4 | Page background |
| `--paper` | #FFFFFF | Default tile |
| `--ink` | #141311 | Text and ink tiles |
| `--on-ink` | #F4F1EA | Text on ink |
| `--on-ink-muted` | #B8B2A7 | Secondary text on ink |
| `--muted` | #5C5852 | Secondary text on paper and canvas |
| `--line` | #DAD5CB | Hairlines and chip borders |
| `--field-border` | #7D776D | Form control borders (4.4:1 on white) |
| `--accent` | #FF5B1F | Orange fill only |
| `--on-accent` | #141311 | Text on orange |
| `--danger` | #B42318 | Error text and invalid borders |

Measured contrast: ink on paper 18.6:1, on-ink on ink 16.5:1, on-ink-muted on ink 8.8:1, muted on paper 7.1:1, muted on canvas 5.9:1, ink on orange 6.0:1, danger on paper 6.6:1.

Orange on white is 3.1:1, so orange is never used for text. It is a fill, with ink text on top.

## Research used (ui-ux-pro-max)

- Style search "bento grid", result 1 "Bento Box Grid": varied tile sizes, asymmetric grid, 4 to 2 to 1 column collapse (here 6 to 4 to 2), 16px gap, 16 to 24px radius, neutral page with white tiles, subtle shadow, hover scale 1.02.
- Typography search "bento portfolio modern", result 1 "Minimalist Portfolio": Space Grotesk for headings and Archivo for body.
- Colour search "bento neutral", result 2 "Generative Art Platform": the neutral canvas plus one accent structure. The pink accent was swapped for orange because the synthwave template in this collection already uses pink.
- Design-system runs returned off-topic styles and blue or purple colours. Those were not used. Their pattern notes were kept: quotes sit before the contact section, and there is no carousel.
- The pre-delivery checklist: inline SVG icons with one stroke width, 150 to 300ms hover transitions, visible focus, 44px targets, labelled fields with helper and error text, reduced motion, reserved image space.

## Edit content

All copy lives in `index.html`, in this order:

- Top bar: the "MK" mark, section links and "Get in touch".
- Hero: name, role, status, time, stats and the featured project.
- `#about`: bio, studio photo, Now, Tools and Facts.
- `#work`: six `<article>` tiles with ids `project-...`, plus the archive tile.
- `#services`: Identity, Type design, Packaging, Interfaces and the process steps.
- `#quotes`: three sample quotes. Keep the "Sample quote" chips and "(fictional)" until you have real quotes with permission.
- `#contact`: email tile, details and the form.
- Footer: wordmark, social links, back to top, legal line.

The clock shows Europe/Amsterdam time. Change `timeZone` in `script.js` and the "Rotterdam" label in `index.html` for another city. Without JavaScript the tile shows "CET" and "Rotterdam time zone", not a time.

## Replace images

Every image is a placeholder `div` with `data-placeholder="true"`, `role="img"`, an `aria-label` and a visible label with the intended size. Each one has the comment `<!-- Replace with Envato Elements image -->` above it.

To swap one:

1. Search `index.html` for `data-placeholder="true"`.
2. Replace the whole `div class="ph"` with a plain `<img>`. Set `src`, `alt`, and `width` and `height` to the size on the label. Keep the `style="--ar: ..."` from the placeholder.
3. Do not give the image the `ph` class. That class adds padding, a border and the striped background. `styles.css` already has a `.tile--media > img` rule for the radius, the fill and `object-fit: cover`.
4. Remove the comment.

Example:

```html
<img src="images/lantaarn.jpg" alt="Lantaarn Festival poster wall" width="1600" height="900" style="--ar: 16/9">
```

Each label size matches the shape of its tile at 1440px, within about 7 percent. The `--ar` value is the same ratio, and it sets the box below 640px.

| Slot | Label | `--ar` |
|---|---|---|
| Hero portrait | Portrait - 1000x1000 | 1/1 |
| Hero featured | Featured project cover - 1600x800 | 2/1 |
| About studio | Studio photo - 1000x1000 | 1/1 |
| Project 01 | Project cover, Halvemaan Ferries - 1600x900 | 16/9 |
| Project 02 | Project cover, Oortje Hot Sauce - 1000x1200 | 5/6 |
| Project 04 | Project cover, Lantaarn Festival - 1600x900 | 16/9 |
| Project 05 | Project cover, Plantkas - 1600x900 | 16/9 |
| Project 06 | Project cover, Grid Weekly - 2400x900 | 8/3 |

Project 03 (Vos Grotesk) has no image. It shows a large "Aa" on the orange tile.

At 640px and up, media fills its tile, so the grid sets the shape. Between 640 and 1023px the tiles are a different shape, so expect some crop there. Crops use `object-fit: cover`, so keep the subject near the centre of each image.

## Grid

Each section has its own `grid-template-areas` block in `styles.css`, one for 640 to 1023px (4 columns) and one for 1024px and up (6 columns). Below 640px tiles stack in DOM order on a 2-column grid. Most tiles span both columns. Tiles with the class `tile--half` pair up: status and time, Tools and Facts, and Elsewhere and Back to top. Add or remove `tile--half` to change the pairs.

To change a tile's size, edit the area names in both blocks. Keep every cell filled and keep each area a rectangle, or the grid shows holes.

The hero has three layouts (`data-layout="a"`, `"b"` and `"c"`). If you change a span, change it in all three, or the reshuffle animation will stretch tiles.

Rows are `minmax(120px, auto)` below 1024px. From 1024px they scale with the column width, from 104px up to 132px at 1440px and wider, so tile shapes stay close to the desktop shape. Rows grow when a tile needs more room, so text never clips.

## Colours and type

Edit the tokens in `:root` at the top of `styles.css`. Components use tokens only.

- Keep one accent. Use it as a fill only, with `--on-accent` text, and at most one orange tile per section.
- Check any new colour pair at 4.5:1 for text and 3:1 for control borders.
- The type scale sits under "Type scale" in `styles.css`.

## Form

The form sends nothing. It checks name, email, project type and message in the browser, shows errors under each field and moves focus to the first problem. When everything is valid it shows a demo message.

To make it work, set the form `action` to your form service and remove the `preventDefault` demo message in the form block of `script.js`.

With JavaScript off, the browser's own required and email checks run. A valid form then posts to `#`, which most static hosts reject, so connect a form service before you publish.

## Links

- Social links point to `https://example.com/`. Replace them with real profiles.
- Project tiles are static. To turn one into a link, add the `tile--link` class and wrap the title in an anchor, or make the whole tile an `<a>` like the featured tile.

## Accessibility notes

- Skip link, one `h1`, an `h2` per section and `h3` inside tiles.
- Visible 2px focus outline with a 3px offset on every control. It turns light inside ink tiles.
- Touch targets are 44px or more. The top bar is not sticky, so it never covers a focused element.
- The status dot pulses three times, then stays still. Reduced motion turns off the reveal, hover scale, status pulse, clock crossfade and FLIP. The reshuffle still works and swaps instantly.
- The scroll reveal watches each tile on its own, so tiles already on screen fade in at once.
- The form status line stays rendered while empty, so screen readers announce each new message.
- "Required" tags are hidden from screen readers. The `required` attribute carries that state, so field names stay short.
- If copying the email fails, the button reads "Address selected" and the address is selected for keyboard copy.
- In forced colours mode every tile gets a 1px border, because backgrounds and shadows drop.
- The reshuffle button is a normal button. Enter or Space cycles the layout and focus stays put.
- With JavaScript off, every tile is visible, the clock tile shows the time zone, native form validation runs, and the reshuffle and copy buttons are hidden.

## Things to tweak

- Swap the orange for another single accent and re-check contrast.
- Change `--row` and `--gap` to make the grid tighter or looser.
- Change the hero layouts, keeping the same spans across all three.
- Replace the "Aa" glyph tile with a real typeface specimen.
- Remove the scroll reveal by deleting the `.reveal` class from the section grids.
