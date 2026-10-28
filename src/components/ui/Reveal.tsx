import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// In-view-once fade up. The rest state is the visible state, so nothing stays hidden if motion is off.
export function Reveal({ children, delay = 0, y = 30, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
