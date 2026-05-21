import { SectionHead, Reveal } from './ui'

const CAPABILITIES = [
  ['Autonomous agents', 'Bounded ReAct loops that enrich, decide, and act, with logging on every step.'],
  ['RAG systems', 'Retrieval pipelines with confidence gates that know when to answer and when to escalate.'],
  ['Automation pipelines', 'n8n and code workflows that move work between tools without a human in the loop.'],
  ['Lead enrichment & scoring', 'Inbound qualified, scored against an ICP, and routed automatically.'],
  ['Support automation', 'Tickets classified, answered from your docs, and gated for safe auto-send.'],
  ['Self-hosted infra', 'Agent stacks that run on your own hardware, not a black-box platform.'],
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="03"
          kicker="Work with me"
          title={<>Two ways to put this to use.</>}
          lead="I am taking on AI build work and looking for the right full-time team. Both are open right now."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-xl border border-line bg-panel p-6">
              <div className="mono text-xs uppercase tracking-[0.16em] text-signal">For companies</div>
              <h3 className="mt-3 text-mid">AI automation, built and shipped</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                Fixed-scope builds or ongoing work. You bring a process that eats time or leaks
                quality. I bring the agent, the pipeline, and the judgement about where automation
                helps and where it does not. You get a running system and the code behind it.
              </p>
              <a
                href="#contact"
                className="mono mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-signal px-4 py-2 text-[13px] font-medium text-base transition-transform hover:-translate-y-0.5"
              >
                Start a project →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="flex h-full flex-col rounded-xl border border-line bg-panel p-6">
              <div className="mono text-xs uppercase tracking-[0.16em] text-warm">For startups hiring</div>
              <h3 className="mt-3 text-mid">A builder who ships from day one</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                Open to full-time, remote across the EU: AI Automation Engineer, Solutions or
                Forward-Deployed Engineer, Founding Engineer. Five years shipping at studio scale,
                a founder track record, and a portfolio of agents already in production.
              </p>
              <div className="mono mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-faint">
                <span><span className="text-signal">·</span> Remote, EU timezones</span>
                <span><span className="text-signal">·</span> Available now</span>
                <span><span className="text-signal">·</span> ~4 weeks notice</span>
              </div>
              <a
                href="#contact"
                className="mono mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[13px] text-ink transition-colors hover:border-ink-faint hover:bg-panel-2"
              >
                Get in touch →
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-4 rounded-xl border border-line bg-panel p-6">
            <div className="mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              What I actually build
            </div>
            <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map(([t, d]) => (
                <div key={t} className="border-l border-line-strong pl-3">
                  <div className="text-[13.5px] font-medium text-ink">{t}</div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-ink-faint">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
