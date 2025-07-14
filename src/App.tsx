import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParallaxBackground from './components/ParallaxBackground'
import LoadingScreen from './components/LoadingScreen'
import { useLoading } from './hooks/useLoading'

function App() {
  const { isLoading } = useLoading()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }  return (
    <div ref={containerRef} className="relative min-h-screen bg-apple-black">
      <ParallaxBackground />
      
      <Navigation />
      
      <motion.div
        style={{ opacity }}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
      >
        <div className="hero-gradient opacity-50 w-full h-full" />
      </motion.div>
      
      <main className="relative z-20">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="relative z-20 py-12 text-center text-apple-gray-500 text-sm">
        <p>&copy; 2025 Teodor-Cristian Luțoiu. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App