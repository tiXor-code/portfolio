import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-apple-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-apple-gray-800"
          animate={{
            borderColor: ["#1d1d1f", "#0071e3", "#1d1d1f"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-apple-blue"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />      </div>
      <motion.p
        className="absolute bottom-10 text-apple-gray-500 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Experience...
      </motion.p>
    </motion.div>
  )
}

export default LoadingScreen