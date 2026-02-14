import { motion } from 'framer-motion'

interface ProgressDotsProps {
  screens: Array<{ id: string; label: string }>
  currentScreen: number
  onScreenClick: (index: number) => void
}

export default function ProgressDots({ screens, currentScreen, onScreenClick }: ProgressDotsProps) {
  return (
    <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-4" aria-label="Page sections">
      {/* Elegant scroll indicator line */}
      <div className="scroll-indicator absolute left-1/2 transform -translate-x-1/2 -top-8" />
      
      {screens.map((screen, index) => (
        <button
          key={screen.id}
          onClick={() => onScreenClick(index)}
          className="group relative"
          aria-label={`Navigate to ${screen.label} section`}
          aria-current={index === currentScreen ? 'true' : 'false'}
        >
          {/* Dot */}
          <motion.div
            className={`w-3 h-3 rounded-full border-2 ${
              index === currentScreen
                ? 'bg-accent-primary border-accent-primary shadow-lg shadow-accent-primary/50'
                : 'bg-transparent border-white/30 hover:border-accent-primary/60'
            }`}
            style={{ transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          
          {/* Label tooltip */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none" 
               style={{ transition: 'opacity 0.3s, transform 0.3s' }}>
            <div className="bg-surface-elevated/95 backdrop-blur-sm text-text-primary text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-border-subtle shadow-xl">
              {screen.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-surface-elevated/95 border-y-4 border-y-transparent" />
            </div>
          </div>
        </button>
      ))}
    </nav>
  )
}