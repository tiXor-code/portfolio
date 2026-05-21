import './styles/globals.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import AgentDemo from './components/AgentDemo'
import Projects from './components/Projects'
import Services from './components/Services'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <AgentDemo />
        <Projects />
        <Services />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
