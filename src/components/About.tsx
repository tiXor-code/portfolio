import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  {
    value: '5+',
    label: 'Years Experience',
    description: 'Building games & digital experiences'
  },
  {
    value: '10M+',
    label: 'Players Reached',
    description: 'Through EA FC Ultimate Team'
  },
  {
    value: '6+',
    label: 'Projects Shipped',
    description: 'From mobile games to AAA titles'
  },
  {
    value: '2+',
    label: 'Platforms',
    description: 'iOS, Android, PC, Console'
  }
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
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

  return (
    <section id="about" className="section-padding bg-bg-primary">
      <div className="container-content">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-display font-bold text-text-primary mb-4">
              About Me
            </h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded-full" />
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <p className="text-body text-text-secondary leading-relaxed text-balance max-w-3xl mx-auto">
              I'm a game producer and developer with a passion for creating experiences that matter. Currently at Electronic Arts working on FC Ultimate Team, I analyze player behavior to help shape content strategy for millions of players worldwide. My journey spans from indie game development to AAA production, with a focus on using data and creativity to build better games.
            </p>
            <p className="text-body text-text-secondary leading-relaxed text-balance max-w-3xl mx-auto mt-6">
              When I'm not diving into player analytics, you'll find me exploring AI automation tools, prototyping new game ideas, or collaborating with teams to bring interactive experiences to life.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-default"
              >
                <div className="glass p-6 rounded-xl transition-colors duration-300 group-hover:border-accent-primary/50">
                  <div className="text-display font-bold text-accent-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-primary font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-small text-text-secondary">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills highlight */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-small text-text-secondary mb-4">
              Specializing in
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Game Production',
                'Data Analytics',
                'Team Leadership',
                'React Development',
                'AI Automation',
                'Unity Engine'
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="glass px-4 py-2 text-small text-text-primary rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}