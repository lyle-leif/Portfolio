import { Fragment } from 'react'
import { motion } from 'motion/react'

interface BlurWordsProps {
  text: string
  play: boolean
  delay?: number
  className?: string
}

// Word-by-word blur-in (MotionSites "word-by-word blur-in headline").
export function BlurWords({ text, play, delay = 0, className }: BlurWordsProps) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={play ? { filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.5, 1], y: [50, -5, 0] } : undefined}
            transition={{ duration: 0.7, times: [0, 0.5, 1], ease: 'easeOut', delay: delay + i * 0.1 }}
          >
            {word}
          </motion.span>
          {/* Real spaces keep copy/paste and screen readers right. */}
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
