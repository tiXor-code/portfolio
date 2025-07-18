import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import projectsData from '../../content/projects.json'
import type { Project } from '../types/projects'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === parseInt(id || '0'))
    if (foundProject) {
      setProject(foundProject as unknown as Project)
    } else {
      navigate('/') // Redirect if project not found
    }
  }, [id, navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return <div className="min-h-screen bg-apple-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  }

  const projectDetails = typeof project.details === 'string' ? null : project.details

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'challenge', label: 'Challenge', icon: '🎯' },
    { id: 'approach', label: 'Approach', icon: '💡' },
    { id: 'technical', label: 'Technical', icon: '🛠️' },
    { id: 'impact', label: 'Impact', icon: '📊' },
    { id: 'learnings', label: 'Learnings', icon: '📚' }
  ]

  return (
    <div className="min-h-screen bg-apple-black">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 to-purple-500/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-apple-black via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-6 py-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-apple-blue text-lg mb-4"
          >
            {project.company}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-apple-gray-300 max-w-3xl mx-auto mb-8"
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {projectDetails && (
              <>
                <div className="flex items-center gap-2 text-apple-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {projectDetails.timeline}
                </div>
                <div className="flex items-center gap-2 text-apple-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {projectDetails.teamSize}
                </div>
              </>
            )}
            <div className="flex items-center gap-2 text-apple-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {project.domain}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <Link 
              to="/#projects" 
              className="inline-flex items-center gap-2 text-apple-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      {projectDetails && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {Object.entries(projectDetails.metrics).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center glass-effect rounded-2xl p-6"
                >
                  <div className="text-3xl font-bold text-gradient mb-2">{value}</div>
                  <div className="text-sm text-apple-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Navigation */}
      {projectDetails && (
        <section className="sticky top-0 z-40 bg-apple-black/80 backdrop-blur-xl border-b border-apple-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex gap-8 overflow-x-auto py-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${
                    activeSection === section.id 
                      ? 'text-white' 
                      : 'text-apple-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {projectDetails && (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
          {/* Overview Section */}
          <motion.section 
            id="overview"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📋</span> Project Overview
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-apple-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="bg-apple-blue/10 border border-apple-blue/20 rounded-xl p-6 mb-6">
                <p className="text-apple-blue font-medium flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <span>{project.impact}</span>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Challenge Section */}
          <motion.section 
            id="challenge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span> The Challenge
            </h2>
            <p className="text-lg text-apple-gray-300 leading-relaxed">
              {projectDetails.challenge}
            </p>
          </motion.section>

          {/* Approach Section */}
          <motion.section 
            id="approach"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span> The Approach
            </h2>
            <p className="text-lg text-apple-gray-300 leading-relaxed mb-6">
              {projectDetails.approach}
            </p>
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">👤</span> My Role
              </h3>
              <p className="text-apple-gray-300">{projectDetails.role}</p>
            </div>
          </motion.section>

          {/* Technical Section */}
          <motion.section 
            id="technical"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🛠️</span> Technical Implementation
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {projectDetails.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-apple-blue/20 to-purple-500/20 border border-apple-blue/30 rounded-lg text-sm font-medium text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Skills Applied</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-apple-gray-800/50 text-apple-gray-300 rounded-full border border-apple-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Impact Section */}
          <motion.section 
            id="impact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📊</span> Impact & Results
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Outcomes</h3>
                <ul className="space-y-3">
                  {projectDetails.outcomes.map((outcome, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-apple-gray-300">{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Learnings Section */}
          <motion.section 
            id="learnings"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📚</span> Key Learnings
            </h2>
            <div className="bg-gradient-to-br from-apple-blue/10 to-purple-500/10 rounded-2xl p-8 border border-apple-blue/20">
              <p className="text-lg text-apple-gray-300 leading-relaxed">
                {projectDetails.learnings}
              </p>
            </div>
          </motion.section>

          {/* Gallery Section */}
          {projectDetails.images && projectDetails.images.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">🖼️</span> Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectDetails.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video bg-apple-gray-800 rounded-xl overflow-hidden"
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/800x450/1a1a1a/666?text=${encodeURIComponent(project.title + ' Image ' + (index + 1))}`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      )}

      {/* Next/Previous Navigation */}
      <section className="py-16 px-6 border-t border-apple-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {project.id > 1 && (
              <Link 
                to={`/project/${project.id - 1}`}
                className="group flex items-center gap-3 text-apple-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous Project</span>
              </Link>
            )}
            {project.id < projectsData.length && (
              <Link 
                to={`/project/${project.id + 1}`}
                className="group flex items-center gap-3 text-apple-gray-400 hover:text-white transition-colors ml-auto"
              >
                <span>Next Project</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail