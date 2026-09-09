import { motion, useReducedMotion } from 'framer-motion'
import { accent as pickAccent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'

/** Small pill for tech-stack tags, filters and metadata. */
export function Tag({ children, icon, accent, active = false, as: Tag_ = 'span', className = '', ...rest }) {
  const a = accent ? pickAccent(accent) : null
  const MotionTag = motion[Tag_] || motion.span
  const reduce = useReducedMotion()

  return (
    <MotionTag
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className={cx(
        'chip',
        active
          ? 'border-neon-cyan/50 bg-neon-cyan/[0.12] text-ink-hi'
          : 'hover:border-neon-cyan/40 hover:text-ink-hi',
        a && !active && cx(a.borderSoft, a.bgSoft),
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} className="h-3 w-3" /> : null}
      {children}
    </MotionTag>
  )
}

export default Tag
