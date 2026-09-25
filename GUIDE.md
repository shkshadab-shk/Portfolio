# 📘 Portfolio — Full Explanation (Hinglish + English)

> **Iske liye zero coding knowledge chahiye.** Har folder, har file, har important line —
> sab yahan simple bhasha mein samjhaya hai. Padhne ke baad tum kisi ko bhi confidently
> bata sakoge ki ye website kaise bani hai.

---

## 🗺️ Table of Contents

1. [Ek line mein — ye project kya hai](#1)
2. [Ye "sirf React" hai ya aur bhi cheezein?](#2)
3. [React project kaise banta hai (bilkul basic)](#3)
4. [Poora folder structure (har file ka kaam)](#4)
5. [Ek page browser mein kaise load hota hai (flow)](#5)
6. [Animation kahan-kahan aur kaise aa rahe hain](#6)
7. [Colors / theme / dark-light kaise kaam karta hai](#7)
8. [Har section ka breakdown](#8)
9. [Common syntax cheat-sheet (line-by-line)](#9)
10. [Website ko chalana aur deploy karna](#10)

---

<a name="1"></a>
## 1. Ek line mein — ye project kya hai

**English:** A personal portfolio website that displays my resume as an interactive, animated web page.

**Hinglish:** Ye ek personal portfolio website hai. Meri resume ki saari info (naam, skills,
projects, education, contact) ko ek sundar, animated website mein dikhaya gaya hai. Log isko
`shadabshk.vercel.app` pe khol ke mera kaam dekh sakte hain.

Khaas baat: **saara content ek hi file se aata hai** — [`src/data/resume.js`](src/data/resume.js).
Baaki files sirf usko *dikhane* ka kaam karti hain.

---

<a name="2"></a>
## 2. Ye "sirf React" hai ya aur bhi cheezein?

Sirf React nahi. React **base** hai, uske saath 4-5 tools mile hue hain. Team samajh lo:

| Tool | Kya kaam karta hai (Hinglish) | English role |
|------|-------------------------------|--------------|
| **React** | Website ko chhote-chhote "components" (blocks) mein todta hai aur screen pe dikhata hai | UI library — builds the interface from reusable components |
| **Vite** | Development ke time website ko turant chalata hai, aur final "build" banata hai | Build tool + dev server (fast) |
| **Tailwind CSS** | Styling — colors, spacing, size. HTML ke andar hi `className` se style karte hain | Utility-first CSS framework |
| **Framer Motion** | Saare **animations** — fade, slide, tilt, scroll effects | Animation library for React |
| **JavaScript** | Poori app ki bhasha (logic, calculations) | Programming language |
| **Vercel** | Website ko internet pe live karna (hosting) | Deployment / hosting platform |

**Yaad rakhne wali line (interview mein bol sakte ho):**
> "It's a React app built with Vite, styled with Tailwind CSS, and animated using Framer Motion.
> There's no backend — it's a fully static front-end site deployed on Vercel."

---

<a name="3"></a>
## 3. React project kaise banta hai (bilkul basic)

Socho website ek **Lego building** hai. React mein hum poori building ek saath nahi banate —
hum chhote **Lego blocks (components)** banate hain, phir unhe jodte hain.

- Ek **component** = ek reusable piece of UI (jaise ek button, ek card, ek section).
- Har component ek **function** hota hai jo **JSX** return karta hai.
- **JSX** = HTML jaisa dikhne wala code, jo JavaScript ke andar likha jaata hai.

Chhota example:
```jsx
function Hello() {
  return <h1>Hello Shadab</h1>   // <-- ye JSX hai (HTML jaisa)
}
```
- `function Hello()` → ek component banaya jiska naam `Hello` hai.
- `return (...)` → ye component screen pe kya dikhayega, wo bata raha hai.
- `<h1>Hello Shadab</h1>` → HTML tag jaisa, par ye actually JSX hai.

Phir isko dusri jagah **use** aise karte hain:
```jsx
<Hello />
```
Bas! Yahi React ka core idea hai — chhote components banao, aur unhe jodo.

**Is project mein flow:** `main.jsx` → `App.jsx` → saare sections (`Hero`, `About`, `Skills`...).

---

<a name="4"></a>
## 4. Poora folder structure (har file ka kaam)

```
Portfolio/
│
├── index.html            → Website ka sabse pehla page (skeleton). SEO tags yahan.
├── package.json          → Project ki "ID card": naam, tools ki list, commands.
├── package-lock.json     → Tools ke exact versions (auto-generated, chhedna nahi).
├── vite.config.js        → Vite ki settings (build kaise ho).
├── tailwind.config.js    → Colors, fonts, animations ki definitions.
├── postcss.config.js     → Tailwind ko chalane ke liye chhoti config.
├── vercel.json           → Vercel deployment ki settings.
├── README.md             → Normal project readme (developers ke liye).
├── GUIDE.md              → YE FILE (poora explanation).
├── INTERVIEW.md          → Interview Q&A file.
├── Resume.pdf            → Meri asli resume.
│
├── public/               → Jo files "as-is" website pe jaati hain (bina change ke)
│   ├── Shadab-Shaikh-Resume.pdf → "Download Resume" button isko deta hai.
│   ├── favicon.svg              → Browser tab pe chhota icon.
│   ├── og-image.svg             → Jab link share karo to jo preview image dikhe.
│   ├── manifest.webmanifest     → App-jaisa install karne ki info.
│   ├── robots.txt               → Google ko batata hai kya crawl kare.
│   └── sitemap.xml              → Google ke liye page ki list.
│
├── dist/                 → "Build" karne ke baad ready website (auto-banti hai).
│
└── src/                  → 🔥 ASLI CODE YAHAN HAI
    │
    ├── main.jsx          → Entry point. React ko HTML se jodta hai.
    ├── App.jsx           → Main file. Saare sections ko ek saath jodti hai.
    ├── index.css         → Global styling + theme colors (design tokens).
    │
    ├── data/
    │   └── resume.js     → 🎯 SAARA CONTENT (naam, skills, projects...) YAHAN.
    │
    ├── lib/              → Helper code (baar-baar kaam aane wali cheezein)
    │   ├── accents.js    → Color themes (blue/cyan/violet/purple) ke ready classes.
    │   ├── icons.jsx     → Saare SVG icons (github, mail, arrow...) ek jagah.
    │   ├── motion.js     → Animation ke ready-made settings (fade, slide...).
    │   └── scroll.js     → Smooth scroll helpers (button click pe scroll karna).
    │
    ├── hooks/            → Reusable logic (React "hooks")
    │   ├── useTheme.js         → Dark/light theme switch karna + yaad rakhna.
    │   ├── useScrollSpy.js     → Scroll pe navbar mein active section highlight.
    │   ├── useMediaQuery.js    → Mobile hai ya desktop, ye pata karna.
    │   └── useLockBodyScroll.js→ Menu/modal khule to background scroll rok dena.
    │
    └── components/       → Saare UI blocks
        │
        ├── background/  → Screen ke peeche wale effects
        │   ├── Background.jsx     → Aurora glow + moving particles (canvas).
        │   ├── CursorGlow.jsx     → Mouse ke peeche chalne wali light.
        │   └── ScrollProgress.jsx → Upar patli progress bar (kitna scroll hua).
        │
        ├── layout/      → Page ka dhaancha
        │   ├── Navbar.jsx  → Upar wala menu (sticky, scroll-spy, mobile menu).
        │   └── Footer.jsx  → Neeche wala section (links, socials).
        │
        ├── sections/    → Page ke 7 bade hisse (har ek ek screen)
        │   ├── Hero.jsx          → Sabse upar: naam, typing effect, CTA buttons.
        │   ├── About.jsx         → Mere baare mein + highlight cards.
        │   ├── Skills.jsx        → Skills with animated progress bars.
        │   ├── Projects.jsx      → Project cards + "Case study" popup (modal).
        │   ├── Journey.jsx       → Education/experience timeline.
        │   ├── Certifications.jsx→ Certificates + achievements.
        │   └── Contact.jsx       → Contact form + direct channels.
        │
        └── ui/          → Chhote reusable blocks (baar-baar use hote hain)
            ├── index.js          → Ek jagah se sab export karna (barrel file).
            ├── Section.jsx       → Har section ka standard wrapper.
            ├── SectionHeading.jsx→ Section ka title + subtitle.
            ├── Reveal.jsx        → Scroll pe fade/slide-in animation wrapper.
            ├── Panel.jsx         → Signature "glass + neumorphic" card.
            ├── TiltCard.jsx      → Mouse pe 3D tilt hone wala card.
            ├── Button.jsx        → Magnetic button (cursor ki taraf khinchta hai).
            ├── Tag.jsx           → Chhota pill/chip (skill tags).
            ├── Counter.jsx       → 0 se number tak count-up animation.
            ├── Meter.jsx         → Skill ki progress bar.
            ├── Marquee.jsx       → Infinite scroll karti tech list (ticker).
            ├── IconTile.jsx      → Icon ka chhota box.
            └── BackToTop.jsx     → Floating "upar jao" button.
```

---

<a name="5"></a>
## 5. Ek page browser mein kaise load hota hai (flow)

Step-by-step, jab koi tumhari website kholta hai:

1. **`index.html`** load hota hai — ek khaali dabba `<div id="root"></div>` hota hai ismein.
2. **`main.jsx`** chalta hai — ye React ko us khaali `root` dabbe se jodta hai.
   ```jsx
   ReactDOM.createRoot(document.getElementById('root')).render(<App />)
   ```
   Matlab: "root dabbe ke andar `<App />` ko daal do."
3. **`App.jsx`** render hota hai — ye saare sections ko sequence mein rakhta hai:
   Background → Navbar → Hero → About → Skills → ... → Footer.
4. Har section apna content **`resume.js`** se leta hai aur **Framer Motion** se animate hota hai.
5. Jaise user scroll karta hai, sections **`Reveal`** wrapper ki wajah se fade/slide-in hote hain.

**Ek line mein:** `index.html (khaali)` → `main.jsx (jodta hai)` → `App.jsx (sab jodta hai)` → `sections (content dikhate hain)`.

---

<a name="6"></a>
## 6. Animation kahan-kahan aur kaise aa rahe hain

Do tarah ke animations hain is site pe:

### A) CSS animations (Tailwind se) — [`tailwind.config.js`](tailwind.config.js) mein defined
Ye continuous/loop wale effects hain. `keyframes` = animation ke steps, `animation` = usko chalane ka naam.

| Naam | Kahan dikhta hai | Kya karta hai |
|------|-----------------|---------------|
| `aurora-drift` | Background glow blobs | Dheere-dheere idhar-udhar float karte hain |
| `float` | Scroll-down arrow | Upar-neeche halke se hilta hai |
| `pulse-ring` | "Available" green dot, timeline nodes | Bahar ki taraf ring phailti hai |
| `caret` | Typing effect ka `|` cursor | Blink karta hai |
| `marquee` | Skills ke upar tech list | Infinite side mein scroll |
| `spin-slow` | Hero monogram, certificate medallion | Dheere ghoomta hai |
| `sheen-sweep` | Buttons/cards pe hover | Ek chamak (shine) guzarti hai |
| `gradient-pan` | Gradient text | Colors move karte hain |

Example (tailwind.config.js se):
```js
float: {
  '0%,100%': { transform: 'translateY(0)' },     // start & end: normal position
  '50%':     { transform: 'translateY(-12px)' },  // beech mein: 12px upar
}
// aur isko chalate hain:
float: 'float 6s ease-in-out infinite'  // 6 second, smooth, hamesha repeat
```

### B) JavaScript animations (Framer Motion se) — components ke andar
Ye interaction/scroll pe react karte hain. Settings [`src/lib/motion.js`](src/lib/motion.js) mein hain.

| Effect | Kis file mein | Kaise |
|--------|--------------|-------|
| **Scroll pe fade/slide-in** | [`Reveal.jsx`](src/components/ui/Reveal.jsx) | `whileInView` — jab element screen mein aata hai tab animate |
| **3D tilt on hover** | [`TiltCard.jsx`](src/components/ui/TiltCard.jsx) | Mouse position ko `rotateX/rotateY` mein badalta hai |
| **Magnetic button** | [`Button.jsx`](src/components/ui/Button.jsx) | Button cursor ki taraf thoda khinchta hai |
| **Typing headline** | [`Hero.jsx`](src/components/sections/Hero.jsx) | `useTypedRole` — ek-ek letter add/remove karta hai |
| **Count-up numbers** | [`Counter.jsx`](src/components/ui/Counter.jsx) | 0 se target number tak animate |
| **Skill progress bars** | [`Meter.jsx`](src/components/ui/Meter.jsx) | Width 0 se `value%` tak grow |
| **Parallax scroll** | Hero, Journey, Certifications | `useScroll` + `useTransform` — scroll ke hisaab se position badalti |
| **Page transitions** | [`App.jsx`](src/App.jsx) | `AnimatePresence` — mount/unmount pe fade |

**Framer Motion ka basic idea:** normal HTML tag ke aage `motion.` laga do (jaise `motion.div`),
phir usko `initial` (shuru mein), `animate` (baad mein), `transition` (kaise) props do.
```jsx
<motion.div
  initial={{ opacity: 0, y: 28 }}   // shuru: invisible, 28px neeche
  animate={{ opacity: 1, y: 0 }}    // baad: visible, apni jagah
  transition={{ duration: 0.7 }}    // 0.7 second mein
/>
```

**Performance note (interview mein bolne layak):** Mobile pe kuch heavy animations (parallax,
aurora drift) band kar diye hain `useIsMobile()` hook se, taaki phone pe lag na ho.

---

<a name="7"></a>
## 7. Colors / theme / dark-light kaise kaam karta hai

Ye project ka sabse clever part hai. **CSS Variables (design tokens)** use hue hain.

- [`src/index.css`](src/index.css) mein colors do baar define hain: ek `[data-theme='dark']`
  ke liye, ek `[data-theme='light']` ke liye.
- Colors "variables" hain jaise `--bg-0` (background), `--text-hi` (heading text).
- [`useTheme.js`](src/hooks/useTheme.js) `<html>` tag pe `data-theme="dark"` ya `"light"` set karta hai.
- Bas ek attribute badalte hi **poori website ke saare colors ek saath** switch ho jaate hain.

```css
[data-theme='dark']  { --bg-0: 4 6 15; }      /* dark: almost black */
[data-theme='light'] { --bg-0: 238 242 251; } /* light: soft white */
```
- **Neon accents** (blue, cyan, violet, purple) dono themes mein same rehte hain — brand identity fixed.
- **`accents.js`** mein har color ke ready-made Tailwind classes hain, taaki galti se hex code
  hard-code na ho jaye.

---

<a name="8"></a>
## 8. Har section ka breakdown

### 🏠 Hero ([`Hero.jsx`](src/components/sections/Hero.jsx))
- Naam bada dikhta hai, neeche **typing effect** se roles badalte hain (`useTypedRole`).
- Right side ek ghoomta hua **monogram** (SS) + orbit mein skill icons.
- **CTA buttons**: "View projects" aur "Download resume".
- Neeche **stat counters** (0 se count-up).
- **Parallax:** scroll pe text aur monogram alag speed se move karte hain (desktop only).

### 👤 About ([`About.jsx`](src/components/sections/About.jsx))
- Left: identity card (naam, degree, college, location).
- Right: resume summary + highlight cards (`TiltCard` se 3D tilt).
- Neeche soft-skills chips.

### 🧠 Skills ([`Skills.jsx`](src/components/sections/Skills.jsx))
- Upar **marquee** (infinite scrolling tech list).
- 5 categories (Frontend, Backend, Database, AI/ML, Tools), har skill ki **progress bar** (`Meter`).
- Neeche soft skills grid.

### 💼 Projects ([`Projects.jsx`](src/components/sections/Projects.jsx))
- Filter buttons (All / AI / ML / Computer Vision...).
- Har project ek **card** (`TiltCard`). Card pe do buttons: **Case study** (popup kholta hai)
  aur **View on GitHub**.
- **Case study modal:** full-screen popup jo project ki details dikhata hai. Ye focus trap karta
  hai, Esc pe band hota hai, aur background scroll lock karta hai (accessibility ke liye).

### 🎓 Journey ([`Journey.jsx`](src/components/sections/Journey.jsx))
- Vertical **timeline** — education aur experience.
- Beech mein ek line (spine) jo scroll ke saath fill hoti hai (desktop).
- Filter: All / Education / Experience.

### 🏆 Certifications ([`Certifications.jsx`](src/components/sections/Certifications.jsx))
- Certificate cards with rotating **medallion**.
- Achievement tiles (numbers).
- "Download resume" CTA.

### 📬 Contact ([`Contact.jsx`](src/components/sections/Contact.jsx))
- **Form** with validation (naam, email, subject, message).
- **Koi backend nahi** — submit karne pe tumhara email app khulta hai pehle se bhara hua (`mailto:`).
- Direct channels (email, phone, location) with copy button.

---

<a name="9"></a>
## 9. Common syntax cheat-sheet (line-by-line)

Ye woh cheezein hain jo code mein baar-baar dikhengi. Ek baar samajh lo, sab clear ho jayega.

```jsx
import { useState } from 'react'
```
→ **import** = kisi dusri file/library se cheez laana. Yahan React se `useState` laaya.

```jsx
const [open, setOpen] = useState(false)
```
→ **useState** = ek "memory" banata hai jo change ho sakti hai.
- `open` = current value (shuru mein `false`).
- `setOpen` = value badalne ka function.
- Jab `setOpen(true)` chalta hai, screen automatically update hoti hai.

```jsx
const projects = [...]
export const profile = {...}
```
→ **const** = ek variable (jo dobara assign nahi hoga).
→ `[...]` = **array** (list). `{...}` = **object** (key-value pairs).
→ **export** = is cheez ko dusri files use kar sakti hain.

```jsx
{projects.map((project) => (
  <ProjectCard project={project} />
))}
```
→ **.map()** = list ke har item ke liye kuch banao. Yahan har project ke liye ek card.
→ `{ }` JSX ke andar = "yahan JavaScript chal raha hai".

```jsx
{isActive ? <Highlight /> : null}
```
→ **ternary** = short if-else. "Agar `isActive` sach hai to `<Highlight />`, warna kuch nahi."

```jsx
onClick={() => setOpen(true)}
```
→ **event handler** = jab click ho tab ye function chalao.
→ `() => ...` = ek chhota function (arrow function).

```jsx
<Button variant="primary" size="lg" />
```
→ **props** = component ko diye gaye settings/inputs. Yahan button ko `variant` aur `size` diye.

```jsx
className="flex items-center gap-4"
```
→ **Tailwind classes** = styling. `flex` = items ek line mein, `items-center` = beech mein,
`gap-4` = beech mein spacing. (React mein `class` nahi, `className` likhte hain.)

```jsx
useEffect(() => {
  // ye code component load hone pe chalta hai
  return () => { /* cleanup */ }
}, [])
```
→ **useEffect** = "side effects" ke liye (jaise event listener lagana, timer). `[]` = sirf
ek baar chalao. `return` wala part cleanup karta hai jab component hatta hai.

---

<a name="10"></a>
## 10. Website ko chalana aur deploy karna

### Apne computer pe chalane ke liye:
```bash
npm install      # ek baar — saare tools download karta hai
```
```bash
npm run dev      # development server chalu — browser mein khol ke edit karo
```

### Final version banane ke liye (deploy se pehle):
```bash
npm run build    # optimized website banata hai (dist/ folder mein)
```
```bash
npm run preview  # build ko locally test karo
```

### Live karne ke liye (Vercel):
1. Code GitHub pe push karo.
2. [vercel.com/new](https://vercel.com/new) pe repo import karo.
3. `vercel.json` already set hai — Vercel khud samajh lega. Deploy click karo. Ho gaya!

---

## 🎤 Ek line summary (yaad rakhne ke liye)

> "Ye ek React + Vite portfolio hai, Tailwind CSS se styled aur Framer Motion se animated.
> Saara content ek data file (`resume.js`) se aata hai, colors CSS variables se theme-switch
> hote hain, koi backend nahi hai, aur Vercel pe deployed hai."

Bas itna! Ab tum har cheez explain kar sakte ho. 🚀
