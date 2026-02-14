import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const journeyItems = [
  {
    id: 'university',
    year: '2017-2022',
    title: 'University of Worcester',
    subtitle: 'BSc Computer Games Design & Development',
    description: 'Built technical foundation in game development, programming, and design. Graduated with comprehensive knowledge of the industry.',
    image: '/wip4/images/journey/university-worcester.jpg',
    achievements: ['Technical Foundation', 'Industry Knowledge', 'Project Experience'],
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 'ubisoft',
    year: '2022-2023',
    title: 'Ubisoft QA',
    subtitle: 'Quality Assurance Tester',
    description: 'Entry into professional game development. Tested Rainbow Six Siege, documented 100+ bugs, learned AAA development workflows.',
    image: '/wip4/images/journey/rainbow-six-siege.jpg',
    achievements: ['100+ Bugs Found', 'AAA Experience', 'Systematic Testing'],
    color: 'from-green-500/20 to-blue-500/20',
  },
  {
    id: 'democracy',
    year: '2024',
    title: 'Play For Democracy',
    subtitle: 'Producer & Game Designer',
    description: 'Led 7-person team to ship "Vote It!" mobile game. 2K downloads, EU Commission recognition, invited to Brussels.',
    image: '/wip4/images/journey/play-for-democracy-banner.jpg',
    achievements: ['EU Recognition', 'Team Leadership', 'Mobile Launch'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'brussels',
    year: '2024',
    title: 'Brussels Recognition',
    subtitle: 'European Commission Invitation',
    description: 'Invited to European Parliament at age 23. Game recognized for educational impact and democratic engagement.',
    image: '/wip4/images/journey/brussels-street.jpg',
    achievements: ['EU Parliament', 'Age 23', 'Democratic Impact'],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'ea',
    year: '2024-Present',
    title: 'Electronic Arts',
    subtitle: 'Assistant Content Producer',
    description: 'FC Ultimate Team content strategy. Data analytics for 10M+ players. Live service optimization and player behavior analysis.',
    image: '/wip4/images/journey/ea-fc.jpg',
    achievements: ['10M+ Players', 'Data Analytics', 'Live Service'],
    color: 'from-red-500/20 to-orange-500/20',
  },
]

export default function EditorialJourney() {
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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  }

  return (
    <div ref={ref} className="container-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <p className="editorial-caption text-accent-primary mb-4">
            My Journey
          </p>
          <h2 className="editorial-headline mb-8">
            From QA Tester to
            <span className="block text-accent-primary">Content Producer</span>
          </h2>
          <p className="editorial-body text-text-secondary max-w-3xl mx-auto">
            A deliberate progression through the gaming industry, building skills and relationships 
            that led from finding bugs to shaping experiences for millions of players worldwide.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            variants={timelineVariants}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-primary/50 to-accent-primary transform -translate-x-1/2"
            style={{ originY: 0 }}
          />

          <div className="space-y-20 lg:space-y-32">
            {journeyItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 lg:gap-16 items-center`}
              >
                {/* Timeline Node */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 w-4 h-4 bg-accent-primary rounded-full border-4 border-bg-secondary transform -translate-x-1/2 -translate-y-1/2 z-10" />

                {/* Content Side */}
                <div className="lg:w-1/2 lg:px-8">
                  {/* Year Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-accent-primary text-text-inverse text-sm font-bold rounded-full mb-4">
                    {item.year}
                  </div>

                  <h3 className="editorial-title mb-2">{item.title}</h3>
                  <p className="editorial-subtitle text-accent-primary mb-6">{item.subtitle}</p>
                  <p className="editorial-body text-text-secondary mb-8">{item.description}</p>

                  {/* Achievements */}
                  <div>
                    <p className="editorial-caption mb-4">Key Achievements</p>
                    <div className="space-y-2">
                      {item.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-3" />
                          <span className="text-sm font-medium text-text-secondary">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/2 lg:px-8">
                  <motion.div
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="img-feature rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.title} - ${item.subtitle}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-lg opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Section */}
        <motion.div
          variants={itemVariants}
          className="mt-32 pt-16 border-t-2 border-accent-primary text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="editorial-title mb-6 text-accent-primary">
              What's Next?
            </h3>
            <p className="editorial-body text-text-secondary mb-8">
              Continuing to push the boundaries of live service games, exploring AI integration in game development, 
              and building experiences that bring people together through interactive entertainment.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: '🤖', label: 'AI Integration', description: 'Next-gen workflows' },
                { icon: '📊', label: 'Data Science', description: 'Player insights' },
                { icon: '🎮', label: 'Live Service', description: 'Global scale' },
              ].map((future) => (
                <div key={future.label} className="text-center">
                  <div className="text-2xl mb-2">{future.icon}</div>
                  <p className="font-display font-semibold text-text-primary mb-1">{future.label}</p>
                  <p className="text-sm text-text-tertiary">{future.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}