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
            backgroundPosition: 'center 35%',
          }}
        />
        <div className="bg-overlay" />
      </div>

      <div className="screen-content">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 md:px-16 h-full flex items-center">
          {/* Dramatic age number - editorial typography moment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
            className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2"
          >
            <div className="text-[300px] lg:text-[400px] font-display font-black text-accent-warm/15 select-none leading-none">
              23
            </div>
          </motion.div>

          {/* Content - left aligned */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl text-left z-10"
          >
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center mb-4"
            >
              <div className="w-8 h-0.5 bg-accent-primary mr-4" />
              <span className="text-accent-primary font-medium text-lg tracking-wide uppercase">
                Brussels, Belgium
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              European
              <br />
              <span className="text-accent-warm">Parliament</span>
            </motion.h2>

            {/* The story */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8"
            >
              The European Parliament invited us to present.
              <br />
              <span className="text-white font-medium">I was</span>
              <span className="text-accent-warm font-bold text-3xl md:text-4xl mx-2">23.</span>
            </motion.p>

            {/* Age context on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="md:hidden inline-flex items-center glass px-6 py-3 rounded-full"
            >
              <div className="text-4xl font-display font-bold text-accent-warm mr-4">23</div>
              <div className="text-left">
                <div className="text-white font-medium text-sm">Years Old</div>
                <div className="text-gray-300 text-xs">When invited to EU Parliament</div>
              </div>
            </motion.div>

            {/* Moment emphasis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="hidden md:block mt-12"
            >
              <div className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                A defining moment
              </div>
              <div className="w-24 h-0.5 bg-accent-warm mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}