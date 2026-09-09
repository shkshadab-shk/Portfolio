import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

import { accent } from '../../lib/accents'

/**
 * Reading-progress rail pinned to the very top of the viewport.
 *
 * Driven entirely by Framer's `scrollYProgress` motion value — no scroll
 * listener, no state, no re-render per frame. Only `scaleX` is animated, so the
 * bar stays on the compositor.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.3 })
  const progress = reduce ? scrollYProgress : scaleX

  // The glow head rides the end of the bar and fades in once you start moving.
  const headX = useTransform(progress, (v) => `${v * 100}vw`)
  const headOpacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0])

  const blue = accent('blue')

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <motion.div
        style={{ scaleX: progress }}
        className="h-full w-full origin-left bg-grad-brand bg-[length:200%_100%] animate-gradient-pan"
      />
      <motion.span
        style={{
          x: headX,
          opacity: headOpacity,
          background: `radial-gradient(closest-side, rgb(${blue.rgb} / 0.85), transparent)`,
        }}
        className="absolute -top-[7px] left-0 h-4 w-4 -translate-x-1/2 rounded-full blur-[3px]"
      />
    </div>
  )
}

export { ScrollProgress }
