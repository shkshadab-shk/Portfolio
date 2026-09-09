import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'

import { Button } from '../ui'
import { useIsMobile } from '../../hooks/useMediaQuery'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { accent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE } from '../../lib/motion'
import { anchorHandler, scrollToId } from '../../lib/scroll'
import { navLinks, profile } from '../../data/resume'

/** Module-level so the array identity is stable across renders (scroll-spy dep). */
const SECTION_IDS = navLinks.map((link) => link.id)
const ELEVATE_AT = 24

function ThemeToggle({ isDark, onToggle, className = '' }) {
  const reduce = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={!isDark}
      className={cx(
        'neu group/theme relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full',
        'text-ink-mid transition-colors duration-300 hover:text-ink-hi',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-grad-brand opacity-0 transition-opacity duration-500 group-hover/theme:opacity-[0.14]"
      />
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={reduce ? false : { opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="relative grid place-items-center"
        >
          <Icon name={isDark ? 'moon' : 'sun'} className="h-[1.15rem] w-[1.15rem]" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar({ isDark = true, onToggleTheme }) {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  const activeId = useScrollSpy(SECTION_IDS)

  const [elevated, setElevated] = useState(false)
  const [open, setOpen] = useState(false)

  useLockBodyScroll(open)

  // Threshold-crossing only: the handler reads a motion value and sets state at
  // most once per crossing, so scrolling never triggers a re-render storm.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > ELEVATE_AT
    setElevated((prev) => (prev === next ? prev : next))
  })

  // The desktop bar owns the menu state; collapse it when we grow past `lg`.
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const go = useCallback((id) => {
    setOpen(false)
    // Let the scroll lock release before measuring the target offset.
    requestAnimationFrame(() => scrollToId(id))
  }, [])

  const a = accent('blue')

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          aria-label="Primary"
          className={cx(
            'shell mt-3 flex h-16 items-center justify-between gap-3 rounded-full px-3 transition-all duration-500 ease-smooth sm:mt-4 sm:h-[4.25rem] sm:px-4',
            elevated ? 'glass-strong border-gradient max-w-[min(1160px,calc(100%-1.5rem))]' : 'border border-transparent',
          )}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={anchorHandler('#home')}
            className="group/brand flex shrink-0 items-center gap-3 rounded-full py-1 pl-1 pr-3"
          >
            <span className={cx('relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br p-[1.5px]', a.fromTo)}>
              <span className="neu grid h-full w-full place-items-center rounded-full font-display text-sm font-semibold tracking-tight text-ink-hi">
                {profile.initials}
              </span>
              <span
                aria-hidden="true"
                className={cx(
                  'absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover/brand:opacity-70 bg-gradient-to-br',
                  a.fromTo,
                )}
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight text-ink-hi">{profile.name}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-low">{profile.role}</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      go(link.id)
                    }}
                    className={cx(
                      'relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-ink-hi' : 'text-ink-mid hover:text-ink-hi',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                        className={cx('absolute inset-0 rounded-full border', a.borderSoft, a.bgSoft)}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <Button
              href={profile.resumeFile}
              download={profile.resumeFileName}
              variant="primary"
              size="sm"
              icon="download"
              className="hidden sm:inline-flex"
            >
              Resume
            </Button>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-mobile-panel"
              className="neu grid h-11 w-11 place-items-center rounded-full text-ink-hi lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="nav-mobile-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-base-0/80 backdrop-blur-xl"
            />

            <motion.div
              initial={reduce ? false : { y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -12, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="glass-strong absolute inset-x-4 top-24 overflow-hidden rounded-3xl p-5 sm:inset-x-6"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.3] mask-fade-b"
              />

              <ul className="relative flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeId === link.id
                  return (
                    <motion.li
                      key={link.id}
                      initial={reduce ? false : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.045, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={(event) => {
                          event.preventDefault()
                          go(link.id)
                        }}
                        className={cx(
                          'flex min-h-[48px] items-center justify-between gap-4 rounded-2xl px-4 transition-colors duration-300',
                          isActive ? cx('text-ink-hi', a.bgSoft) : 'text-ink-mid hover:bg-line/[0.05] hover:text-ink-hi',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ink-low">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-base font-medium tracking-tight">{link.label}</span>
                        </span>
                        <Icon
                          name="arrowUpRight"
                          className={cx('h-4 w-4 shrink-0', isActive ? a.text : 'text-ink-low')}
                        />
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <span aria-hidden="true" className="hairline relative my-5 block" />

              <Button
                href={profile.resumeFile}
                download={profile.resumeFileName}
                variant="primary"
                size="md"
                icon="download"
                full
                magnetic={false}
              >
                Download resume
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export { Navbar }
