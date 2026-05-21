export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-base py-9">
      <div className="shell flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="mono text-[12px] text-ink-faint">TEODOR LUTOIU &middot; &copy; {new Date().getFullYear()}</div>
        <div className="mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">Built with React, WebGL, Framer Motion</div>
      </div>
    </footer>
  )
}
