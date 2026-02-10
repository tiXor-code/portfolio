import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function PlayForDemocracyScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="relative screen-content">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover ken-burns"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/play-for-democracy-banner.jpg)`,
            backgroundPosition: 'center 28%',
          }}
        />
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
          Play For Democracy
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-blue-300 mb-8"
        >
          Producer & Game Designer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-white"
        >
          Producer on a game built to get Gen Z to vote. Team of 8, backed by the EU.
        </motion.p>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs text-gray-300 uppercase tracking-wide">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2K+</div>
            <div className="text-xs text-gray-300 uppercase tracking-wide">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">EU</div>
            <div className="text-xs text-gray-300 uppercase tracking-wide">Recognition</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}