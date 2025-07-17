import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'

interface Project {
  id: number
  title: string
  company: string
  description: string
  impact: string
  image: string
  tags: string[]
  link: string
  featured?: boolean
  domain: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "EA FC 25 Ultimate Team",
    company: "Electronic Arts",
    description: "Revolutionized content strategy and player engagement for one of gaming's largest live services.",
    impact: "Significantly enhanced player retention through data-driven content optimization",
    image: "/images/ea-fc.jpg",
    tags: ["Content Strategy", "Data Analytics", "Live Service", "Player Psychology"],
    link: "#",
    featured: true,
    domain: "Gaming & Analytics"
  },
  {
    id: 2,
    title: "Vote It! Democracy Game",
    company: "ARDEN - Play for Democracy",
    description: "Led a talented team of 7 to launch a mobile game promoting democratic engagement.",
    impact: "30% reduction in development time through Agile implementation",
    image: "/images/vote-it.jpg",
    tags: ["Leadership", "Social Impact", "Mobile Development", "Project Management"],
    link: "#",
    featured: true,
    domain: "Leadership & Social Impact"
  },
  {
    id: 3,
    title: "AI Marketing Automation Suite",
    company: "Personal Innovation",
    description: "Built comprehensive automation workflows integrating ChatGPT, Gemini, and n8n for marketing optimization.",
    impact: "Automated 70% of repetitive tasks, enabling focus on strategic initiatives",
    image: "/images/ai-automation.jpg",
    tags: ["AI Integration", "n8n", "ChatGPT", "Process Automation"],
    link: "#",
    domain: "AI & Innovation"
  },
  {
    id: 4,
    title: "Cross-Platform Game Development",
    company: "University & Freelance",
    description: "Developed multiple games using Unity and Unreal Engine, from concept to market release.",
    impact: "Successfully shipped 2 titles, mastering full development lifecycle",
    image: "/images/game-dev.jpg",
    tags: ["Unity", "Unreal Engine", "C#", "Game Design"],
    link: "#",
    domain: "Technical Development"
  },
  {
    id: 5,
    title: "Creative Content Production",
    company: "Multiple Clients",
    description: "Produced high-quality video content, leveraging Adobe Suite and drone technology.",
    impact: "Delivered engaging multimedia experiences across various industries",
    image: "/images/content-production.jpg",
    tags: ["Adobe Premiere", "After Effects", "Drone Operations", "Video Production"],
    link: "#",
    domain: "Creative Production"
  },
  {
    id: 6,
    title: "Quality Assurance Excellence",
    company: "Ubisoft",
    description: "Ensured product quality for AAA gaming titles through comprehensive testing methodologies.",
    impact: "Contributed to successful launches with zero critical post-release issues",
    image: "/images/qa-testing.jpg",
    tags: ["Game Testing", "Quality Assurance", "Bug Tracking", "Team Collaboration"],
    link: "#",
    domain: "Quality & Process"
  }
]

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  const domains = [...new Set(projects.map(p => p.domain))]
  const filteredProjects = selectedDomain 
    ? projects.filter(p => p.domain === selectedDomain)
    : projects
  
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-apple-blue rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
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
            Cross-Domain <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-lg text-apple-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Real achievements across industries, showcasing adaptability and consistent excellence. 
            Each project represents a unique challenge conquered through versatile expertise.
          </p>
          
          {/* Domain Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <motion.button
              onClick={() => setSelectedDomain(null)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                !selectedDomain 
                  ? "bg-apple-blue text-white" 
                  : "glass-effect text-apple-gray-300 hover:bg-white/10"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            {domains.map((domain) => (
              <motion.button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedDomain === domain 
                    ? "bg-apple-blue text-white" 
                    : "glass-effect text-apple-gray-300 hover:bg-white/10"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {domain}
              </motion.button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group"
              >
                <motion.div
                  className={clsx(
                    "relative overflow-hidden rounded-2xl transition-all duration-500 h-full",
                    "glass-effect hover:bg-white/10",
                    project.featured && "lg:col-span-1 border-2 border-apple-blue/30"
                  )}
                  whileHover={{ y: -10 }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 to-purple-500/20"
                      animate={{
                        opacity: hoveredProject === project.id ? 0.8 : 0.4
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-6xl"
                        animate={{
                          scale: hoveredProject === project.id ? 1.2 : 1,
                          rotate: hoveredProject === project.id ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.domain === "Gaming & Analytics" && "🎮"}
                        {project.domain === "Leadership & Social Impact" && "👥"}
                        {project.domain === "AI & Innovation" && "🤖"}
                        {project.domain === "Technical Development" && "💻"}
                        {project.domain === "Creative Production" && "🎬"}
                        {project.domain === "Quality & Process" && "✅"}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-sm text-apple-blue mb-2">{project.company}</div>
                    <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-apple-gray-300 mb-3 line-clamp-2">{project.description}</p>
                    
                    {/* Impact Metric */}
                    <div className="mb-4 p-3 bg-apple-blue/10 rounded-lg">
                      <p className="text-sm text-apple-blue font-medium">💡 {project.impact}</p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-apple-gray-800/50 text-apple-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Project Link */}
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center text-apple-blue hover:text-apple-blue-hover transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2">Explore Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects