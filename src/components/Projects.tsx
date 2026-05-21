import { PROJECTS } from '../data/projects'
import { SectionHead, Reveal } from './ui'

export default function Projects() {
  return (
    <section id="work" className="relative z-10 scroll-mt-20 border-t border-line bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="02" kicker="Selected work"
          title={<>Systems that run, not screenshots.</>}
          lead="Autonomous agents, a retrieval pipeline, two live products, and the infrastructure underneath them. Everything here has shipped or is in production."
        />
        <div className="mt-12 border-t border-line">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.05}>
              <article className="group grid grid-cols-1 gap-3 border-b border-line py-7 transition-colors hover:bg-panel/60 md:grid-cols-[48px_1.1fr_1.5fr_auto] md:items-baseline md:gap-6 md:px-3">
                <div className="mono text-[12px] text-ink-faint">0{i + 1}</div>
                <div>
                  <h3 className="display text-2xl font-medium text-ink">
                    {p.name}
                    {p.isDemo && (
                      <a href="#demo" className="mono ml-3 align-super text-[10px] uppercase tracking-[0.1em] text-accent">live</a>
                    )}
                  </h3>
                  <div className="mt-1 text-[13px] text-ink-faint">{p.kind}</div>
                </div>
                <p className="text-[14px] leading-relaxed text-ink-dim">{p.summary}</p>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <div className="flex flex-wrap gap-1.5 md:justify-end">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="mono rounded border border-line px-1.5 py-0.5 text-[10.5px] text-ink-dim">{s}</span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                          className="mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint transition-colors hover:text-accent">
                          {l.label} &#8599;
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
