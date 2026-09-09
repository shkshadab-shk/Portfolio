import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Count-up number that starts when scrolled into view.
 * `raw` renders the value verbatim (used for years, which shouldn't animate
 * from 0 through 1,347 on the way to 2022).
 */
export function Counter({ value, suffix = '', prefix = '', duration = 1.6, raw = false, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(raw || reduce ? value : 0)

  useEffect(() => {
    if (raw || reduce || !inView) return
    let frame = 0
    let start = null

    const step = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      // easeOutExpo — fast then settling, matches the site's easing feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, raw, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {raw ? value : display}
      {suffix}
    </span>
  )
}

export default Counter
