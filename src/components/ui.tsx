import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
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
      transition={{ duration: 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({
  index,
  kicker,
  title,
  lead,
}: {
  index: string
  kicker: string
  title: ReactNode
  lead?: string
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="mono text-xs tracking-[0.2em] text-ink-faint flex items-center gap-3">
          <span className="text-signal">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="uppercase">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-big mt-5 text-balance">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-ink-dim text-[1.05rem] leading-relaxed">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
