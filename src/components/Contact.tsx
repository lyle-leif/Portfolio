import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import { scrollToTarget } from '../hooks/useLenis'
import { Magnetic } from './ui/Magnetic'
import { Reveal } from './ui/Reveal'
import { socialIcons } from './ui/Icons'

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const format = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())
    setTime(format())
    const id = window.setInterval(() => setTime(format()), 30_000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return time
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const time = useLocalTime(profile.timezone)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden rounded-t-[40px] border-t border-stroke bg-surface md:rounded-t-[60px]">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-10 md:px-12 md:pt-40">
        <Reveal>
          <p className="label flex items-center gap-3">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 text-[clamp(48px,9vw,140px)] leading-[0.92] tracking-[-0.05em]">
            {contact.lead}
            <br />
            <span className="accent-word">{contact.accent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              Start a project
              <span className="btn-chip">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </Magnetic>
          <button type="button" onClick={copy} className="btn btn-glass liquid-glass gap-3 !pr-2 font-mono text-[13px]" aria-label={`Copy email address ${profile.email}`}>
            {profile.email}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fg/10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email copied' : ''}
          </span>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-3">
          {profile.socials.map((s) => {
            const Icon = socialIcons[s.label]
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-stroke transition-colors hover:bg-fg hover:text-bg"
              >
                {Icon && <Icon width={18} height={18} />}
              </a>
            )
          })}
          {profile.resumeUrl && (
            <a
              href={`${import.meta.env.BASE_URL}${profile.resumeUrl}`}
              download
              className="ml-1 inline-flex min-h-12 items-center gap-2 rounded-full border border-stroke px-5 text-sm transition-colors hover:bg-fg/5"
            >
              <Download size={16} /> Résumé
            </a>
          )}
        </Reveal>

        <footer className="mt-32 flex flex-col gap-4 border-t border-stroke pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs tracking-wider">
            {time} {profile.timezone}
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget(0)
            }}
            className="inline-flex min-h-11 items-center gap-2 self-start text-fg sm:self-auto"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </footer>
      </div>
    </section>
  )
}
