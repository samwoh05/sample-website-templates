# 18 Ethereal: "Fog Cue"

Template 18 in the collection. A one-page portfolio for **Maren Østby**, a fictional lighting designer in Bergen. All people, companies, projects and quotes are fictional samples.

## Style

**Ethereal**: weightless, luminous and quiet. Soft radial light, halos and bloom, drifting mist veils, a pale dawn palette with a faint pearl sheen, fine film grain, a light high-contrast serif set large, slow breathing loops, feathered edges and a sense of upward lift.

The idea comes from the subject: **on this page, the theatre's house-light fader becomes the light that lifts the mist.** A painter's or developer's portfolio has no house light to raise, so the device belongs to this person.

How it stays apart from its siblings:
- 09 Glassmorphism: no frosted panels and no `backdrop-filter`.
- 10 Neumorphism: no shadows of any kind.
- 05 Surrealism: no horizon, objects or hard shadows.
- 14 and 16: the light field carries the page, not bare type.
- 08 Synthwave: colours stay milky, never neon.

## Files and how to run it

- `index.html`, `styles.css`, `script.js` (vanilla, `defer`), `README.md`.
- Open `index.html` in a browser. No build step and no frameworks.

## Hero approach

The hero has no image. A soft light field is the main visual, built from layers that are all `aria-hidden` and ignore the pointer (back to front):

1. Ground colour.
2. Dusk overlay, stronger when the light is low. It never drops below 25%, so the light always has a darker field to glow against.
3. Warm overlay, stronger when the light is high. Layers 2 and 3 change the mood by opacity, so no colour is animated.
4. Two halos, lilac and sky, drifting on 12s and 14s loops.
5. The light source: a large radial pearl-to-rose gradient, painted normally (no blend mode) so it reads as the brightest area at every fader value, breathing over 9s. It sits behind columns 9 to 10 on desktop and behind the nav on phones. There is no `filter: blur`; the gradient stops do the softening.
6. Three mist veils that drift sideways (10s, 13s, 11s) and thin out as the light rises.
7. A faint static conic pearl sheen.
8. The type and controls, in full ink. The nav bar is a `<header>` outside the hero, laid over it with `position: absolute`; the hero reserves its height with `--nav-h`.
9. Film grain over the whole page (`body::after`, static).

**Signature move:** on load the light climbs 120px from below the headline and the veils part, over 2.4s.

**The live thing:** a "Raise the light" range input (0 to 100, default 60) with a visible `<output>`. Moving it lifts the light source, warms the room and thins the mist. It works by thumb, by arrow keys, Page Up/Down, Home and End, and it announces "House light N percent" through `aria-valuetext`. The visible `<output>` is `aria-hidden` so each step is not read twice. Without JS the fader stays hidden and the hero shows the 60% state.

## Fonts

Google Fonts:
```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,200..400,0..100,0..1&family=Figtree:wght@400;500&display=swap
```
- Display: **Fraunces** 200 and 300, `font-optical-sizing: auto`, `"SOFT" 100, "WONK" 0`.
- Body: **Figtree** 400 and 500.
- No other template in the collection uses either font. Both include Ø and æ.

Five sizes in the scale, plus one exception: the footer name, set at `17vw` so it returns at full width.


| Token | Size | Use |
|---|---|---|
| `--t-display` | `clamp(56px, 8vw, 116px)`, `12vw` from 768 to 1023 | h1 |
| `--t-h2` | `clamp(40px, 5vw, 76px)` | section headings |
| `--t-lead` | `clamp(32px, 2.8vw, 40px)` | hero sentence, project and stage titles, large quote |
| `--t-body` | 18px | running text, nav wordmark, main buttons |
| `--t-small` | 15px | labels, years, notes, nav links and nav button |
| footer name | `17vw` | the one display size outside the scale |

## Palette and contrast

All colours are tokens in `:root` in `styles.css`. Ratios use the WCAG formula.

