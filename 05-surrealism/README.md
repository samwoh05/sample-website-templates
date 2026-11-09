# The Long Afternoon: surrealism portfolio template

Design read: A calm, uncanny daylight diorama. A flat sky over an ochre plain, monumental serif type standing on the horizon with long hard cast shadows, and one dream object per section (door, window, framed canvases, staircase into cloud, eye, door again) doing the storytelling.

Dials: DESIGN_VARIANCE 9, MOTION_INTENSITY 5, VISUAL_DENSITY 3.

A one-page portfolio for Inês Varela, a fictional set designer and still life art director in Lisbon (studio in Marvila). She builds physical sets and props for product photography and short films. Every person, client, project and quote is made up.

## Files

| File | Job |
| --- | --- |
| `index.html` | The page. Semantic HTML5, one h1, skip link, inline SVG icon sprite and scene drawings. |
| `styles.css` | Tokens on `:root`, mobile first, all scenes in CSS and inline SVG. The hero fit budget and the shadow maths sit in the top comment. |
| `script.js` | Vanilla, deferred, about 220 lines. Menu, reveals, cloud pause, eye follow, lines of sight, demo form. |
| `README.md` | This file. |

No build step and no image files. Open `index.html` in a browser.

## Style notes

Surrealism in the tradition of painted dream scenes and photomontage. The page is daylight on an empty plain. The strangeness lives in objects and composition, while the copy stays plain and readable:

- A door stands alone on the plain, open on a night sky, while the world around it is day.
- A window in a day room shows night outside.
- Framed canvases stand on the sand, one floats on threads from a paper cloud, and its shadow waits on the ground below it.
- A staircase climbs and stops in a cloud.
- An eye watches through weather.
- The headline throws a long hard shadow, the same way every object does. There is one sun, low at the upper left.

How it avoids the near misses:

- Not vaporwave or synthwave: no neon, no grid floor, no sunset gradient. The sky is a flat painted blue that darkens slightly toward the top.
- Not AI purple: there is no purple anywhere. Night is a deep navy that only appears inside objects.
- Not ethereal: no glow, no blur, no soft pastel haze. Every edge is hard and every shadow is a flat shape.
- Not psychedelic: one object per section, lots of plain ground, and the type stays calm.

## Hero approach

The words are monuments. "I set tables / for the sky." stands on the horizon of an empty plain, and the moon stands in for the full stop (screen readers hear a normal period). A second, `aria-hidden` copy of the headline in the shadow colour sits exactly over the h1 and becomes its cast shadow:

```css
transform-origin: 0 calc(100% - var(--sink));
transform: skewX(56deg) scaleY(-0.5);
```

Transforms apply right to left. `scaleY(-0.5)` about the baseline mirrors the letters downward under the horizon at half height. `skewX(56deg)` then pushes every point right by tan(56deg), about 1.48, times its depth. So the shadow falls down and to the right. Every other shadow on the page uses the same skew, so there is one sun.

Tuning:

- Shadow length: change the `scaleY` value, between -0.45 and -0.55 on desktop (phones use -0.32).
- If the shadow points the wrong way, the origin or the order is wrong. Do not flip signs.
- `--sink` (0.09em) is the gap between the bottom of the h1 line box and the baseline in Gloock at line-height 0.92. It puts the baseline on the horizon and the shadow origin on the same line. If you change the font, measure the moon full stop against `.hero__horizon` and adjust it.

On phones the door leaves the plain and stands in open sky on a paper cloud, with its shadow detached on the strip of sand just under the horizon.

The hero fits the first viewport at 1440x900, 1366x768 and 375x812. The horizon is a fixed length and the ground text sits in flow, so with a larger browser text size the hero grows taller instead of clipping the button. The headline is 2 lines at every tested width.

## Page order and layout families

| Section | Layout family |
| --- | --- |
| Header | Absolute over the hero sky, one line from 960px. A hanging cloud backdrop menu below 960px. Without JS below 960px the links wrap in a sky band above the hero. |
| Hero | Full-bleed horizon diorama: monument type, cast shadow, a standing door, three paper clouds, a key on a thread. |
| About | 5/7 asymmetric split around a trompe l'oeil window, with the portrait hung over its corner. |
| Selected work | An exhibition on the plain: asymmetric 12-column gallery, 5 frames at different heights sharing row horizons. |
| Services | A diagonal staircase of tread panels that stops in a cloud (from 1024px, steeper from 1340px). A stepped indented list below that. |
| Kind words | One central eye with three quotes in orbit at three sizes, joined by lines of sight. `script.js` measures the layout and draws each line from the eye to the nearest corner of its quote, never across the eye's cloud. |
| Contact | A second door. The form lives inside the lit doorway, the leaf swings open to the left with an inset panel line and its own flat shadow, the hero key lies fallen on the sand. |
| Footer | The wordmark standing on the horizon with its own cast, a half moon setting at right. |

