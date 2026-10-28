import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { prefersReducedMotion } from '../../lib/motion'

export function CountUp({ value, suffix = '', duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
