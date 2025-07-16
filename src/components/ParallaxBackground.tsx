import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  return (
    <div ref={ref} className="fixed inset-0 z-0">
      {/* 3D Stars Background */}
      <Canvas className="absolute inset-0">
        <Stars 
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
      
      {/* Parallax layers */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue rounded-full filter blur-3xl" />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </motion.div>
      
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-apple-blue to-purple-500 rounded-full filter blur-3xl" />
      </motion.div>
    </div>
  )
}

export default ParallaxBackground