import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { accent as pickAccent, cx } from '../../lib/accents'

/**
 * The signature surface: glassmorphic fill + neumorphic depth, with a cursor
 * spotlight and an accent border that lights up on hover.
 *
 * Props:
 *   accent    'blue' | 'cyan' | 'violet' | 'purple'
 *   spotlight follow the cursor with a soft radial highlight (default true)
 *   lift      translate up on hover (default true)
 *   as        element tag, e.g. 'article' | 'li' | 'a'
 */
export function Panel({
  children,
  as: Tag = 'div',
  accent = 'blue',
  spotlight = true,
  lift = true,
  glow = true,
  className = '',
  innerClassName = '',
  ...rest
}) {
  const a = pickAccent(accent)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -400, y: -400 })
  const [hot, setHot] = useState(false)
  const MotionTag = motion[Tag] || motion.div

  const onMove = useCallback(
    (e) => {
      if (!spotlight || reduce) return
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    [spotlight, reduce],
  )

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => {
        setHot(false)
        setPos({ x: -400, y: -400 })
      }}
      whileHover={lift && !reduce ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cx(
        'group/panel panel border-gradient isolate transition-shadow duration-500 ease-smooth',
        glow && 'hover:shadow-[0_28px_70px_-26px_rgba(4,6,15,0.85)]',
        className,
      )}
      style={glow && hot ? { boxShadow: `var(--neu-out), ${a.shadow}` } : undefined}
      {...rest}
    >
      {/* Cursor spotlight */}
      {spotlight && !reduce ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          style={{
            background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgb(${a.rgb} / 0.16), transparent 62%)`,
          }}
        />
      ) : null}

      {/* Fine grid texture, faded toward the bottom */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine bg-grid-fine opacity-[0.35] mask-fade-b"
      />

      <div className={cx('relative', innerClassName)}>{children}</div>
    </MotionTag>
  )
}

export default Panel
