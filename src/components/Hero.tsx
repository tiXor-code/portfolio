import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const sh = { textShadow: '0 2px 50px rgba(0,0,0,0.55)' }

export default function Hero() {
  return (
    <section id="top" className="relative z-10 flex min-h-screen flex-col">
      <div className="shell flex flex-1 flex-col justify-center pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mono text-[12px] uppercase tracking-[0.34em] text-accent"
        >
          AI automation engineer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="display mt-7 text-mega font-semibold text-balance"
          style={sh}
        >
          I build AI agents that act on their own.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease }}
          className="mt-8 max-w-xl text-[1.12rem] leading-relaxed text-ink"
          style={sh}
        >
          Autonomous systems, retrieval pipelines, and production automation. Not slideware,
          running software. One of my agents is live further down this page. Hand it a lead
          and watch it work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.36, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#demo" className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-base transition-transform hover:-translate-y-0.5">
            Run the live agent
            <span className="transition-transform group-hover:translate-y-0.5">&darr;</span>
          </a>
          <a href="#work" className="rounded-full border border-line-2 px-6 py-3 text-sm text-ink backdrop-blur-sm transition-colors hover:border-ink-faint">
            Selected work
          </a>
          <a
            href={import.meta.env.BASE_URL + 'cv/teodor-lutoiu-cv.pdf'}
            target="_blank" rel="noreferrer"
            className="mono text-[12px] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-ink"
          >
            Download CV (PDF) &#8599;
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="shell flex flex-wrap justify-between gap-6 border-t border-line py-6 mono text-[12px] uppercase tracking-[0.12em] text-ink-dim"
      >
        <span>Bucharest &middot; remote, EU</span>
        <span>09 systems shipped &middot; 02 products</span>
        <span>Available &middot; ~4 weeks notice</span>
      </motion.div>
    </section>
  )
}
