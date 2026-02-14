import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

export default function EAScreen() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (inView) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className="relative screen-content">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}images/journey/ea-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      <div className="screen-content">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 text-center">
          {/* Current Role Badge - prominent at top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center glass border border-accent-primary/50 px-4 lg:px-8 py-4 rounded-full">
              <div className="w-3 h-3 bg-accent-primary rounded-full mr-4 animate-pulse" />
              <span className="text-accent-primary font-bold text-lg tracking-wide uppercase">
                Current Role
              </span>
              <div className="w-3 h-3 bg-accent-primary rounded-full ml-4 animate-pulse" 
                style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>

          {/* Company name - bold and active feeling */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Electronic
            <br />
            <span className="text-accent-primary">Arts</span>
          </motion.h2>

          {/* Role with product emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-4 lg:mb-12"
          >
            <p className="text-xl text-gray-300 mb-2">
              Assistant Content Producer
            </p>
            <p className="text-2xl md:text-3xl font-bold text-accent-warm">
              EA FC Ultimate Team
            </p>
          </motion.div>

          {/* Impact statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl text-white max-w-2xl mx-auto mb-6 lg:mb-16"
          >
            Now I ship to millions.
          </motion.p>

          {/* Impressive stats - make them feel HUGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          >
            {/* 10M+ Players - this should be the hero stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-4 lg:p-8 rounded-xl border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300"
            >
              <div className="text-7xl md:text-8xl font-display font-black text-accent-primary mb-4">
                10M+
              </div>
              <div className="text-white font-semibold text-xl mb-2">
                Active Players
              </div>
              <div className="text-gray-400 text-sm">
                Worldwide engagement
              </div>
            </motion.div>

            {/* Live Service - secondary but important */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-4 lg:p-8 rounded-xl border border-accent-warm/20 hover:border-accent-warm/50 transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl font-display font-black text-accent-warm mb-4 flex items-center justify-center">
                <span className="mr-3">LIVE</span>
                <div className="w-3 h-3 bg-accent-warm rounded-full animate-pulse" />
              </div>
              <div className="text-white font-semibold text-xl mb-2">
                Service
              </div>
              <div className="text-gray-400 text-sm">
                Real-time operations
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
