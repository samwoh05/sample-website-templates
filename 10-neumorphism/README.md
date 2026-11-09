# Saga Venn: neumorphism portfolio template

## What this is

A one-page neumorphism (soft UI) portfolio for a fictional industrial and interface designer, Saga Venn, based in Gothenburg. Every surface is the page colour. Depth comes only from paired shadows: a light one top-left and a dark one bottom-right. Things you press rise out of the surface. Things that hold content sink into it.

- **Style:** Neumorphism (soft UI), with a light and a dark material.
- **Hero approach:** an asymmetric split. The headline "Made to be pressed." is letterpressed into the surface on the left. A 520px push switch rises out of the same surface on the right. The switch is a real button: pressing it sinks and latches it, and the whole page changes to the dark material through a circular wipe that starts at the switch.
- **Design dials:** variance 7, motion 5, density 3.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All markup and copy. Icons are inline SVG. |
| `styles.css` | Design tokens at the top (colour, shadow, radius, type, motion, z-index), then components in page order. |
| `script.js` | Deferred vanilla JS: theme switch, mobile menu, service tabs, work reveal, active nav link, form validation. No libraries. |
| `README.md` | This file. |

## How to run

Open `index.html` in a browser. There is no build step and nothing to install. The page works without JavaScript: the switch follows the system theme, the mobile links wrap under the nav bar, and all four service panels show stacked.

## Change the name and copy

All copy is in `index.html`. Search for "Saga Venn" to change the name. It appears in the title, the meta description, the nav lockup, the hero subtext, the portrait label, the footer wordmark and the footer lines. The monogram "SV" sits in the nav lockup. The email `hello@sagavenn.example` appears in the contact section and the footer. Change the `aria-label` of each placeholder when you change a project.

## Replace the placeholders

Search for `data-placeholder="true"`. Each slot has an HTML comment `<!-- Replace with Envato Elements image -->` right before it.

| # | Where | Label | Size | Aspect ratio |
| --- | --- | --- | --- | --- |
| 1 | Work, Ferrule radio | Project cover | 1600x1200 | 4 / 3 |
| 2 | Work, Halden induction hob | Project cover | 1200x1500 | 4 / 5 |
| 3 | Work, Pilot thermostat | Project cover | 1200x1200 | 1 / 1 |
| 4 | Work, Grenå library kiosk | Project cover | 1600x1200 | 4 / 3 |
| 5 | Work, Sorrel shutter remote | Project banner | 2400x900 | 8 / 3 |
| 6 | About | Portrait, shown as a 168px round disc above the heading | 1000x1000 | 1 / 1 |
| 7 | Services, Control design | Process photo | 1200x900 | 4 / 3 |
| 8 | Services, Interface design | Process photo | 1200x900 | 4 / 3 |
| 9 | Services, Usability testing | Process photo | 1200x900 | 4 / 3 |
| 10 | Services, Design review | Process photo | 1200x900 | 4 / 3 |

To swap one in:

1. Replace the `<div class="ph" ...>` with an `<img>` that has a real `alt`, `width`, `height` and `loading="lazy"`.
2. Keep the same `aspect-ratio` and add `object-fit: cover; border-radius: inherit;` so the layout does not shift.
3. The hatch background and the label chip belong to the placeholder only. They go away with the `div`.
4. In the Halden cell, the image stretches to fill the tall cell on wide screens, so `object-fit: cover` matters there.

Not visible on the page: a social preview image, `og-image.jpg` at 1200x630. Uncomment the `og:image` meta tag in the `<head>` once you add it.

## Colours and shadows

