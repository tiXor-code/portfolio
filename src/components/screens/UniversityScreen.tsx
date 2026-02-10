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
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}images/journey/university-bg.mp4`} type="video/mp4" />
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
          BSc in Computer Games, Design and Development
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-blue-300 mb-8"
        >
          University of Worcester, 2017-2022
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-gray-300"
        >
          Where the interest in games became a career path.
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-24 h-24 border-2 border-blue-500/30 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
