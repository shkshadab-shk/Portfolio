import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { cx } from '../../lib/accents'

/**
 * 3D tilt-on-hover wrapper.
 *
 * Tracks the pointer inside the element and maps it to rotateX/rotateY with a
 * spring, giving cards a physical, Tesla-console feel. Children marked with
 * `style={{ transform: 'translateZ(40px)' }}` (or the `.preserve-3d` utility)
 * pop forward inside the tilt.
 *
 * No-ops entirely under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className = '',
  innerClassName = '',
  max = 9,
  scale = 1.015,
  glare = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), spring)
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), spring)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      mx.set((e.clientX - rect.left) / rect.width)
      my.set((e.clientY - rect.top) / rect.height)
    },
    [mx, my],
  )

  const reset = useCallback(() => {
    mx.set(0.5)
    my.set(0.5)
  }, [mx, my])

  if (reduce) {
    return (
      <div className={className} {...rest}>
        <div className={innerClassName}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={cx('perspective', className)} {...rest}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={cx('relative h-full w-full', innerClassName)}
      >
        {children}
        {glare ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.1), transparent 60%)`,
            }}
          />
        ) : null}
      </motion.div>
    </div>
  )
}

export default TiltCard
