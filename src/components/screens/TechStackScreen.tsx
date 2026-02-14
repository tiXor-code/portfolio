import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function TechStackScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  useEffect(() => {
    if (!videoRef.current) return
    if (inView) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [inView])

  const techCategories = [
    {
      title: "Analytics & Data",
      subtitle: "Numbers tell stories",
      tools: ["Excel", "SQL", "Tableau", "Python", "Google Analytics", "Power BI", "BigQuery"],
      color: "coral",
      primaryCount: 4
    },
    {
      title: "Game Development", 
      subtitle: "Building interactive experiences",
      tools: ["Unity", "Unreal Engine", "C#", "C++", "Perforce", "Game Design Docs"],
      color: "warm",
      primaryCount: 3
    },
    {
      title: "Production Tools",
      subtitle: "Orchestrating teams & workflow", 
      tools: ["Jira", "Confluence", "Slack", "Notion", "Monday.com", "Trello", "Google Workspace"],
      color: "coral",
      primaryCount: 4
    },
    {
      title: "Design & Content",
      subtitle: "Visual storytelling & assets",
      tools: ["Figma", "Adobe Suite", "Miro", "Canva", "Photoshop", "Premiere Pro", "WordPress"],
      color: "warm",
      primaryCount: 3
    },
    {
      title: "Web & Frontend",
      subtitle: "Modern interfaces that scale",
      tools: ["React", "TypeScript", "Tailwind", "Next.js", "HTML/CSS", "JavaScript", "Vite", "Vercel", "Supabase"],
      color: "coral",
      primaryCount: 4
    },
    {
      title: "AI & Automation",
      subtitle: "Intelligence amplifying creativity",
      tools: ["ChatGPT API", "n8n", "Zapier", "Claude", "OpenAI API", "Midjourney", "Stable Diffusion"],
      color: "warm",
      primaryCount: 3,
      featured: true
    }
  ]

  const colorStyles = {
    coral: {
      primary: "bg-accent-primary text-white border-accent-primary shadow-accent-primary/20",
      secondary: "bg-accent-primary/10 text-accent-primary/80 border-accent-primary/20",
      card: "border-accent-primary/20 hover:border-accent-primary/40 hover:shadow-[0_0_30px_rgba(255,122,95,0.15)]"
    },
    warm: {
      primary: "bg-accent-warm text-white border-accent-warm shadow-accent-warm/20", 
      secondary: "bg-accent-warm/10 text-accent-warm/80 border-accent-warm/20",
      card: "border-accent-warm/20 hover:border-accent-warm/40 hover:shadow-[0_0_30px_rgba(255,179,71,0.15)]"
    }
  }

  return (
    <div ref={ref} className="relative screen-content px-8">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}images/journey/techstack-bg.mp4`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with better typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-left mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Tech
            <br />
            <span className="text-accent-primary">Stack</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center"
          >
            <div className="w-16 h-0.5 bg-accent-warm mr-6" />
            <p className="text-gray-300 text-lg max-w-2xl">
              Tools I use to build, analyze, and ship experiences that matter
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, categoryIndex) => {
            const colors = colorStyles[category.color as keyof typeof colorStyles]
            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.6 + categoryIndex * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className={`glass p-6 rounded-2xl border transition-all duration-500 cursor-default ${colors.card} ${
                  category.featured ? 'lg:col-span-1 lg:row-span-1 border-accent-warm/40 bg-accent-warm/5' : ''
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {category.subtitle}
                  </p>
                  
                  {category.featured && (
                    <div className="mt-3 inline-flex items-center text-accent-warm text-xs font-medium">
                      <div className="w-2 h-2 bg-accent-warm rounded-full mr-2 animate-pulse" />
                      CURRENT FOCUS
                    </div>
                  )}
                </div>

                {/* Tools with clear visual hierarchy */}
                <div className="space-y-4">
                  {/* Primary tools */}
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
                      Primary
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.slice(0, category.primaryCount).map((tool, toolIndex) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, delay: 0.8 + categoryIndex * 0.15 + toolIndex * 0.05 }}
                          className={`px-3 py-1.5 text-sm font-semibold rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg ${colors.primary}`}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Secondary tools */}
                  {category.tools.length > category.primaryCount && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
                        Secondary
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.tools.slice(category.primaryCount).map((tool, toolIndex) => (
                          <motion.span
                            key={tool}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.8 + categoryIndex * 0.15 + category.primaryCount * 0.05 + toolIndex * 0.03 
                            }}
                            className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all duration-300 hover:scale-105 ${colors.secondary}`}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center glass px-8 py-4 rounded-full">
            <div className="w-2 h-2 bg-accent-primary rounded-full mr-4 animate-pulse" />
            <span className="text-gray-300 font-medium">Always learning</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full mx-4" />
            <span className="text-gray-300 font-medium">Always building</span>
            <div className="w-2 h-2 bg-accent-warm rounded-full ml-4 animate-pulse" 
              style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
