import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project Constellation",
    description: "An interactive data visualization platform that transforms complex datasets into stunning visual narratives.",
    image: "/images/project1.jpg",
    tags: ["React", "D3.js", "WebGL", "TypeScript"],
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "Project Nebula",
    description: "A generative art application exploring the intersection of code and creativity through algorithmic design.",
    image: "/images/project2.jpg",
    tags: ["Three.js", "GLSL", "Canvas API", "Web Audio"],
    link: "#"
  },
  {
    id: 3,
    title: "Project Orbit",
    description: "A full-stack e-commerce solution with real-time inventory management and AI-powered recommendations.",
    image: "/images/project3.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    link: "#"
  },
  {
    id: 4,
    title: "Project Aurora",
    description: "A mobile-first social platform that connects creative professionals through shared projects and ideas.",
    image: "/images/project1.jpg",
    tags: ["React Native", "GraphQL", "AWS", "MongoDB"],
    link: "#"
  },
  {
    id: 5,
    title: "Project Horizon",
    description: "An AI-powered content management system that adapts to user behavior and preferences in real-time.",
    image: "/images/project2.jpg",
    tags: ["Vue.js", "Python", "TensorFlow", "Docker"],
    link: "#"
  },
  {
    id: 6,
    title: "Project Eclipse",
    description: "A blockchain-based authentication system ensuring secure and decentralized user identity management.",
    image: "/images/project3.jpg",
    tags: ["Solidity", "Web3.js", "IPFS", "Smart Contracts"],
    link: "#"
  }
]

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-apple-blue rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-apple-gray-300 text-center mb-16 max-w-2xl mx-auto">
            A selection of my recent work showcasing innovation, creativity, and technical excellence.
          </p>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group"
              >
                <motion.div                  className={clsx(
                    "relative overflow-hidden rounded-2xl transition-all duration-500",
                    "glass-effect hover:bg-white/10",
                    project.featured && "md:col-span-2 lg:col-span-1"
                  )}
                  whileHover={{ y: -10 }}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-apple-black/80 to-transparent" />
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-apple-gray-300 mb-4 line-clamp-2">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (                        <span
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
                      <span className="mr-2">View Project</span>
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