import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Typing effect state
  const [displayedText, setDisplayedText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  const textLines = [
    "Versatile Digital Innovator transforming ideas across industries",
    "From Gaming Analytics to AI Automation Solutions",
    "Leadership through Adaptive Excellence",
    "Crafting Tomorrow's Digital Experiences Today",
    "Where Technical Mastery Meets Creative Vision"
  ]
  
  useEffect(() => {
    const currentLine = textLines[currentLineIndex]
    const typingSpeed = isDeleting ? 20 : 50
    const pauseDuration = 2000
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentLine.length) {
        // Typing
        setDisplayedText(currentLine.slice(0, displayedText.length + 1))
      } else if (isDeleting && displayedText.length > 0) {
        // Deleting
        setDisplayedText(currentLine.slice(0, displayedText.length - 1))
      } else if (!isDeleting && displayedText.length === currentLine.length) {
        // Pause at end of line
        setIsPaused(true)
      } else if (isDeleting && displayedText.length === 0) {
        // Move to next line
        setIsDeleting(false)
        setCurrentLineIndex((prev) => (prev + 1) % textLines.length)
      }
    }, typingSpeed)
    
    return () => clearTimeout(timer)
  }, [displayedText, currentLineIndex, isDeleting, isPaused])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-apple-blue rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <motion.div
        ref={ref}
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
        >
          Teodor-Cristian Luțoiu
        </motion.h1>
        
        <motion.div
          className="text-xl md:text-2xl text-apple-gray-300 mb-12 max-w-3xl mx-auto h-16 md:h-8 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="inline-block">
            {displayedText}
            <motion.span
              className="inline-block w-0.5 h-6 md:h-7 bg-apple-gray-300 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-apple-blue text-white font-medium rounded-full hover:bg-apple-blue-hover transition-colors duration-300 button-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Impact
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-4 glass-effect text-apple-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Collaborate
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-apple-gray-500 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-apple-gray-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero