import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './styles/globals.css'

// Import the new editorial components
import EditorialNavigation from './components/EditorialNavigation'
import EditorialHero from './components/EditorialHero'
import EditorialAbout from './components/EditorialAbout'
import EditorialJourney from './components/EditorialJourney'
import EditorialProjects from './components/EditorialProjects'
import EditorialTechStack from './components/EditorialTechStack'
import EditorialContact from './components/EditorialContact'

function HomePage() {
  // Handle reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion')
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-primary text-text-inverse px-4 py-2 rounded-lg z-[9999] transition-all"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <EditorialNavigation />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section id="hero" className="relative">
          <EditorialHero />
        </section>

        {/* About Section */}
        <section id="about" className="section-padding">
          <EditorialAbout />
        </section>

        {/* Journey Section */}
        <section id="journey" className="section-padding bg-bg-secondary">
          <EditorialJourney />
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding">
          <EditorialProjects />
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="section-padding bg-bg-secondary">
          <EditorialTechStack />
        </section>
      </main>

      {/* Footer/Contact */}
      <footer id="contact" className="section-padding bg-editorial-near-black">
        <EditorialContact />
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router basename="/wip4/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App