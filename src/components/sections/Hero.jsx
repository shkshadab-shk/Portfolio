import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { Button, Counter, Reveal, Section } from '../ui'
import { accent, accentByIndex, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE, stagger } from '../../lib/motion'
import { anchorHandler } from '../../lib/scroll'
import { contact, heroStats, profile, skillCategories } from '../../data/resume'

const ROLES = profile.roles
const ORBIT = skillCategories.slice(0, 4)

/** Four compass slots on the orbit ring — literal classes so Tailwind emits them. */
const ORBIT_SLOTS = [
  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
  'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
  'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
]

/** Typewriter that cycles `profile.roles`. Static first entry when motion is off. */
function useTypedRole(reduce) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(reduce ? ROLES[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const current = ROLES[index]
    const atEnd = !deleting && typed === current
    const atStart = deleting && typed === ''
    const delay = atEnd ? 1900 : atStart ? 340 : deleting ? 30 : 62

    const timer = setTimeout(() => {
      if (atEnd) {
        setDeleting(true)
        return
      }
      if (atStart) {
        setDeleting(false)
        setIndex((i) => (i + 1) % ROLES.length)
        return
      }
      setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1))
    }, delay)

    return () => clearTimeout(timer)
  }, [typed, deleting, index, reduce])

  return typed
}

/** Rotating identity core: monogram disc, guide rings and orbiting stack nodes. */
function IdentityCore({ reduce }) {
  const a = accent('blue')

  return (
    <div className="relative grid aspect-square w-full max-w-[19rem] place-items-center sm:max-w-[23rem] lg:max-w-[26rem]">
      <span
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, rgb(${a.rgb} / 0.28), transparent 72%)` }}
      />

      {/* Guide rings */}
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-line/[0.08]" />
      <span aria-hidden="true" className="absolute inset-[13%] rounded-full border border-line/[0.06]" />
      <span aria-hidden="true" className="absolute inset-[26%] rounded-full border border-line/[0.05]" />

      {/* Sweeping conic hand */}
      <span
        aria-hidden="true"
        className={cx('absolute inset-0 rounded-full', !reduce && 'animate-spin-slow gpu')}
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, rgb(${a.rgb} / 0.5) 42deg, transparent 110deg)`,
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 62%, #000 68%, #000 99%, transparent 100%)',
          maskImage: 'radial-gradient(closest-side, transparent 62%, #000 68%, #000 99%, transparent 100%)',
        }}
      />

      {/* Orbiting stack nodes — parent spins, children counter-spin to stay upright */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[6%] gpu"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 44, ease: 'linear', repeat: Infinity }}
      >
        {ORBIT.map((category, i) => {
          const ca = accent(category.accent)
          return (
            <span key={category.id} className={cx('absolute', ORBIT_SLOTS[i])}>
              <motion.span
                className="block"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={reduce ? undefined : { duration: 44, ease: 'linear', repeat: Infinity }}
              >
                <span
                  className={cx(
                    'neu grid h-11 w-11 place-items-center rounded-2xl border sm:h-12 sm:w-12',
                    ca.borderSoft,
                    ca.text,
                  )}
                  style={{ boxShadow: `var(--neu-out), 0 0 22px -8px rgb(${ca.rgb} / 0.65)` }}
                >
                  <Icon name={category.icon} className="h-5 w-5" />
                </span>
              </motion.span>
            </span>
          )
        })}
      </motion.div>

      {/* Monogram core */}
      <div className={cx('relative grid h-[42%] w-[42%] place-items-center rounded-full bg-gradient-to-br p-[2px]', a.fromTo)}>
        <div className="neu grid h-full w-full place-items-center overflow-hidden rounded-full">
          <span
            aria-hidden="true"
            className={cx('absolute inset-0 rounded-full bg-gradient-to-br opacity-[0.16]', a.fromTo)}
          />
          <span className="text-gradient-animated relative font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.initials}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const typed = useTypedRole(reduce)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%'])
  const coreY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0])

  return (
    <Section
      id="home"
      className="flex min-h-[100svh] items-center pt-28 sm:pt-32 lg:pt-36"
      innerClassName="w-full"
    >
      <div ref={ref} className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.div
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={stagger(0.09, 0.1)}
            className="flex flex-col items-start gap-6"
          >
            {/* Availability */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-neon-cyan" />
                <span className="absolute inset-0 rounded-full bg-neon-cyan animate-pulse-ring" />
              </span>
              <span className="eyebrow text-ink-mid">{profile.status}</span>
            </motion.div>

            <motion.h1
              id="home-title"
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className="text-display-md font-bold"
            >
              <span className="block text-ink-hi">{profile.firstName}</span>
              <span className="text-gradient-animated block">{profile.lastName}</span>
            </motion.h1>

            {/* Rotating role line */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex min-h-[2.25rem] items-center gap-3"
            >
              <span aria-hidden="true" className={cx('h-px w-8 shrink-0 bg-gradient-to-r', accent('cyan').fromTo)} />
              <p className="text-lg font-medium tracking-tight text-ink-hi sm:text-xl lg:text-2xl">
                <span className="sr-only">{ROLES.join(', ')}</span>
                <span aria-hidden="true">
                  {typed}
                  <span className={cx('ml-0.5 inline-block w-[2px] align-[-0.1em] animate-caret', accent('cyan').bgSolid)}>
                    <span className="invisible">|</span>
                  </span>
                </span>
              </p>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="max-w-xl text-base leading-relaxed text-ink-mid sm:text-lg"
            >
              {profile.summaryShort}
            </motion.p>

            {/* Calls to action */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button
                variant="primary"
                size="lg"
                iconRight="arrowRight"
                href="#projects"
                onClick={anchorHandler('#projects')}
              >
                View projects
              </Button>
              <Button variant="neu" size="lg" icon="download" href={profile.resumeFile} download={profile.resumeFileName}>
                Download resume
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex items-center gap-3"
            >
              {[
                { label: 'GitHub', href: contact.github, icon: 'github' },
                { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
                { label: 'Email', href: `mailto:${contact.email}`, icon: 'mail' },
              ].map((link, i) => {
                const la = accentByIndex(i)
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    aria-label={link.label}
                    className={cx(
                      'neu group/social relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-500 ease-smooth hover:-translate-y-0.5',
                      la.text,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute h-11 w-11 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover/social:opacity-60"
                      style={{ background: `radial-gradient(closest-side, rgb(${la.rgb} / 0.55), transparent)` }}
                    />
                    <Icon name={link.icon} className="relative h-[1.15rem] w-[1.15rem]" />
                  </a>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Identity core */}
        <motion.div style={{ y: coreY, opacity: fade }} className="flex justify-center lg:justify-end">
          <Reveal from="scale" delay={0.2} duration={0.9} className="flex w-full justify-center lg:justify-end">
            <IdentityCore reduce={reduce} />
          </Reveal>
        </motion.div>
      </div>

      {/* Metric strip */}
      <motion.div style={{ opacity: fade }} className="relative mt-16 sm:mt-20">
        <span aria-hidden="true" className="hairline mb-8 block" />
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {heroStats.map((stat, i) => {
            const sa = accentByIndex(i)
            return (
              <Reveal key={stat.label} from="up" delay={0.1 + i * 0.08} className="group/stat">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex flex-col gap-1.5">
                  <span className="font-mono text-3xl font-semibold tracking-tight tabular-nums text-ink-hi sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} raw={stat.raw} />
                  </span>
                  <span className="flex items-center gap-2 text-[0.78rem] leading-snug text-ink-low sm:text-sm">
                    <span aria-hidden="true" className={cx('h-1 w-1 shrink-0 rounded-full', sa.bgSolid)} />
                    {stat.label}
                  </span>
                </dd>
              </Reveal>
            )
          })}
        </dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        onClick={anchorHandler('#about')}
        style={{ opacity: fade }}
        aria-label="Scroll to About"
        className="mx-auto mt-14 hidden w-fit flex-col items-center gap-2 text-ink-low transition-colors duration-300 hover:text-ink-hi lg:flex"
      >
        <span className="eyebrow">Scroll</span>
        <span className="neu grid h-10 w-10 place-items-center rounded-full">
          <Icon name="chevronDown" className={cx('h-4 w-4', !reduce && 'animate-float')} />
        </span>
      </motion.a>
    </Section>
  )
}

export { Hero }
