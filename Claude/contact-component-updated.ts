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
      value: "teodorlutoiu@gmail.com",
      link: "mailto:teodorlutoiu@gmail.com",
      action: "Send Message"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/teodorlc",
      link: "https://www.linkedin.com/in/teodorlc",
      action: "Connect"
    },
    {
      icon: "🌐",
      label: "Portfolio",
      value: "teodorlutoiu.com",
      link: "https://teodorlutoiu.com",
      action: "Visit Site"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+40 725 697 859",
      link: "tel:+40725697859",
      action: "Call"
    }
  ]
  
  const collaborationAreas = [
    { icon: "🎮", area: "Gaming & Interactive Media", desc: "Live service optimization, player engagement" },
    { icon: "🤖", area: "AI & Automation", desc: "Workflow optimization, intelligent systems" },
    { icon: "📊", area: "Data-Driven Strategy", desc: "Analytics, performance optimization" },
    { icon: "👥", area: "Team Leadership", desc: "Project management, cross-functional teams" },
    { icon: "🎨", area: "Creative Production", desc: "Content strategy, multimedia creation" },
    { icon: "🚀", area: "Innovation Projects", desc: "Emerging tech, experimental solutions" }
  ]
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-apple-blue/20 rounded-full filter blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
            Let's Create <span className="text-gradient">Impact Together</span>
          </h2>
          <p className="text-lg text-apple-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Whether you need strategic innovation, technical excellence, or creative solutions, 
            I bring adaptive expertise to elevate your project. Let's transform your challenges 
            into opportunities.
          </p>
          
          {/* Collaboration Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">Open for Collaboration In</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {collaborationAreas.map((area, index) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-xl p-6 text-center cursor-pointer"
                >
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h4 className="font-semibold mb-2">{area.area}</h4>
                  <p className="text-sm text-apple-gray-400">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.link}
                target={method.label === "Email" || method.label === "Phone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-xl p-6 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{method.label}</h3>
                <p className="text-sm text-apple-gray-400 mb-3">{method.value}</p>
                <p className="text-sm text-apple-blue group-hover:text-apple-blue-hover transition-colors">
                  {method.action} →
                </p>
              </motion.a>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center glass-effect rounded-2xl p-12 max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-semibold mb-4">
              Ready to Transform Your <span className="text-gradient">Vision</span>?
            </h3>
            <p className="text-lg text-apple-gray-300 mb-8 max-w-2xl mx-auto">
              From concept to execution, I bring the versatility and expertise needed to excel 
              in any domain. Let's discuss how I can contribute to your success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:teodorlutoiu@gmail.com"
                className="px-8 py-4 bg-apple-blue text-white font-medium rounded-full hover:bg-apple-blue-hover transition-colors duration-300 button-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Conversation
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/teodorlc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass-effect text-apple-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect on LinkedIn
              </motion.a>
            </div>
            
            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 text-sm text-apple-gray-400"
            >
              📍 Based in Bucharest, Romania • Available for Remote & Hybrid Opportunities
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact