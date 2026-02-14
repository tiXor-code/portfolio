import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const contactLinks = [
  {
    name: 'Email',
    value: 'contact@teodorlutoiu.com',
    href: 'mailto:contact@teodorlutoiu.com',
    icon: '✉️',
    description: 'Get in touch directly'
  },
  {
    name: 'LinkedIn',
    value: '/in/teodorlutoiu',
    href: 'https://linkedin.com/in/teodorlutoiu',
    icon: '💼',
    description: 'Professional network'
  },
  {
    name: 'GitHub',
    value: '@teodorlutoiu',
    href: 'https://github.com/teodorlutoiu',
    icon: '💻',
    description: 'Code repositories'
  }
]

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:contact@teodorlutoiu.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-padding bg-bg-primary">
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
              Let's Connect
            </h2>
            <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mb-6" />
            <p className="text-body text-text-secondary max-w-2xl mx-auto text-balance">
              Whether you're looking for a producer, have a project in mind, 
              or just want to chat about games and tech, I'd love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-title font-bold text-text-primary mb-8">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group flex items-center p-6 glass rounded-xl card-hover hover:border-accent-blue/50 transition-colors duration-300"
                    >
                      <div className="text-3xl mr-6 group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-text-primary font-medium mb-1 group-hover:text-accent-blue transition-colors duration-300">
                          {link.name}
                        </h4>
                        <p className="text-text-secondary text-body font-mono">
                          {link.value}
                        </p>
                        <p className="text-small text-text-secondary mt-1">
                          {link.description}
                        </p>
                      </div>
                      <div className="text-text-secondary group-hover:text-accent-blue transition-colors duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Quick contact note */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 p-6 bg-accent-blue/5 border border-accent-blue/20 rounded-xl"
                >
                  <p className="text-body text-text-secondary">
                    <span className="text-accent-blue font-medium">Quick note:</span> I'm currently 
                    open to new opportunities and interesting projects. Response time is typically within 24 hours.
                  </p>
                </motion.div>
              </motion.div>

              {/* Contact form */}
              <motion.div variants={itemVariants}>
                <h3 className="text-title font-bold text-text-primary mb-8">
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 glass rounded-lg text-text-primary placeholder-text-secondary focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project, idea, or just say hello..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}