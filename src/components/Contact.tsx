import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "contact@teodorlutoiu.com",
      link: "mailto:contact@teodorlutoiu.com"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/teodorlc",
      link: "https://www.linkedin.com/in/teodorlc"
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "github.com/tiXor-code",
      link: "https://github.com/tiXor-code"
    }
  ]
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Section Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Get in Touch
          </h2>
          
          {/* Simple intro */}
          <p className="text-lg text-apple-gray-200 text-center max-w-2xl mx-auto">
            Want to work together, or just say hi? Best way to reach me is email.
          </p>
          
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.link}
                target={method.label === "Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-effect rounded-xl p-6 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{method.label}</h3>
                <p className="text-sm text-apple-gray-300">{method.value}</p>
              </motion.a>
            ))}
          </div>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-sm text-apple-gray-300"
          >
            Based in Bucharest, Romania
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact