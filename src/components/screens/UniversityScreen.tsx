import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

export default function UniversityScreen() {
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
          <source src={`${import.meta.env.BASE_URL}images/journey/university-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      {/* Timeline marker - dramatic year callout */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
        className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="relative">
          <div className="text-[200px] md:text-[280px] font-display font-bold text-accent-primary/20 select-none leading-none">
            2017
          </div>
          <div className="absolute top-8 left-4 w-2 h-32 bg-accent-primary rounded-full" />
        </div>
      </motion.div>

      <div className="screen-content">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl ml-auto mr-8 md:mr-16 text-left"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight"
          >
            BSc in Computer Games,
            <br />
            <span className="text-accent-primary">Design and Development</span>
          </motion.h2>

          {/* Institution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-0.5 bg-accent-warm mr-4" />
            <p className="text-xl text-accent-warm font-medium">
              University of Worcester
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed max-w-lg"
          >
            Where the interest in games became a career path. Five years of learning game design principles, programming fundamentals, and the art of interactive storytelling.
          </motion.p>

          {/* Duration badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 inline-flex items-center glass px-4 py-2 rounded-full"
          >
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-3" />
            <span className="text-white text-sm">2017 - 2022</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
