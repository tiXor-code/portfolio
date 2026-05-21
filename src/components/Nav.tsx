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
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ' +
        (solid ? 'bg-base/85 backdrop-blur-md border-b border-line' : 'border-b border-transparent')
      }
    >
      <nav className="shell flex h-16 items-center justify-between">
        <a href="#top" className="mono text-sm font-semibold tracking-tight" aria-label="Home">
          <span className="text-ink">teodor</span>
          <span className="text-signal">.lutoiu</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full border border-signal-dim bg-signal/10 px-3.5 py-1.5 text-xs text-signal transition-colors hover:bg-signal/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
          <span className="mono">Available for work</span>
        </a>
      </nav>
    </header>
  )
}