## Colour tokens

| Token | Hex | Job |
| --- | --- | --- |
| `--sky` | #8FB8D8 | Lower painted sky. Text on it is ink only. |
| `--sky-high` | #7AA8CD | Top of the sky. It blends smoothly into `--sky` at the horizon, so the horizon stays the only hard line. |
| `--cloud` | #F7F3EA | Paper clouds, slips, plaques, the about wall, inputs, placeholder labels. |
| `--sand` | #E3C79A | The plain: hero, work, contact, footer. |
| `--sand-haze` | #DDBF8F | Thin distance band under the hero horizon. Decorative. |
| `--sand-light` | #EFE2C8 | Ground for services and kind words. |
| `--tread` | #D9CBB0 | Stair riser faces and the plinth under work 3. Decorative. |
| `--cast` | #9A7A4E | Every long hard shadow. Never behind text. |
| `--ink` | #1F1A17 | Text, frames, outlines, horizon lines, the focus ring. |
| `--ink-soft` | #5A4E44 | Secondary text on cloud, sand and sand-light. Never on sky. |
| `--night` | #1B2238 | Only inside door openings and the about window. |
| `--night-ground` | #141A2B | Night ground strips and the night spill under the hero door. |
| `--moon` | #F2E6C4 | Moons, stars, the moon full stop. |
| `--accent` | #B5311C | Actions only: hero CTA, submit, text link hover underlines, nav hover underlines inside the menu panel. Over the sky the nav hover line is ink, because accent on sky is under 3:1. |
| `--accent-ink` | #FFFFFF | Text on accent. |

Contrast (WCAG):

- Ink on cloud 15.56, sand 10.59, sand-light 13.45, sky 8.22, sky-high 6.82, moon 13.86.
- Ink-soft on cloud 7.27, sand-light 6.28, sand 4.95. Ink-soft on sky is 3.84, so it is never used there.
- White on accent 6.14.
- Ink on cast is 4.32, so no text ever sits on a shadow. Where a shadow could pass under text, the text sits on a cloud slip.
- Focus ring: 3px ink outline, 3px offset, plus a 6px cloud halo.

Shape: radius 0 on every UI element. Circles exist only as drawn objects (moons, the eye, knobs). Elevation has two forms only, both without blur: long cast shadows on the ground, and a 6px 6px flat offset for floating paper.

## Fonts

One Google Fonts request:

| Font | Use | Why |
| --- | --- | --- |
| Gloock 400 | h1, h2, h3, large quotes, wordmarks | A high-contrast serif with heavy, sculptural stems. The headline letters have to read as solid objects that cast shadows. A thin fashion serif would vanish as a shadow. |
| Manrope 400, 500, 700 | Body, UI, labels | Neutral, so the copy stays plain while the composition does the strange work. |
| Cormorant Garamond italic 600 | The struck "wrong word" on each plaque only, never below 20px | Echoes the hand-lettered italic labels in word-and-image paintings. |

## UI-UX-PRO-MAX notes

- Design system search "surreal dreamlike portfolio" returned an off-topic Brutalism result. The retry "art gallery exhibition portfolio" gave the Scroll-Triggered Storytelling pattern with a Swiss gallery style. Used: the storytelling pattern (full DOM order, readable without any scroll effect, final states under reduced motion) and the gallery restraint. Not used: the Swiss styling.
- Style search: "surrealism dreamlike" gave 0 results, and "dreamy experimental art" gave Pixel Art, Biomimetic and Retro-Futurism. No verified surrealism match, so the style direction comes from the brief.
- Typography search: Fashion Forward (Syne and Manrope) was the closest fit. Manrope is kept for body. Syne reads as a tech or fashion poster, so the display face is Gloock instead.
- Colour search: Generative Art Platform (pink accent) and Sleep Tracker (indigo and violet) were set aside. The palette is painterly instead: flat sky, cloud white, ochre plain, deep shadow, one vermilion for actions.

## Placeholders

Every image slot is a styled placeholder with `data-placeholder="true"`, `role="img"`, an `aria-label` and a visible label. The comment `<!-- Replace with Envato Elements image -->` sits on the line directly before each one. Replace the `div.ph` with an `img` of the same aspect ratio and keep a real `alt`.

| Slot | Label | Size | Ratio |
| --- | --- | --- | --- |
| About | Portrait of Inês in the studio | 900x1200 | 3:4 |
| Work 1 | Project cover: Sunday weather | 1600x1000 | 16:10 |
| Work 2 | Project cover: The quiet tap | 1200x1500 | 4:5 |
| Work 3 | Project cover: Twelve keys | 1200x900 | 4:3 |
| Work 4 | Project cover: A lamp for a cloud | 1000x1000 | 1:1 |
| Work 5 | Project cover: Breakfast on the plain | 1600x900 | 16:9 |

