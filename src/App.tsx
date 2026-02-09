import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/globals.css'

import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Subtle grain texture */}
      <div className="grain fixed inset-0 pointer-events-none" />
      
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App