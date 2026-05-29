import { SectionHead, Reveal } from './ui'

const CAPS = [
  ['Autonomous agents', 'Bounded ReAct loops that enrich, decide, and act, with logging on every step.'],
  ['RAG systems', 'Retrieval pipelines with confidence gates that know when to answer and when to escalate.'],
  ['Automation pipelines', 'n8n and code workflows that move work between tools without a human in the loop.'],
  ['Lead enrichment & scoring', 'Inbound qualified, scored against an ICP, and routed automatically.'],
  ['Support automation', 'Tickets classified, answered from your docs, and gated for safe auto-send.'],
  ['Self-hosted infra', 'Agent stacks that run on your own hardware, not a black-box platform.'],
]

export default function Services() {
  return (
    <section id="services" className="relative z-10 scroll-mt-20 border-t border-line bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="03" kicker="Work with me"
          title={<>Two ways to put this to use.</>}
          lead="I am taking on AI build work and looking for the right full-time team. Both are open right now."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-7">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-accent">For companies</div>
              <h3 className="display mt-4 text-mid">AI automation, built and shipped</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                Fixed-scope builds or ongoing work. You bring a process that eats time or leaks quality.
                I bring the agent, the pipeline, and the judgement about where automation helps and where
                it does not. You get a running system and the code behind it.
              </p>
              <a href="#contact" className="mono mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-base transition-transform hover:-translate-y-0.5">
                Start a project &rarr;
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-7">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-warm">For startups hiring</div>
              <h3 className="display mt-4 text-mid">A builder who ships from day one</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                Open to full-time, remote across the EU: AI Automation Engineer, Solutions or
                Forward-Deployed Engineer, Founding Engineer. Five years shipping at studio scale,
                a founder track record, and a portfolio of agents already in production.
              </p>
              <div className="mono mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-faint">
                <span><span className="text-accent">&middot;</span> Remote, EU timezones</span>
                <span><span className="text-accent">&middot;</span> Available now</span>
                <span><span className="text-accent">&middot;</span> ~4 weeks notice</span>
              </div>
              <a href="#contact" className="mono mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink-faint">
                Get in touch &rarr;
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <div className="mt-4 rounded-2xl border border-line bg-panel p-7">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">What I actually build</div>
            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAPS.map(([t, d]) => (
                <div key={t} className="border-l border-line-2 pl-3.5">
                  <div className="display text-[14px] font-medium text-ink">{t}</div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-ink-faint">{d}</div>
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-line pt-5">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">Stack</div>
              <dl className="mt-3 space-y-2 text-[12.5px] leading-relaxed">
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Languages</dt>
                  <dd className="text-ink-dim">Python · TypeScript · JavaScript · SQL · Node.js</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">AI / LLM</dt>
                  <dd className="text-ink-dim">Azure OpenAI · Claude API · RAG · embeddings · pgvector · agentic workflows · prompt engineering · eval design · MCP</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Frameworks</dt>
                  <dd className="text-ink-dim">Next.js · React · Hono · Flask · FastAPI · n8n</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Infra</dt>
                  <dd className="text-ink-dim">Vercel · Azure App Services · GitHub Actions (OIDC) · Docker · Cloudflare · Postgres · Supabase</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
