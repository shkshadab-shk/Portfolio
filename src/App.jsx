import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Background from './components/background/Background'
import CursorGlow from './components/background/CursorGlow'
import ScrollProgress from './components/background/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import { useTheme } from './hooks/useTheme'

// Below-the-fold sections are code-split so the hero paints as early as possible.
const Skills = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Journey = lazy(() => import('./components/sections/Journey'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Contact = lazy(() => import('./components/sections/Contact'))

/** Placeholder that reserves height so lazy sections don't cause layout jump. */
function SectionFallback() {
  return <div aria-hidden="true" className="min-h-[60vh]" />
}

export default function App() {
  const { theme, toggle, isDark } = useTheme()
  const [booted, setBooted] = useState(false)

  // One-shot page-in transition after the first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setBooted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Honour a #hash on load once sections have mounted.
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 420)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-neon-blue focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} isDark={isDark} />

      <AnimatePresence mode="wait">
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: booted ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <Hero />
          <About />
          <Suspense fallback={<SectionFallback />}>
            <Skills />
            <Projects />
            <Journey />
            <Certifications />
            <Contact />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  )
}
