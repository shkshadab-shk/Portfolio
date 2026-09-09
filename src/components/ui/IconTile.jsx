import { accent as pickAccent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'

/**
 * Icon tile — a small neumorphic square with an accent-tinted glyph.
 * Used as the visual anchor on cards, timeline nodes and skill headers.
 */
export function IconTile({ icon, accent = 'blue', size = 'md', className = '' }) {
  const a = pickAccent(accent)
  const box = size === 'lg' ? 'h-14 w-14 rounded-2xl' : size === 'sm' ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-[0.9rem]'
  const glyph = size === 'lg' ? 'h-6 w-6' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <span
      className={cx(
        'neu relative grid shrink-0 place-items-center overflow-hidden transition-all duration-500 ease-smooth',
        'group-hover/panel:scale-105',
        box,
        a.text,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx('absolute inset-0 bg-gradient-to-br opacity-[0.16] transition-opacity duration-500 group-hover/panel:opacity-30', a.fromTo)}
      />
      <Icon name={icon} className={cx('relative', glyph)} />
    </span>
  )
}

export default IconTile