| Token | Hex | Use |
|---|---|---|
| `--ground` | #F5F0ED | page ground |
| `--mist` | #ECE4E5 | Practice band, fields, placeholder fill |
| `--ink` | #2A2230 | all text, focus ring |
| `--accent` | #7C4257 | buttons, slider thumb and filled track only |
| `--accent-hover` | #6A3749 | button hover and active |
| `--on-accent` | #FFFBF8 | button labels |
| `--line-ui` | #7F727B | unfilled slider track, field bottom edge |
| `--pearl` | #FFFBF8 | light-source core, footer ground |
| `--haze-rose` | #F6E3DF | atmosphere |
| `--haze-lilac` | #E6DDEA | atmosphere |
| `--haze-sky` | #DDE6EE | atmosphere |
| `--dusk` | #DCDDE8 | hero overlay, 25% at full light and 80% at none |
| `--warm` | #F8EFEA | hero overlay when the light is high |

| Pair | Ratio |
|---|---|
| ink on ground | 13.55 |
| ink on mist | 12.26 |
| ink on warm | 13.52 |
| ink on rose | 12.39 |
| ink on lilac | 11.60 |
| ink on sky | 12.14 |
| ink on the darkest hero mix | 11.79 |
| accent on ground | 6.69 |
| accent on mist | 6.05 |
| accent on the darkest hero mix | 5.82 |
| on-accent on accent | 7.36 |
| on-accent on accent-hover | 9.05 |
| line-ui on ground | 4.04 |
| line-ui on mist | 3.65 |
| line-ui on the darkest hero mix | 3.51 |
| ink on pearl (footer) | 14.90 |
| ink on pearl plus the rose bloom | 13.10 |

**Never put accent on ink.** That pair is only 2.02:1.

## ui-ux-pro-max results used

- `--design-system "ethereal portfolio"`: used the Hero + Features + CTA pattern with the call to action repeated deep in the page (Contact), button label contrast of at least 4.5:1, and a static final hero under reduced motion. Its style match (Minimalism and Swiss) was off topic, and a retry with "dreamy soft ethereal creative portfolio" gave Brutalism, also off topic. A style search for "ethereal" returned 0 results, so there was **no verified style match**; the style comes from the brief.
- `--domain style "dreamy soft light"` and `"aurora soft gradient"`: nearest results were Neumorphism, Soft UI Evolution, Glassmorphism and Aurora UI. Used from Aurora UI: large CSS radial gradients, slow 8 to 14s loops, depth through colour layers, kept pale. `mix-blend-mode: screen` was tried on the light source and dropped, because over a near-white ground it made the light almost invisible. Used from Soft UI Evolution: 200 to 300ms transitions, a visible 3px focus ring, 4.5:1 text contrast. Not used: neumorphic shadows and glass panels.
- `--domain typography`: results (Archivo, Space Grotesk, Playfair, Source Serif, Playfair + Inter) were used as a direction only: a light high-contrast display serif with a quiet sans. Fraunces and Figtree were chosen because Cormorant Garamond is in 16 and Newsreader is in 04.
- `--domain color "ethereal pastel"`: **0 results**. "soft pastel" gave Beauty/Spa/Wellness and Parenting palettes. The palette here is derived from them (milky rose ground, deep plum ink) and every pair was checked. Lilac stays pale and atmospheric only, never the accent.
- Quick-reference checklist: skip link, sequential headings, banner, main and contentinfo landmarks with the skip link landing on the h1 and the fader, labels with `for`, the optional field marked in its label, errors tied to fields with `aria-describedby`, 44px touch targets, inline SVG icons with one stroke weight, decorative layers `aria-hidden`, `font-display: swap`, `aspect-ratio` on every media box, no horizontal scroll at 375px, reduced motion, pausable loops.

## Placeholders

