import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { about } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/motion'
import { CountUp } from './ui/CountUp'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

function Word({ word, progress, range, highlight }: { word: string; progress: MotionValue<number>; range: [number, number]; highlight: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className={highlight ? 'font-display tracking-[-0.01em] text-fg italic' : undefined}>
      {word}{' '}
    </motion.span>
  )
}

// Scroll-linked word reveal: the paragraph lights up at reading pace.
export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.35'] })
  const reduced = prefersReducedMotion()
  const words = about.text.split(' ')
  const highlights = new Set(about.highlights)

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-32 md:px-12 md:py-44">
      <Reveal>
        <SectionLabel index="01">About</SectionLabel>
      </Reveal>

      <p ref={ref} className="mt-10 max-w-5xl text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.18] font-normal tracking-[-0.03em] text-fg/85">
        {reduced
          ? about.text
          : words.map((w, i) => {
              const clean = w.replace(/[^a-z]/gi, '').toLowerCase()
              const N = words.length
              return <Word key={i} word={w} progress={scrollYProgress} range={[i / N - 0.05, i / N + 0.05]} highlight={highlights.has(clean)} />
            })}
      </p>

      <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-stroke pt-12 md:grid-cols-4">
        {about.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <dt className="label">{s.label}</dt>
            <dd className="mt-3 text-[clamp(44px,6vw,80px)] leading-none font-light tracking-[-0.04em]">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
