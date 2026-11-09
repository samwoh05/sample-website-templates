# 02. Cybercore portfolio template ("OVERCLOCK")

## What this is

A one-page portfolio for a fictional interface designer, Nika Varga-Osei, who runs a one-person studio in Rotterdam. The style is cybercore: an early-2000s workstation turned up to full volume. Large variable-width type, a booting wireframe globe, hard 0px windows and HUD chrome sit on near-black. One acid-green signal marks every action.

Design read: very large type, raw interface chrome, one accent.
Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 6.

All clients, people and quotes on this page are fictional. Any match with a real organisation is accidental.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic HTML5 page. One H1, an H2 per section, an inline SVG icon set at the top of `<body>`. |
| `styles.css` | Tokens on `:root`, mobile-first layout, motion, reduced-motion and forced-colours rules. |
| `script.js` | Vanilla, deferred, under 200 lines. Boot sequence, clock, motion pause, nav state, mobile menu, work preview, reveals, quotes stack, form demo. |
| `README.md` | This file. |

No build step. Open `index.html` in a browser.

## Hero approach

The hero is an overlapping window composition on a 12-column grid. Back to front: a static hex column, the `viewer.exe` window with the rotating wireframe globe, the `status.sys` window, then the two-line headline "Loud screens, clean signal." The headline sits on top of the windows. A ticker of disciplines runs along the bottom edge. The hero fits the first viewport at 1280x800, 1366x768 and 1440x900. There is no photo in the hero.

The overlap runs from 900px up. Between 600px and 899px the windows stack above the text. Below 600px `status.sys` is hidden and a smaller viewer sits first, tucked behind the headline.

## Section layouts

Each section uses a different layout family. Page order matches the nav: Work, About, Services, then Contact.

| Section | Layout |
| --- | --- |
| Hero | Overlapping windows, hex column, ticker |
| Selected work | Directory listing with a sticky preview window (desktop) |
| About | Full-width terminal session with a floating portrait window |
| Services | Circuit board: a central chip wired to four modules |
| Quotes | Cascading alert-dialog stack with a "Next message" button |
| Contact | Command console split: details left, form window right |
| Footer | OS taskbar under a full-bleed barcode |

## Swapping the persona, projects and quotes

- Name, role and email: search `index.html` for "Nika Varga-Osei" and "hello@nvsys.example". Update `<title>` and the meta description too.
- Projects: each one is an `<li class="dir__item">` in the `<ol class="dir">`. Change the name link text, its `data-slug`, the meta line and the description. Keep the `<span class="vh">` prefixes. They give screen readers the labels "Client", "Year" and "Type".
- Quotes: each one is an `<li class="stack__item">`. Keep three items, or update the total "3" in `.quotes__count` and the `% 3` in `script.js` if you change the count. The counter's hidden `data-from` text starts as the first caption; `script.js` updates it from each `<figcaption>`.
- Availability: search for "Jan 2027" (the `status.sys` window) and "January 2027" (contact).

## Replacing placeholders

Search `index.html` for `Replace with Envato Elements image`. Each comment sits right above a `<div class="ph" data-placeholder="true">`. Replace that div with an `<img>` with real `alt` text, `width` and `height`, and `loading="lazy"` below the fold. The desktop work preview clones the row image automatically, so you only replace each project image once.

| # | Slot | Intended content | Size (px) |
| --- | --- | --- | --- |
| 1 | About, portrait.jpg window | Portrait: Nika at her desk, monitors lit, low room light | 640 x 800 |
| 2 | Work, Lowfreq Atlas | Map screen with frequency dial and broadcast dots | 1600 x 1000 |
| 3 | Work, Quarry 3000 | Stage screen and poster set in the quarry at night | 1600 x 1000 |
| 4 | Work, Tidegate Monitor | Dashboard on a phone held outdoors in rain | 1600 x 1000 |
| 5 | Work, Kilobyte Noodle Bar | Pixel menu board above the counter | 1600 x 1000 |
| 6 | Work, Spoolwerk | Archive browser with cassette grid and waveform | 1600 x 1000 |
| 7 | Share card (og:image, not rendered on the page) | NV.SYS wordmark over wireframe globe | 1200 x 630 |

To add the share card, put `<meta property="og:image" content="...">` in the `<head>`.

## Colour tokens

