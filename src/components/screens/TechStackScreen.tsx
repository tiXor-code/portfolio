import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function TechStackScreen() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const techCategories = [
    {
      title: "Analytics & Data",
      tools: ["Excel", "SQL", "Tableau", "Python", "Google Analytics", "Power BI", "BigQuery"],
      color: "blue"
    },
    {
      title: "Game Development",
      tools: ["Unity", "Unreal Engine", "C#", "C++", "Perforce", "Game Design Docs"],
      color: "purple"
    },
    {
      title: "Production Tools", 
      tools: ["Jira", "Confluence", "Slack", "Notion", "Monday.com", "Trello", "Google Workspace"],
      color: "green"
    },
    {
      title: "Design & Content",
      tools: ["Figma", "Adobe Suite", "Miro", "Canva", "Photoshop", "Premiere Pro", "WordPress"],
      color: "orange"
    },
    {
      title: "Web & Frontend",
      tools: ["React", "TypeScript", "Tailwind", "Next.js", "HTML/CSS", "JavaScript", "Vite", "Vercel", "Supabase"],
      color: "cyan"
    },
    {
      title: "AI & Automation",
      tools: ["ChatGPT API", "n8n", "Zapier", "Claude", "OpenAI API", "Midjourney", "Stable Diffusion"],
      color: "pink"
    }
  ]

  const colorMap = {
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30", 
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    pink: "bg-pink-500/20 text-pink-300 border-pink-500/30"
  }

  return (
    <div ref={ref} className="relative screen-content px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full animate-gradient-shift"
          style={{
            background: 'linear-gradient(-45deg, #0a0a2e, #1a0a3e, #0a1a3e, #0a0a1e)',
            backgroundSize: '400% 400%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-6xl w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-4"
        >
          Tech Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 mb-12"
        >
          Tools I use to build, analyze, and ship
        </motion.p>

        {/* Tech Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.8 + categoryIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
            >
              {/* Category Title */}
              <h3 className="text-lg font-semibold text-white mb-4">
                {category.title}
              </h3>

              {/* Tools */}
              <div className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1 + categoryIndex * 0.1 + toolIndex * 0.05 }}
                    className={`inline-block px-3 py-1 rounded border text-sm font-medium mr-2 mb-2 ${colorMap[category.color as keyof typeof colorMap]}`}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-sm text-gray-400 mt-8"
        >
          Always learning • Always building
        </motion.p>
      </motion.div>
    </div>
  )
}