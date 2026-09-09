import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

import { useIsTouch } from '../../hooks/useMediaQuery'
import { accent } from '../../lib/accents'

/**
 * Pointer-following aura + trailing ring.
 *
 * Position is written straight into motion values (never React state), so the
 * pointermove handler causes zero re-renders — only compositor transforms. The
 * whole layer opts out on touch/coarse pointers and under reduced motion.
 */

const HALO = 300
const RING = 34

export default function CursorGlow() {
  const reduce = useReducedMotion()
  const isTouch = useIsTouch()
  const enabled = !reduce && !isTouch

  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)

  // Two spring weights: the halo lags, the ring tracks almost 1:1.
  const haloX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.7 })
  const haloY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.7 })
  const ringX = useSpring(x, { stiffness: 480, damping: 34, mass: 0.35 })
  const ringY = useSpring(y, { stiffness: 480, damping: 34, mass: 0.35 })

  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)
  // Guards the one-shot reveal so pointermove never calls setState twice.
  const shown = useRef(false)

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!shown.current) {
        shown.current = true
        setVisible(true)
      }
    }
    const onLeave = () => {
      shown.current = false
      setVisible(false)
    }
    const onEnter = () => {
      shown.current = true
      setVisible(true)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const blue = accent('blue')
  const violet = accent('violet')

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <motion.span
        className="absolute rounded-full blur-3xl"
        style={{
          x: haloX,
          y: haloY,
          width: HALO,
          height: HALO,
          marginLeft: -HALO / 2,
          marginTop: -HALO / 2,
          background: `radial-gradient(closest-side, rgb(${blue.rgb} / 0.18), rgb(${violet.rgb} / 0.08) 55%, transparent 76%)`,
        }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.82 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.span
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: RING,
          height: RING,
          marginLeft: -RING / 2,
          marginTop: -RING / 2,
          borderColor: `rgb(${blue.rgb} / 0.5)`,
          boxShadow: `0 0 18px -4px rgb(${blue.rgb} / 0.55)`,
        }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.7 : 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      />
    </div>
  )
}

export { CursorGlow }
