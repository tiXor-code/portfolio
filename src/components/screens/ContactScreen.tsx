import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const EmailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function ContactScreen() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  const contactMethods = [
    {
      name: "Email",
      value: "contact@teodorlutoiu.com",
      href: "mailto:contact@teodorlutoiu.com",
      icon: <EmailIcon />
    },
    {
      name: "LinkedIn",
      value: "in/teodorlc",
      href: "https://www.linkedin.com/in/teodorlc/",
      icon: <LinkedInIcon />
    },
    {
      name: "GitHub",
      value: "tiXor-code",
      href: "https://github.com/tiXor-code",
      icon: <GitHubIcon />
    }
  ]

  return (
    <div ref={ref} className="relative screen-content">
      {/* Background Image with blur effect on edges */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/contact-bg.jpg)`,
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Blurred overlay layer - blurs edges, keeps center clearer */}
        <div className="absolute inset-0" style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          maskImage: 'radial-gradient(ellipse 40% 60% at 50% 40%, transparent 30%, black 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 40% 60% at 50% 40%, transparent 30%, black 80%)',
        }} />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        {/* Strong vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 45%, transparent 20%, rgba(0,0,0,0.7) 100%)',
        }} />
      </div>

      <div className="relative z-10 flex items-center justify-start w-full h-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-md"
        >
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display font-display font-bold text-text-primary mb-8"
          >
            Contact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12"
          >
            Let's build something together
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.name}
                href={method.href}
                target={method.name !== "Email" ? "_blank" : undefined}
                rel={method.name !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg hover:bg-black/60 hover:border-white/20"
                style={{ transition: 'background-color 0.3s, border-color 0.3s' }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 group-hover:text-white transition-colors">{method.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-medium">{method.name}</div>
                    <div className="text-gray-400 text-sm">{method.value}</div>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  →
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
