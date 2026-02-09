import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '6+', label: 'Projects Shipped' },
    { value: '2M+', label: 'Players Reached' },
    { value: '100%', label: 'On-Time Delivery' }
  ]

  return (
    <div ref={ref} className="screen-content gradient-dark">
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
          className="screen-title text-white mb-8"
        >
          About
        </motion.h2>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 mb-12"
        >
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I turn complex data into player experiences that matter.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Currently at EA, I analyze millions of players to shape content strategy. 
            Previously shipped mobile games that reached the European Parliament.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From QA tester to content producer, I build things that work.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}