import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const techCategories = [
  {
    name: 'Game Development',
    tools: [
      { name: 'Unity', icon: '🎮', description: 'Game engine for 2D/3D development' },
      { name: 'Unreal Engine', icon: '🔧', description: 'AAA game development' },
      { name: 'C#', icon: '💻', description: 'Programming language' },
      { name: 'JavaScript', icon: '⚡', description: 'Web development' },
    ]
  },
  {
    name: 'Production & Analytics',
    tools: [
      { name: 'Jira', icon: '📋', description: 'Project management' },
      { name: 'Excel', icon: '📊', description: 'Data analysis' },
      { name: 'SQL', icon: '🗄️', description: 'Database queries' },
      { name: 'Confluence', icon: '📝', description: 'Documentation' },
    ]
  },
  {
    name: 'Frontend Development',
    tools: [
      { name: 'React', icon: '⚛️', description: 'UI framework' },
      { name: 'TypeScript', icon: '🔷', description: 'Typed JavaScript' },
      { name: 'Next.js', icon: '▲', description: 'React framework' },
      { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS' },
    ]
  },
  {
    name: 'Design & Creative',
    tools: [
      { name: 'Figma', icon: '🎨', description: 'UI/UX design' },
      { name: 'Adobe Premiere', icon: '🎬', description: 'Video editing' },
      { name: 'After Effects', icon: '✨', description: 'Motion graphics' },
      { name: 'Photoshop', icon: '🖼️', description: 'Image editing' },
    ]
  },
  {
    name: 'AI & Automation',
    tools: [
      { name: 'ChatGPT API', icon: '🤖', description: 'AI integration' },
      { name: 'n8n', icon: '🔄', description: 'Workflow automation' },
      { name: 'Python', icon: '🐍', description: 'Automation scripts' },
      { name: 'Make/Zapier', icon: '⚡', description: 'No-code automation' },
    ]
  }
]

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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

  const toolVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <section id="tech" className="section-padding bg-bg-primary">
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
              Tech Stack
            </h2>
            <div className="w-12 h-1 bg-accent-blue mx-auto rounded-full mb-6" />
            <p className="text-body text-text-secondary max-w-2xl mx-auto text-balance">
              The tools and technologies I use to bring ideas to life, from concept to production.
            </p>
          </motion.div>

          {/* Tech categories */}
          <div className="space-y-12">
            {techCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="max-w-5xl mx-auto"
              >
                {/* Category title */}
                <h3 className="text-title font-bold text-text-primary mb-8 text-center">
                  {category.name}
                </h3>

                {/* Tools grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  {category.tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      variants={toolVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="group cursor-default"
                    >
                      <div className="glass p-6 rounded-xl text-center card-hover group-hover:border-accent-blue/50 transition-all duration-300">
                        {/* Icon */}
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {tool.icon}
                        </div>
                        
                        {/* Tool name */}
                        <h4 className="text-text-primary font-medium mb-2">
                          {tool.name}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-small text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                          {tool.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional skills */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <p className="text-small text-text-secondary mb-6">
              Always learning and exploring new technologies
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Docker',
                'Git',
                'Blender',
                'Node.js',
                'PostgreSQL',
                'Firebase',
                'AWS',
                'Vite'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="glass px-4 py-2 text-small text-text-primary rounded-full hover:border-accent-blue/50 transition-colors duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Learning philosophy */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 max-w-2xl mx-auto"
          >
            <p className="text-body text-text-secondary italic">
              "The best tool is the one that solves the problem efficiently. 
              I believe in choosing the right technology for each project, 
              not just the latest one."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}