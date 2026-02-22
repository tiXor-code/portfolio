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

      <div className="screen-content">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          {/* Clean, minimal approach - let the copy breathe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* Title with generous spacing */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Leadership
              <br />
              <span className="text-accent-primary">School</span>
            </motion.h2>

            {/* Foundation with subtle line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="w-8 h-0.5 bg-accent-warm mr-4" />
              <span className="text-accent-warm font-medium text-lg">
                Leaders Foundation
              </span>
              <div className="w-8 h-0.5 bg-accent-warm ml-4" />
            </motion.div>

            {/* The memorable line - give it space and emphasis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-12 pb-8"
            >
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                An intense week.
              </p>
              <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto mt-4">
                They threw me in a river.
              </p>
              <p className="text-2xl md:text-3xl text-accent-primary font-bold leading-relaxed max-w-3xl mx-auto mt-2">
                Literally.
              </p>
            </motion.div>

            {/* Single subtle element - no distractions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <div className="w-px h-8 bg-accent-primary mx-auto opacity-50" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}