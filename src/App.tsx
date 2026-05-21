import './styles/globals.css'
import ShaderBg from './components/ShaderBg'
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
      <ShaderBg />
      <div className="grain pointer-events-none fixed inset-0 z-[1] opacity-50" />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <AgentDemo />
        <Projects />
        <Services />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
