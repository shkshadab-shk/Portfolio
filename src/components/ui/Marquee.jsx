import { cx } from '../../lib/accents'

/**
 * Infinite horizontal ticker.
 *
 * Renders the item list twice and translates -50%, so the loop is seamless.
 * Pauses on hover; edges are masked so items fade rather than clip.
 */
export function Marquee({ items, reverse = false, speed = 32, className = '', renderItem }) {
  const doubled = [...items, ...items]

  return (
    <div className={cx('mask-fade-x relative w-full overflow-hidden py-2', className)}>
      <div
        className="flex w-max items-center gap-3 animate-marquee gpu hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((item, i) =>
          renderItem ? (
            <div key={`${item}-${i}`} aria-hidden={i >= items.length}>
              {renderItem(item, i)}
            </div>
          ) : (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= items.length}
              className="chip chip-hover whitespace-nowrap"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

export default Marquee
