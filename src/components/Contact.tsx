import { SectionHead, Reveal } from './ui'

const CHANNELS: { label: string; value: string; href: string; newTab?: boolean }[] = [
  { label: 'Email', value: 'contact@teodorlutoiu.com', href: 'mailto:contact@teodorlutoiu.com' },
  { label: 'LinkedIn', value: 'in/teodorlc', href: 'https://www.linkedin.com/in/teodorlc' },
  { label: 'GitHub', value: 'tiXor-code', href: 'https://github.com/tiXor-code' },
  { label: 'CV (PDF)', value: 'teodor-lutoiu-cv.pdf', href: import.meta.env.BASE_URL + 'cv/teodor-lutoiu-cv.pdf', newTab: true },
]

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-20 border-t border-line bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="05" kicker="Contact"
          title={<>Have a process worth automating, or a team worth joining?</>}
          lead="Tell me what you are building. I usually reply within a day."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a href={c.href} target={c.href.startsWith('http') || c.newTab ? '_blank' : undefined} rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-accent/40 hover:bg-panel-2">
                <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">{c.label}</div>
                <div className="mt-8 flex items-center justify-between gap-2">
                  <span className="mono text-[13.5px] text-ink transition-colors group-hover:text-accent">{c.value}</span>
                  <span className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">&#8599;</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mono mt-7 flex items-center gap-2 text-[12px] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
            Available for AI build work and full-time roles &middot; Bucharest &middot; remote across the EU
          </div>
        </Reveal>
      </div>
    </section>
  )
}
