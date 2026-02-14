import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  {
    value: '8',
    label: 'Team Members',
    description: 'Cross-disciplinary experts',
    delay: 0.8
  },
  {
    value: '2K+',
    label: 'Downloads',
    description: 'Organic reach & engagement',
    delay: 0.9
  },
  {
    value: 'EU',
    label: 'Recognition',
    description: 'Brussels presentation',
    delay: 1.0,
    featured: true
  }
]

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
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/play-for-democracy-banner.jpg?v=2)`,
            backgroundPosition: 'center 20%',
          }}
        />
        <div className="bg-overlay" />
      </div>

      <div className="screen-content">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 md:px-16 text-center">
          {/* Title with better hierarchy */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 lg:mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Play For
            <br />
            <span className="text-accent-warm">Democracy</span>
          </motion.h2>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center glass px-4 py-2 lg:px-6 lg:py-3 rounded-full mb-3 lg:mb-8 text-xs lg:text-base"
          >
            <div className="w-2 h-2 bg-accent-warm rounded-full mr-3" />
            <span className="text-white font-medium">Producer & Game Designer</span>
          </motion.div>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm lg:text-xl text-gray-200 max-w-2xl mx-auto mb-3 lg:mb-16 leading-relaxed"
          >
            Producer on a game built to get Gen Z to vote. 
            <span className="text-accent-warm font-medium"> Team of 8, backed by the EU.</span>
          </motion.p>

          {/* Prominent impact stats with card layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.8, delay: stat.delay }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={`glass p-4 lg:p-8 rounded-xl text-center cursor-default group transition-all duration-300 ${
                  stat.featured 
                    ? 'border-2 border-accent-warm/50 bg-accent-warm/10 md:scale-110' 
                    : 'hover:border-accent-primary/30'
                }`}
              >
                <div className={`text-2xl md:text-5xl lg:text-6xl font-display font-bold mb-1 lg:mb-3 ${
                  stat.featured ? 'text-accent-warm' : 'text-accent-primary'
                }`}>
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-300 text-sm">
                  {stat.description}
                </div>
                
                {stat.featured && (
                  <div className="mt-4 inline-flex items-center text-accent-warm text-xs font-medium">
                    <div className="w-1 h-1 bg-accent-warm rounded-full mr-2" />
                    HIGHLIGHT
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}