# Big Squish, a claymorphism portfolio template

A one-page portfolio for Ottilie Marsh, a fictional independent brand and 3D designer in Leeds. Plain HTML, CSS and a small vanilla script. No frameworks and no build step. Open `index.html` in a browser.

Files: `index.html`, `styles.css`, `script.js`, `README.md`.

## 1. Style

Claymorphism, bold variant "Big Squish". Chunky pastel surfaces with 3 to 4px rims, double shadows (soft tinted outer shadow plus inner highlight and inner shade), a solid clay base edge under every main piece, pill and blob shapes, and bouncy press feedback.

Dials: variance 7, motion 6, density 3.

Seven layout families, one per section:

| Section | Family |
| --- | --- |
| Hero | Full-bleed clay slab with an overlapping object stage |
| About | Offset uneven two-column (portrait in columns 1 to 4, text in 6 to 12) |
| Work | Bento with 5 cells for 5 projects |
| Services | Stacked accordion drawers (`details` and `summary`) |
| Quotes | Scattered overlapping pebbles |
| Contact | One centred tray holding the form |
| Footer | Giant extruded wordmark band plus a link row |

## 2. Hero approach

A CSS clay sculpture slab. The two-line headline "Soft shapes, loud brands." is extruded with stacked text shadows, as if pressed out of the peach slab. Beside it sits a stage of squishable pastel clay toys led by "Bub", a blue sphere mascot.

- On fine pointers, the stage tilts up to 6deg and each toy shifts by its own depth.
- Bub's eyes follow the pointer, up to 8px.
- When "Start a project" or "See the work" is hovered or focused with the keyboard, Bub looks at that button. Hovering "See the work" also lifts the butter cube.
- Pressing any toy squishes it. This also works on touch.
- On load the toys drop in with a 50ms stagger, then the headline, lead and CTAs rise in. Total under 1 second.
- All toys are decorative (`aria-hidden`) and not focusable.

## 3. Fonts

