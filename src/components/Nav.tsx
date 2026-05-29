import { useEffect, useState } from 'react'

function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

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
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/tiXor-code"
            target="_blank" rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-dim transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a href="#contact" className="mono flex items-center gap-2 text-[12px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
            <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
