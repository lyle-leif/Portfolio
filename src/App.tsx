import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { prefersReducedMotion } from './lib/motion'
import { Preloader } from './components/Preloader'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { ScrollProgress } from './components/ui/ScrollProgress'

export default function App() {
  const [loading, setLoading] = useState(() => !prefersReducedMotion())
  const { theme, toggle } = useTheme()
  const done = useCallback(() => setLoading(false), [])
  useLenis(!loading)

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <ScrollProgress />
      <Navbar show={!loading} theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero play={!loading} theme={theme} />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
