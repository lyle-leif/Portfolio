import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/motion'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

// Timeline whose line draws with scroll (GSAP scrub); each entry lights up as the line reaches it.
export function Experience() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.xp-line',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.xp-list', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } },
      )
      gsap.utils.toArray<HTMLElement>('.xp-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 72%', toggleActions: 'play none none reverse' } },
        )
        gsap.fromTo(
          item.querySelector('.xp-dot'),
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: 'back.out(3)', scrollTrigger: { trigger: item, start: 'top 72%', toggleActions: 'play none none reverse' } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={root} className="relative mx-auto max-w-7xl px-5 py-32 md:px-12 md:py-44">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <SectionLabel index="04">Experience</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-[-0.045em]">
              Where I've <span className="accent-word">built</span>
            </h2>
          </Reveal>
        </div>

        <ol className="xp-list relative pl-8 md:pl-12">
          <span className="absolute top-2 bottom-2 left-[3px] w-px bg-stroke" aria-hidden="true" />
          <span className="xp-line absolute top-2 bottom-2 left-[3px] w-px origin-top bg-fg" aria-hidden="true" />
          {experience.map((r) => (
            <li key={r.role + r.company} className="xp-item relative pb-16 last:pb-0">
              <span className="xp-dot absolute top-2 -left-8 h-[7px] w-[7px] rounded-full bg-accent md:-left-12" aria-hidden="true" />
              <p className="label">{r.period}</p>
              <h3 className="mt-3 text-[clamp(24px,2.6vw,36px)] leading-tight tracking-[-0.03em]">{r.role}</h3>
              <p className="mt-1 font-display text-xl text-muted italic">{r.company}</p>
              <ul className="mt-4 space-y-2 text-muted">
                {r.points.map((p) => (
                  <li key={p} className="max-w-[56ch] leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
