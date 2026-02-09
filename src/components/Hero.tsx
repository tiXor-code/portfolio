import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background with mouse parallax */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #0066FF 0%, transparent 50%)`,
        }}
      />
      
      <div className="container-content text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Name */}
          <motion.h1 
            className="hero-text mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Teodor-Cristian
            <br />
            <span className="text-gradient">Lutoiu</span>
          </motion.h1>

          {/* One-liner subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-title text-text-secondary max-w-3xl mx-auto text-balance mb-16"
          >
            Game Producer & Developer at EA, crafting experiences that connect millions of players worldwide
          </motion.p>

          {/* Current role badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center glass px-6 py-3 rounded-full text-small"
          >
            <div className="w-2 h-2 bg-accent-blue rounded-full mr-3 animate-pulse" />
            <span className="text-text-secondary">Currently at</span>
            <span className="ml-2 text-text-primary font-medium">Electronic Arts</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-text-secondary hover:text-text-primary transition-colors duration-300 group"
      >
        <div className="flex flex-col items-center">
          <span className="text-small mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-current rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Subtle parallax elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-full blur-3xl"
        animate={{ 
          x: mousePosition.x * 0.1, 
          y: mousePosition.y * 0.1 
        }}
        transition={{ type: 'spring', stiffness: 100 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl"
        animate={{ 
          x: -mousePosition.x * 0.05, 
          y: -mousePosition.y * 0.05 
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
    </section>
  )
}