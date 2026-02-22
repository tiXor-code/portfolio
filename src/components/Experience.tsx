import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import experienceData from '../data/experience.json'

export default function Experience() {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="experience" className="section-padding bg-bg-primary">
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
              Experience
            </h2>
            <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-border-subtle to-transparent hidden lg:block" />

              {experienceData.map((experience) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className="relative mb-12 last:mb-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center">
                    {/* Timeline marker */}
                    <div className="hidden lg:flex absolute left-6 w-5 h-5 bg-accent-blue rounded-full border-4 border-bg-primary z-10" />
                    
                    {/* Content */}
                    <div className="lg:ml-20 w-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 rounded-xl card-hover"
                      >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-title font-bold text-text-primary mb-1">
                              {experience.role}
                            </h3>
                            <p className="text-accent-blue font-medium text-lg mb-1">
                              {experience.company}
                            </p>
                            <p className="text-text-secondary text-small">
                              {experience.department} • {experience.location}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <span className="glass px-4 py-2 text-small text-text-primary rounded-full">
                              {experience.period}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-body leading-relaxed mb-6">
                          {experience.description}
                        </p>

                        {/* Achievements */}
                        {experience.achievements && experience.achievements.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-text-primary font-medium mb-3">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2.5 mr-3 shrink-0" />
                                  <span className="text-text-secondary text-body">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        {experience.skills && experience.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-small text-accent-blue bg-accent-blue/10 rounded-full border border-accent-blue/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Featured badge */}
                        {experience.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-accent-blue text-white text-xs font-medium px-2 py-1 rounded">
                              Featured
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-text-secondary text-body mb-6">
              Want to learn more about my experience?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary inline-block"
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}