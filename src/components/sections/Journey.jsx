import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

import { Panel, Reveal, Section, SectionHeading, Tag } from '../ui'
import { accent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE } from '../../lib/motion'
import { sectionMeta, timeline, timelineFilters } from '../../data/resume'

const meta = sectionMeta.journey

const KIND_LABEL = { education: 'Education', experience: 'Experience' }

function TimelineNode({ entry, a, reduce }) {
  return (
    <span className="relative grid place-items-center">
      <span
        aria-hidden="true"
        className="absolute h-14 w-14 rounded-full blur-xl"
        style={{ background: `radial-gradient(closest-side, rgb(${a.rgb} / 0.45), transparent)` }}
      />
      <span
        aria-hidden="true"
        className={cx('absolute h-12 w-12 rounded-full border', a.borderSoft, !reduce && 'animate-pulse-ring')}
      />
      <span
        className={cx(
          'neu relative grid h-11 w-11 place-items-center rounded-full border transition-transform duration-500 ease-smooth group-hover/entry:scale-110',
          a.border,
          a.text,
        )}
      >
        <Icon name={entry.icon} className="h-5 w-5" />
      </span>
    </span>
  )
}

function TimelineEntry({ entry, index, reduce }) {
  const a = accent(entry.accent)
  const isLeft = index % 2 === 0

  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group/entry relative grid grid-cols-[3.5rem_1fr] items-start gap-x-4 gap-y-3 lg:grid-cols-[1fr_6rem_1fr] lg:gap-x-0"
    >
      {/* Spine node */}
      <div className="col-start-1 row-start-1 flex justify-center pt-1 lg:col-start-2">
        <TimelineNode entry={entry} a={a} reduce={reduce} />
      </div>

      {/* Card */}
      <div
        className={cx(
          'col-start-2 row-start-1',
          isLeft ? 'lg:col-start-1 lg:pr-10' : 'lg:col-start-3 lg:pl-10',
        )}
      >
        <Panel
          as="article"
          accent={entry.accent}
          innerClassName={cx('flex flex-col p-5 sm:p-6', isLeft && 'lg:items-end lg:text-right')}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32"
            style={{ background: `radial-gradient(70% 100% at 20% 0%, rgb(${a.rgb} / 0.13), transparent 72%)` }}
          />

          <div className={cx('flex flex-wrap items-center gap-2', isLeft && 'lg:justify-end')}>
            <span className={cx('eyebrow', a.text)}>{KIND_LABEL[entry.kind] || entry.kind}</span>
            <span
              className={cx(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em]',
                a.borderSoft,
                a.bgSoft,
                a.text,
              )}
            >
              <Icon name={entry.status === 'Pursuing' ? 'loader' : 'check'} className="h-2.5 w-2.5" />
              {entry.status}
            </span>
          </div>

          <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-ink-hi sm:text-lg">
            {entry.title}
          </h3>

          <p className="mt-1.5 text-sm font-medium text-ink-mid">{entry.org}</p>

          <p className={cx('mt-2 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-wide text-ink-low', isLeft && 'lg:flex-row-reverse')}>
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {entry.period}
          </p>

          <span aria-hidden="true" className="hairline my-4 block w-full" />

          <p className="text-[0.85rem] leading-relaxed text-ink-mid">{entry.detail}</p>

          <ul className={cx('mt-5 flex flex-wrap gap-2', isLeft && 'lg:justify-end')}>
            {entry.tags.map((tag) => (
              <li key={tag}>
                <Tag accent={entry.accent}>{tag}</Tag>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Year marker on the empty side (lg only) */}
      <div
        aria-hidden="true"
        className={cx(
          'hidden lg:row-start-1 lg:flex lg:items-start lg:pt-3',
          isLeft ? 'lg:col-start-3 lg:justify-start lg:pl-10' : 'lg:col-start-1 lg:justify-end lg:pr-10',
        )}
      >
        <span className="font-mono text-4xl font-semibold tracking-tight text-ink-low/40">{entry.year}</span>
      </div>
    </motion.li>
  )
}

export default function Journey() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState(timelineFilters[0])
  const listRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 78%', 'end 65%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.4 })
  const spineScale = reduce ? 1 : smooth
  const headY = useTransform(smooth, (v) => `${v * 100}%`)

  const visible = useMemo(
    () => (filter === 'All' ? timeline : timeline.filter((entry) => KIND_LABEL[entry.kind] === filter)),
    [filter],
  )

  const counts = useMemo(
    () => ({
      education: timeline.filter((entry) => entry.kind === 'education').length,
      experience: timeline.filter((entry) => entry.kind === 'experience').length,
    }),
    [],
  )

  return (
    <Section id="journey">
      <SectionHeading
        id="journey-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede={`${counts.education} education milestones and ${counts.experience} industry program — the path from school benches to shipping AI projects.`}
      />

      {/* Filters */}
      <Reveal from="up" delay={0.06} className="mt-12 sm:mt-14">
        <div
          role="group"
          aria-label="Filter timeline by type"
          className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
        >
          {timelineFilters.map((option) => {
            const isActive = option === filter
            return (
              <Tag
                key={option}
                as="button"
                type="button"
                active={isActive}
                aria-pressed={isActive}
                onClick={() => setFilter(option)}
                className="shrink-0 whitespace-nowrap px-3.5 py-2"
              >
                {option}
              </Tag>
            )
          })}
        </div>
      </Reveal>

      <div ref={listRef} className="relative mt-10 sm:mt-12">
        {/* Spine: static track + scroll-linked fill. Transform-only, never `top`. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-7 top-0 w-px -translate-x-1/2 bg-line/[0.09] lg:left-1/2"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: spineScale, x: '-50%' }}
          className="absolute bottom-0 left-7 top-0 w-px origin-top bg-gradient-to-b from-neon-blue via-neon-violet to-neon-purple lg:left-1/2"
        />
        {/* Full-height rail so a percentage `y` maps to the spine's own length. */}
        <motion.span aria-hidden="true" style={{ y: headY }} className="absolute inset-y-0 left-7 w-0 lg:left-1/2">
          <span className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
        </motion.span>

        <motion.ul layout={!reduce} className="flex flex-col gap-10 sm:gap-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((entry, i) => (
              <TimelineEntry key={entry.id} entry={entry} index={i} reduce={reduce} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </Section>
  )
}

export { Journey }
