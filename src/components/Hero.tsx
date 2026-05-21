import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(91,232,164,0.13), transparent 70%)' }}
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.18em] text-ink-faint"
          >
            <span className="text-signal">AI AUTOMATION ENGINEER</span>
            <span className="text-line-strong">/</span>
            <span>BUCHAREST</span>
            <span className="text-line-strong">/</span>
            <span>REMOTE, EU</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-mega font-semibold text-balance"
          >
            I build AI agents that{' '}
            <span className="text-signal">decide, act,</span> and ship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-ink-dim"
          >
            Autonomous agents, RAG pipelines, and production automation. Not slideware,
            running systems. One of mine is live on this page, scroll down and hand it a lead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#demo"
              className="group flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-medium text-base transition-transform hover:-translate-y-0.5"
            >
              Run the live agent
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#services"
              className="rounded-full border border-line-strong px-5 py-3 text-sm text-ink transition-colors hover:border-ink-faint hover:bg-panel"
            >
              Work with me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6"
          >
            {[
              ['6+', 'AI systems shipped'],
              ['2', 'live products, paying users'],
              ['5 yrs', 'shipping at studio scale'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl text-ink">{n}</div>
                <div className="mono text-xs text-ink-faint">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="rounded-xl border border-line bg-panel/80 p-1.5 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            </div>
            <span className="mono text-[11px] text-ink-faint">icp-agent · idle</span>
          </div>
          <div className="mono space-y-1.5 p-4 text-[12.5px] leading-relaxed">
            <div className="text-ink-faint">$ POST /api/webhook/inbound</div>
            <div className="text-ink-dim">{'{'}</div>
            <div className="text-ink-dim">
              {'  '}"email": <span className="text-signal">"founders@linear.app"</span>,
            </div>
            <div className="text-ink-dim">
              {'  '}"domain": <span className="text-signal">"linear.app"</span>
            </div>
            <div className="text-ink-dim">{'}'}</div>
            <div className="pt-2 text-ink-faint">
              {'>'} waiting for input
              <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-signal animate-blink" />
            </div>
            <div className="pt-1 text-[11px] text-ink-faint">
              the panel below is the real thing
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
