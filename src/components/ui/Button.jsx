import { forwardRef, useCallback, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'

const VARIANTS = {
  primary:
    'text-white bg-grad-brand bg-[length:200%_100%] hover:bg-[position:100%_50%] shadow-[0_16px_44px_-16px_rgba(61,123,255,0.75)]',
  secondary: 'glass text-ink-hi hover:border-neon-cyan/40 hover:text-white',
  neu: 'neu text-ink-hi hover:text-white',
  ghost: 'text-ink-mid hover:text-ink-hi border border-transparent hover:border-line/12 hover:bg-line/[0.04]',
  outline: 'border border-neon-blue/45 text-ink-hi bg-neon-blue/[0.06] hover:bg-neon-blue/[0.14]',
}

const SIZES = {
  sm: 'h-10 px-4 text-[0.82rem] gap-1.5',
  md: 'h-12 px-5 text-sm gap-2',
  lg: 'h-14 px-7 text-[0.95rem] gap-2.5',
}

/**
 * Magnetic button / link.
 *
 * The whole control drifts a few pixels toward the cursor (spring-damped) and
 * a light sheen sweeps across it on hover — the site's primary micro-interaction.
 * Renders <a> when `href` is set, otherwise <button>.
 */
export const Button = forwardRef(function Button(
  {
    children,
    href,
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    magnetic = true,
    strength = 9,
    full = false,
    className = '',
    type = 'button',
    ...rest
  },
  forwardedRef,
) {
  const reduce = useReducedMotion()
  const localRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.5 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onMove = useCallback(
    (e) => {
      if (!magnetic || reduce) return
      const rect = localRef.current?.getBoundingClientRect()
      if (!rect) return
      x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * strength * 2)
      y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * strength * 2)
    },
    [magnetic, reduce, strength, x, y],
  )

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const Tag = href ? motion.a : motion.button
  const isExternal = href && /^https?:/.test(href)

  return (
    <Tag
      ref={setRefs}
      href={href}
      type={href ? undefined : type}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.965 }}
      className={cx(
        'group/btn relative inline-flex select-none items-center justify-center overflow-hidden rounded-full',
        'font-medium tracking-tight transition-all duration-400 ease-smooth',
        SIZES[size] || SIZES.md,
        VARIANTS[variant] || VARIANTS.primary,
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {/* sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover/btn:animate-sheen-sweep group-hover/btn:opacity-100"
      />
      {icon ? <Icon name={icon} className="relative h-4 w-4 shrink-0" /> : null}
      <span className="relative">{children}</span>
      {iconRight ? (
        <Icon
          name={iconRight}
          className="relative h-4 w-4 shrink-0 transition-transform duration-400 ease-smooth group-hover/btn:translate-x-1"
        />
      ) : null}
    </Tag>
  )
})

export default Button
