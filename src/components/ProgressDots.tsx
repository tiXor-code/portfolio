import { motion } from 'framer-motion'

interface ProgressDotsProps {
  screens: Array<{ id: string; label: string }>
  currentScreen: number
  onScreenClick: (index: number) => void
}

export default function ProgressDots({ screens, currentScreen, onScreenClick }: ProgressDotsProps) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
      {screens.map((screen, index) => (
        <button
          key={screen.id}
          onClick={() => onScreenClick(index)}
          className="group relative"
          aria-label={`Go to ${screen.label}`}
        >
          {/* Dot */}
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentScreen
                ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50'
                : 'bg-transparent border-white/30 hover:border-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          
          {/* Label tooltip */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10">
              {screen.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-y-4 border-y-transparent" />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}