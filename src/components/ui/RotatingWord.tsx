import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

// Zero-reflow rotating word slot: every word shares one grid cell, so the slot is as wide as the longest word.
export function RotatingWord({ words, interval = 2000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval])

  const prev = (index - 1 + words.length) % words.length

  return (
    <>
      <span aria-hidden="true" className="inline-grid align-bottom">
        {words.map((word, i) => (
          <span
            key={word}
            className={`col-start-1 row-start-1 font-display italic text-fg transition-all duration-500 ease-out ${
              i === index ? 'translate-y-0 opacity-100' : i === prev ? '-translate-y-2 opacity-0' : 'translate-y-2 opacity-0'
            }`}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </>
  )
}
