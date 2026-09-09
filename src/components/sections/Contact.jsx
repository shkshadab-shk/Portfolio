import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Button, Panel, Reveal, Section, SectionHeading, Tag } from '../ui'
import { accent, accentByIndex, cx } from '../../lib/accents'
import { Icon } from '../../lib/icons'
import { EASE } from '../../lib/motion'
import { contact, profile, sectionMeta, socials } from '../../data/resume'

const meta = sectionMeta.contact

const FIELDS = [
  { name: 'name', id: 'contact-name', label: 'Your name', type: 'text', placeholder: 'Ada Lovelace', autoComplete: 'name' },
  { name: 'email', id: 'contact-email', label: 'Email address', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { name: 'subject', id: 'contact-subject', label: 'Subject', type: 'text', placeholder: 'AI/ML internship opportunity', autoComplete: 'off' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Direct channels — derived from the resume contact block, no invented data. */
const CHANNELS = [
  { key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: 'mail', copyable: true },
  { key: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phoneHref}`, icon: 'phone', copyable: true },
  { key: 'location', label: 'Location', value: contact.locationLong, href: null, icon: 'mapPin', copyable: false },
]

function Field({ field, value, error, onChange }) {
  const invalid = Boolean(error)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.id} className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-low">
        {field.label}
      </label>
      <input
        id={field.id}
        name={field.name}
        type={field.type}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${field.id}-error` : undefined}
        className={cx(
          'neu-inset min-h-[48px] w-full rounded-2xl px-4 py-3 text-sm text-ink-hi outline-none transition-colors duration-300',
          'placeholder:text-ink-low/70',
          invalid ? 'border border-neon-purple/50' : 'focus:border-neon-cyan/40',
        )}
      />
      {invalid ? (
        <p id={`${field.id}-error`} className="text-[0.72rem] text-neon-purple">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ChannelRow({ channel, index, copied, onCopy }) {
  const a = accentByIndex(index)
  const isCopied = copied === channel.key

  return (
    <li className="group/row flex items-center gap-3.5">
      <span
        className={cx(
          'neu grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-transform duration-500 ease-smooth group-hover/row:-translate-y-0.5',
          a.text,
        )}
      >
        <Icon name={channel.icon} className="h-[1.1rem] w-[1.1rem]" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-low">{channel.label}</p>
        {channel.href ? (
          <a
            href={channel.href}
            className="block truncate text-sm text-ink-hi transition-colors duration-300 hover:text-neon-cyan"
          >
            {channel.value}
          </a>
        ) : (
          <p className="truncate text-sm text-ink-hi">{channel.value}</p>
        )}
      </div>

      {channel.copyable ? (
        <button
          type="button"
          onClick={() => onCopy(channel.key, channel.value)}
          aria-label={`Copy ${channel.label.toLowerCase()}`}
          className={cx(
            'grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line/10 text-ink-low transition-colors duration-300 hover:border-neon-cyan/40 hover:text-ink-hi',
            isCopied && 'border-neon-cyan/50 text-neon-cyan',
          )}
        >
          <Icon name={isCopied ? 'check' : 'copy'} className="h-4 w-4" />
        </button>
      ) : null}
    </li>
  )
}

export default function Contact() {
  const reduce = useReducedMotion()
  const a = accent(meta.accent)

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(null)

  // One place to park pending timers so unmount can't leak them.
  const timers = useRef([])
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const defer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    setStatus('idle')
  }, [])

  const onCopy = useCallback(
    async (key, value) => {
      try {
        await navigator.clipboard?.writeText(value)
        setCopied(key)
        defer(() => setCopied(null), 1800)
      } catch {
        // Clipboard is blocked (insecure context / denied permission) — the raw
        // value is already visible and selectable next to the button.
        setCopied(null)
      }
    },
    [defer],
  )

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const next = {}
      if (!values.name.trim()) next.name = 'Please tell me your name.'
      if (!EMAIL_RE.test(values.email.trim())) next.email = 'A valid email lets me reply.'
      if (!values.subject.trim()) next.subject = 'A short subject helps me prioritise.'
      if (values.message.trim().length < 12) next.message = 'A little more detail, please (12+ characters).'

      setErrors(next)
      if (Object.keys(next).length) {
        setStatus('error')
        return
      }

      // No backend in this build: hand off to the visitor's mail client with the
      // form already composed.
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      const href = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
      window.location.href = href

      setStatus('sent')
      defer(() => {
        setValues(EMPTY)
        setStatus('idle')
      }, 4200)
    },
    [values, defer],
  )

  const statusNote = useMemo(() => {
    if (status === 'sent') return 'Opening your mail app with the message ready to send.'
    if (status === 'error') return 'Please fix the highlighted fields.'
    return null
  }, [status])

  return (
    <Section id="contact">
      <SectionHeading
        id="contact-title"
        eyebrow={meta.eyebrow}
        title={meta.title}
        accent={meta.accent}
        lede={`${profile.status}. Send a note and it lands straight in my inbox — no forms-in-a-void, the button hands off to your mail client.`}
      />

      <div className="mt-14 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Form */}
        <Reveal from="left">
          <Panel accent={meta.accent} spotlight={false} lift={false} innerClassName="p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40"
              style={{ background: `radial-gradient(60% 100% at 15% 0%, rgb(${a.rgb} / 0.14), transparent 72%)` }}
            />

            <div className="flex items-center gap-3">
              <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl border', a.borderSoft, a.bgSoft, a.text)}>
                <Icon name="send" className="h-[1.1rem] w-[1.1rem]" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-ink-hi">Send a message</h3>
                <p className="text-[0.8rem] text-ink-low">Usually replies within a day.</p>
              </div>
            </div>

            <span aria-hidden="true" className="hairline my-6 block" />

            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.slice(0, 2).map((field) => (
                  <Field
                    key={field.id}
                    field={field}
                    value={values[field.name]}
                    error={errors[field.name]}
                    onChange={setField}
                  />
                ))}
              </div>

              <Field
                field={FIELDS[2]}
                value={values.subject}
                error={errors.subject}
                onChange={setField}
              />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-low"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(event) => setField('message', event.target.value)}
                  placeholder="Tell me about the role, the team, or the problem you want solved."
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={cx(
                    'neu-inset w-full resize-y rounded-2xl px-4 py-3 text-sm leading-relaxed text-ink-hi outline-none transition-colors duration-300',
                    'placeholder:text-ink-low/70',
                    errors.message ? 'border border-neon-purple/50' : 'focus:border-neon-cyan/40',
                  )}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="text-[0.72rem] text-neon-purple">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" variant="primary" size="lg" iconRight="send" magnetic={!reduce}>
                  Send message
                </Button>

                <AnimatePresence mode="wait">
                  {statusNote ? (
                    <motion.p
                      key={status}
                      role="status"
                      aria-live="polite"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={cx(
                        'inline-flex items-center gap-2 text-[0.8rem]',
                        status === 'sent' ? 'text-neon-cyan' : 'text-neon-purple',
                      )}
                    >
                      <Icon name={status === 'sent' ? 'check' : 'close'} className="h-3.5 w-3.5 shrink-0" />
                      {statusNote}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </form>
          </Panel>
        </Reveal>

        {/* Channels */}
        <div className="flex flex-col gap-6">
          <Reveal from="right">
            <Panel accent="blue" spotlight={false} innerClassName="p-6 sm:p-7">
              <p className="eyebrow">Direct channels</p>
              <ul className="mt-6 flex flex-col gap-5">
                {CHANNELS.map((channel, i) => (
                  <ChannelRow key={channel.key} channel={channel} index={i} copied={copied} onCopy={onCopy} />
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal from="right" delay={0.08}>
            <Panel accent="violet" spotlight={false} innerClassName="p-6 sm:p-7">
              <p className="eyebrow">Profiles</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const external = social.href.startsWith('http')
                  return (
                    <li key={social.label}>
                      <Tag
                        as="a"
                        href={social.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer noopener' : undefined}
                        icon={social.icon}
                        className="chip-hover px-3.5 py-2"
                      >
                        {social.label}
                      </Tag>
                    </li>
                  )
                })}
              </ul>
            </Panel>
          </Reveal>

          <Reveal from="right" delay={0.14}>
            <div className="neu relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.25] mask-fade-b"
              />

              <div className="relative flex items-start gap-4">
                <span className="relative mt-1 flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-neon-cyan" />
                  <span className="absolute inset-0 rounded-full bg-neon-cyan animate-pulse-ring" />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink-hi">{profile.status}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                    Based in {contact.location} and open to remote or on-site work across AI/ML and full-stack roles.
                  </p>
                  <div className="mt-5">
                    <Button
                      variant="neu"
                      size="sm"
                      icon="download"
                      href={profile.resumeFile}
                      download={profile.resumeFileName}
                      magnetic={false}
                    >
                      Resume PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

export { Contact }
