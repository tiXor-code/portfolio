import { SectionHead, Reveal } from './ui'

const CHANNELS = [
  { label: 'Email', value: 'contact@teodorlutoiu.com', href: 'mailto:contact@teodorlutoiu.com' },
  { label: 'LinkedIn', value: 'in/teodorlc', href: 'https://www.linkedin.com/in/teodorlc' },
  { label: 'GitHub', value: 'tiXor-code', href: 'https://github.com/tiXor-code' },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="05"
          kicker="Contact"
          title={<>Have a process worth automating, or a team worth joining?</>}
          lead="Tell me what you are building. I usually reply within a day."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-xl border border-line bg-panel p-5 transition-colors hover:border-signal-dim hover:bg-panel-2"
              >
                <div className="mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                  {c.label}
                </div>
                <div className="mt-6 flex items-center justify-between gap-2">
                  <span className="mono text-[13.5px] text-ink group-hover:text-signal">
                    {c.value}
                  </span>
                  <span className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-signal">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mono mt-6 flex items-center gap-2 text-[12px] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            Available for AI build work and full-time roles · Bucharest · remote across the EU
          </div>
        </Reveal>
      </div>
    </section>
  )
}
