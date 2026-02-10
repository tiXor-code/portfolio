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
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}images/journey/ubisoft-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="screen-content text-center max-w-4xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-4"
        >
          Ubisoft
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-blue-300 mb-8"
        >
          QA Tester, Rainbow Six Siege
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-gray-300"
        >
          Started by breaking games professionally.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Bugs Found</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">First</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Industry Job</div>
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full mx-4 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </motion.div>
      </motion.div>
    </div>
  )
}
