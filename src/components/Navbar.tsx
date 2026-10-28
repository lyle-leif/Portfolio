import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'
import { profile } from '../data/portfolio'
import { scrollToTarget } from '../hooks/useLenis'
import type { Theme } from '../hooks/useTheme'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
]

interface NavbarProps {
  show: boolean
  theme: Theme
  onToggleTheme: () => void
}

export function Navbar({ show, theme, onToggleTheme }: NavbarProps) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...LINKS.map((l) => l.id), 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(id === 'top' ? 0 : `#${id}`)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <nav
          aria-label="Main"
          className={`liquid-glass flex w-full max-w-5xl items-center justify-between gap-2 rounded-full p-1.5 transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,.18)]' : ''
          }`}
        >
          <a href="#top" onClick={go('top')} className="flex items-center gap-3 rounded-full py-1 pr-3 pl-1" aria-label={`${profile.name}, back to top`}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-fg font-display text-lg italic text-bg">{profile.initials}</span>
            <span className="hidden text-sm font-medium tracking-tight sm:inline">
              {profile.name}
              <sup className="ml-0.5 text-[10px] text-muted">™</sup>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    active === l.id ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href="#contact" onClick={go('contact')} className="hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03] sm:inline-block">
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-fg/10 md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg/95 px-6 pb-[max(40px,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-2">
              {[...LINKS, { id: 'contact', label: 'Contact' }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT }}
                >
                  <a href={`#${l.id}`} onClick={go(l.id)} className="flex items-baseline gap-4 py-2 text-5xl tracking-tight">
                    <span className="label">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
