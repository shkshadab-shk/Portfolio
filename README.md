# Shadab Shaikh — Portfolio

A futuristic, glassmorphism × neumorphism personal portfolio. Dark-first with a
light theme, animated aurora + constellation background, scroll-driven reveals,
3D tilt cards, magnetic buttons and a typing headline.

Every word on the site is sourced from `Resume.pdf`, normalised into a single
data module: **[`src/data/resume.js`](src/data/resume.js)**.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

Production build and local preview:

```bash
npm run build && npm run preview
```

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3.4 (CSS-variable design tokens) |
| Animation | Framer Motion 11 |
| Icons | Local SVG set — `src/lib/icons.jsx` (no icon dependency) |
| Fonts | Sora + JetBrains Mono via Google Fonts (`display=swap`) |
| Deploy | Vercel (`vercel.json` included) |

Three runtime dependencies total: `react`, `react-dom`, `framer-motion`.

---

## Project layout

```
├── index.html                  SEO meta, Open Graph, Person JSON-LD
├── vercel.json                 Vercel build + cache/security headers
├── tailwind.config.js          Theme tokens, keyframes, animations
├── docs/DESIGN_SYSTEM.md       The binding design contract — read before editing
├── public/
│   ├── Shadab-Shaikh-Resume.pdf   Served by the Download Resume buttons
│   ├── favicon.svg  og-image.svg  manifest.webmanifest
│   └── robots.txt  sitemap.xml
└── src/
    ├── index.css               Design tokens + composed classes (.panel, .glass, .neu …)
    ├── App.jsx                 Composition, page transition, lazy sections
    ├── data/resume.js          ← SINGLE SOURCE OF TRUTH for all content
    ├── lib/
    │   ├── accents.js          Accent token map (blue / cyan / violet / purple)
    │   ├── icons.jsx           <Icon name="…" />
    │   ├── motion.js           Shared variants, easing, viewport config
    │   └── scroll.js           Smooth-scroll helpers
    ├── hooks/                  useTheme, useScrollSpy, useMediaQuery, useLockBodyScroll
    └── components/
        ├── ui/                 Section, SectionHeading, Reveal, Panel, TiltCard,
        │                       Button, Tag, Counter, Meter, Marquee, IconTile
        ├── background/         Background (aurora + canvas particles), CursorGlow,
        │                       ScrollProgress
        ├── layout/             Navbar (scroll-spy + mobile menu), Footer
        └── sections/           Hero, About, Skills, Projects, Journey,
                                Certifications, Contact
```

---

## Sections

| id | Section | Content source |
| --- | --- | --- |
| `home` | Hero — typing headline, CTAs, stat counters, 3D orbit visual | `profile`, `heroStats`, `socials` |
| `about` | Summary, identity card, highlight grid, tech marquee | `profile`, `aboutFacts`, `aboutHighlights`, `techMarquee` |
| `skills` | 5 categories with animated meters + soft skills | `skillCategories`, `softSkills` |
| `projects` | Filterable cards with detail modal | `projects`, `projectFilters` |
| `journey` | Animated vertical timeline, education/experience filter | `timeline`, `timelineFilters` |
| `certifications` | Credential badge cards + achievement tiles | `certifications`, `achievements` |
| `contact` | Contact rows with copy-to-clipboard + animated form | `contact`, `socials` |

---

## Editing content

Everything lives in `src/data/resume.js` — no component hard-codes a name, date,
percentage or blurb. Common edits:

- **Replace the resume PDF** — drop the new file at
  `public/Shadab-Shaikh-Resume.pdf`, or change `profile.resumeFile` and
  `profile.resumeFileName`.
- **Add a project** — append to the `projects` array. Give it a `category` that
  exists in `projectFilters` (or add the new category there too), an `accent`
  (`blue` | `cyan` | `violet` | `purple`) and an `icon` from `src/lib/icons.jsx`.
- **Tune the skill meters** — the `level` numbers are a self-assessment used only
  for the animated bars. Adjust freely.
- **Fix the LinkedIn URL** — `contact.linkedin` is inferred from the GitHub
  handle because the resume lists only GitHub. Update it to the real slug.
- **Timeline entries** — `kind: 'education' | 'experience'` drives the filter
  tabs and node styling.

Entries that interpret the resume rather than quote it are marked with
`// derived:` comments, so it is obvious what is verbatim and what is framing.

---

## Contact form

There is no backend. A valid submission composes a `mailto:` URL to
`contact.email` with the subject and body pre-filled and hands it to the
visitor's mail client. The UI says so explicitly and offers the direct address as
a fallback.

To wire a real endpoint, replace the submit handler in
`src/components/sections/Contact.jsx` with a `fetch` to Formspree, Resend, a
Vercel serverless function, or similar — the `idle → sending → sent` state
machine is already in place.

---

## Theming

`src/index.css` defines the token set twice: once under `[data-theme='dark']`
and once under `[data-theme='light']`. `useTheme` writes that attribute to
`<html>`, persists the choice in `localStorage`, respects
`prefers-color-scheme` on first visit, and keeps the browser `theme-color` meta
in sync.

Because Tailwind's `base-*`, `ink-*` and `line` colours resolve to those
variables, a single attribute flip re-themes every surface, border and shadow.
Neon accents stay constant in both themes so the brand identity does not shift.

**When editing, never hard-code a colour.** Use the tokens or `accent()` from
`src/lib/accents.js` — a hex literal or a `bg-slate-*` utility will not respond
to the toggle. See `docs/DESIGN_SYSTEM.md`.

---

## Performance

- Below-the-fold sections are `React.lazy` + `Suspense`; `react`, `react-dom`
  and `framer-motion` are split into their own chunks.
- The particle canvas runs one `requestAnimationFrame` loop, is DPR-aware,
  scales its particle count to the viewport, and pauses when the tab is hidden.
- Pointer-driven effects use Framer Motion motion values, so tracking the cursor
  never triggers a React re-render.
- Only `transform`, `opacity` and `filter` are animated; long-lived animated
  layers are promoted with the `gpu` utility.

## Accessibility

- Semantic landmarks, one `<h1>`, ordered heading levels, and a skip link.
- All decoration is `aria-hidden` and `pointer-events-none`.
- Icon-only controls have `aria-label`s; the project modal manages focus and
  closes on <kbd>Esc</kbd>; form fields use real `<label>`s with
  `aria-invalid` / `aria-describedby`.
- `prefers-reduced-motion` disables the typing loop, particle field, cursor glow
  and looping decoration while keeping all content and layout intact.

---

## Deploy to Vercel

```bash
npm i -g vercel && vercel
```

Or import the repository at [vercel.com/new](https://vercel.com/new) — the
included `vercel.json` sets the framework, build command, output directory,
SPA rewrite, immutable asset caching and baseline security headers, so no
dashboard configuration is needed.

**After deploying,** replace the placeholder
`https://shadab-shaikh.vercel.app/` with the real domain in:

- `index.html` — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
  and the JSON-LD `url`
- `public/sitemap.xml` and `public/robots.txt`

Works unchanged on Netlify, Cloudflare Pages or GitHub Pages (build command
`npm run build`, publish directory `dist`).

---

Built with React, Tailwind CSS and Framer Motion.
