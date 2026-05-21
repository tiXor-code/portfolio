import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#demo', label: 'Live agent' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#path', label: 'Path' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header
      className={'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ' +
        (solid ? 'bg-base/80 backdrop-blur-md border-b border-line' : 'border-b border-transparent')}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <a href="#top" className="mono text-[13px] tracking-wide" aria-label="Home">
          TEODOR&nbsp;LUTOIU
        </a>
        <div className="mono hidden items-center gap-7 text-[12px] uppercase tracking-[0.12em] text-ink-dim md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">{l.label}</a>
          ))}
        </div>
        <a href="#contact" className="mono flex items-center gap-2 text-[12px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
          <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
        </a>
      </nav>
    </header>
  )
}
