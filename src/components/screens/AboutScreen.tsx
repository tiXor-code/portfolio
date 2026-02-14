import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

export default function AboutScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: viewRef, inView: isVisible } = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (videoRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        videoRef.current.pause()
        return
      }
      isVisible ? videoRef.current.play().catch(() => {}) : videoRef.current.pause()
    }
  }, [isVisible])

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '6+', label: 'Projects Shipped' },
    { value: '2M+', label: 'Players Reached' },
    { value: '100%', label: 'On-Time Delivery' }
  ]

  return (
    <section ref={(el) => { ref(el); viewRef(el) }} className="relative screen-content">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}images/journey/about-bg.mp4`}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto px-6 lg:px-8">
        {/* Content - Asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-left space-y-8"
        >
          {/* Title */}
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display font-display font-bold text-text-primary"
          >
            About Me
          </motion.h2>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-title font-display text-accent-primary font-medium">
              I turn complex data into player experiences that matter.
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              Currently at EA, I analyze millions of players to shape content strategy. 
              Previously shipped mobile games that reached the European Parliament.
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              From QA tester to content producer, I build things that work—on time, every time.
            </p>
          </motion.div>

          {/* Skills tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {['Data Analysis', 'Content Strategy', 'Game Design', 'Player Psychology'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="px-4 py-2 bg-surface-elevated/80 backdrop-blur-sm border border-border-subtle rounded-full text-small text-text-secondary hover:text-text-primary hover:border-accent-primary/50"
                style={{ transition: 'color 0.3s, border-color 0.3s' }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Grid - Right side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle rounded-xl p-6 hover:bg-surface-elevated/80 hover:scale-105"
              style={{ transition: 'background-color 0.3s, transform 0.3s' }}
            >
              <div className="text-display font-display font-bold text-accent-primary mb-2 stat-number">
                {stat.value}
              </div>
              <div className="text-small text-text-tertiary uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}