import { motion, useReducedMotion } from 'framer-motion'

import { Button, IconTile, Panel, Reveal, Section, SectionHeading, Tag, TiltCard } from '../ui'
import { accent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { fadeUp, stagger, viewport } from '../../lib/motion'
import { anchorHandler } from '../../lib/scroll'
import { aboutFacts, aboutHighlights, contact, profile, sectionMeta, softSkills } from '../../data/resume'

const meta = sectionMeta.about

function HighlightCard({ item }) {
  const a = accent(item.accent)

  return (
    <motion.li variants={fadeUp} className="h-full">
      <TiltCard className="h-full" max={6} scale={1.01}>
        <Panel
          as="article"
          accent={item.accent}
          className="h-full"
          innerClassName="flex h-full flex-col gap-4 p-6 sm:p-7"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32"
            style={{ background: `radial-gradient(70% 100% at 20% 0%, rgb(${a.rgb} / 0.14), transparent 72%)` }}
          />

          <div className="flex items-center gap-4">
            <IconTile icon={item.icon} accent={item.accent} />
            <h3 className="text-base font-semibold tracking-tight text-ink-hi sm:text-lg">{item.title}</h3>
          </div>

          <p className="text-sm leading-relaxed text-ink-mid">{item.body}</p>

          <span
            aria-hidden="true"
            className={cx(
              'mt-auto h-px w-full origin-left scale-x-0 rounded-full bg-gradient-to-r transition-transform duration-700 ease-smooth group-hover/panel:scale-x-100',
              a.fromTo,
            )}
          />
        </Panel>
      </TiltCard>
    </motion.li>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  const a = accent(meta.accent)

  return (
    <Section id="about">
      <SectionHeading
        id="about-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede={profile.tagline}
      />

      <div className="mt-14 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        {/* Identity card */}
        <Reveal from="left" className="lg:sticky lg:top-28 lg:self-start">
          <Panel accent={meta.accent} spotlight={false} lift={false} innerClassName="p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
              style={{ background: `radial-gradient(90% 60% at 50% 0%, rgb(${a.rgb} / 0.9), transparent 70%)` }}
            />

            <div className="flex items-center gap-5">
              <span className={cx('grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-3xl bg-gradient-to-br p-[2px]', a.fromTo)}>
                <span className="neu relative grid h-full w-full place-items-center overflow-hidden rounded-[1.35rem]">
                  <span
                    aria-hidden="true"
                    className={cx('absolute inset-0 bg-gradient-to-br opacity-[0.14]', a.fromTo)}
                  />
                  <span className="text-gradient relative font-display text-2xl font-bold tracking-tight">
                    {profile.initials}
                  </span>
                </span>
              </span>

              <div className="min-w-0">
                <h3 className="truncate text-xl font-semibold tracking-tight text-ink-hi">{profile.name}</h3>
                <p className={cx('eyebrow mt-1.5', a.text)}>{profile.role}</p>
              </div>
            </div>

            <span aria-hidden="true" className="hairline my-7 block" />

            <dl className="flex flex-col gap-5">
              {aboutFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-low">{fact.label}</dt>
                  <dd className="text-sm leading-snug text-ink-hi">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <span aria-hidden="true" className="hairline my-7 block" />

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="md"
                icon="mail"
                href={`mailto:${contact.email}`}
                full
                magnetic={false}
              >
                Email me
              </Button>
              <Button variant="neu" size="md" icon="github" href={contact.github} full magnetic={false}>
                {contact.githubHandle}
              </Button>
            </div>
          </Panel>
        </Reveal>

        {/* Narrative + highlights */}
        <div className="flex flex-col gap-6">
          <Reveal from="right">
            <Panel accent="violet" spotlight={false} innerClassName="p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-grad-brand opacity-[0.1] blur-2xl"
              />

              <Icon name="quote" className={cx('h-7 w-7', accent('violet').text)} />

              <p className="mt-5 text-base leading-relaxed text-ink-mid sm:text-lg">{profile.summary}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Tag icon="mapPin" accent="cyan">
                  {contact.location}
                </Tag>
                <Tag icon="spark" accent="blue">
                  {profile.status}
                </Tag>
              </div>
            </Panel>
          </Reveal>

          <motion.ul
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.09, 0.06)}
            className="grid gap-6 sm:grid-cols-2"
          >
            {aboutHighlights.map((item) => (
              <HighlightCard key={item.title} item={item} />
            ))}
          </motion.ul>

          {/* Working traits */}
          <Reveal from="up" delay={0.06}>
            <div className="neu relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.25] mask-fade-b"
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">How I work</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-hi sm:text-xl">
                    Traits that show up in the code
                  </h3>
                </div>

                <a
                  href="#skills"
                  onClick={anchorHandler('#skills')}
                  className={cx(
                    'group/link inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors duration-300',
                    a.text,
                  )}
                >
                  See the stack
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover/link:translate-x-1"
                  />
                </a>
              </div>

              <ul className="relative mt-6 flex flex-wrap gap-2.5">
                {softSkills.map((skill) => (
                  <li key={skill.name}>
                    <Tag icon={skill.icon} className="chip-hover">
                      {skill.name}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

export { About }
