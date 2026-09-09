import { motion, useReducedMotion } from 'framer-motion'

import { IconTile, Marquee, Meter, Panel, Reveal, Section, SectionHeading, Tag } from '../ui'
import { accent, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { fadeUp, stagger, viewport } from '../../lib/motion'
import { sectionMeta, skillCategories, softSkills, techMarquee } from '../../data/resume'

const meta = sectionMeta.skills

const SOURCE_LABEL = {
  resume: 'Listed on resume',
  projects: 'Proven in projects',
}

function CategoryCard({ category, index }) {
  const a = accent(category.accent)
  const average = Math.round(category.skills.reduce((sum, s) => sum + s.level, 0) / category.skills.length)

  return (
    <motion.li variants={fadeUp} className="h-full">
      <Panel
        as="article"
        accent={category.accent}
        className="h-full"
        innerClassName="flex h-full flex-col p-6 sm:p-7"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40"
          style={{ background: `radial-gradient(65% 100% at 15% 0%, rgb(${a.rgb} / 0.15), transparent 70%)` }}
        />

        <header className="flex items-start gap-4">
          <IconTile icon={category.icon} accent={category.accent} size="lg" />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-ink-hi sm:text-xl">{category.title}</h3>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-low">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-low">{category.subtitle}</p>
          </div>
        </header>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Tag icon={category.source === 'resume' ? 'check' : 'rocket'} accent={category.accent}>
            {SOURCE_LABEL[category.source] || SOURCE_LABEL.resume}
          </Tag>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-low">
            {category.skills.length} skills · avg {average}%
          </span>
        </div>

        <span aria-hidden="true" className="hairline my-6 block" />

        <div className="flex flex-col gap-5">
          {category.skills.map((skill, i) => (
            <Meter
              key={skill.name}
              label={skill.name}
              value={skill.level}
              note={skill.note}
              accent={category.accent}
              delay={0.08 + i * 0.07}
            />
          ))}
        </div>
      </Panel>
    </motion.li>
  )
}

export default function Skills() {
  const reduce = useReducedMotion()
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0)

  return (
    <Section id="skills">
      <SectionHeading
        id="skills-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede={`${totalSkills} skills across ${skillCategories.length} disciplines — every one of them exercised in a project on this page, not just read about.`}
      />

      {/* Tech ticker */}
      <Reveal from="up" delay={0.06} className="mt-12 sm:mt-14">
        <div className="neu relative overflow-hidden rounded-3xl py-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grad-brand opacity-[0.05] blur-2xl"
          />
          <div className="relative flex flex-col gap-3">
            <Marquee items={techMarquee} speed={38} />
            <Marquee items={techMarquee} speed={46} reverse />
          </div>
        </div>
      </Reveal>

      <motion.ul
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.1, 0.06)}
        className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8"
      >
        {skillCategories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </motion.ul>

      {/* Soft skills */}
      <Reveal from="up" delay={0.08} className="mt-12 sm:mt-14">
        <div className="glass-strong border-gradient relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-grad-brand opacity-[0.08] blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-md">
              <p className="eyebrow">Beyond the stack</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink-hi sm:text-2xl">Soft skills</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-mid">
                The habits behind the commits — distilled from how the projects above actually got shipped.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {softSkills.map((skill, i) => {
                const sa = accent(skillCategories[i % skillCategories.length].accent)
                return (
                  <li key={skill.name}>
                    <span className="group/soft neu flex min-h-[44px] items-center gap-2.5 rounded-2xl px-3.5 py-2.5 transition-transform duration-500 ease-smooth hover:-translate-y-0.5">
                      <Icon name={skill.icon} className={cx('h-4 w-4 shrink-0', sa.text)} />
                      <span className="text-[0.82rem] font-medium leading-tight text-ink-mid transition-colors duration-300 group-hover/soft:text-ink-hi">
                        {skill.name}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export { Skills }
