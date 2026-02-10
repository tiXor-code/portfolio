import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ContactScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const contactMethods = [
    {
      name: "Email",
      value: "contact@teodorlutoiu.com",
      href: "mailto:contact@teodorlutoiu.com",
      icon: "📧"
    },
    {
      name: "LinkedIn",
      value: "in/teodorlutoiu",
      href: "https://linkedin.com/in/teodorlutoiu",
      icon: "💼"
    },
    {
      name: "GitHub",
      value: "teodor-lutoiu",
      href: "https://github.com/teodor-lutoiu",
      icon: "⚡"
    }
  ]

  return (
    <div ref={ref} className="relative screen-content">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/brussels-street.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-8"
        >
          Contact
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 mb-12"
        >
          Let's build something together
        </motion.p>

        {/* Contact Methods */}
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
              className="group flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{method.icon}</span>
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

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            Available for freelance projects and full-time opportunities
          </p>
        </motion.div>

        {/* Animated signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
        >
          <motion.div
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl"
          >
            ✨
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}