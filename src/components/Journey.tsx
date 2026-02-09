import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface JourneyMilestone {
  id: number
  title: string
  subtitle?: string
  role?: string
  description: string
  tone: string
  image?: string
  imageAlt?: string
  tags?: string[]
  period?: string
  featured?: boolean
}

const journeyData: JourneyMilestone[] = [
  {
    id: 1,
    title: "University",
    subtitle: "BSc in Computer Games, Design and Development",
    description: "The starting point - where the interest in games became a career path. Learning the fundamentals of game design, programming, and the creative process that would shape everything that followed.",
    tone: "Where it all began",
    tags: ["Game Design", "Programming", "Creative Foundation"]
  },
  {
    id: 2,
    title: "Play For Democracy",
    role: "Producer & Game Designer",
    description: "Part of an EU-funded project (Erasmus+). Worked with 7 other students/graduates to develop one of two games aimed at increasing voter turnout among Gen Z. My first real production role. Not in a studio - in a project that actually mattered.",
    tone: "My first real production role. Not in a studio - in a project that actually mattered.",
    image: "play-for-democracy-banner.jpg",
    imageAlt: "Teodor at Play For Democracy event in professional blazer",
    tags: ["EU Project", "Game Design", "Civic Engagement", "Production"]
  },
  {
    id: 3,
    title: "Brussels / European Parliament",
    description: "Selected to represent the Play For Democracy project at the Leadership Academy in Brussels. The European Parliament convened young people from European countries to share ideas about increasing voter engagement ahead of the June 2024 elections.",
    tone: "Got invited to Brussels to present our work to the European Parliament. Stood in rooms where policy gets made and talked about why games can change civic engagement.",
    image: "eu-parliament-group.jpg",
    imageAlt: "Group photo at European Parliament with 'Use Your Vote' banner",
    tags: ["European Parliament", "Policy", "Civic Engagement", "Leadership"]
  },
  {
    id: 4,
    title: "Ubisoft",
    role: "QA Tester on Rainbow Six Siege",
    description: "Started during Play For Democracy. First industry job at a major studio. Learning the ropes of professional game development at scale.",
    tone: "My foot in the door. I started by breaking games professionally.",
    tags: ["AAA Gaming", "Quality Assurance", "Rainbow Six Siege", "First Industry Job"]
  },
  {
    id: 5,
    title: "The Leadership School",
    description: "Intensive week-long leadership program by Leaders Foundation Romania. An intense week that pushed me out of every comfort zone I had. Including, apparently, into a river.",
    tone: "An intense week that pushed me out of every comfort zone I had. Including, apparently, into a river.",
    image: "leadership-school-water.jpg",
    imageAlt: "Teodor in water during rescue exercise at Leadership School",
    tags: ["Leadership", "Personal Growth", "Team Building", "Romania"],
    featured: true
  },
  {
    id: 6,
    title: "EA - Electronic Arts",
    role: "Assistant Content Producer on EA FC (Ultimate Team)",
    description: "Current role. Shipping features to millions of players worldwide. Working on one of the biggest sports gaming franchises, where every update and feature reaches real players at real scale.",
    tone: "Now I ship to millions. Every update, every feature - real players, real scale.",
    tags: ["EA Sports", "FIFA", "Ultimate Team", "Content Production", "AAA Gaming"]
  },
  {
    id: 7,
    title: "AI & What's Next",
    description: "Exploring AI, building prototypes, pushing into automation and new tech. Building things that didn't exist yesterday.",
    tone: "Building things that didn't exist yesterday. That's where it gets interesting.",
    tags: ["AI", "Automation", "Innovation", "Future Tech", "Prototyping"]
  }
]

export default function Journey() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const milestoneVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' }
    }
  }

  const textStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="journey" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="container-content">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={milestoneVariants} className="text-center mb-20">
            <h2 className="text-display font-bold text-text-primary mb-4">
              The Journey
            </h2>
            <div className="w-16 h-1 bg-accent-blue mx-auto rounded-full mb-6" />
            <p className="text-text-secondary text-body max-w-2xl mx-auto">
              From university labs to European Parliament halls, from breaking games to shipping to millions.
            </p>
          </motion.div>

          {/* Journey Timeline */}
          <div className="relative max-w-7xl mx-auto">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue/60 via-accent-blue/40 to-transparent transform -translate-x-0.5 hidden lg:block" />

            {journeyData.map((milestone, index) => {
              const isEven = index % 2 === 0
              const hasImage = milestone.image

              return (
                <motion.div
                  key={milestone.id}
                  variants={milestoneVariants}
                  className="relative mb-24 last:mb-0"
                >
                  <div className={`flex flex-col lg:flex-row ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 bg-accent-blue rounded-full border-4 border-bg-primary z-20 transform -translate-x-1/2 hidden lg:block">
                      {milestone.featured && (
                        <div className="absolute inset-0 bg-accent-blue rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Image side (50% width on desktop) */}
                    {hasImage ? (
                      <motion.div
                        variants={imageVariants}
                        className="w-full lg:w-1/2 relative"
                      >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                          <motion.img
                            src={`${import.meta.env.BASE_URL}images/journey/${milestone.image}`}
                            alt={milestone.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            whileHover={{ scale: 1.02 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          {milestone.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-accent-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                Breakthrough Moment
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-accent-blue/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-accent-blue" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content side (50% width on desktop) */}
                    <motion.div
                      variants={textStaggerVariants}
                      className="w-full lg:w-1/2 space-y-6"
                    >
                      <motion.div variants={textItemVariants}>
                        <h3 className="text-heading font-bold text-text-primary mb-2">
                          {milestone.title}
                        </h3>
                        {milestone.role && (
                          <p className="text-accent-blue font-semibold text-lg mb-1">
                            {milestone.role}
                          </p>
                        )}
                        {milestone.subtitle && (
                          <p className="text-text-secondary font-medium text-base mb-4">
                            {milestone.subtitle}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={textItemVariants}>
                        <p className="text-text-secondary text-body leading-relaxed mb-4">
                          {milestone.description}
                        </p>
                      </motion.div>

                      <motion.blockquote variants={textItemVariants} className="border-l-4 border-accent-blue pl-6 py-2">
                        <p className="text-text-primary font-medium italic text-lg leading-relaxed">
                          "{milestone.tone}"
                        </p>
                      </motion.blockquote>

                      {milestone.tags && (
                        <motion.div variants={textItemVariants} className="flex flex-wrap gap-2">
                          {milestone.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1.5 text-small text-accent-blue bg-accent-blue/10 rounded-full border border-accent-blue/20 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to action */}
          <motion.div
            variants={milestoneVariants}
            className="text-center mt-20"
          >
            <p className="text-text-secondary text-body mb-6">
              Ready to write the next chapter together?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary inline-block"
            >
              Let's connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}