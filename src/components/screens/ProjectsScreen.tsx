import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../../data/projects.json'

const GamepadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 10c0-2 1.5-3.5 3.5-3.5h9c2 0 3.5 1.5 3.5 3.5v1c0 3-1 6-2.5 8-.5 1-1.5 1-2 0L14 15h-4l-1.5 4c-.5 1-1.5 1-2 0C5 17 4 14 4 11v-1z"/>
    <line x1="7" y1="10" x2="10" y2="10"/><line x1="8.5" y1="8.5" x2="8.5" y2="11.5"/>
    <circle cx="15.5" cy="9.5" r="1"/><circle cx="17.5" cy="11.5" r="1"/>
  </svg>
)

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="4" width="15" height="16" rx="2"/><path d="M17 8l5-3v14l-5-3V8z"/>
  </svg>
)

const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 3c-3 0-5 2-5 4.5 0 1.5.5 2.5 1.5 3.5-1.5.5-2.5 2-2.5 3.5 0 2 1.5 3.5 3.5 3.5h.5c.5 1.5 2 2.5 3.5 2.5h-1.5"/>
    <path d="M12 3c3 0 5 2 5 4.5 0 1.5-.5 2.5-1.5 3.5 1.5.5 2.5 2 2.5 3.5 0 2-1.5 3.5-3.5 3.5h-.5c-.5 1.5-2 2.5-3.5 2.5h1.5"/>
  </svg>
)

const BugIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="8" y="6" width="8" height="14" rx="4"/><path d="M6 10H2"/><path d="M22 10h-4"/><path d="M6 18H2"/><path d="M22 18h-4"/><path d="M6 14H2"/><path d="M22 14h-4"/><path d="M10 6V4"/><path d="M14 6V4"/>
  </svg>
)

const LeaderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>
  </svg>
)

function getProjectIcon(domain: string) {
  if (domain.includes('Gaming') || domain.includes('Technical')) return <GamepadIcon />
  if (domain.includes('Creative')) return <VideoIcon />
  if (domain.includes('AI')) return <BrainIcon />
  if (domain.includes('Quality')) return <BugIcon />
  if (domain.includes('Leadership')) return <LeaderIcon />
  return <CodeIcon />
}

function getProjectColor(domain: string) {
  if (domain.includes('Gaming')) return 'text-accent-primary bg-accent-primary/10'
  if (domain.includes('Creative')) return 'text-accent-warm bg-accent-warm/10'
  if (domain.includes('AI')) return 'text-accent-primary bg-accent-primary/10'
  if (domain.includes('Quality')) return 'text-accent-warm bg-accent-warm/10'
  if (domain.includes('Leadership')) return 'text-accent-primary bg-accent-primary/10'
  if (domain.includes('Technical')) return 'text-accent-warm bg-accent-warm/10'
  return 'text-accent-primary bg-accent-primary/10'
}

export default function ProjectsScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  useEffect(() => {
    if (!videoRef.current) return
    if (inView) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [inView])

  const allProjects = projectsData.slice(0, 6)
  const featuredProjects = allProjects.slice(0, 2)
  const regularProjects = allProjects.slice(2)

  return (
    <div ref={ref} className="relative screen-content px-4 lg:px-8">
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
          src={`${import.meta.env.BASE_URL}images/journey/projects-bg.mp4?v=3`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with editorial typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-left mb-3 lg:mb-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Selected
            <br />
            <span className="text-accent-primary">Projects</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center"
          >
            <div className="w-12 h-0.5 bg-accent-warm mr-4" />
            <p className="text-gray-300 text-base max-w-2xl">
              A curated collection showcasing diverse problem-solving approaches across gaming, AI, and interactive experiences
            </p>
          </motion.div>
        </motion.div>

        {/* Featured projects - compact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mb-3 lg:mb-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="group glass p-3 lg:p-5 rounded-xl border border-white/10 hover:border-accent-primary/30 transition-all duration-500 cursor-default overflow-hidden relative"
            >
              {/* Icon and domain */}
              <div className="flex items-start justify-between mb-2 lg:mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${getProjectColor(project.domain)}`}>
                  {getProjectIcon(project.domain)}
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  {project.domain}
                </span>
              </div>

              {/* Title with better typography hierarchy */}
              <h3 className="text-base lg:text-xl md:text-2xl font-display font-bold text-white mb-1 lg:mb-3 leading-tight group-hover:text-accent-primary transition-colors duration-300">
                {project.title}
              </h3>

              {/* Company with visual emphasis */}
              <div className="flex items-center mb-3">
                <div className="w-3 h-0.5 bg-accent-warm mr-2" />
                <p className="text-accent-warm font-semibold text-sm uppercase tracking-wide">
                  {project.company}
                </p>
              </div>

              {/* Description - hidden on mobile */}
              <p className="hidden lg:block text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Impact */}
              <div className="mb-2 lg:mb-4 p-2 lg:p-3 bg-white/5 rounded-lg border-l-2 border-accent-primary">
                <p className="text-white font-medium text-[11px] lg:text-xs">
                  {project.impact}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 lg:gap-1.5">
                {project.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] lg:text-xs px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white/10 border border-white/20 rounded-full text-gray-300 font-medium"
                    style={{ transition: 'color 0.3s, border-color 0.3s' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            </motion.article>
          ))}
        </motion.div>

        {/* Regular projects - ultra compact grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4"
        >
          {regularProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
              className="group glass p-4 rounded-lg border border-white/10 hover:border-accent-primary/30 transition-all duration-300 cursor-default"
            >
              <div className={`w-8 h-8 rounded-md mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${getProjectColor(project.domain)}`}>
                {getProjectIcon(project.domain)}
              </div>

              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent-primary transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              <p className="text-xs text-accent-warm font-medium mb-2 uppercase tracking-wide">
                {project.company}
              </p>

              <div className="border-t border-white/10 pt-2">
                <p className="text-xs text-gray-400 leading-tight">
                  {project.impact}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="hidden lg:block text-center mt-8"
        >
          <div className="inline-flex items-center glass px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-2 animate-pulse" />
            <span className="text-gray-400 text-xs">Full portfolio available on request</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
