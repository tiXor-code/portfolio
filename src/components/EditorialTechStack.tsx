import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const techCategories = [
  {
    category: 'Analytics & Data',
    description: 'Transforming player behavior into actionable insights',
    skills: [
      { name: 'SQL', level: 90, description: 'Complex queries for player data analysis' },
      { name: 'Excel/Sheets', level: 95, description: 'Advanced formulas and pivot tables' },
      { name: 'Jira', level: 85, description: 'Project management and bug tracking' },
      { name: 'Confluence', level: 80, description: 'Documentation and knowledge sharing' },
    ],
    icon: '📊',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    category: 'Game Development',
    description: 'Building interactive experiences from concept to ship',
    skills: [
      { name: 'Unity', level: 85, description: 'Mobile and desktop game development' },
      { name: 'Unreal Engine', level: 75, description: 'Prototyping and indie projects' },
      { name: 'C#', level: 80, description: 'Unity scripting and gameplay systems' },
      { name: 'C++', level: 65, description: 'Performance-critical game systems' },
    ],
    icon: '🎮',
    color: 'from-green-500/20 to-blue-500/20',
  },
  {
    category: 'Production & Management',
    description: 'Leading teams and shipping products on time',
    skills: [
      { name: 'Agile/Scrum', level: 90, description: 'Sprint planning and team coordination' },
      { name: 'Team Leadership', level: 85, description: '7-person team management experience' },
      { name: 'Content Strategy', level: 88, description: 'Data-driven content decisions' },
      { name: 'QA Testing', level: 95, description: 'Systematic testing methodologies' },
    ],
    icon: '🚀',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    category: 'Design & Creative',
    description: 'Crafting engaging user experiences and content',
    skills: [
      { name: 'Adobe Premiere', level: 80, description: 'Video editing and post-production' },
      { name: 'After Effects', level: 75, description: 'Motion graphics and effects' },
      { name: 'Figma', level: 70, description: 'UI/UX design and prototyping' },
      { name: 'Photoshop', level: 75, description: 'Image editing and design' },
    ],
    icon: '🎨',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    category: 'Web Development',
    description: 'Modern frontend and automation solutions',
    skills: [
      { name: 'React', level: 80, description: 'Component-based UI development' },
      { name: 'Next.js', level: 75, description: 'Full-stack web applications' },
      { name: 'Tailwind CSS', level: 85, description: 'Utility-first styling' },
      { name: 'TypeScript', level: 75, description: 'Type-safe JavaScript development' },
    ],
    icon: '💻',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    category: 'AI & Automation',
    description: 'Leveraging AI to enhance productivity and workflows',
    skills: [
      { name: 'n8n', level: 85, description: 'Workflow automation and integration' },
      { name: 'ChatGPT API', level: 80, description: 'AI-powered content generation' },
      { name: 'Make/Zapier', level: 75, description: 'No-code automation solutions' },
      { name: 'Process Design', level: 88, description: 'Workflow optimization and analysis' },
    ],
    icon: '🤖',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
]

export default function EditorialTechStack() {
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

  const categoryVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 },
    }),
  }

  return (
    <div ref={ref} className="container-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <p className="editorial-caption text-accent-primary mb-4">Technical Expertise</p>
          <h2 className="editorial-headline mb-8">
            Skills That Drive
            <span className="block text-accent-primary">Innovation</span>
          </h2>
          <p className="editorial-body text-text-secondary max-w-3xl mx-auto">
            From data analytics to game development, from team leadership to AI automation—
            a comprehensive toolkit built through years of hands-on experience in the gaming industry.
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              custom={categoryIndex}
              className="relative group"
            >
              <div className={`p-8 bg-gradient-to-br ${category.color} rounded-lg border border-border-subtle hover:border-accent-primary/30 transition-all duration-300`}>
                {/* Category Header */}
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="editorial-title mb-1">{category.category}</h3>
                    <p className="text-sm text-text-tertiary">{category.description}</p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                    >
                      {/* Skill Header */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-text-primary">{skill.name}</span>
                        <span className="text-sm font-medium text-accent-primary">{skill.level}%</span>
                      </div>

                      {/* Skill Bar */}
                      <div className="w-full bg-editorial-light-gray rounded-full h-2 mb-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-accent-primary rounded-full"
                          variants={skillBarVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                        />
                      </div>

                      {/* Skill Description */}
                      <p className="text-xs text-text-tertiary">{skill.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications & Learning */}
        <motion.div
          variants={itemVariants}
          className="mt-20 pt-16 border-t border-border-subtle"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Continuous Learning</h3>
              <p className="text-text-secondary text-sm">Always exploring new technologies and industry trends to stay ahead of the curve.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Leadership School</h3>
              <p className="text-text-secondary text-sm">Graduate of Leaders Foundation Leadership School, Romania. Developed leadership and strategic thinking skills.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">Industry Recognition</h3>
              <p className="text-text-secondary text-sm">European Commission recognition for democratic engagement through game design and interactive media.</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-accent-primary/5 rounded-lg border border-accent-primary/20"
        >
          <h3 className="editorial-title text-accent-primary mb-6 text-center">
            Currently Exploring
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { tech: 'Machine Learning', desc: 'Player behavior prediction' },
              { tech: 'Advanced SQL', desc: 'Complex data analytics' },
              { tech: 'Python', desc: 'Data science workflows' },
              { tech: 'Cloud Platforms', desc: 'Scalable game services' },
            ].map((goal) => (
              <div key={goal.tech} className="p-4 bg-bg-elevated rounded-lg">
                <h4 className="font-display font-semibold text-text-primary mb-2">{goal.tech}</h4>
                <p className="text-sm text-text-secondary">{goal.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}