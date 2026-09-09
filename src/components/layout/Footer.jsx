import { motion, useReducedMotion } from 'framer-motion'

import { Reveal } from '../ui'
import { accent, accentByIndex, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE, viewport } from '../../lib/motion'
import { anchorHandler, scrollToTop } from '../../lib/scroll'
import { contact, footerNote, navLinks, profile, socials } from '../../data/resume'

export default function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()
  const a = accent('blue')

  return (
    <footer className="relative z-10 mt-8 overflow-hidden">
      <span aria-hidden="true" className="hairline block" />

      {/* Horizon glow bleeding up from the bottom edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-grad-brand opacity-[0.07] blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine bg-grid-fine opacity-[0.18] mask-fade-b"
      />

      <div className="shell py-14 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Identity */}
          <Reveal from="up" className="max-w-sm">
            <a
              href="#home"
              onClick={anchorHandler('#home')}
              className="group/brand inline-flex items-center gap-3"
            >
              <span className={cx('grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br p-[1.5px]', a.fromTo)}>
                <span className="neu grid h-full w-full place-items-center rounded-[0.85rem] font-display text-sm font-semibold text-ink-hi">
                  {profile.initials}
                </span>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight text-ink-hi">{profile.name}</span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-low">
                  {profile.role}
                </span>
              </span>
            </a>

            <p className="mt-5 text-sm leading-relaxed text-ink-mid">{profile.tagline}</p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-mid">
              <Icon name="mapPin" className={cx('h-4 w-4 shrink-0', a.text)} />
              {contact.locationLong}
            </p>
          </Reveal>

          {/* Sitemap */}
          <Reveal from="up" delay={0.08} as="nav" className="lg:pt-2" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:gap-x-16">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={anchorHandler(link.href)}
                    className="group/link inline-flex items-center gap-2 py-1 text-sm text-ink-mid transition-colors duration-300 hover:text-ink-hi"
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        'h-1 w-1 rounded-full opacity-0 transition-opacity duration-300 group-hover/link:opacity-100',
                        a.bgSolid,
                      )}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Channels */}
          <Reveal from="up" delay={0.16} className="lg:pt-2">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {socials.map((social, i) => {
                const sa = accentByIndex(i)
                const external = social.href.startsWith('http')
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      className="group/social inline-flex min-h-[44px] items-center gap-3 rounded-xl pr-2 text-sm text-ink-mid transition-colors duration-300 hover:text-ink-hi"
                    >
                      <span
                        className={cx(
                          'neu grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-smooth group-hover/social:-translate-y-0.5',
                          sa.text,
                        )}
                      >
                        <Icon name={social.icon} className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-low">
                          {social.label}
                        </span>
                        <span className="truncate">{social.handle}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <span aria-hidden="true" className="hairline mt-12 block sm:mt-14" />

        <div className="mt-7 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
          <p className="text-center font-mono text-[0.7rem] tracking-wide text-ink-low sm:text-left">
            © {year} {profile.name}. {footerNote}.
          </p>

          <div className="flex items-center gap-4">
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE }}
              className="hidden font-mono text-[0.65rem] uppercase tracking-[0.24em] text-ink-low sm:inline"
            >
              {profile.status}
            </motion.span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="neu group/top grid h-11 w-11 place-items-center rounded-full text-ink-mid transition-colors duration-300 hover:text-ink-hi"
            >
              <Icon
                name="arrowDown"
                className="h-4 w-4 rotate-180 transition-transform duration-500 ease-smooth group-hover/top:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
