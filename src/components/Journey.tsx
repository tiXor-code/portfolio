import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface JourneyChapter {
  id: number
  title: string
  subtitle: string
  description: string
  image?: string
  gradient: string
}

const journeyChapters: JourneyChapter[] = [
  {
    id: 1,
    title: "University",
    subtitle: "BSc in Computer Games, Design and Development",
    description: "Where the interest in games became a career path.",
    gradient: "from-slate-900 via-blue-900/50 to-slate-900"
  },
  {
    id: 2,
    title: "Play For Democracy",
    subtitle: "Producer & Game Designer",
    description: "Producer on a game built to get Gen Z to vote. Team of 8, backed by the EU.",
    image: "play-for-democracy-banner.jpg",
    gradient: "from-black/70 via-black/50 to-black/70"
  },
  {
    id: 3,
    title: "Brussels",
    subtitle: "European Parliament",
    description: "The European Parliament invited us to present. I was 23.",
    image: "eu-parliament-group.jpg",
    gradient: "from-black/70 via-black/50 to-black/70"
  },
  {
    id: 4,
    title: "Ubisoft",
    subtitle: "QA Tester, Rainbow Six Siege",
    description: "Started by breaking games professionally.",
    gradient: "from-gray-900 via-slate-800/50 to-gray-900"
  },
  {
    id: 5,
    title: "The Leadership School",
    subtitle: "Leaders Foundation",
    description: "An intense week. They threw me in a river. Literally.",
    image: "leadership-school-water.jpg",
    gradient: "from-black/70 via-black/50 to-black/70"
  },
  {
    id: 6,
    title: "EA",
    subtitle: "Assistant Content Producer, EA FC",
    description: "Now I ship to millions. Ultimate Team.",
    gradient: "from-slate-900 via-blue-800/30 to-slate-900"
  },
  {
    id: 7,
    title: "What's Next",
    subtitle: "AI & Beyond",
    description: "Building things that didn't exist yesterday.",
    gradient: "from-indigo-900 via-purple-900/50 to-black"
  }
]

function ChapterSlide({ chapter, index }: { chapter: JourneyChapter; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  return (
    <div
      ref={ref}
      className="journey-slide relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      {chapter.image ? (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}images/journey/${chapter.image})`
            }}
            animate={{
              scale: isInView ? 1.08 : 1
            }}
            transition={{
              duration: 8,
              ease: 'easeOut'
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient}`} />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient}`} />
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
        >
          {chapter.title}
        </motion.h2>
        
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl text-blue-300 font-medium mb-6"
        >
          {chapter.subtitle}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          {chapter.description}
        </motion.p>
      </div>

      {/* Chapter number */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-8 left-8 text-white/40 font-mono text-sm"
      >
        {String(index + 1).padStart(2, '0')} / {String(journeyChapters.length).padStart(2, '0')}
      </motion.div>
    </div>
  )
}

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const chapterHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / chapterHeight)
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < journeyChapters.length) {
        setActiveIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  const handleDotClick = (index: number) => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
    setActiveIndex(index)
  }

  return (
    <section id="journey" className="relative h-screen">
      {/* Progress dots - only show when journey is visible */}
      <div className="absolute right-6 sm:right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-3">
        {journeyChapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-white scale-150' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to ${chapter.title}`}
          />
        ))}
      </div>

      {/* Scroll-snap container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto"
        style={{ 
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style>{`
          #journey > div::-webkit-scrollbar { display: none; }
        `}</style>
        {journeyChapters.map((chapter, index) => (
          <ChapterSlide key={chapter.id} chapter={chapter} index={index} />
        ))}
      </div>
    </section>
  )
}
