import { motion, useReducedMotion } from 'framer-motion'
import { accent as pickAccent, cx } from '../../lib/accents'
import { EASE, viewport } from '../../lib/motion'

/**
 * Animated proficiency meter.
 *
 * Neumorphic inset track + gradient fill that grows from 0 when scrolled into
 * view, with a travelling glow head. The numeric value is exposed to assistive
 * tech via role="progressbar" rather than being purely decorative.
 */
export function Meter({ label, value, note, accent = 'blue', delay = 0, showValue = true }) {
  const a = pickAccent(accent)
  const reduce = useReducedMotion()

  return (
    <div className="group/meter">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink-hi transition-colors duration-300 group-hover/meter:text-white">
          {label}
        </span>
        {showValue ? (
          <span className={cx('font-mono text-[0.7rem] tabular-nums', a.text)}>{value}%</span>
        ) : null}
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="neu-inset relative h-2 w-full overflow-hidden rounded-full"
      >
        <motion.div
          initial={reduce ? { width: `${value}%` } : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={viewport}
          transition={{ duration: 1.25, delay, ease: EASE }}
          className={cx('relative h-full rounded-full bg-gradient-to-r', a.fromTo)}
          style={{ boxShadow: `0 0 14px 0 rgb(${a.rgb} / 0.55)` }}
        >
          {/* travelling highlight head */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-6 rounded-full bg-white/45 blur-[3px]"
          />
        </motion.div>
      </div>

      {note ? <p className="mt-1.5 font-mono text-[0.65rem] text-ink-low">{note}</p> : null}
    </div>
  )
}

export default Meter