One cool clay-grey family with one accent, burnt vermilion. No `#000` and no `#FFF`. Every shadow is tinted toward the surface hue.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--surface` | `#DDE3EA` | `#272C35` | Page, flat surfaces, raised slabs |
| `--convex-hi` | `#E9EDF2` | `#2E343E` | Convex gradient start |
| `--convex-lo` | `#CBD3DD` | `#21252D` | Convex gradient end |
| `--well` | `#D3DAE3` | `#22262E` | Tray, sockets, console, placeholders |
| `--tint` | `#DDD8DB` | `#2D2A2D` | One bento cell |
| `--ink` | `#1E2532` | `#E4E8EE` | Main text |
| `--ink-2` | `#465163` | `#A8B1BF` | Secondary text, hints, placeholder labels |
| `--deboss` | `#6A7487` | `#7C8698` | Decorative wordmark and quote marks only |
| `--edge` | `#6F7A8E` | `#7A8597` | Input boundary stroke, never text |
| `--accent`, `--accent-text`, `--focus` | `#9E3815` | `#E8956F` | Switch notch, tab bar, links, focus ring |
| `--btn-a` / `--btn-b` | `#A63B17` / `#94330F` | `#EFA07C` / `#DA8761` | Primary button gradient |
| `--on-accent` | `#FFF4EE` | `#2A1308` | Text on the primary button |
| `--err` | `#A3261B` | `#F2877C` | Form errors only |
| `--ok` | `#28603F` | `#7FC9A0` | Form success only |

**Light source rule.** One light, top-left, at 135 degrees. Highlights use negative x and y offsets. Shadows use positive ones. Convex gradients run 145deg from light to dark. Never mix directions, including in dark mode, on the switch and on the letterpressed type. The shadow tokens are `--sh-raised-sm/md/lg/xl` and `--sh-inset-sm/md/lg`. Under 768px the large ones step down a size so nothing clips at the 16px gutter.

**Contrast.** Checked with the WCAG 2.x formula in both themes.

- Body and UI text: 4.59:1 or higher on every surface. The floor is `--accent-text` on `--convex-lo` in light mode.
- `--ink` on `--surface`: 11.90:1 light, 11.40:1 dark.
- `--ink-2` on `--surface`: 6.21:1 light, 6.48:1 dark.
- Primary button label: 5.96:1 to 7.09:1 light, 6.38:1 to 8.36:1 dark.
- `--edge` input stroke: 3.07:1 or higher (non-text, needs 3:1).
- Focus ring on the surface: 5.36:1 light, 5.98:1 dark.

Rerun contrast checks after any colour change. Keep text at 4.5:1 or above and the `--edge` stroke at 3:1 or above. Never put accent text on anything darker than `--convex-lo` in light mode.

## Radius rule

Anything you press is a pill. Anything that holds things is a rounded rectangle. Anything round in real hardware is a circle. A nested radius is never larger than its container's.

- `--r-pill` (999px): buttons, nav bar, tab keys, radio keys, skip link, placeholder label chip
- `--r-lg` (28px): work tray, service screen, quote slabs, contact console, mobile menu
- `--r-md` (16px): bento cells
- `--r-sm` (12px): placeholders inside cells and panels
- `--r-input` (14px): inputs, select, textarea, error summary
- 50%: switch parts, portrait disc, monogram, menu button

Static items are never styled like keys. The "What you get" lists in Services are plain text with a small marker, so only the selected tab and the checked radio key look pressed in.

## Dark mode and the hero switch

- Dark tokens live in two blocks in `styles.css`: one inside `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and one under `:root[data-theme="dark"]`. Keep them identical when you edit.
- A small inline script in the `<head>` runs before the stylesheet. It reads `localStorage` key `sv-theme` and sets `data-theme` on `<html>`, so returning dark users do not see a light flash. It also adds the `js` class.
- First visit follows the system theme. Pressing the switch stores the choice. `aria-pressed="true"` means the dark surface is on. The `<meta name="theme-color">` updates with it.
- In browsers with View Transitions, the theme change is a circular reveal from the switch centre, 650ms. Without View Transitions, or with reduced motion on, the theme flips instantly.
- To clear a stored choice while testing, run `localStorage.removeItem("sv-theme")` in the console.

## Connect the form

The form does not send anything. `script.js` validates it, shows an error summary and inline errors, then fakes a 900ms send and shows a demo success message.

To make it real:

1. Set the form's `action` and `method` to your form service (Formspree, Netlify Forms, Basin or your own endpoint).
2. Keep the validation. In the submit handler in `script.js`, replace the `setTimeout` block with a `fetch` to your endpoint and show the success message when it returns.
3. Remove the demo note (`#form-note`) and change the success text.

