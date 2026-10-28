import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { stack } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

function Row({ items, direction, progress }: { items: string[]; direction: 1 | -1; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const x = useTransform(progress, [0, 1], direction === 1 ? ['-25%', '0%'] : ['0%', '-25%'])
  const repeated = [...items, ...items, ...items]
  return (
    <motion.ul style={{ x }} className="flex w-max gap-[0.5em] whitespace-nowrap">
      {repeated.map((item, i) => (
        <li key={i} className="flex items-center gap-[0.5em]">
          <span className={i % 2 ? 'font-display text-fg/50 italic' : ''}>{item}</span>
          <span className="text-accent" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </motion.ul>
  )
}

// Scroll-linked opposing marquee rows over a grouped skills list.
export function Stack() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section id="stack" ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <Reveal>
          <SectionLabel index="03">Stack</SectionLabel>
        </Reveal>
      </div>

      <div className="mt-12 space-y-2 text-[clamp(40px,7vw,104px)] leading-[1.05] tracking-[-0.045em]" aria-label="Tools I use">
        <Row items={stack.rows[0]} direction={1} progress={scrollYProgress} />
        <Row items={stack.rows[1]} direction={-1} progress={scrollYProgress} />
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-x-8 gap-y-12 px-5 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
        {stack.groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.1}>
            <h3 className="label border-b border-stroke pb-4">{g.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((item) => (
                <li key={item} className="text-[15px] text-fg/85">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
