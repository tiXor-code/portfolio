import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function WhatsNextScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="screen-content gradient-forward">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-4xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-4"
        >
          What's Next
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-purple-300 mb-8"
        >
          AI & Beyond
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-gray-200"
        >
          Building things that didn't exist yesterday.
        </motion.p>

        {/* Future Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-400 rounded"></div>
            </div>
            <p className="text-sm text-gray-300">AI Tools</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-300">Live Games</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-400 rounded-sm rotate-45"></div>
            </div>
            <p className="text-sm text-gray-300">Innovation</p>
          </div>
        </motion.div>

        {/* Animated Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { 
            opacity: 1, 
            x: 0,
            rotate: [0, 5, -5, 0]
          } : { opacity: 0, x: -20 }}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mt-12 flex justify-center"
        >
          <div className="text-4xl">→</div>
        </motion.div>
      </motion.div>
    </div>
  )
}