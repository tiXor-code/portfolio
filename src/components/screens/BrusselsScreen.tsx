import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function BrusselsScreen() {
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
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/eu-parliament-group.jpg)`,
            backgroundPosition: 'center 60%',
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
          Brussels
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-blue-300 mb-8"
        >
          European Parliament
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-white"
        >
          The European Parliament invited us to present. I was 23.
        </motion.p>

        {/* Age Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-yellow-400 rounded-full">
            <span className="text-3xl font-bold text-yellow-400">23</span>
          </div>
          <p className="text-gray-300 mt-4 text-sm">Years old when invited</p>
        </motion.div>
      </motion.div>
    </div>
  )
}