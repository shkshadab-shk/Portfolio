import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'

import { cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE } from '../../lib/motion'
import { scrollToTop } from '../../lib/scroll'

const SHOW_AFTER = 600

/**
 * Floating back-to-top control, fixed to the viewport so it is reachable from
 * anywhere on the page. Appears once the hero has cleared and hides again at the
 * top, where the footer's own link already sits.
 */
export function BackToTop() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  // Threshold-crossing only, so scrolling never triggers a re-render storm.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > SHOW_AFTER
    setVisible((prev) => (prev === next ? prev : next))
  })

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={reduce ? false : { opacity: 0, scale: 0.7, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.7, y: 14 }}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={reduce ? undefined : { y: -3 }}
          className={cx(
            'group/top neu glass-strong fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full',
            'text-ink-mid transition-colors duration-300 hover:text-ink-hi sm:bottom-7 sm:right-7 sm:h-14 sm:w-14',
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-grad-brand opacity-0 blur-md transition-opacity duration-500 group-hover/top:opacity-[0.35]"
          />
          <Icon
            name="arrowDown"
            className="relative h-[1.15rem] w-[1.15rem] rotate-180 transition-transform duration-500 ease-smooth group-hover/top:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

export default BackToTop