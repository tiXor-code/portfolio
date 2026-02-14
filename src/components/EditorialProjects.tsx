import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Import project data
import projectsData from '../data/projects.json'

const categories = ['All', 'Gaming & Analytics', 'Leadership & Social Impact', 'AI & Innovation', 'Technical Development', 'Creative Production', 'Quality & Process']

export default function EditorialProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.domain === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div ref={ref} className="container-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="editorial-caption text-accent-primary mb-4">Featured Work</p>
          <h2 className="editorial-headline mb-8">
            Projects That
            <span className="block text-accent-primary">Define My Journey</span>
          </h2>
          <p className="editorial-body text-text-secondary max-w-3xl">
            From mobile games that reached the European Parliament to data analytics for millions of players, 
            each project represents a step forward in my understanding of what makes interactive entertainment meaningful.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent-primary text-text-inverse'
                    : 'bg-bg-tertiary border border-border-subtle text-text-secondary hover:bg-accent-light hover:text-accent-primary hover:border-accent-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="project-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="relative aspect-landscape overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      project.featured 
                        ? 'bg-accent-primary text-text-inverse' 
                        : 'bg-bg-elevated/90 text-text-secondary'
                    }`}>
                      {project.featured ? 'Featured' : project.domain.split(' ')[0]}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/20 to-transparent" />
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="editorial-title mb-2 group-hover:text-accent-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="editorial-caption text-accent-primary">{project.company}</p>
                  </div>

                  <p className="editorial-body text-text-secondary mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div className="mb-6 p-3 bg-bg-secondary rounded-lg border-l-3 border-accent-primary">
                    <p className="text-sm font-medium text-accent-primary mb-1">Impact</p>
                    <p className="text-sm text-text-secondary">{project.impact}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-bg-tertiary border border-border-subtle rounded text-xs text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-accent-light border border-accent-primary/30 rounded text-xs text-accent-primary">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <button className="btn-ghost text-sm group-hover:text-accent-primary">
                      Read More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-accent-primary/5 to-accent-primary/10 rounded-lg p-12 border border-accent-primary/20">
            <h3 className="editorial-title text-accent-primary mb-4">
              Interested in Working Together?
            </h3>
            <p className="editorial-body text-text-secondary mb-8 max-w-2xl mx-auto">
              I'm always excited to discuss new opportunities in game production, data analytics, 
              and the future of interactive entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Get In Touch
              </button>
              <a
                href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Full Resume
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-editorial-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-elevated rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-bg-elevated/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-bg-elevated transition-colors"
                  aria-label="Close project details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="editorial-headline mb-2">{selectedProject.title}</h3>
                  <p className="editorial-subtitle text-accent-primary">{selectedProject.company}</p>
                </div>

                <p className="editorial-body text-text-secondary mb-8">{selectedProject.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display font-semibold text-text-primary mb-4">Impact</h4>
                    <p className="text-accent-primary font-medium mb-6">{selectedProject.impact}</p>
                    
                    <h4 className="font-display font-semibold text-text-primary mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent-light border border-accent-primary/30 rounded text-sm text-accent-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-display font-semibold text-text-primary mb-4">Domain</h4>
                    <p className="text-text-secondary">{selectedProject.domain}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}