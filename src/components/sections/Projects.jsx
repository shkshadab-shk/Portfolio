import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Button, IconTile, Panel, Reveal, Section, SectionHeading, Tag, TiltCard } from '../ui'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { accent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE } from '../../lib/motion'
import { projectFilters, projects, sectionMeta } from '../../data/resume'

const meta = sectionMeta.projects

/** Tab-cycle candidates inside the dialog. */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function ProjectCard({ project, onOpen }) {
  const a = accent(project.accent)

  return (
    <TiltCard className="h-full" max={6} scale={1.012}>
      <Panel
        as="article"
        accent={project.accent}
        className="h-full"
        innerClassName="flex h-full flex-col p-6 sm:p-7"
      >
        {/* Accent wash anchored to the card header */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44"
          style={{ background: `radial-gradient(70% 100% at 12% 0%, rgb(${a.rgb} / 0.16), transparent 72%)` }}
        />

        {project.featured ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/panel:opacity-100"
          >
            <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-grad-brand opacity-20 blur-2xl group-hover/panel:animate-sheen-sweep" />
          </span>
        ) : null}

        <header className="flex items-start gap-4">
          <IconTile icon={project.icon} accent={project.accent} size="lg" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cx('eyebrow', a.text)}>{project.category}</span>
              {project.featured ? (
                <span
                  className={cx(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.18em]',
                    a.borderSoft,
                    a.bgSoft,
                    a.text,
                  )}
                >
                  <Icon name="star" className="h-2.5 w-2.5" />
                  Featured
                </span>
              ) : null}
            </div>

            <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink-hi sm:text-xl">
              {project.title}
            </h3>

            <p className="mt-1.5 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-wide text-ink-low">
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {project.period}
            </p>
          </div>
        </header>

        <p className="mt-5 text-sm leading-relaxed text-ink-mid">{project.blurb}</p>

        <ul className="mt-5 flex flex-col gap-3">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cx(
                  'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-smooth group-hover/panel:scale-110',
                  a.borderSoft,
                  a.bgSoft,
                )}
              >
                <Icon name="check" className={cx('h-3 w-3', a.text)} />
              </span>
              <span className="text-[0.85rem] leading-relaxed text-ink-mid">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Fact strip */}
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {project.highlights.map((highlight) => (
            <div key={highlight.label} className="neu-inset rounded-2xl px-3.5 py-3">
              <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-low">{highlight.label}</dt>
              <dd className="mt-1 text-[0.82rem] font-medium leading-tight text-ink-hi">{highlight.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag accent={project.accent}>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <Button
            variant="primary"
            size="sm"
            iconRight="arrowRight"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`Open case study for ${project.title}`}
            full
            magnetic={false}
            className="sm:flex-1"
          >
            Case study
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconRight="arrowUpRight"
            href={project.href}
            full
            magnetic={false}
            className="sm:flex-1"
          >
            {project.linkLabel}
          </Button>
        </div>
      </Panel>
    </TiltCard>
  )
}

/**
 * Case-study dialog.
 *
 * Portalled to <body> because the card sits inside TiltCard's 3D transform,
 * which would otherwise become the containing block for `position: fixed`.
 * Owns focus for as long as it is open: moves focus in, traps Tab, and hands
 * focus back to the trigger on close.
 */
function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion()
  const a = accent(project.accent)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useLockBodyScroll(true)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    return () => {
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // tabIndex -1 filters out the backdrop, which is clickable but not tabbable.
      const nodes = Array.from(dialogRef.current?.querySelectorAll(FOCUSABLE) || []).filter(
        (node) => node.tabIndex !== -1,
      )
      if (!nodes.length) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4 sm:p-6"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 h-full w-full cursor-default bg-base-0/80 backdrop-blur-xl"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.42, ease: EASE }}
        className="glass-strong border-gradient relative my-auto flex max-h-[min(88vh,50rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56"
          style={{ background: `radial-gradient(60% 100% at 12% 0%, rgb(${a.rgb} / 0.18), transparent 72%)` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine bg-grid-fine opacity-[0.3] mask-fade-b"
        />

        {/* Header */}
        <header className="relative shrink-0 px-6 pt-6 sm:px-8 sm:pt-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="neu absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full text-ink-mid transition-colors duration-300 hover:text-ink-hi sm:right-8 sm:top-8"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-4 pr-16">
            <IconTile icon={project.icon} accent={project.accent} size="lg" />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cx('eyebrow', a.text)}>{project.category}</span>
                {project.featured ? (
                  <span
                    className={cx(
                      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.18em]',
                      a.borderSoft,
                      a.bgSoft,
                      a.text,
                    )}
                  >
                    <Icon name="star" className="h-2.5 w-2.5" />
                    Featured
                  </span>
                ) : null}
              </div>

              <h2
                id="project-modal-title"
                className="mt-2 text-xl font-semibold leading-snug tracking-tight text-ink-hi sm:text-2xl"
              >
                {project.title}
              </h2>

              <p className="mt-2 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-wide text-ink-low">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                {project.period}
              </p>
            </div>
          </div>

          <span aria-hidden="true" className="hairline mt-6 block" />
        </header>

        {/* Body */}
        <div className="relative min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-base leading-relaxed text-ink-mid">{project.blurb}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="eyebrow">What I built</p>
              <ol className="mt-5 flex flex-col gap-4">
                {project.bullets.map((bullet, i) => (
                  <li key={bullet} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className={cx(
                        'neu-inset grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[0.62rem] tabular-nums',
                        a.text,
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-1 text-[0.9rem] leading-relaxed text-ink-mid">{bullet}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-7">
              <div>
                <p className="eyebrow">At a glance</p>
                <dl className="mt-5 flex flex-col gap-3">
                  {project.highlights.map((highlight) => (
                    <div key={highlight.label} className="neu-inset rounded-2xl px-4 py-3">
                      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-low">
                        {highlight.label}
                      </dt>
                      <dd className="mt-1 text-[0.85rem] font-medium leading-tight text-ink-hi">
                        {highlight.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="eyebrow">Stack</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Tag accent={project.accent}>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <footer className="relative shrink-0 px-6 pb-6 sm:px-8 sm:pb-8">
          <span aria-hidden="true" className="hairline mb-6 block" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="primary"
              size="md"
              iconRight="arrowUpRight"
              href={project.href}
              magnetic={false}
            >
              {project.linkLabel}
            </Button>
            <Button variant="neu" size="md" onClick={onClose} magnetic={false}>
              Close
            </Button>
          </div>
        </footer>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState(projectFilters[0])
  const [active, setActive] = useState(null)

  const openProject = useCallback((project) => setActive(project), [])
  const closeProject = useCallback(() => setActive(null), [])

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  // Only offer filters that actually match something in the data.
  const filters = useMemo(
    () => projectFilters.filter((f) => f === 'All' || projects.some((p) => p.category === f)),
    [],
  )

  return (
    <Section id="projects">
      <SectionHeading
        id="projects-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede={`${projects.length} projects spanning AI, computer vision, cryptography and real-time systems — each one built end to end.`}
      />

      {/* Filters */}
      <Reveal from="up" delay={0.06} className="mt-12 sm:mt-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
          >
            <span className="hidden shrink-0 items-center gap-2 pr-1 text-ink-low sm:flex">
              <Icon name="filter" className="h-4 w-4" />
            </span>

            {filters.map((option) => {
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

          <p aria-live="polite" className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-low">
            {visible.length} of {projects.length} shown
          </p>
        </div>
      </Reveal>

      <motion.ul layout={!reduce} className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="h-full"
            >
              <ProjectCard project={project} onOpen={openProject} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-low">No projects in this category yet.</p>
      ) : null}

      <AnimatePresence>
        {active ? <ProjectModal key={active.id} project={active} onClose={closeProject} /> : null}
      </AnimatePresence>
    </Section>
  )
}

export { Projects }
