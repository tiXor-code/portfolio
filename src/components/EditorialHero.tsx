import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function EditorialHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/brussels-street.jpg)`,
          }}
          animate={{ scale: inView ? 1.05 : 1.1 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-editorial-black/60 via-editorial-black/40 to-editorial-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <div className="container-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-4xl"
          >
            {/* Current Position Badge */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center mb-8 px-4 py-2 bg-accent-primary/20 backdrop-blur-sm border border-accent-primary/30 rounded-full"
            >
              <div className="w-2 h-2 bg-accent-primary rounded-full mr-3 animate-pulse" />
              <span className="text-accent-primary font-medium text-sm tracking-wide uppercase">
                Currently at Electronic Arts
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-hero font-display font-black text-text-inverse mb-6"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              <span className="block">Teodor-Cristian</span>
              <span className="block text-accent-primary">Lutoiu</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-subtitle font-sans font-medium text-editorial-light-gray mb-8 max-w-2xl"
            >
              Content Producer & Game Designer
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="editorial-body text-editorial-gray mb-12 max-w-2xl"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
            >
              From QA tester to content producer at Electronic Arts. I shipped a mobile game that reached the European Parliament, analyze player data for 10M+ players, and build the future of interactive entertainment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary group"
                aria-label="Learn more about my work"
              >
                Explore My Journey
                <svg 
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary group bg-text-inverse/10 backdrop-blur-sm border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-text-primary"
              >
                View Projects
                <svg 
                  className="ml-3 w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-editorial-gray"
        >
          <span className="text-xs font-medium mb-3 tracking-wider uppercase opacity-80">
            Scroll to discover
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent-primary to-transparent relative">
            <motion.div
              className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-accent-primary to-transparent"
              animate={{ y: [0, 36, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Editorial Quote Overlay - Large Screen Only */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="hidden lg:block absolute top-1/2 right-8 xl:right-16 transform -translate-y-1/2 max-w-xs z-10"
      >
        <blockquote className="text-right">
          <p className="text-xl font-display font-semibold text-text-inverse italic leading-tight mb-4">
            "From breaking games to building experiences that connect millions"
          </p>
          <cite className="text-editorial-gray text-sm font-medium not-italic uppercase tracking-wide">
            — My Journey
          </cite>
        </blockquote>
      </motion.div>
    </div>
  )
}