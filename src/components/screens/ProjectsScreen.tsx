import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../../data/projects.json'

export default function ProjectsScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // Get featured projects and limit to 6 for one screen
  const featuredProjects = projectsData.filter(project => project.featured).slice(0, 6)

  return (
    <div ref={ref} className="screen-content gradient-dark px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-6xl w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-12"
        >
          Projects
        </motion.h2>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
            >
              {/* Project Icon/Image placeholder */}
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-400 rounded"></div>
              </div>

              {/* Project Title */}
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {project.title}
              </h3>

              {/* Company */}
              <p className="text-sm text-blue-300 mb-2">{project.company}</p>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Impact */}
              <p className="text-xs text-gray-400 font-medium">
                {project.impact}
              </p>

              {/* Tags (show only first 2 on small cards) */}
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

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm text-gray-400 mt-8"
        >
          Featured projects • Full portfolio available on request
        </motion.p>
      </motion.div>
    </div>
  )
}