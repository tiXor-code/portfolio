import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/project/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position (only on home page)
      if (!isProjectPage) {
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isProjectPage])
  
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isProjectPage) {
      // If on project page, navigate to home page with hash
      e.preventDefault()
      window.location.href = '/' + href
    }
  }

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
        {isProjectPage ? (
          <Link
            to="/"
            className="text-xl font-bold tracking-tight hover:text-apple-blue transition-colors"
          >
            TCL
          </Link>
        ) : (
          <motion.a
            href="#hero"
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TCL
          </motion.a>
        )}
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={clsx(
                'text-sm font-medium transition-colors duration-300',
                !isProjectPage && activeSection === item.href.slice(1)
                  ? 'text-apple-blue'
                  : 'text-apple-gray-300 hover:text-apple-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.name}
            </motion.a>
          ))}
          
          <motion.a
            href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navigation