import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function scrollToTarget(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2 })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

// Smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return
    lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
    }
  }, [enabled])
}
