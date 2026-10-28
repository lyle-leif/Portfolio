import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0a0a0a' : '#f4f3ef')
      try {
        localStorage.setItem('theme', next)
      } catch {
        // storage unavailable; the theme still applies for this visit
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
