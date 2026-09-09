import { motion, useReducedMotion } from 'framer-motion'
import { accent as pickAccent, cx } from '../../lib/accents'
import { EASE, viewport } from '../../lib/motion'

/**
 * Section header: eyebrow label + gradient-accented title + optional lede.
 * Used by every section so headings share one rhythm and one reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  accent = 'blue',
  align = 'center',
  id,
  className = '',
  children,
}) {
  const a = pickAccent(accent)
  const reduce = useReducedMotion()
  const centered = align === 'center'

  return (
    <div
      className={cx(
        'relative flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: EASE }}
          className={cx('inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5', a.borderSoft, a.bgSoft)}
        >
          <span className={cx('relative flex h-1.5 w-1.5 rounded-full', a.bgSolid)}>
            <span className={cx('absolute inset-0 rounded-full animate-pulse-ring', a.bgSolid)} />
          </span>
          <span className="eyebrow text-ink-mid">{eyebrow}</span>
        </motion.div>
      ) : null}

      <motion.h2
        id={id}
        initial={reduce ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={viewport}
        transition={{ duration: 0.75, delay: 0.06, ease: EASE }}
        className="max-w-3xl text-display-sm font-semibold text-ink-hi"
      >
        {title}
      </motion.h2>

      {lede ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          className={cx('max-w-2xl text-base leading-relaxed text-ink-mid sm:text-lg', centered && 'mx-auto')}
        >
          {lede}
        </motion.p>
      ) : null}

      {children}

      <motion.span
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className={cx('mt-1 h-px w-28 origin-left rounded-full bg-gradient-to-r', a.fromTo)}
      />
    </div>
  )
}

export default SectionHeading
