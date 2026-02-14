import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../../data/projects.json'

const GamepadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 10c0-2 1.5-3.5 3.5-3.5h9c2 0 3.5 1.5 3.5 3.5v1c0 3-1 6-2.5 8-.5 1-1.5 1-2 0L14 15h-4l-1.5 4c-.5 1-1.5 1-2 0C5 17 4 14 4 11v-1z"/>
    <line x1="7" y1="10" x2="10" y2="10"/><line x1="8.5" y1="8.5" x2="8.5" y2="11.5"/>
    <circle cx="15.5" cy="9.5" r="1"/><circle cx="17.5" cy="11.5" r="1"/>
  </svg>
)

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)

const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="4" width="15" height="16" rx="2"/><path d="M17 8l5-3v14l-5-3V8z"/>
  </svg>
)

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 3c-3 0-5 2-5 4.5 0 1.5.5 2.5 1.5 3.5-1.5.5-2.5 2-2.5 3.5 0 2 1.5 3.5 3.5 3.5h.5c.5 1.5 2 2.5 3.5 2.5h-1.5"/>
    <path d="M12 3c3 0 5 2 5 4.5 0 1.5-.5 2.5-1.5 3.5 1.5.5 2.5 2 2.5 3.5 0 2-1.5 3.5-3.5 3.5h-.5c-.5 1.5-2 2.5-3.5 2.5h1.5"/>
  </svg>
)

const BugIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="8" y="6" width="8" height="14" rx="4"/><path d="M6 10H2"/><path d="M22 10h-4"/><path d="M6 18H2"/><path d="M22 18h-4"/><path d="M6 14H2"/><path d="M22 14h-4"/><path d="M10 6V4"/><path d="M14 6V4"/>
  </svg>
)

const LeaderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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
  if (domain.includes('Gaming')) return 'text-blue-400 bg-blue-500/20'
  if (domain.includes('Creative')) return 'text-pink-400 bg-pink-500/20'
  if (domain.includes('AI')) return 'text-purple-400 bg-purple-500/20'
  if (domain.includes('Quality')) return 'text-yellow-400 bg-yellow-500/20'
  if (domain.includes('Leadership')) return 'text-green-400 bg-green-500/20'
  if (domain.includes('Technical')) return 'text-cyan-400 bg-cyan-500/20'
  return 'text-blue-400 bg-blue-500/20'
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

  return (
    <div ref={ref} className="relative screen-content px-8">
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-6xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-12"
        >
          Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10"
              style={{ transition: 'background-color 0.3s, border-color 0.3s' }}
            >
              <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${getProjectColor(project.domain)}`}>
                {getProjectIcon(project.domain)}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {project.title}
              </h3>

              <p className="text-sm text-blue-300 mb-2">{project.company}</p>

              <p className="text-sm text-gray-300 mb-3">
                {project.description}
              </p>

              <p className="text-xs text-gray-400 font-medium">
                {project.impact}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm text-gray-400 mt-8"
        >
          Full portfolio available on request
        </motion.p>
      </motion.div>
    </div>
  )
}
