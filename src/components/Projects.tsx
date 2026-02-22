import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../data/projects.json'

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  // Sort projects to show featured ones first
  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <section id="projects" className="section-padding bg-bg-primary">
      <div className="container-content">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-display font-bold text-text-primary mb-4">
              Featured Projects
            </h2>
            <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mb-6" />
            <p className="text-body text-text-secondary max-w-2xl mx-auto text-balance">
              A showcase of projects that demonstrate my experience in game production, 
              technical development, and creative problem-solving.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid gap-8 lg:gap-12">
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl overflow-hidden card-hover"
                >
                  <div className={`grid ${project.featured ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-0`}>
                    {/* Project image */}
                    <div className={`relative ${project.featured ? 'lg:col-span-1' : 'lg:col-span-1'} aspect-video lg:aspect-square overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-purple-500/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/20 select-none">
                          {project.company.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-accent-blue text-white text-xs font-medium px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project content */}
                    <div className={`p-8 ${project.featured ? 'lg:col-span-1' : 'lg:col-span-2'} flex flex-col justify-between`}>
                      <div>
                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-accent-blue font-medium text-small">
                              {project.domain}
                            </span>
                          </div>
                          <h3 className="text-title font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-text-secondary font-medium text-body">
                            {project.company}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-body leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Impact */}
                        <div className="mb-6">
                          <div className="flex items-start mb-2">
                            <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2.5 mr-3 shrink-0" />
                            <span className="text-accent-blue font-medium text-body">
                              {project.impact}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-small text-text-secondary bg-surface-elevated rounded-full border border-border-subtle"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View more projects */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-text-secondary text-body mb-6">
              Interested in seeing more of my work?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-secondary inline-block"
            >
              Let's discuss your project
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}