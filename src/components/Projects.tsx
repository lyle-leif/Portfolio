import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './ui/Icons'
import { projects, type Project } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/motion'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

interface CardProps {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}

// Sticky stacking cards that scale down (MotionSites scroll recipe #5).
function Card({ project, index, total, progress }: CardProps) {
  const target = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, prefersReducedMotion() ? 1 : target])

  return (
    <div className="sticky top-0 flex min-h-[85vh] items-start justify-center pt-24 md:pt-28">
      <motion.article
        style={{ scale, top: index * 28 }}
        className="relative grid w-full origin-top gap-6 rounded-[32px] border border-stroke bg-surface p-5 shadow-[0_-12px_40px_rgba(0,0,0,.12)] md:grid-cols-[1fr_1.15fr] md:gap-10 md:rounded-[44px] md:p-8"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[clamp(48px,6vw,88px)] leading-none font-light tracking-[-0.05em] text-fg/25">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="label">
              {project.category} · {project.year}
            </span>
          </div>
          <h3 className="mt-6 text-[clamp(28px,3.4vw,48px)] leading-[1.02] tracking-[-0.035em]">{project.title}</h3>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{project.summary}</p>
          <p className="mt-4 flex items-start gap-2 text-fg">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {project.result}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-stroke px-3 py-1 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-2 pt-8">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-11 !py-1.5 text-[13px]">
                Live project
                <span className="btn-chip !h-8 !w-8">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noreferrer" className="btn !min-h-11 border border-stroke !px-5 text-[13px] hover:bg-fg/5">
                <GithubIcon width={15} height={15} /> Code
              </a>
            )}
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-[24px] border border-stroke bg-bg md:aspect-auto md:min-h-[380px] md:rounded-[32px]">
          <ProjectVisual kind={project.visual} />
        </div>
      </motion.article>
    </div>
  )
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 pt-16 md:px-12">
      <Reveal>
        <SectionLabel index="02">Selected work</SectionLabel>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-6 text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-[-0.045em]">
          Things I've <span className="accent-word">shipped</span>
        </h2>
      </Reveal>

      <div ref={ref} className="relative pb-[10vh]">
        {projects.map((p, i) => (
          <Card key={p.title} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
