import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function Reveal({
  children, delay = 0, y = 24, className = '',
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const show = reduce || inView
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({
  index, kicker, title, lead,
}: { index: string; kicker: string; title: ReactNode; lead?: string }) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-faint">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line-2" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <h2 className="display mt-6 text-big text-balance">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.13}>
          <p className="mt-5 text-[1.06rem] leading-relaxed text-ink-dim">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
