import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
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
  
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Three.js', level: 80 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Next.js', level: 88 },
  ]
  
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          style={{ y }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Mission <span className="text-gradient">Briefing</span>
            </h2>
            
            <p className="text-lg text-apple-gray-300 mb-8 leading-relaxed">
              With a passion for clean code and elegant design, I craft digital experiences 
              that push the boundaries of what's possible on the web. My journey is driven 
              by a relentless curiosity and a desire to build things that matter.
            </p>
            
            <p className="text-lg text-apple-gray-300 mb-12 leading-relaxed">
              Specializing in full-stack development with a focus on creating immersive, 
              performant applications that blend cutting-edge technology with intuitive design.
            </p>
            
            {/* Skills */}            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-apple-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-apple-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-apple-blue to-purple-500"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative glass-effect rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 to-purple-500/20" />
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gradient"
                      animate={{ 
                        textShadow: [
                          "0 0 20px rgba(0,113,227,0.5)",
                          "0 0 40px rgba(0,113,227,0.8)",
                          "0 0 20px rgba(0,113,227,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      5+
                    </motion.div>
                    <p className="text-sm text-apple-gray-400 mt-2">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gradient"
                      animate={{ 
                        textShadow: [
                          "0 0 20px rgba(168,85,247,0.5)",
                          "0 0 40px rgba(168,85,247,0.8)",                          "0 0 20px rgba(168,85,247,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      50+
                    </motion.div>
                    <p className="text-sm text-apple-gray-400 mt-2">Projects Completed</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gradient"
                      animate={{ 
                        textShadow: [
                          "0 0 20px rgba(0,113,227,0.5)",
                          "0 0 40px rgba(0,113,227,0.8)",
                          "0 0 20px rgba(0,113,227,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      100%
                    </motion.div>
                    <p className="text-sm text-apple-gray-400 mt-2">Client Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-gradient"
                      animate={{ 
                        textShadow: [                          "0 0 20px rgba(168,85,247,0.5)",
                          "0 0 40px rgba(168,85,247,0.8)",
                          "0 0 20px rgba(168,85,247,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    >
                      ∞
                    </motion.div>
                    <p className="text-sm text-apple-gray-400 mt-2">Coffee Consumed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About