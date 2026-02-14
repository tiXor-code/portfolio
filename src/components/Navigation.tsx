import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  screens: Array<{ id: string; label: string }>
  scrollToScreen: (index: number) => void
  currentScreen: number
}

const keyScreens = [
  { name: 'About', screenId: 'about' },
  { name: 'Journey', screenId: 'play-for-democracy' },
  { name: 'Projects', screenId: 'projects' },
  { name: 'Tech Stack', screenId: 'tech-stack' },
  { name: 'Contact', screenId: 'contact' },
]

export default function Navigation({ screens, scrollToScreen, currentScreen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsScrolled(currentScreen > 0)
  }, [currentScreen])

  const handleNavClick = (screenId: string) => {
    setIsMobileMenuOpen(false)
    const screenIndex = screens.findIndex(screen => screen.id === screenId)
    if (screenIndex !== -1) {
      scrollToScreen(screenIndex)
    }
  }

  return (
    <header>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm ${
          isScrolled ? 'glass backdrop-blur-subtle' : ''
        }`}
        style={{ transition: 'background-color 0.6s, backdrop-filter 0.6s' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('hero')}
              className="text-xl font-display font-bold text-text-primary hover:text-accent-primary"
              style={{ transition: 'color 0.3s' }}
              aria-label="Go to homepage"
            >
              TCL
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {keyScreens.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.screenId)}
                  className="text-text-secondary hover:text-text-primary animated-underline"
                  style={{ transition: 'color 0.3s' }}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: keyScreens.length * 0.1 }}
                className="ml-6 px-6 py-2.5 bg-accent-primary text-white text-sm font-medium rounded-full hover:bg-accent-primary-hover"
                style={{ transition: 'background-color 0.3s, transform 0.2s' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View CV (opens in new tab)"
              >
                View CV
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4,
                }}
                className="w-6 h-0.5 bg-text-primary transform"
                style={{ transition: 'transform 0.3s' }}
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                className="w-6 h-0.5 bg-text-primary my-1"
                style={{ transition: 'opacity 0.3s' }}
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -2 : 4,
                }}
                className="w-6 h-0.5 bg-text-primary transform"
                style={{ transition: 'transform 0.3s' }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-t border-border-subtle"
            >
              <div className="container-content py-6">
                {keyScreens.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.screenId)}
                    className="block w-full text-left py-3 text-text-secondary hover:text-text-primary"
                    style={{ transition: 'color 0.3s' }}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.a
                  href="https://drive.google.com/file/d/1PRUAyB4xNXOS6iGj_1fRA_jF08JEozNR/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: keyScreens.length * 0.1 }}
                  className="block w-full text-left py-3 text-accent-primary hover:text-accent-primary-hover font-medium"
                  style={{ transition: 'color 0.3s' }}
                  aria-label="View CV (opens in new tab)"
                >
                  View CV →
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}