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
  
  const skillCategories = [
    {
      title: "Strategic & Leadership",
      skills: [
        { name: 'Team Leadership', level: 95 },
        { name: 'Cross-functional Collaboration', level: 92 },
        { name: 'Agile Project Management', level: 88 },
        { name: 'Data-driven Decision Making', level: 85 },
      ]
    },
    {
      title: "Creative & Technical",
      skills: [
        { name: 'Game Development (Unity/Unreal)', level: 90 },
        { name: 'Content Production (Adobe Suite)', level: 85 },
        { name: 'Web Development & APIs', level: 88 },
        { name: 'AI & Automation (ChatGPT/Gemini/n8n)', level: 92 },
      ]
    },
    {
      title: "Adaptive Excellence",
      skills: [
        { name: 'Problem Solving', level: 95 },
        { name: 'Quick Learning & Domain Translation', level: 93 },
        { name: 'Innovation Mindset', level: 90 },
        { name: 'Stakeholder Communication', level: 88 },
      ]
    }
  ]
  
  const impactMetrics = [
    { value: "5+", label: "Industries Impacted", color: "from-apple-blue to-cyan-500" },
    { value: "30%", label: "Process Optimization", color: "from-purple-500 to-pink-500" },
    { value: "100%", label: "Adaptability Score", color: "from-green-500 to-emerald-500" },
    { value: "∞", label: "Growth Potential", color: "from-orange-500 to-red-500" },
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
          className="space-y-20"
        >
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Adaptive <span className="text-gradient">Excellence</span>
            </h2>
            
            <p className="text-lg text-apple-gray-300 mb-8 leading-relaxed">
              From clicking "Start Game" as a kid, my journey evolved into a quest for excellence 
              across multiple domains. Each industry I touch benefits from my unique ability to 
              translate success patterns, innovate solutions, and drive meaningful impact.
            </p>
            
            <p className="text-lg text-apple-gray-300 leading-relaxed">
              Whether optimizing player engagement at EA Sports, leading teams to launch social impact 
              games, or automating workflows with cutting-edge AI, I thrive on transforming challenges 
              into opportunities across any field.
            </p>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-effect rounded-2xl p-6"
              >
                <motion.div
                  className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                  animate={{ 
                    textShadow: [
                      `0 0 20px rgba(0,113,227,0.5)`,
                      `0 0 40px rgba(0,113,227,0.8)`,
                      `0 0 20px rgba(0,113,227,0.5)`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {metric.value}
                </motion.div>
                <p className="text-sm text-apple-gray-400 mt-2">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills by Category */}
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                className="glass-effect rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-6 text-gradient">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.2 + index * 0.1 }}
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
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <h3 className="text-3xl font-semibold mb-8">
              Cross-Domain <span className="text-gradient">Journey</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { domain: "Education", icon: "🎓", desc: "Technical Foundation" },
                { domain: "Sales", icon: "💼", desc: "Communication Mastery" },
                { domain: "Gaming", icon: "🎮", desc: "Quality & Production" },
                { domain: "Leadership", icon: "👥", desc: "Team Innovation" },
                { domain: "Enterprise", icon: "🏢", desc: "Strategic Impact" },
                { domain: "AI/Automation", icon: "🤖", desc: "Future Building" },
              ].map((item, index) => (
                <motion.div
                  key={item.domain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-xl px-6 py-4 text-center cursor-pointer"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-semibold">{item.domain}</div>
                  <div className="text-xs text-apple-gray-400">{item.desc}</div>
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