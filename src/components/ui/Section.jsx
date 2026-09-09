import { cx } from '../../lib/accents'

/**
 * Section shell — consistent id/anchor target, vertical rhythm and max width.
 * `aria-labelledby` points at the heading id that SectionHeading renders.
 */
export function Section({ id, children, className = '', innerClassName = '', labelledBy, ...rest }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy || (id ? `${id}-title` : undefined)}
      className={cx('section scroll-mt-24', className)}
      {...rest}
    >
      <div className={cx('shell', innerClassName)}>{children}</div>
    </section>
  )
}

export default Section
