import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  return (
    <div ref={ref} className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-apple-black" />
      
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue rounded-full filter blur-3xl animate-float" />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-25"
      >
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl" style={{ animationDelay: '3s' }} />
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-apple-blue/10 to-purple-500/10 rounded-full filter blur-3xl" />
    </div>
  )
}

export default ParallaxBackground
