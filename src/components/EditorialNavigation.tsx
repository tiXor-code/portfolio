import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navigationItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#tech', label: 'Tech' },
  { href: '#contact', label: 'Contact' },
]

export default function EditorialNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'journey', 'projects', 'tech', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-bg-primary/95 backdrop-blur-lg border-b border-border-subtle shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Name */}
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="text-title font-display font-bold text-text-primary hover:text-accent-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TL
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                  aria-current={activeSection === item.href.replace('#', '') ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CV Download Button */}
            <div className="hidden md:block">
              <a
                href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
                aria-label="Download CV (Opens in new tab)"
              >
                Download CV
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                className="block w-6 h-0.5 bg-text-primary"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-text-primary mt-1"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-text-primary mt-1"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg-primary border-b border-border-subtle shadow-lg md:hidden"
          >
            <div className="container-content py-6">
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left text-lg font-medium transition-colors duration-300 ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-accent-primary'
                        : 'text-text-primary hover:text-accent-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile CV Download */}
                <div className="pt-4 border-t border-border-subtle">
                  <a
                    href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex w-full justify-center"
                    aria-label="Download CV (Opens in new tab)"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Download CV
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}