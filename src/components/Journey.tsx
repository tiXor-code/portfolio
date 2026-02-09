import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

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
    gradient: "from-black/60 via-black/40 to-black/70"
  },
  {
    id: 3,
    title: "Brussels",
    subtitle: "European Parliament",
    description: "The European Parliament invited us to present. I was 23.",
    image: "eu-parliament-group.jpg",
    gradient: "from-black/60 via-black/40 to-black/70"
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
    gradient: "from-black/60 via-black/40 to-black/70"
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

export default function Journey() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const journeyElement = document.getElementById('journey')
    if (journeyElement) {
      observer.observe(journeyElement)
    }

    return () => observer.disconnect()
  }, [])

  const handleChapterClick = (index: number) => {
    setCurrentChapter(index)
    const chapterElement = document.getElementById(`chapter-${index}`)
    if (chapterElement) {
      chapterElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section id="journey" className="relative">
      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {journeyChapters.map((_, index) => (
          <button
            key={index}
            onClick={() => handleChapterClick(index)}
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              currentChapter === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to chapter ${index + 1}`}
          />
        ))}
      </div>

      {/* Chapters container with scroll-snap */}
      <div 
        className="h-screen overflow-y-scroll scroll-smooth"
        style={{ 
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop
          const chapterHeight = window.innerHeight
          const newChapter = Math.round(scrollTop / chapterHeight)
          if (newChapter !== currentChapter && newChapter >= 0 && newChapter < journeyChapters.length) {
            setCurrentChapter(newChapter)
          }
        }}
      >
        {/* Hide scrollbar */}
        <style>{`
          #journey .h-screen::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {journeyChapters.map((chapter, index) => (
          <div
            key={chapter.id}
            id={`chapter-${index}`}
            className="relative h-screen flex items-center justify-center overflow-hidden"
            style={{ scrollSnapAlign: 'start' }}
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
                    scale: isInView ? [1, 1.1] : 1
                  }}
                  transition={{
                    duration: 20,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient}`} />
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient}`} />
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              {currentChapter === index && (
                <motion.div
                  key={`content-${index}`}
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative z-10 text-center max-w-4xl mx-auto px-8"
                >
                  <motion.h2
                    variants={textVariants}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
                  >
                    {chapter.title}
                  </motion.h2>
                  
                  <motion.h3
                    variants={textVariants}
                    className="text-xl md:text-2xl text-blue-300 font-medium mb-6"
                  >
                    {chapter.subtitle}
                  </motion.h3>
                  
                  <motion.p
                    variants={textVariants}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                  >
                    {chapter.description}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chapter number */}
            <div className="absolute bottom-8 left-8 text-white/60 font-mono text-sm">
              {String(index + 1).padStart(2, '0')} / {String(journeyChapters.length).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}