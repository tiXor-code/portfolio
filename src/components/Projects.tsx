import { PROJECTS, type Project } from '../data/projects'
import { SectionHead, Reveal } from './ui'

const ACCENT: Record<Project['accent'], string> = {
  signal: 'bg-signal',
  warm: 'bg-warm',
  cold: 'bg-cold',
}

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="02"
          kicker="Selected work"
          title={<>Systems that run, not screenshots.</>}
          lead="A mix of autonomous agents, a RAG pipeline, two live products, and the infrastructure underneath them. Everything here has shipped or is in production."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.07}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel p-5 transition-colors hover:border-line-strong">
                <span className={'absolute inset-x-0 top-0 h-px ' + ACCENT[p.accent]} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="mono text-[15px] font-semibold text-ink">{p.name}</h3>
                    <div className="mt-0.5 text-[12.5px] text-ink-faint">{p.kind}</div>
                  </div>
                  {p.isDemo && (
                    <a
                      href="#demo"
                      className="mono shrink-0 rounded-full border border-signal-dim bg-signal/10 px-2.5 py-1 text-[10px] uppercase tracking-wide text-signal"
                    >
                      live above
                    </a>
                  )}
                </div>

                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-dim">{p.summary}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-faint">{p.detail}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="mono rounded border border-line bg-panel-2 px-1.5 py-0.5 text-[10.5px] text-ink-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mono text-[12px] text-ink-dim transition-colors hover:text-signal"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
