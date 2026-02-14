import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const contactMethods = [
  {
    type: 'Email',
    value: 'contact@teodorlutoiu.com',
    href: 'mailto:contact@teodorlutoiu.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Best way to reach me for opportunities and collaborations',
  },
  {
    type: 'LinkedIn',
    value: 'linkedin.com/in/teodorlc',
    href: 'https://linkedin.com/in/teodorlc',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    description: 'Professional network and career updates',
  },
  {
    type: 'GitHub',
    value: 'github.com/tiXor-code',
    href: 'https://github.com/tiXor-code',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    description: 'Code repositories and technical projects',
  },
]

export default function EditorialContact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  return (
    <div ref={ref} className="container-content text-text-inverse">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Main Contact Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Contact Info */}
            <div>
              <p className="editorial-caption text-accent-primary mb-4 uppercase tracking-wider">
                Let's Connect
              </p>
              <h2 className="editorial-headline text-text-inverse mb-8">
                Ready to Build
                <span className="block text-accent-primary">Something Amazing?</span>
              </h2>
              <p className="editorial-body text-editorial-gray mb-8">
                Whether you're looking for a content producer who understands data, 
                a game designer with shipping experience, or someone who can bridge the gap 
                between analytics and player experience—let's talk.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="mailto:contact@teodorlutoiu.com"
                  className="btn-primary bg-accent-primary hover:bg-accent-primary-hover"
                >
                  Start a Conversation
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary bg-transparent border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-text-primary"
                >
                  Download CV
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-editorial-gray mb-1">Location</span>
                  <span className="text-text-inverse font-medium">Bucharest, Romania</span>
                </div>
                <div>
                  <span className="block text-editorial-gray mb-1">Status</span>
                  <span className="text-accent-primary font-medium">Open to Opportunities</span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Methods */}
            <div>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <motion.a
                    key={method.type}
                    href={method.href}
                    target={method.type !== 'Email' ? '_blank' : undefined}
                    rel={method.type !== 'Email' ? 'noopener noreferrer' : undefined}
                    variants={itemVariants}
                    className="block p-6 bg-editorial-black/40 backdrop-blur-sm border border-editorial-charcoal/30 rounded-lg hover:border-accent-primary/50 hover:bg-editorial-black/60 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-accent-primary group-hover:text-accent-primary-hover transition-colors duration-300">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-text-inverse mb-1 group-hover:text-accent-primary transition-colors duration-300">
                          {method.type}
                        </h3>
                        <p className="text-accent-primary font-medium mb-2 text-sm">{method.value}</p>
                        <p className="text-editorial-gray text-sm">{method.description}</p>
                      </div>
                      <div className="text-editorial-gray group-hover:text-accent-primary group-hover:translate-x-1 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Opportunities Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16 pt-16 border-t border-editorial-charcoal/30"
        >
          <div className="text-center mb-12">
            <h3 className="editorial-title text-text-inverse mb-6">
              What I'm Looking For
            </h3>
            <p className="editorial-body text-editorial-gray max-w-3xl mx-auto">
              I thrive in environments where data meets creativity, where player insights drive content decisions, 
              and where small teams ship big ideas. Here's what excites me most:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Content Production',
                description: 'Live service games, data-driven content strategy, player behavior analysis',
                icon: '📊',
              },
              {
                title: 'Game Production',
                description: 'End-to-end project management, team coordination, shipping experiences',
                icon: '🚀',
              },
              {
                title: 'Innovation Projects',
                description: 'AI integration, process automation, next-generation gaming experiences',
                icon: '🤖',
              },
            ].map((opportunity) => (
              <div key={opportunity.title} className="text-center">
                <div className="text-4xl mb-4">{opportunity.icon}</div>
                <h4 className="font-display font-semibold text-text-inverse mb-3">{opportunity.title}</h4>
                <p className="text-editorial-gray text-sm">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="pt-12 border-t border-editorial-charcoal/30 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-editorial-gray text-sm">
                © 2024 Teodor-Cristian Lutoiu. Built with React, Tailwind CSS, and Framer Motion.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://linkedin.com/in/teodorlc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-gray hover:text-accent-primary transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/tiXor-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-gray hover:text-accent-primary transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 mx-auto flex items-center justify-center w-12 h-12 bg-accent-primary/20 hover:bg-accent-primary/30 rounded-full text-accent-primary hover:text-accent-primary-hover transition-all duration-300 group"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            aria-label="Back to top"
          >
            <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}