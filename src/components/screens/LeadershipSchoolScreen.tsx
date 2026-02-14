import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function LeadershipSchoolScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="relative screen-content">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center ken-burns"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/leadership-school-water.jpg)`,
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
          Leadership School
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-accent-primary mb-8"
        >
          Leaders Foundation
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-white"
        >
          An intense week. They threw me in a river. Literally.
        </motion.p>

        {/* Water drops animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
              className="w-3 h-3 bg-accent-primary rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}