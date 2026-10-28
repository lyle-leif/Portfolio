import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion'
import { profile } from '../data/portfolio'

const DURATION = 1400

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      setCount(Math.round(100 * (1 - Math.pow(1 - t, 2))))
      if (t < 1) raf = requestAnimationFrame(step)
      else window.setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(step)
    // rAF is paused in background tabs; never let the loader block the page.
    const fallback = window.setTimeout(onDone, DURATION + 800)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 md:p-10"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } }}
      aria-hidden="true"
    >
      <p className="label">{profile.name} · Portfolio</p>
      <div className="flex items-end justify-between gap-6">
        <p className="font-display text-3xl italic text-muted md:text-5xl">loading the graph</p>
        <p className="font-mono text-6xl font-normal tabular-nums tracking-tight md:text-8xl">{String(count).padStart(3, '0')}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-stroke">
        <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </motion.div>
  )
}