Components use tokens only. Change a value on `:root` in `styles.css` and it updates everywhere.

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | #05070A | Page background |
| `--surface` | #0C1217 | Window bodies, ticker |
| `--surface-2` | #121B21 | Title bars, taskbar |
| `--grid` | #10201A | Background grid (decorative) |
| `--line` | #24372F | Dividers, hard shadows (decorative) |
| `--line-strong` | #5C7A6C | UI borders (3:1 or better), window corner brackets |
| `--fg` | #E6F1EC | Body text |
| `--fg-muted` | #8FA89C | Secondary text (7.4:1 or better) |
| `--accent` | #A6FF00 | The one accent: links, primary button, focus ring, active row, loading bar |
| `--accent-ink` | #05070A | Text on accent fills |
| `--trace` | #3DF2FF | Cyan linework only: globe, circuit traces, crosshairs, brackets on the viewer and preview windows |
| `--signal` | #FF2BD6 | Magenta, used in exactly 3 places: form errors, one glitch layer, the "live" dot |
| `--hex-dim` | #3B5A1F | Hex column (decorative) |

To change the accent, edit `--accent`. Keep `--accent-ink` at 4.5:1 or better against it. Never put `--fg-muted` or `--signal` text on an accent fill.

Other tokens: radius is 0 everywhere. Shadows are hard offsets (`--shadow-1`, `--shadow-2`, `--shadow-front`). There is a z-index scale (`--z-*`), an 8px spacing scale (`--s1` to `--s8`) and motion durations (`--t-*`).

## Fonts and licences

| Role | Font | Weights |
| --- | --- | --- |
| Display (H1, H2, services chip) | Anybody | 800, 900, width axis 78 to 135 |
| Body and data | JetBrains Mono | 400, 500, 700 |
| Bitmap chrome (title bars, HUD, ticker, size tags) | Silkscreen | 400 |

The database pick was Orbitron. Its rounded sci-fi forms push the page toward cyberpunk and game UI. Anybody's width axis keeps the headline wide at every size and stops it breaking onto a third line. The axis is set by `--wdth`: 135 at 1024px and up, 110 from 600px, 78 below. Silkscreen is never used for paragraphs.

All three fonts are under the SIL Open Font License and load from Google Fonts.

## Motion and reduced motion

Animations use transform and opacity only. Scroll effects use IntersectionObserver. There are no scroll listeners.

- Boot: windows unfold, the loading bar fills, the headline rises. Once per session (sessionStorage key `nv-booted`). The Reboot button in the footer replays it.
- Headline glitch: one 300ms burst at the end of boot. It never loops.
- Globe: the one ambient loop. It pauses off screen and when the tab is hidden.
- Ticker: the only marquee. It pauses on hover and off screen.
- The pause button in the `viewer.exe` title bar stops both the globe and the ticker, for keyboard and touch users.
- Work preview: crossfade and one scan sweep on row change.
- Services and about: one-shot reveals on entry.
- Quotes: the front message slides out and re-slots to the back.

With `prefers-reduced-motion: reduce`, nothing animates. The page renders its final state, the globe is static, the pause button is hidden and the ticker becomes a static, wrapping list. Without JavaScript, all content shows in its final state.

## Wiring the form

The form does not send anything. `script.js` checks the fields, shows inline errors and then shows a demo status message. To make it live:

1. Add `action` and `method="post"` to the `<form>`, pointing at your form service (Formspree, Netlify Forms, Basin or your own endpoint).
2. In `script.js`, replace the `form.reset()` branch with a `fetch` call to that endpoint, then write a success or failure message into `.form__status`.

## Removing the clock

The local time appears in the `status.sys` window and in the footer tray. Remove the `<time data-clock>` elements and the "Clock" block in `script.js`. The rest of the script does not depend on it.

## Replacing the placeholder links

Project links (`lowfreq-atlas/` and the rest) point at `projects/<slug>.html`, which do not exist yet. Create those pages or point the links at your case studies. The Are.na, GitHub and Cosmos links point at each site's home page. Replace them with your profile URLs.

## Checks

Run this from the folder that holds `02-cybercore`. It should print nothing:

```
grep -nP "\x{2014}|\x{2013}" 02-cybercore/*
```

Also check that every placeholder still has its comment:

```
grep -c 'data-placeholder="true"' 02-cybercore/index.html
grep -c 'Replace with Envato Elements image' 02-cybercore/index.html
```

Both counts should match (6).
