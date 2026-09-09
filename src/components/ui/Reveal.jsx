import { motion, useReducedMotion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

const PRESETS = {
  up: { y: 28, x: 0, scale: 1 },
  down: { y: -24, x: 0, scale: 1 },
  left: { y: 0, x: -34, scale: 1 },
  right: { y: 0, x: 34, scale: 1 },
  scale: { y: 14, x: 0, scale: 0.94 },
  fade: { y: 0, x: 0, scale: 1 },
}

/**
 * Scroll-reveal wrapper — the workhorse of the site.
 *
 *   <Reveal delay={0.1} y="left">…</Reveal>
 *
 * Honours prefers-reduced-motion by rendering the content already-visible, and
 * only ever animates once so scrolling back up doesn't re-trigger.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  from = 'up',
  delay = 0,
  duration = 0.7,
  blur = false,
  className = '',
  amount,
  ...rest
}) {
  const reduce = useReducedMotion()
  const preset = PRESETS[from] || PRESETS.up
  const MotionTag = motion[Tag] || motion.div

  if (reduce) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...preset, ...(blur ? { filter: 'blur(10px)' } : null) }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, ...(blur ? { filter: 'blur(0px)' } : null) }}
      viewport={amount ? { ...viewport, amount } : viewport}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
