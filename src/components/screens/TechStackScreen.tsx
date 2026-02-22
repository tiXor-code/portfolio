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
    <div ref={ref} className="relative screen-content px-4 lg:px-8">
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
          className="text-left mb-6 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-2 lg:mb-6"
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
          {techCategories.map((category, categoryIndex) => {
            const colors = colorStyles[category.color as keyof typeof colorStyles]
            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.6 + categoryIndex * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className={`glass p-3 lg:p-6 rounded-2xl border transition-all duration-500 cursor-default ${colors.card} ${
                  category.featured ? 'lg:col-span-1 lg:row-span-1 border-accent-warm/40 bg-accent-warm/5' : ''
                }`}
              >
                {/* Header */}
                <div className="mb-2 lg:mb-6">
                  <h3 className="text-sm lg:text-xl font-display font-bold text-white mb-1 lg:mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-400 leading-relaxed hidden lg:block">
                    {category.subtitle}
                  </p>
                  
                  {category.featured && (
                    <div className="mt-1 lg:mt-3 inline-flex items-center text-accent-warm text-[10px] lg:text-xs font-medium">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-accent-warm rounded-full mr-1.5 lg:mr-2 animate-pulse" />
                      FOCUS
                    </div>
                  )}
                </div>

                {/* Tools - compact on mobile */}
                <div className="space-y-2 lg:space-y-4">
                  <div>
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {category.tools.slice(0, category.primaryCount).map((tool, toolIndex) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, delay: 0.8 + categoryIndex * 0.15 + toolIndex * 0.05 }}
                          className={`px-2 py-0.5 lg:px-3 lg:py-1.5 text-[10px] lg:text-sm font-semibold rounded-md lg:rounded-lg border ${colors.primary}`}
                          style={{ transition: 'transform 0.3s' }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Secondary tools - hidden on mobile */}
                  {category.tools.length > category.primaryCount && (
                    <div className="hidden lg:block">
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
                            className={`px-3 py-1 text-xs font-medium rounded-lg border ${colors.secondary}`}
                            style={{ transition: 'transform 0.3s' }}
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
          className="text-center mt-4 lg:mt-16"
        >
          <div className="hidden lg:inline-flex items-center glass px-8 py-4 rounded-full">
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
