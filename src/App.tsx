import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './styles/globals.css'
import './styles/scroll-snap.css'

import Navigation from './components/Navigation'
import ProgressDots from './components/ProgressDots'
import HeroScreen from './components/screens/HeroScreen'
import AboutScreen from './components/screens/AboutScreen'
import UniversityScreen from './components/screens/UniversityScreen'
import PlayForDemocracyScreen from './components/screens/PlayForDemocracyScreen'
import BrusselsScreen from './components/screens/BrusselsScreen'
import UbisoftScreen from './components/screens/UbisoftScreen'
import LeadershipSchoolScreen from './components/screens/LeadershipSchoolScreen'
import EAScreen from './components/screens/EAScreen'
import WhatsNextScreen from './components/screens/WhatsNextScreen'
import ProjectsScreen from './components/screens/ProjectsScreen'
import TechStackScreen from './components/screens/TechStackScreen'
import ContactScreen from './components/screens/ContactScreen'

const screens = [
  { id: 'hero', label: 'Hero', component: HeroScreen },
  { id: 'about', label: 'About', component: AboutScreen },
  { id: 'university', label: 'University', component: UniversityScreen },
  { id: 'play-for-democracy', label: 'Play For Democracy', component: PlayForDemocracyScreen },
  { id: 'brussels', label: 'Brussels', component: BrusselsScreen },
  { id: 'ubisoft', label: 'Ubisoft', component: UbisoftScreen },
  { id: 'leadership-school', label: 'Leadership School', component: LeadershipSchoolScreen },
  { id: 'ea', label: 'EA', component: EAScreen },
  { id: 'whats-next', label: 'What\'s Next', component: WhatsNextScreen },
  { id: 'projects', label: 'Projects', component: ProjectsScreen },
  { id: 'tech-stack', label: 'Tech Stack', component: TechStackScreen },
  { id: 'contact', label: 'Contact', component: ContactScreen },
]

function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const scrollToScreen = (index: number) => {
    const element = document.getElementById(screens[index].id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const screenIndex = screens.findIndex(screen => screen.id === entry.target.id)
          if (screenIndex !== -1) {
            setCurrentScreen(screenIndex)
          }
        }
      })
    }, observerOptions)

    screens.forEach(screen => {
      const element = document.getElementById(screen.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      screens.forEach(screen => {
        const element = document.getElementById(screen.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  // Check for reduced motion preference and handle video autoplay
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Pause all videos if user prefers reduced motion
      const videos = document.querySelectorAll('video[autoplay]')
      videos.forEach(video => {
        const videoElement = video as HTMLVideoElement
        videoElement.pause()
      })
    }
  }, [])

  return (
    <div className="relative">
      {/* Enhanced grain texture */}
      <div className="grain fixed inset-0 pointer-events-none z-10" />
      
      {/* Navigation */}
      <Navigation screens={screens} scrollToScreen={scrollToScreen} currentScreen={currentScreen} />
      
      {/* Progress Dots */}
      <ProgressDots 
        screens={screens} 
        currentScreen={currentScreen} 
        onScreenClick={scrollToScreen} 
      />
      
      {/* Main Content */}
      <main className="scroll-snap-container">
        {screens.map((screen) => {
          const ScreenComponent = screen.component
          const isHero = screen.id === 'hero'
          const isContact = screen.id === 'contact'
          
          // Use semantic HTML elements
          const Tag = isHero ? 'section' : isContact ? 'footer' : 'section'
          
          return (
            <Tag
              key={screen.id}
              id={screen.id}
              className="screen-snap"
              aria-labelledby={`${screen.id}-heading`}
            >
              <ScreenComponent />
            </Tag>
          )
        })}
      </main>
    </div>
  )
}

function App() {
  return (
    <Router basename="/wip3/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App