import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function HeroScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="relative screen-content">
      {/* Background Image with ken-burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/brussels-street.jpg)`,
            backgroundPosition: 'center 30%',
            scale: 1.1,
          }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left max-w-4xl mx-auto px-4 lg:px-6 lg:px-8">
        {/* Current Position Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="inline-flex items-center px-4 py-2 bg-accent-primary/20 backdrop-blur-sm border border-accent-primary/30 rounded-full text-accent-primary text-sm font-medium mb-4 lg:mb-8 hover:bg-accent-primary/30"
          style={{ transition: 'background-color 0.3s' }}
        >
          <div className="w-2 h-2 bg-accent-primary rounded-full mr-3 animate-pulse" />
          Currently at Electronic Arts
        </motion.div>

        {/* Main Title with asymmetric layout */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="hero-text mb-6 text-balance leading-none"
        >
          Teodor<br />
          <span className="text-accent-primary">Lutoiu</span>
        </motion.h1>

        {/* Subtitle with distinctive typography */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-subtitle font-display text-white/90 mb-8 max-w-lg"
        >
          AI automation engineer & builder
        </motion.p>

        {/* Descriptive text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="text-body text-white/70 max-w-md mb-12"
        >
          Building agentic systems and automations with n8n, Claude, and Azure OpenAI. Founder of Ministeru' Creativ. Co-founder of JobMap.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-warm text-white font-medium rounded-lg hover:shadow-2xl hover:shadow-accent-primary/25"
            style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            aria-label="Learn more about my work"
          >
            Explore My Journey
            <svg 
              className="ml-3 w-5 h-5 group-hover:translate-x-1" 
              style={{ transition: 'transform 0.3s' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-text-tertiary"
        >
          <span className="text-xs font-medium mb-3 tracking-wider uppercase opacity-80">Scroll to explore</span>
          <div className="scroll-indicator">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent-primary to-transparent relative">
              <motion.div
                className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-accent-primary to-transparent"
                animate={{ y: [0, 36, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}