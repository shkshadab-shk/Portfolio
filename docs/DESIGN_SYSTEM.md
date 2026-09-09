# Design system contract

Every component in this project is built against this contract. Read it before
editing any section — it is what keeps seven independently-authored sections
looking like one product.

## Stack

React 18 + Vite 5 + Tailwind CSS 3.4 + Framer Motion 11. No other runtime deps.
JSX only (no TypeScript). Import paths use relative specifiers.

## Aesthetic

Futuristic **glassmorphism × neumorphism**. Deep navy-black canvas, animated
aurora + particle field behind everything, translucent panels with soft extruded
shadows, neon blue/cyan/violet/purple accents, silver gradient text for emphasis.
Reference feel: Tesla console UI, Apple product page polish, AI-startup landing.

## Tokens — never hard-code a colour

| Purpose | Use |
| --- | --- |
| Page / surface backgrounds | `bg-base-0` `bg-base-1` `bg-base-2` `bg-base-3` |
| Text | `text-ink-hi` (headings) `text-ink-mid` (body) `text-ink-low` (meta) |
| Hairlines / borders | `border-line/10`, `bg-line/[0.04]` |
| Neon accents | `text-neon-blue` `text-neon-cyan` `text-neon-violet` `text-neon-purple` |

Base + ink tokens are CSS variables, so they flip automatically with the
dark/light toggle. **Do not** write `bg-[#0b1124]`, `text-white/60`, `bg-slate-900`
or similar — use tokens, or the theme toggle breaks.

## Composed classes (defined in `src/index.css`)

- `.shell` — max-width container + responsive gutters
- `.section` — vertical section rhythm (`py-20 sm:py-24 lg:py-32`)
- `.glass` / `.glass-strong` — translucent blurred surface
- `.neu` / `.neu-inset` — extruded / inset neumorphic surface
- `.panel` — **the signature surface**: glass fill + neumorphic depth + rounded-3xl
- `.border-gradient` — gradient hairline border that fades in on hover
- `.text-gradient` / `.text-gradient-animated` / `.text-silver`
- `.eyebrow` — mono uppercase tracked label
- `.chip` + `.chip-hover` — pill tag
- `.hairline` — fading 1px divider
- Utilities: `.glow-blue` `.glow-violet` `.glow-cyan` `.text-glow` `.perspective`
  `.preserve-3d` `.gpu` `.mask-fade-x` `.mask-fade-b` `.no-scrollbar`

## Animation classes (from `tailwind.config.js`)

`animate-aurora-drift` `animate-gradient-pan` `animate-float` `animate-pulse-ring`
`animate-caret` `animate-marquee` `animate-spin-slow` `animate-sheen-sweep`

Easing: `ease-smooth` = `cubic-bezier(.22,1,.36,1)`, `ease-snap` = overshoot.

## Shared modules

```js
import { accent, accentByIndex, cx, ACCENTS } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE, viewport, fadeUp, stagger, springSoft } from '../../lib/motion'
import { scrollToId, anchorHandler } from '../../lib/scroll'
import data, { profile, contact, projects /* … */ } from '../../data/resume'
```

`accent('violet')` returns `{ hex, rgb, text, border, borderSoft, ring, bgSoft,
bgSolid, glow, fromTo, gradient, gradientBr, shadow }` — all literal Tailwind
class strings. Accent classes **must** come from this map; Tailwind cannot see
classes built by string interpolation.

`Icon` covers every `icon:` value in `src/data/resume.js` plus interface glyphs
(`arrowRight` `arrowUpRight` `arrowDown` `chevronDown` `download` `external`
`menu` `close` `check` `copy` `sun` `moon` `send` `filter` `loader` `mapPin`
`github` `linkedin` `mail` `phone` `sparkles` …). Unknown names fall back safely.

## UI primitives — `src/components/ui/`

| Component | Signature |
| --- | --- |
| `Section` | `{ id, labelledBy, className, innerClassName }` — `<section>` + `.shell` |
| `SectionHeading` | `{ eyebrow, title, lede, accent, align, id }` |
| `Reveal` | `{ from: 'up'\|'down'\|'left'\|'right'\|'scale'\|'fade', delay, duration, blur, as }` |
| `Panel` | `{ accent, spotlight, lift, glow, as, innerClassName }` — signature surface |
| `TiltCard` | `{ max, scale, glare, innerClassName }` — 3D pointer tilt |
| `Button` | `{ href, variant: 'primary'\|'secondary'\|'neu'\|'ghost'\|'outline', size: 'sm'\|'md'\|'lg', icon, iconRight, magnetic, full }` |
| `Tag` | `{ icon, accent, active }` — pill |
| `Counter` | `{ value, suffix, prefix, raw }` — count-up on scroll |
| `Meter` | `{ label, value, note, accent, delay }` — animated progress bar |
| `Marquee` | `{ items, reverse, speed, renderItem }` — infinite ticker |
| `IconTile` | `{ icon, accent, size: 'sm'\|'md'\|'lg' }` |

Import via the barrel: `import { Panel, Reveal, Button } from '../ui'`.

## Rules

1. **Content comes only from `src/data/resume.js`.** Never hard-code a name,
   date, percentage or project blurb in a component. If content is missing, add
   it to the data file.
2. **Every section** is `<Section id="…">` with a `<SectionHeading>` whose `id`
   is `"<sectionId>-title"`.
3. Section ids are exactly: `home` `about` `skills` `projects` `journey`
   `certifications` `contact` (they back the navbar scroll-spy).
4. Reuse the primitives. Do not re-implement a card, button or reveal.
5. **Accessibility:** semantic landmarks, `aria-hidden` on decoration, visible
   focus rings (already global), `aria-label` on icon-only controls, real
   `<label>`s on form fields, `role="progressbar"` on meters.
6. **Reduced motion:** call `useReducedMotion()` from Framer Motion for any
   bespoke animation and degrade to a static state. Never animate `width` /
   `height` / `top` / `left` in a loop — transform and opacity only.
7. **Mobile-first:** base styles target ~375px, then `sm:` `md:` `lg:` `xl:`.
   No horizontal overflow at 320px. Tap targets ≥ 44px.
8. Default-export each section component; named export optional.
9. Keep comment density low and purposeful — explain *why*, not *what*.
