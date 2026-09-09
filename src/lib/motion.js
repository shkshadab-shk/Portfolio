/**
 * Shared Framer Motion variants + easing.
 *
 * Every section imports from here so scroll reveals, stagger rhythm and hover
 * springs feel like one system rather than seven different animation styles.
 */

/** House easing curve — matches Tailwind's `ease-smooth`. */
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_SNAP = [0.34, 1.56, 0.64, 1]

/** Standard viewport trigger for scroll reveals: fires once, slightly early. */
export const viewport = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }
export const viewportEager = { once: true, amount: 0.1, margin: '0px 0px -40px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
}

export const blurIn = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

/** Parent container that staggers its children. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Per-character/word reveal used by headline treatments. */
export const charUp = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -55 },
  show: { opacity: 1, y: '0em', rotateX: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Card lift on hover — the site-wide micro-interaction. */
export const hoverLift = {
  y: -6,
  transition: { type: 'spring', stiffness: 320, damping: 22 },
}

export const tapPress = { scale: 0.97 }

/** Section-level page/route transition. */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: EASE } },
}

export const springSoft = { type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }
export const springSnappy = { type: 'spring', stiffness: 420, damping: 30 }
