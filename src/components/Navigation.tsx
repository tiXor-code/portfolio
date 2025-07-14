import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled ? 'py-4' : 'py-6'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className={clsx(
        'mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between transition-all duration-500',
        scrolled && 'glass-effect-dark rounded-full py-3 px-6'
      )}>
        <motion.a
          href="#hero"
          className="text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          TCL
        </motion.a>        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={clsx(
                'text-sm font-medium transition-colors duration-300',
                activeSection === item.href.slice(1)
                  ? 'text-apple-blue'
                  : 'text-apple-gray-300 hover:text-apple-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.name}
            </motion.a>
          ))}
          
          <motion.button
            className="ml-4 px-4 py-2 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navigation