import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect } from 'react'

const BrainIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6C18 6 14 10 14 15c0 3 1 5 3 7-3 1-5 4-5 7 0 4 3 7 7 7h1c1 3 4 5 7 5h-3" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M24 6c6 0 10 4 10 9 0 3-1 5-3 7 3 1 5 4 5 7 0 4-3 7-7 7h-1c-1 3-4 5-7 5h3" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="18" cy="18" r="2" fill="#c084fc" opacity="0.8"/>
    <circle cx="30" cy="18" r="2" fill="#c084fc" opacity="0.8"/>
    <circle cx="24" cy="28" r="2" fill="#c084fc" opacity="0.8"/>
    <line x1="18" y1="18" x2="24" y2="28" stroke="#a855f7" strokeWidth="1.5" opacity="0.5"/>
    <line x1="30" y1="18" x2="24" y2="28" stroke="#a855f7" strokeWidth="1.5" opacity="0.5"/>
    <line x1="18" y1="18" x2="30" y2="18" stroke="#a855f7" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="14" cy="24" r="1.5" fill="#a855f7" opacity="0.6"/>
    <circle cx="34" cy="24" r="1.5" fill="#a855f7" opacity="0.6"/>
    <line x1="14" y1="24" x2="18" y2="18" stroke="#a855f7" strokeWidth="1" opacity="0.4"/>
    <line x1="34" y1="24" x2="30" y2="18" stroke="#a855f7" strokeWidth="1" opacity="0.4"/>
  </svg>
)

const GamepadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 20c0-4 3-7 7-7h18c4 0 7 3 7 7v2c0 6-2 12-5 16-1 2-3 2-4 0l-3-6H20l-3 6c-1 2-3 2-4 0-3-4-5-10-5-16v-2z" stroke="#60a5fa" strokeWidth="2" fill="none"/>
    <rect x="14" y="20" width="6" height="2" rx="1" fill="#60a5fa"/>
    <rect x="16" y="17" width="2" height="8" rx="1" fill="#60a5fa"/>
    <circle cx="31" cy="19" r="2" fill="#60a5fa" opacity="0.8"/>
    <circle cx="35" cy="23" r="2" fill="#60a5fa" opacity="0.8"/>
  </svg>
)

const RocketIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6c-6 8-8 16-8 24h16c0-8-2-16-8-24z" stroke="#4ade80" strokeWidth="2" fill="none"/>
    <path d="M16 30c-4 0-6 4-6 8h6v-8z" stroke="#4ade80" strokeWidth="1.5" fill="#4ade80" opacity="0.2"/>
    <path d="M32 30c4 0 6 4 6 8h-6v-8z" stroke="#4ade80" strokeWidth="1.5" fill="#4ade80" opacity="0.2"/>
    <circle cx="24" cy="22" r="3" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
    <path d="M20 38h8v4h-8z" fill="#4ade80" opacity="0.6"/>
    <path d="M22 42h4v2h-4z" fill="#f97316" opacity="0.8"/>
  </svg>
)

export default function WhatsNextScreen() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (inView) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [inView])

  const focusAreas = [
    { icon: <BrainIcon />, label: 'AI Tools', desc: 'Building smart automation & assistants', glowColor: 'purple' },
    { icon: <GamepadIcon />, label: 'Live Games', desc: 'Data-driven live service experiences', glowColor: 'blue' },
    { icon: <RocketIcon />, label: 'Innovation', desc: 'Shipping ideas that don\'t exist yet', glowColor: 'green' },
  ]

  const glowMap: Record<string, string> = {
    purple: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-purple-500/50',
    blue: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] hover:border-blue-500/50',
    green: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:border-green-500/50',
  }

  return (
    <div ref={ref} className="relative screen-content">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}images/journey/ai-bg.mp4`} type="video/mp4" />
        </video>
        <div className="bg-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="screen-content text-center max-w-4xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="screen-title text-white mb-4"
        >
          What's Next
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="screen-subtitle text-purple-300 mb-8"
        >
          AI & Beyond
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="screen-description text-gray-200"
        >
          Building things that didn't exist yesterday.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.15 }}
              className={`text-center group cursor-default p-4 rounded-xl border border-transparent ${glowMap[area.glowColor]}`}
              style={{ transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {area.icon}
              </div>
              <p className="text-sm font-medium text-gray-200">{area.label}</p>
              <p className="text-xs text-gray-400 mt-1">{area.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
