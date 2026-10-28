import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'
import { profile } from '../data/portfolio'
import { scrollToTarget } from '../hooks/useLenis'
import type { Theme } from '../hooks/useTheme'
import { BlurWords } from './ui/BlurWords'
import { RotatingWord } from './ui/RotatingWord'
import { Magnetic } from './ui/Magnetic'

const HeroScene = lazy(() => import('./HeroScene'))

// Entrance order: eyebrow → H1 → role → sub → CTAs → scroll cue.
const rise = (play: boolean, delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: play ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 0.9, delay, ease: EASE_OUT },
})

export function Hero({ play, theme }: { play: boolean; theme: Theme }) {
  const leadWords = profile.headline.lead.split(' ').length

  return (
    <section id="top" className="relative flex h-screen min-h-[640px] flex-col justify-end overflow-hidden [height:100dvh]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={play ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      >
        <Suspense fallback={null}>
          <HeroScene theme={theme} />
        </Suspense>
      </motion.div>
      {/* Keeps the copy readable over the graph on narrow screens, and melts into the next section. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent md:via-bg/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-12 md:pb-20">
        <motion.p className="label mb-8 flex items-center gap-3" {...rise(play, 0.15)}>
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.availability} · {profile.location}
        </motion.p>

        <h1 className="max-w-[14ch] text-[clamp(44px,7.4vw,112px)] leading-[0.95] font-normal tracking-[-0.045em]">
          <BlurWords text={profile.headline.lead} play={play} delay={0.3} />
          <br />
          <BlurWords text={profile.headline.accent} play={play} delay={0.3 + leadWords * 0.1} className="font-display tracking-[-0.02em] text-fg/60 italic" />
        </h1>

        <motion.p className="mt-7 text-lg text-fg/80 md:text-xl" {...rise(play, 1.0)}>
          Full-stack developer & <RotatingWord words={profile.roles} /> engineer
        </motion.p>

        <motion.p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-muted md:text-base" {...rise(play, 1.12)}>
          {profile.sub}
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...rise(play, 1.24)}>
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#work')
              }}
              className="btn btn-primary"
            >
              See my work
              <span className="btn-chip">
                <ArrowRight size={16} />
              </span>
            </a>
          </Magnetic>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#contact')
            }}
            className="btn btn-glass liquid-glass"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute right-5 bottom-16 hidden flex-col items-center gap-3 md:right-12 md:flex"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="label [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-fg" />
        </span>
      </motion.div>
    </section>
  )
}
