import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { number: '3+', label: 'Years in Gaming', description: 'From QA to Producer' },
  { number: '6+', label: 'Shipped Projects', description: 'Mobile to AAA' },
  { number: '2M+', label: 'Players Reached', description: 'Global Impact' },
  { number: '100%', label: 'On-Time Delivery', description: 'Reliable Execution' },
]

export default function EditorialAbout() {
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div ref={ref} className="container-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="editorial-caption text-accent-primary mb-4">
              About Me
            </p>
            <h2 className="editorial-headline mb-6">
              Building the Future of
              <span className="block text-accent-primary">Interactive Entertainment</span>
            </h2>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="editorial-body">
              <p className="drop-cap text-accent-primary">C</p>
              <span className="text-pretty">
                urrently working as an Assistant Content Producer at Electronic Arts, I analyze player behavior data for FC Ultimate Team—one of the world's biggest live-service games with over 10 million active players. My role involves transforming complex player analytics into actionable content strategy decisions that keep millions engaged.
              </span>
            </div>

            <div className="editorial-body text-text-secondary">
              <p className="text-pretty">
                My journey began in QA at Ubisoft, where I learned the fundamentals of game development by systematically testing and documenting over 100 bugs in Rainbow Six Siege. This foundation taught me to think like both a developer and a player—a perspective that proved invaluable as I transitioned into production roles.
              </p>
            </div>

            <div className="editorial-body text-text-secondary">
              <p className="text-pretty">
                The breakthrough moment came with "Vote It!"—a mobile democracy education game I produced with a 7-person team for ARDEN's Play For Democracy initiative. Not only did we ship on time to iOS and Android, reaching 2,000 downloads, but the project earned recognition from the European Commission, leading to an invitation to Brussels at age 23.
              </p>
            </div>

            {/* Pull Quote */}
            <motion.blockquote
              variants={itemVariants}
              className="my-12 pl-6 border-l-4 border-accent-primary"
            >
              <p className="pull-quote text-accent-primary">
                Every bug I found, every deadline I met, and every player insight I uncovered was building toward something bigger—the ability to shape experiences that connect millions of people worldwide.
              </p>
            </motion.blockquote>

            <div className="editorial-body text-text-secondary">
              <p className="text-pretty">
                Beyond traditional game development, I'm passionate about the intersection of AI and gaming. I've built automation workflows using n8n and ChatGPT APIs, explored indie game development in both Unity and Unreal Engine, and graduated from the Leaders Foundation Leadership School in Romania.
              </p>
            </div>
          </motion.div>

          {/* Skills Tags */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="editorial-caption mb-6">Core Expertise</p>
            <div className="flex flex-wrap gap-3">
              {[
                'Data Analytics',
                'Game Production',
                'Content Strategy',
                'Team Leadership',
                'Unity & Unreal',
                'AI Automation',
                'Live Service Games',
                'Player Research'
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-bg-tertiary border border-border-subtle rounded-lg text-sm font-medium text-text-secondary hover:bg-accent-light hover:text-accent-primary hover:border-accent-primary transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Stats */}
        <div className="lg:col-span-4">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="text-center lg:text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stat-number mb-2">{stat.number}</div>
                <div className="stat-label mb-1">{stat.label}</div>
                <div className="text-sm text-text-tertiary">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-bg-secondary border border-border-subtle rounded-lg"
          >
            <p className="editorial-caption text-accent-primary mb-3">Education</p>
            <h3 className="font-display font-semibold text-text-primary mb-2">
              BSc Computer Games Design & Development
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              University of Worcester, UK
            </p>
            <p className="text-text-tertiary text-sm">
              2017-2022 • Built comprehensive technical foundation in game development, programming, and design principles.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Section - Current Focus */}
      <motion.div
        variants={itemVariants}
        className="mt-20 pt-16 border-t border-border-subtle"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="editorial-title mb-6">
              What I'm Working On Now
            </h3>
            <div className="space-y-4 editorial-body text-text-secondary">
              <p>
                At EA, I'm diving deep into player behavior analytics for FC Ultimate Team, helping the content team understand when and what to release to keep millions of players engaged throughout the soccer season.
              </p>
              <p>
                I'm also exploring how AI can revolutionize game development workflows, experimenting with automation tools that could reshape how we approach content creation and player research.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-accent-primary/10 to-accent-primary/5 rounded-lg p-8 border border-accent-primary/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-display font-semibold text-text-primary mb-2">
                  Ready for New Challenges
                </h4>
                <p className="text-text-secondary text-sm">
                  Always open to discussing exciting opportunities in game production, data analytics, and interactive entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}