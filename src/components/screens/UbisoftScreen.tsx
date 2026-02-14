import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

export default function UbisoftScreen() {
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
          <source src={`${import.meta.env.BASE_URL}images/journey/ubisoft-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      <div className="screen-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto px-8"
        >
          {/* Company name with subtle branding */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span className="text-accent-primary">Ubi</span>soft
          </motion.h2>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-3" />
            <span className="text-white font-medium">QA Tester • Rainbow Six Siege</span>
          </motion.div>

          {/* Hook */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl text-gray-200 mb-16 max-w-2xl mx-auto"
          >
            Started by breaking games professionally.
          </motion.p>

          {/* Stats with different visual weights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-16 max-w-3xl mx-auto"
          >
            {/* First stat - smaller, supporting */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent-primary mb-2">
                100+
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Bugs Found
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gray-600" />

            {/* Second stat - emphasized, primary */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="relative"
              >
                <div className="text-6xl md:text-7xl font-display font-bold text-accent-warm mb-2">
                  First
                </div>
                <div className="text-white text-lg font-medium">
                  Industry Job
                </div>
                
                {/* Emphasis decoration */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-warm rounded-full animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* Simple visual accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-24 h-0.5 bg-accent-primary mx-auto mt-12"
          />
        </motion.div>
      </div>
    </div>
  )
}
