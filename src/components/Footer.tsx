export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="shell flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="mono text-xs text-ink-faint">
          <span className="text-ink">teodor</span>
          <span className="text-signal">.lutoiu</span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="mono text-[11px] text-ink-faint">
          Built from scratch · React, Vite, Framer Motion
        </div>
      </div>
    </footer>
  )
}
