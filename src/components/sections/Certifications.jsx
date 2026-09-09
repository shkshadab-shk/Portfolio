import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { Button, IconTile, Panel, Reveal, Section, SectionHeading, Tag, TiltCard } from '../ui'
import { accent as pickAccent, accentByIndex, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { fadeUp, stagger, viewport } from '../../lib/motion'
import { anchorHandler } from '../../lib/scroll'
import { achievements, certifications, profile, sectionMeta } from '../../data/resume'

const meta = sectionMeta.certifications

/** Concentric guilloche rings — literal classes so Tailwind emits them. */
const RINGS = ['h-28 w-28', 'h-36 w-36', 'h-44 w-44']

/**
 * Credential medallion: neumorphic disc + gradient collar, sitting inside a
 * guilloche field (static hairline rings + a slowly rotating conic sweep) so the
 * card reads as an engraved certificate plate rather than another icon box.
 */
function Medallion({ icon, a, reduce }) {
  return (
    <span className="relative grid h-44 w-44 shrink-0 place-items-center">
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
        {RINGS.map((size) => (
          <span key={size} className={cx('absolute rounded-full border border-line/[0.07]', size)} />
        ))}

        <span
          className={cx('absolute h-44 w-44 rounded-full opacity-60', !reduce && 'animate-spin-slow gpu')}
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, rgb(${a.rgb} / 0.55) 36deg, transparent 96deg, transparent 176deg, rgb(${a.rgb} / 0.3) 212deg, transparent 288deg)`,
            WebkitMaskImage: 'radial-gradient(closest-side, transparent 50%, #000 59%, #000 84%, transparent 92%)',
            maskImage: 'radial-gradient(closest-side, transparent 50%, #000 59%, #000 84%, transparent 92%)',
          }}
        />

        <span
          className="absolute h-28 w-28 rounded-full blur-2xl opacity-60 transition-opacity duration-700 group-hover/panel:opacity-100"
          style={{ background: `radial-gradient(closest-side, rgb(${a.rgb} / 0.4), transparent)` }}
        />
      </span>

      <span className="relative transition-transform duration-500 ease-smooth group-hover/panel:scale-[1.07]">
        <span className={cx('block rounded-full bg-gradient-to-br p-[1.5px]', a.fromTo)}>
          <span className="neu relative grid h-20 w-20 place-items-center overflow-hidden rounded-full">
            <span
              aria-hidden="true"
              className={cx('absolute inset-0 rounded-full bg-gradient-to-br opacity-[0.14]', a.fromTo)}
            />
            <Icon name={icon} className={cx('relative h-8 w-8', a.text)} />
          </span>
        </span>

        {/* Micro-badge notched into the medallion's corner */}
        <span
          aria-hidden="true"
          className={cx(
            'neu absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border',
            a.border,
          )}
        >
          <Icon name="award" className={cx('h-4 w-4', a.text)} />
        </span>
      </span>
    </span>
  )
}

function CertificateCard({ cert, index, total, reduce }) {
  const a = pickAccent(cert.accent)

  return (
    <TiltCard className="h-full" max={7} scale={1.012}>
      <Panel
        as="article"
        accent={cert.accent}
        className="h-full"
        innerClassName="flex h-full flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12"
      >
        {/* Holographic sheen — a wide iridescent band that sweeps on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        >
          <span className="absolute inset-y-0 -left-2/3 w-2/3 bg-grad-brand opacity-20 blur-md group-hover/panel:animate-sheen-sweep" />
        </span>

        {/* Engraved plate wash, anchored to the medallion */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56"
          style={{ background: `radial-gradient(58% 100% at 50% 0%, rgb(${a.rgb} / 0.12), transparent 70%)` }}
        />

        <span aria-hidden="true" className="absolute right-5 top-5 font-mono text-[0.65rem] tracking-[0.24em] text-ink-low">
          {String(index + 1).padStart(2, '0')}
          <span className="text-ink-low/60"> / {String(total).padStart(2, '0')}</span>
        </span>

        <Medallion icon={cert.icon} a={a} reduce={reduce} />

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink-hi lg:text-2xl">{cert.title}</h3>
        <p className={cx('eyebrow mt-2.5', a.text)}>{cert.issuer}</p>

        <Tag icon="check" accent={cert.accent} className="mt-5">
          Certified
        </Tag>

        <span aria-hidden="true" className="hairline mt-7 block w-full" />

        <ul className="mt-6 flex w-full flex-col gap-3.5 text-left">
          {cert.bullets.map((bullet) => (
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
              <span className="text-sm leading-relaxed text-ink-mid">{bullet}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap justify-center gap-2 pt-8">
          {cert.tags.map((tag) => (
            <li key={tag}>
              <Tag accent={cert.accent}>{tag}</Tag>
            </li>
          ))}
        </ul>
      </Panel>
    </TiltCard>
  )
}

function AchievementTile({ item, index }) {
  const a = accentByIndex(index)

  return (
    <motion.li variants={fadeUp} className="group/stat relative">
      <div className="relative h-full transition-transform duration-500 ease-smooth group-hover/stat:-translate-y-1.5">
        {/* Halo lives outside the clipped tile so it can bloom past the edges. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/stat:opacity-100"
          style={{ background: `radial-gradient(closest-side, rgb(${a.rgb} / 0.4), transparent)` }}
        />

        <div className="neu relative h-full overflow-hidden rounded-2xl p-5 sm:p-6">
          <span
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100',
              a.border,
            )}
          />

          <div className="relative flex flex-col gap-4">
            <IconTile icon={item.icon} accent={a.key} size="sm" />

            <p className="relative inline-block font-mono text-3xl font-semibold leading-none tracking-tight tabular-nums sm:text-4xl">
              <span
                aria-hidden="true"
                className="text-gradient absolute inset-0 select-none opacity-0 blur-[12px] transition-opacity duration-500 group-hover/stat:opacity-80"
              >
                {item.value}
              </span>
              <span className="text-gradient relative">{item.value}</span>
            </p>

            <p className="text-sm leading-snug text-ink-mid">{item.label}</p>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export default function Certifications() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const washY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-9%', '9%'])

  return (
    <Section id="certifications">
      <SectionHeading
        id="certifications-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede="Credentials earned along the way, and the numbers behind the work — every line of it straight from the resume."
      />

      <div ref={wrapRef} className="relative mt-14 sm:mt-16 lg:mt-20">
        {/* Section-wide parallax wash: transform-only, disabled when reduced. */}
        <motion.span
          aria-hidden="true"
          style={{ y: washY }}
          className="pointer-events-none absolute -inset-x-4 -top-16 -z-10 h-72 bg-grad-brand opacity-[0.07] blur-3xl"
        />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} from="up" delay={i * 0.12} blur className="h-full">
              <CertificateCard cert={cert} index={i} total={certifications.length} reduce={reduce} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <Reveal from="up" className="flex flex-col gap-2">
            <span className="eyebrow">By the numbers</span>
            <h3 className="text-2xl font-semibold tracking-tight text-ink-hi sm:text-3xl">Achievements</h3>
          </Reveal>

          <motion.ul
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.1, 0.08)}
            className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {achievements.map((item, i) => (
              <AchievementTile key={item.label} item={item} index={i} />
            ))}
          </motion.ul>
        </div>

        <Reveal from="up" delay={0.08} className="mt-16 sm:mt-20">
          <div className="glass-strong border-gradient relative overflow-hidden rounded-3xl px-6 py-9 sm:px-10 sm:py-11">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-grad-brand opacity-[0.09] blur-2xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.28] mask-fade-b"
            />

            <div className="relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-semibold tracking-tight text-ink-hi sm:text-2xl">Read the full resume</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mid sm:text-base">
                  Every project, certification and date on this site, condensed into a single PDF —{' '}
                  <span className="font-mono text-[0.82em] text-ink-hi">{profile.resumeFileName}</span>.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  variant="primary"
                  size="lg"
                  icon="download"
                  href={profile.resumeFile}
                  download={profile.resumeFileName}
                >
                  Download resume
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  iconRight="arrowRight"
                  href="#contact"
                  onClick={anchorHandler('#contact')}
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
