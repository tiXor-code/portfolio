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
  
  const toolsAndTech = [
    {
      category: "Development",
      tools: ["React", "Next.js", "TypeScript", "Tailwind", "Vite"]
    },
    {
      category: "Design",
      tools: ["Figma", "Adobe Premiere", "After Effects"]
    },
    {
      category: "Tools",
      tools: ["n8n", "SQL", "Jira", "Git", "Confluence"]
    },
    {
      category: "Game Dev",
      tools: ["Unity", "Unreal Engine", "C#"]
    }
  ]
  
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          style={{ y }}
          className="space-y-16"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-apple-white">About</h2>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg text-apple-gray-200 leading-relaxed text-center">
              I got into tech because of games. Started at Ubisoft in QA, moved to EA where I work on FC Ultimate Team as an Assistant Content Producer. On the side, I produced Vote It! - a mobile democracy game that shipped on iOS and Android with 2K+ downloads and got me invited to Brussels by the European Commission.
            </p>
            <p className="text-lg text-apple-gray-200 leading-relaxed text-center mt-6">
              I build things with React, Next.js, and Figma. I automate boring tasks with n8n. I'm based in Bucharest and I'm always looking for interesting problems to solve.
            </p>
          </motion.div>

          {/* Tools & Tech Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">Tools & Tech</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {toolsAndTech.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + groupIndex * 0.1 }}
                  className="text-center"
                >
                  <h4 className="text-lg font-medium text-apple-gray-200 mb-4">{group.category}</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {group.tools.map((tool, toolIndex) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.4 + groupIndex * 0.1 + toolIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-apple-gray-800/50 text-apple-gray-300 rounded-full text-sm border border-apple-gray-700/50 hover:border-apple-blue/50 hover:bg-apple-blue/10 transition-all cursor-default"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About