Six placeholders, two ratios (4:5 and 16:10), the same feathered treatment throughout: an elliptical mask fades all four edges, while the label stays unmasked.

| Where | Label | Ratio |
|---|---|---|
| About | Portrait of Maren in haze - 1200x1500 | 4:5 |
| Work, lead | Vesper Rooms stage through gauze - 2400x1500 | 16:10 |
| Work | Salt Hours harbour fog line at dusk - 1600x1000 | 16:10 |
| Work | Nine Mornings dancer in low dawn light - 1600x1000 | 16:10 |
| Work | The Glass Archive gallery vitrine - 1600x1000 | 16:10 |
| Work | Lantern Ward chapel interior - 1600x1000 | 16:10 |

To replace one:
1. Search for `data-placeholder="true"`. Each one follows a `<!-- Replace with Envato Elements image -->` comment.
2. Put an `<img>` inside the `.frame`, with `alt`, `width`, `height` and the same ratio (4:5 or 16:10).
3. Remove `.frame__bloom` and `.frame__label`, and remove `data-placeholder`, `role` and `aria-label` from the frame.
4. Keep the `.frame` wrapper. The rule `.frame > img` applies the same feathered mask, so the image keeps its soft edge.

## The house-light fader

- The default is 60. To change it, update the input's `value` in `index.html` and `--lift` on `.hero` in `styles.css` together. The output text (`60%`) and `--fill` follow on load.
- How far the light travels per step is `--travel` (4px at 1024 and above, 3px at 768, 2.4px on phones).
- The mood overlays use `--lift` too: dusk opacity is `.25 + (100 - lift) / 100 * .55`, warm opacity is `lift / 100`, and the veils fade with `1 - lift / 140`.

## Motion

- Entrances: elements marked `data-reveal` rise 24px and fade in once, staggered by 70ms (heading, text, picture). They only start hidden when JS runs.
- Loops run only with JS, so a pause control always exists for them. Two "Pause motion" toggles (hero and footer) stay in sync, swap their icon, and save the choice in `localStorage` under `ethereal-paused`.
- `prefers-reduced-motion: reduce` turns off every loop and transition, shows the final hero state, shows all content, and hides the pause toggles. The fader still works and jumps instantly.
- Only `transform` and `opacity` move. Animated layers use no filters.
- The sky halo behind Selected work (`.work::before`) is static, so it needs no pause.

## Form

**The form sends nothing.** Venue is the one optional field and says so in its label. It validates the name, email and message, shows errors under each field and moves focus to the first one. On a valid submit it resets and shows a sample message in a `role="status"` region that stays in the page while empty, with the text set on the next tick so it is announced every time. Connect it to a form service before using it for real.

## Browser notes

- `mask-image` is written with its `-webkit-` prefix.
- The range input is styled for both WebKit/Blink and Firefox.
- Uses `100svh`, `overflow: clip` and `aspect-ratio`, which current evergreen browsers support.
- Tested widths: 375, 768, 1024 and 1440.

## Things to tweak

- **Brighter or dimmer room:** change the default lift, or the `.25` floor and `.55` factor on `.atmos__dusk`.
- **Where the light sits:** `left` and `top` on `.light-rise` (two breakpoints).
- **Size of the light:** `--core` on `.light-core`.
- **Mist density:** the alpha tokens `--veil-a` and `--veil-b`, or the veil `height`.
- **Grain:** `opacity` on `body::after` (0.08 now). Keep it low so text stays crisp.
- **Accent:** change `--accent` and `--accent-hover` together and recheck label contrast (keep at least 4.5:1).
- **Footer name:** `font-size` on `.footer__name` (17vw). Recheck it fits at 375px if you change the name.

## Run log line for STYLES.md

```
2026-10-30: 18-ethereal built (Fog Cue: "Maren Østby / designs light." under a soft light source that a house-light fader raises through drifting mist veils, with film grain and feathered frames)
```
Then tick row 18.
