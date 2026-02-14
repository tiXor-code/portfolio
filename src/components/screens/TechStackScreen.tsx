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
      tools: ["Excel", "SQL", "Tableau", "Python", "Google Analytics", "Power BI", "BigQuery"],
      color: "blue",
      primaryCount: 4
    },
    {
      title: "Game Development",
      tools: ["Unity", "Unreal Engine", "C#", "C++", "Perforce", "Game Design Docs"],
      color: "purple",
      primaryCount: 3
    },
    {
      title: "Production Tools", 
      tools: ["Jira", "Confluence", "Slack", "Notion", "Monday.com", "Trello", "Google Workspace"],
      color: "green",
      primaryCount: 4
    },
    {
      title: "Design & Content",
      tools: ["Figma", "Adobe Suite", "Miro", "Canva", "Photoshop", "Premiere Pro", "WordPress"],
      color: "orange",
      primaryCount: 3
    },
    {
      title: "Web & Frontend",
      tools: ["React", "TypeScript", "Tailwind", "Next.js", "HTML/CSS", "JavaScript", "Vite", "Vercel", "Supabase"],
      color: "cyan",
      primaryCount: 4
    },
    {
      title: "AI & Automation",
      tools: ["ChatGPT API", "n8n", "Zapier", "Claude", "OpenAI API", "Midjourney", "Stable Diffusion"],
      color: "pink",
      primaryCount: 3
    }
  ]

  const colorMap: Record<string, { card: string; tool: string; glow: string }> = {
    blue: { card: "border-blue-500/30", tool: "bg-blue-500/20 text-blue-300 border-blue-500/30", glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:border-blue-400/60" },
    purple: { card: "border-purple-500/30", tool: "bg-purple-500/20 text-purple-300 border-purple-500/30", glow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:border-purple-400/60" },
    green: { card: "border-green-500/30", tool: "bg-green-500/20 text-green-300 border-green-500/30", glow: "hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:border-green-400/60" },
    orange: { card: "border-orange-500/30", tool: "bg-orange-500/20 text-orange-300 border-orange-500/30", glow: "hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-400/60" },
    cyan: { card: "border-cyan-500/30", tool: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", glow: "hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400/60" },
    pink: { card: "border-pink-500/30", tool: "bg-pink-500/20 text-pink-300 border-pink-500/30", glow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:border-pink-400/60" },
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
          width="1920"
          height="1080"
          className="w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}images/journey/techstack-bg.mp4`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-6xl w-full"
      >
        <motion.h2
          id="tech-stack-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-display font-display font-bold text-text-primary mb-4"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories.map((category, categoryIndex) => {
            const colors = colorMap[category.color]
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 40 }}
                transition={{ duration: 0.7, delay: 0.6 + categoryIndex * 0.2, ease: 'easeOut' }}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:scale-[1.03] hover:bg-white/8 ${colors.glow}`}
                style={{ transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category.title}
                </h3>

                <div className="space-y-2">
                  {category.tools.map((tool, toolIndex) => {
                    const isPrimary = toolIndex < category.primaryCount
                    return (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.8 + categoryIndex * 0.2 + toolIndex * 0.06 }}
                        className={`inline-block px-3 py-1 rounded border font-medium mr-2 mb-2 ${colors.tool} ${
                          isPrimary ? 'text-sm brightness-125' : 'text-xs opacity-70'
                        }`}
                      >
                        {tool}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="text-sm text-gray-400 mt-8"
        >
          Always learning • Always building
        </motion.p>
      </motion.div>
    </div>
  )
}
