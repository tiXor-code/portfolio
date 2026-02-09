import { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import ParallaxBackground from './components/ParallaxBackground'
import LoadingScreen from './components/LoadingScreen'

const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const ProjectDetail = lazy(() => import('./components/ProjectDetail'))

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Handle hash navigation on page load
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-apple-black">
      <ParallaxBackground />
      
      <Navigation />
      
      <main className="relative z-20">
        <Suspense fallback={<div className="h-screen" />}>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      
      <footer className="relative z-20 py-12 text-center text-apple-gray-400 text-sm">
        <p>&copy; 2026 Teodor-Cristian Lutoiu. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={
          <Suspense fallback={<LoadingScreen />}>
            <ProjectDetail />
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default App