## Accessibility notes

- Skip link, one `h1`, landmarks (`header`, `nav`, `main`, `footer`), sentence-case headings.
- Every control has a visible 3px focus ring. `scroll-padding-top` keeps focused content clear of the sticky nav.
- Targets are at least 44x44 with 8px gaps.
- Pressed and selected states never rely on colour alone: they combine depth with an icon, a bar or a heavier weight.
- Reduced motion: the switch, the headline and the work cells render in their final state. No view transition. Tabs and presses swap instantly.
- Forced colours (Windows high contrast): shadows are dropped and every surface gets a solid outline.
- Service tabs: Up/Down or Left/Right move between keys, Home and End jump to the first and last. The panel changes as focus moves.
- Form: labels above fields, short hints under the field (the longer textarea hint sits under its label), errors under fields, an error summary that takes focus, and a polite status region that announces "Sending your brief." and then the success message.
- Mobile menu: it sits inside the primary `nav` landmark and closes when focus or a click leaves the header, or on Escape.

## Fonts

Plus Jakarta Sans via Google Fonts (SIL Open Font License), weights 500 to 800 plus italic 700 and 800. One family only. Emphasis uses italic or weight from the same family.

## ui-ux-pro-max results used

- **Style search "neumorphism":** a verified match. Used: paired soft shadows from one light source, convex surfaces via `linear-gradient(145deg, ...)`, inset shadows for pressed states, press feedback around 150ms, a consistent radius system, a monochromatic palette with a single accent. Its HIGH accessibility risk (low contrast) drove the contrast work above.
- **Design system search:** returned Minimalism and Swiss, which is off-topic. Only the generic notes were kept: CTA label contrast against its fill, focus and component boundaries visible on their own, hovers between 150ms and 300ms, a static final state under reduced motion, and testing at 375, 768, 1024 and 1440.
- **Typography:** the "Neumorphism Mobile" pairing, Plus Jakarta Sans as a single family with bold headings, tight tracking and body at 500.
- **Colour:** 0 results for "neumorphism". The retry returned a generic portfolio palette (monochrome plus one accent). The palette here is custom: one clay-grey family plus burnt vermilion, with every pair checked.
- **Checklist items applied:** 4.5:1 text, visible focus rings, `aria-label` on icon-only buttons, decorative icons hidden, skip link, sequential headings, colour never the only indicator, 44x44 targets with 8px gaps, press feedback within 100ms, `aspect-ratio` on every placeholder, `font-display: swap`, no horizontal scroll, transform and opacity animation only, labels above inputs with hints, inline errors and an `aria-live` status, no emoji icons, one icon family, pressed states that do not shift layout, semantic tokens instead of ad-hoc hex, clear disabled states, focus order equal to visual order, focus not hidden by the sticky nav.

## Things to tweak

- **Accent:** change `--accent`, `--accent-text`, `--focus`, `--btn-a`, `--btn-b` in both themes, then recheck contrast.
- **Switch size:** `--sw` on `.switch` (default `clamp(240px, 36vw, 520px)`).
- **Shadow strength:** the alpha in `--hi` and `--lo`. Lower values give a flatter look. Text contrast does not depend on the shadows.
- **Hero page light:** the radial gradient on `.hero` (`--page-light`). Remove it for a flatter surface.
- **Section spacing:** `--section`. The first section after the hero uses a shorter top padding (`.hero + .section`).
- **Quote staircase:** the `margin-left` values on `.slab:nth-child(2)` and `(3)`.
- **Status line:** "Taking new projects from February 2027." in the contact section. Update or remove it.

## Credits

- Icons: Phosphor Icons, Regular weight (MIT License), inline SVG.
- Font: Plus Jakarta Sans (SIL Open Font License).
- All names, clients, quotes and the email domain are fictional.
