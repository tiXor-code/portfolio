import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

const BrainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 6C18 6 14 10 14 15c0 3 1 5 3 7-3 1-5 4-5 7 0 4 3 7 7 7h1c1 3 4 5 7 5h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M24 6c6 0 10 4 10 9 0 3-1 5-3 7 3 1 5 4 5 7 0 4-3 7-7 7h-1c-1 3-4 5-7 5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.8"/>
    <circle cx="30" cy="18" r="2" fill="currentColor" opacity="0.8"/>
    <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.8"/>
  </svg>
)

const GamepadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 20c0-4 3-7 7-7h18c4 0 7 3 7 7v2c0 6-2 12-5 16-1 2-3 2-4 0l-3-6H20l-3 6c-1 2-3 2-4 0-3-4-5-10-5-16v-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="14" y="20" width="6" height="2" rx="1" fill="currentColor"/>
    <rect x="16" y="17" width="2" height="8" rx="1" fill="currentColor"/>
    <circle cx="31" cy="19" r="2" fill="currentColor" opacity="0.8"/>
    <circle cx="35" cy="23" r="2" fill="currentColor" opacity="0.8"/>
  </svg>
)

const RocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 6c-6 8-8 16-8 24h16c0-8-2-16-8-24z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 30c-4 0-6 4-6 8h6v-8z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
    <path d="M32 30c4 0 6 4 6 8h-6v-8z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
    <circle cx="24" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M20 38h8v4h-8z" fill="currentColor" opacity="0.6"/>
    <path d="M22 42h4v2h-4z" fill="currentColor" opacity="0.8"/>
  </svg>
)

export default function WhatsNextScreen() {
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
          <source src={`${import.meta.env.BASE_URL}images/journey/ai-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      <div className="screen-content">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-3 lg:mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-3 lg:mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              What's
              <br />
              <span className="text-accent-primary">Next</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="w-12 h-0.5 bg-accent-warm mr-4" />
              <span className="text-accent-warm font-medium text-lg">
                AI & Beyond
              </span>
              <div className="w-12 h-0.5 bg-accent-warm ml-4" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm lg:text-2xl text-gray-200 max-w-2xl mx-auto mt-2 lg:mt-8"
            >
              Building things that didn't exist yesterday.
            </motion.p>
          </motion.div>

          {/* Bento-style grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 lg:gap-6 max-w-5xl mx-auto">
            {/* AI Tools - Large card, top left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="col-span-2 md:col-span-1 md:row-span-2 glass p-3 lg:p-8 rounded-2xl border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-2 lg:mb-6">
                <div className="p-2 lg:p-4 bg-accent-primary/20 rounded-xl text-accent-primary group-hover:scale-110 transition-transform duration-300">
                  <BrainIcon />
                </div>
                <div className="text-accent-primary text-[10px] lg:text-xs font-medium px-2 py-0.5 lg:px-3 lg:py-1 bg-accent-primary/10 rounded-full">
                  FOCUS
                </div>
              </div>
              <h3 className="text-base sm:text-xl lg:text-3xl font-display font-bold text-white mb-2 lg:mb-4 break-words">
                AI Tools
              </h3>
              <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-2 lg:mb-6">
                Building smart automation & assistants that amplify human creativity and streamline complex workflows.
              </p>
              <div className="flex items-center text-accent-primary text-sm font-medium">
                <span>Exploring possibilities</span>
                <div className="w-2 h-2 bg-accent-primary rounded-full ml-3 animate-pulse" />
              </div>
            </motion.div>

            {/* Live Games - Medium card, top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: -30 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-3 lg:p-6 rounded-2xl border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-500 group"
            >
              <div className="p-2 lg:p-3 bg-accent-primary/20 rounded-xl text-accent-primary w-fit mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                <GamepadIcon />
              </div>
              <h3 className="text-sm sm:text-lg lg:text-2xl font-display font-bold text-white mb-1 lg:mb-3 break-words">
                Live Games
              </h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Data-driven live service experiences that evolve with player behavior.
              </p>
            </motion.div>

            {/* Innovation - Large card, bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-4 lg:p-8 rounded-2xl border border-accent-warm/20 hover:border-accent-warm/50 transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-2 lg:mb-6">
                <div className="p-2 lg:p-4 bg-accent-warm/20 rounded-xl text-accent-warm group-hover:scale-110 transition-transform duration-300">
                  <RocketIcon />
                </div>
                <div className="text-accent-warm text-[10px] lg:text-xs font-medium px-2 py-0.5 lg:px-3 lg:py-1 bg-accent-warm/10 rounded-full">
                  NEXT
                </div>
              </div>
              <h3 className="text-base sm:text-xl lg:text-3xl font-display font-bold text-white mb-2 lg:mb-4 break-words">
                Innovation
              </h3>
              <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-2 lg:mb-6">
                Shipping ideas that don't exist yet. Turning curiosity into products people actually use.
              </p>
              <div className="flex items-center text-accent-warm text-sm font-medium">
                <span>Always building</span>
                <div className="w-2 h-2 bg-accent-warm rounded-full ml-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