The hero has no placeholder. It is drawn entirely in CSS and SVG.

## Links and the form

- Project links point to `#work` for now, each marked with `<!-- Replace with the case study URL -->`. Swap in `projects/<slug>.html` or your own case study pages once they exist.
- Instagram, Are.na and LinkedIn go to `#`, marked with `<!-- Replace with real profile URLs -->`. Replace them with real profile URLs.
- The email is `studio@inesvarela.example`, a reserved example domain.
- The form is a demo. Without JS it submits to `#contact` with GET and native validation. With JS it shows inline errors, moves focus to the first invalid field, and on a valid send shows "Thank you. This is a demo form, so nothing was sent." in a live region, then resets. Nothing leaves the page. Connect it to your own form handler before use, and change `method="get"` to `method="post"` when you do. With GET the name, email and brief end up in the URL and the browser history.
- A line above the first field says all fields are required unless marked optional.

## Motion

All motion uses transform and opacity. Start states exist only under `html.js` and only when reduced motion is off. With JS off or reduced motion on, the door is open, every shadow is at full length, frames and steps are in place and every strike is drawn.

1. The hero shadows fall as the sun lowers (1600ms, on load).
2. The hero door opens on the night (1100ms, 300ms delay).
3. The hero clouds drift out and back once (36s, 42s, 48s each way), then rest. Nothing on the page loops forever. The drift is decorative and has no pause control. It stops by itself, pauses when the hero leaves the viewport, and does not run under reduced motion. To remove it, delete the three `.js .cloud--a`, `.js .cloud-b` and `.js .cloud--s` rules in the motion block of `styles.css`.
4. Work frames land with a 90ms stagger, then the wrong word gets struck through.
5. Frames lift on hover and focus. Under reduced motion they get an ink outline instead.
6. The staircase climbs step by step, the cloud last.
7. The eye follows a fine pointer within 10px, inside the kind words section only. It checks the reduced motion setting on every move, so it stops as soon as the reader turns reduced motion on.
8. On a valid send the contact door leaf swings toward closed and back.
9. Buttons press down 1px.

Reveals use one IntersectionObserver, never a scroll listener. If the observer has not reported anything 1500ms after load, a safety net reveals everything. When it has reported, reveals wait for the reader to scroll to them. Everything shows at once if IntersectionObserver is missing. Keyboard focus on a hidden step or the stair cloud link reveals it at once.

## Accessibility

- Skip link to `main#content`, landmarks, one h1, one h2 per section, h3 for projects and services.
- Every scene drawing and both cast copies (headline and footer wordmark) are `aria-hidden`. The casts are not selectable.
- Struck words carry a hidden "Brief word:" prefix and follow their h3 in the DOM (CSS puts them above it), the email field names a malformed address separately from an empty one, checked radios show a check icon, errors carry an icon and text, links are underlined. Colour is never the only signal.
- Tap targets are at least 44px. Body text is 17px with lines capped at 64ch.
- The menu button has `aria-expanded` and `aria-controls`. Escape closes the panel and returns focus. Tabbing out of the panel or tapping outside it also closes it. Without JS the links show as a wrapped list.
- No focusable element sits inside a night area.

## Things to tweak

- Headline: it must stay 2 lines on desktop. If you change the words, check 1366x768 and reduce the `--fs-hero` clamp maximum rather than cutting copy. Keep the line 1 width clear of the door at 74%.
- Availability: "Taking commissions from March 2027." in the hero.
- Wrong words: each plaque has a `s.wrong__word`. Swap them with your own starting words.
- Shadow length: `scaleY` on `.hero__cast`, `.door__cast` and `.footer__cast`.
- Door position: `.door` left and height per breakpoint in `styles.css`.
- Accent: `--accent`. Keep white text on it at 4.5:1 or better.

## Deviations from the build spec

- Nav order is About, Work, Services, Kind words so it follows the section order on the page. The "Commission a set" button is the only nav route to the contact form, so there is no separate Contact link.
- The door leaves open past square (hero `rotateY(-118deg)`, contact `rotateY(-110deg)`) so the leaf swings outside the frame. At -62deg and -70deg the leaf would cover the moon in the hero opening and the form in the contact doorway.
- The contact door leaf and the fallen key show from 1100px only. Below that there is no room beside the door.
- The services diagonal starts at 1024px with a 64px rise per step, and uses a 96px rise and 300px tall steps from 1340px. Narrower screens get the indented stepped list.
- "for the sky" has a descender in the y. The baseline sits on the horizon and the tail of the y dips just below it.