- Nunito (700, 800, 900) for headings, buttons and quotes. Rounded terminals suit clay.
- DM Sans (400, 500, 700) for body, labels and meta.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Nunito:ital,wght@0,700;0,800;0,900;1,700&display=swap">
```

## 4. Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | #FBF5EC | Warm off-white page |
| `--surface` | #FDF9F3 | Nav, tray, inputs, secondary button |
| `--surface-edge` | #E8D9C6 | Nav and tray rim (decorative) |
| `--ink` | #2A1E17 | All headings and body |
| `--ink-soft` | #4A3A30 | Lead text |
| `--muted` | #5A4A40 | Meta and helper text |
| `--line-control` | #7A6253 | Input and secondary button borders |
| `--peach` / rim | #F6C4B8 / #E8A597 | Hero slab, Puddle tile, Motion drawer |
| `--blue` / rim | #ADD8E6 / #8FBFD2 | Bub, Gumdrop tile, quote 2, footer |
| `--mint` / rim | #B5EBC4 / #93D2A6 | Larkfield tile, quote 3, success panel |
| `--lilac` / rim | #E6E6FA / #C9C6EA | Portrait frame, Bloop tile, ring toy |
| `--butter` / rim | #F2E2A8 / #E0CB82 | Fold tile, quote 1, eyebrow chip |
| `--peach-deep` | #EFA393 | Bean toy (decorative only) |
| `--accent` | #E07A45 | The one accent: primary button fill and focus halo |
| `--accent-rim` | #9C4A22 | Primary button border and base edge |
| `--on-accent` | #2A1E17 | Primary button label (ink, never white) |
| `--error` | #A8341F | Error text and invalid borders |
| `--error-bg` | #FBE3DC | Error box |
| `--success-bg` | #B5EBC4 | Success panel |

All hues sit under 80% HSL saturation. There is no pure black or pure white anywhere.

Contrast pairs (WCAG relative luminance):

| Pair | Ratio |
| --- | --- |
| Ink on bg | 14.9:1 |
| Ink on surface | 15.4:1 |
| Ink on peach, blue, mint, butter, lilac | 10.4, 10.6, 12.0, 12.5, 12.9 |
| Muted on surface, bg | 8.0, 7.7 |
| Muted on lilac, butter, mint, blue, peach | 6.8, 6.5, 6.3, 5.5, 5.4 |
| Ink label on accent | 5.4:1 |
| Accent rim on bg (button boundary) | 5.7:1 |
| Line control on surface | 5.4:1 |
| Error on surface, error bg | 6.3, 5.4 |
| Accent alone on bg | 2.7:1, so it is never used as text or as the only focus cue |

Focus ring: 3px solid ink outline with 3px offset, plus an 8px accent halo.

## 5. ui-ux-pro-max results used

- The claymorphism style query: 3 to 4px borders, double shadows, 16 to 24px radii, bounce easing `cubic-bezier(.34,1.56,.64,1)`, soft press.
- The "playful soft 3D claymorphism creative" design system. Its orange #F97316 was desaturated to #E07A45, given an ink label and a #9C4A22 rim. Its #FFF7ED background was softened to #FBF5EC.
- The Claymorphism Mobile type pairing: Nunito plus DM Sans.
- The pastel playful colour query, used for the peach, baby blue, mint and lilac surfaces (butter added).
- The UX checklist: contrast, focus rings, skip link, labels above inputs, aria-describedby, aria-live status, 44px targets, transform-only motion, reduced motion, dvh, z-index scale, one icon family.
- The first "claymorphism portfolio" query returned Minimalism and Swiss results, so it was discarded as off-topic.

Icons are Tabler Icons outline paths, inline, stroke width 2: menu-2, x, arrow-up-right, plus, alert-circle, loader-2, check, photo, mail, chevron-down.

## 6. Placeholders

Every image is a styled placeholder `div` with `role="img"`, an `aria-label`, `data-placeholder="true"`, a visible label, and the comment `<!-- Replace with Envato Elements image -->` right before it.

| # | Label | Size | Where |
| --- | --- | --- | --- |
| 1 | About portrait | 900x1125 (4:5) | About, lilac blob frame |
| 2 | Project cover Puddle | 1600x1200 | Work, large bento cell (4:3 on mobile) |
| 3 | Project cover Gumdrop | 1200x700 | Work |
| 4 | Project cover Fold | 1200x700 | Work |
| 5 | Project cover Larkfield | 1200x900 | Work |
| 6 | Project cover Bloop | 1600x900 | Work |
| 7 | Client avatar Maren Ostby | 160x160 (1:1 circle) | Quote 1 |
| 8 | Client avatar Teodor Vasile | 160x160 (1:1 circle) | Quote 2 |
| 9 | Client avatar Hollis Achterberg | 160x160 (1:1 circle) | Quote 3 |
| Optional | Open Graph image | 1200x630 | Not on the page. Add a `meta property="og:image"` tag if you want one. |

Avatar labels are visually hidden at 56px, but the `aria-label` stays.

## 7. Things to tweak

- Swap the name, projects, quotes and email. All names and clients are fictional.
- Replace each placeholder with an Envato Elements image. Use an `img` with `width`, `height`, `alt` and `object-fit: cover`, and keep the parent radius.
- Change `--accent`, `--accent-rim` and `--on-accent` together, then re-check the label and border contrast.
- Adjust `--tilt-max` to make the hero tilt calmer or stronger.
- Dark mode is not built. Clay in dark mode is a conditional fit, so this template is light only.
- The form is a demo. It simulates sending for 1.2 seconds. Use an email containing "fail" to see the error state. Connect it to a real endpoint before use.
- Keep the bento cell count equal to the project count. If you add or remove a project, update the grid areas in section 8 of `styles.css`.
- The clay base edge under slabs, tiles, drawers, pebbles, the tray and buttons is drawn as the first, solid, offset layer of each `box-shadow` (10px on the hero slab, 8px on cards, 5px on buttons). Change those offsets to make pieces thicker or thinner.
- Project tiles link to `#case-puddle`, `#case-gumdrop`, `#case-fold`, `#case-larkfield` and `#case-bloop`. Replace them with real case study URLs. The Instagram, Dribbble and LinkedIn links go to each site's homepage; replace them with real profiles.
- Each work tile sets its own `--cover-ratio`. Below 1024px the cover uses that ratio, so change it there if you swap in an image with a different shape.
- The tokens `--peach-rim-2`, `--peach-rim-3`, `--blue-rim-2`, `--blue-rim-3` and `--surface-press` control the extruded text steps and the pressed nav fill.
- The mobile menu is a modal dialog. While it is open, the page behind it is inert and does not scroll. Tapping outside or pressing Escape closes it.

## 8. Accessibility and motion notes

- `lang="en-GB"`, skip link, landmarks (header, nav "Main", main, footer), required fields marked "(required)" in their labels, one h1, sequential headings.
- Visible labels, helper text, inline errors with icon and text, `aria-invalid`, `aria-describedby`, one polite status region.
- Every control has at least a 44px target and a visible focus ring.
- Motion uses transform and opacity only. No idle loops, no scroll listeners, no custom cursor, no autoplay. Section reveals use IntersectionObserver and content stays visible if the script fails.
- With reduced motion on, every animation and transition is effectively instant, tilt, eye tracking and squish are not attached, reveals and toys render in their final state, the loader is static, and press feedback is the shadow swap only.
