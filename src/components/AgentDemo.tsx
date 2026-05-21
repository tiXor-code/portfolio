import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SAMPLES, type Sample } from '../data/icpSamples'
import { ICP_CRITERIA, MAX_SCORE, bandFromScore, shouldSkipCold, totalScore } from '../lib/icp'
import { SectionHead, Reveal } from './ui'

type Ev =
  | { k: 'ingest' }
  | { k: 'enrich'; i: number }
  | { k: 'assess'; i: number }
  | { k: 'crit'; i: number }
  | { k: 'route' }
  | { k: 'email' }
  | { k: 'log' }

interface Stage { id: string; label: string; from: number; to: number }

function buildRun(s: Sample): { events: Ev[]; stages: Stage[] } {
  const events: Ev[] = []
  const raw: { id: string; label: string; from: number }[] = []
  const mark = (id: string, label: string) => raw.push({ id, label, from: events.length })

  mark('ingest', 'Ingest')
  events.push({ k: 'ingest' })
  mark('enrich', 'Enrich')
  s.enrichment.forEach((_, i) => events.push({ k: 'enrich', i }))
  mark('assess', 'Assess loop')
  s.assess.forEach((_, i) => events.push({ k: 'assess', i }))
  mark('score', 'Score against ICP')
  s.criteria.forEach((_, i) => events.push({ k: 'crit', i }))
  mark('route', 'Route')
  events.push({ k: 'route' })
  mark('email', s.email_draft ? 'Draft email' : 'Decision')
  events.push({ k: 'email' })
  mark('log', 'Log')
  events.push({ k: 'log' })

  const stages: Stage[] = raw.map((r, idx) => ({
    ...r,
    to: idx + 1 < raw.length ? raw[idx + 1].from : events.length,
  }))
  return { events, stages }
}

const DELAY: Record<Ev['k'], number> = {
  ingest: 560, enrich: 720, assess: 860, crit: 360, route: 640, email: 780, log: 480,
}

const BAND_STYLE = {
  hot: { text: 'text-signal', bg: 'bg-signal/12', border: 'border-signal-dim', dot: 'bg-signal' },
  warm: { text: 'text-warm', bg: 'bg-warm/12', border: 'border-warm/40', dot: 'bg-warm' },
  cold: { text: 'text-cold', bg: 'bg-cold/12', border: 'border-cold/40', dot: 'bg-cold' },
}

export default function AgentDemo() {
  const [sampleId, setSampleId] = useState(SAMPLES[0].id)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [cursor, setCursor] = useState(0)

  const sample = useMemo(() => SAMPLES.find((s) => s.id === sampleId)!, [sampleId])
  const { events, stages } = useMemo(() => buildRun(sample), [sample])

  useEffect(() => {
    if (phase !== 'running') return
    if (cursor >= events.length) {
      setPhase('done')
      return
    }
    const t = setTimeout(() => setCursor((c) => c + 1), DELAY[events[cursor].k])
    return () => clearTimeout(t)
  }, [phase, cursor, events])

  const run = () => { setCursor(0); setPhase('running') }
  const reset = () => { setCursor(0); setPhase('idle') }
  const pick = (id: string) => { if (phase === 'running') return; setSampleId(id); setCursor(0); setPhase('idle') }

  const shown = (evIndex: number) => cursor > evIndex || phase === 'done'
  const revealedCrit = sample.criteria.filter((_, i) => {
    const evi = events.findIndex((e) => e.k === 'crit' && e.i === i)
    return shown(evi)
  })
  const runningTotal = totalScore(revealedCrit.map((c) => c.score))
  const finalTotal = totalScore(sample.criteria.map((c) => c.score))
  const band = bandFromScore(finalTotal)
  const skipped = shouldSkipCold(finalTotal)
  const routeShown = shown(events.findIndex((e) => e.k === 'route'))
  const emailShown = shown(events.findIndex((e) => e.k === 'email'))
  const logShown = shown(events.findIndex((e) => e.k === 'log'))

  return (
    <section id="demo" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="01"
          kicker="Live agent"
          title={<>Hand the agent a lead. Watch it think.</>}
          lead="This is icp-agent, one of my projects, running in your browser. Pick a company and it will enrich the lead, decide whether to dig deeper, score it, route it, and draft the outreach. The scoring and routing are the real code from the repo."
        />

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            {/* console header */}
            <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-3">
              <div className="mono flex items-center gap-2 text-xs text-ink-faint">
                <span className={'h-2 w-2 rounded-full ' + (phase === 'running' ? 'bg-signal animate-blink' : phase === 'done' ? 'bg-signal' : 'bg-line-strong')} />
                icp-agent
                <span className="text-line-strong">·</span>
                {phase === 'idle' ? 'idle' : phase === 'running' ? 'processing' : 'done'}
              </div>
              <a href="https://github.com/tiXor-code/icp-agent" target="_blank" rel="noreferrer" className="mono text-xs text-ink-faint transition-colors hover:text-signal">
                source ↗
              </a>
            </div>

            <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
              {/* lead picker */}
              <div className="border-b border-line p-4 lg:border-b-0 lg:border-r">
                <div className="mono mb-3 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  Inbound lead
                </div>
                <div className="space-y-2">
                  {SAMPLES.map((s) => {
                    const active = s.id === sampleId
                    return (
                      <button
                        key={s.id}
                        onClick={() => pick(s.id)}
                        disabled={phase === 'running'}
                        className={
                          'w-full rounded-lg border p-3 text-left transition-colors ' +
                          (active
                            ? 'border-signal-dim bg-signal/8'
                            : 'border-line bg-panel-2 hover:border-line-strong') +
                          (phase === 'running' ? ' cursor-not-allowed opacity-60' : '')
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-ink">{s.company}</span>
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
                        </div>
                        <div className="mono mt-0.5 text-[11px] text-ink-faint">{s.domain}</div>
                        <div className="mt-1 text-[12px] text-ink-dim">{s.blurb}</div>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={phase === 'idle' ? run : reset}
                  className={
                    'mono mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 ' +
                    (phase === 'idle'
                      ? 'bg-signal text-base'
                      : 'border border-line-strong bg-panel-2 text-ink')
                  }
                >
                  {phase === 'idle' ? 'Run agent' : phase === 'running' ? 'Running...' : 'Reset'}
                </button>
                <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
                  Enrichment and model judgement are captured from real runs. Aggregation and
                  routing execute live.
                </p>
              </div>

              {/* pipeline */}
              <div className="min-h-[340px] p-5">
                {phase === 'idle' && (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                    <div className="mono text-sm text-ink-faint">
                      {'>'} agent idle
                      <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-signal animate-blink" />
                    </div>
                    <p className="mt-2 max-w-xs text-[13px] text-ink-dim">
                      Pick a lead and press Run agent. The pipeline plays out step by step.
                    </p>
                  </div>
                )}

                {phase !== 'idle' && (
                  <div className="space-y-1">
                    {stages.map((stage) => {
                      if (cursor < stage.from && phase !== 'done') return null
                      const active = phase === 'running' && cursor >= stage.from && cursor < stage.to
                      const done = cursor >= stage.to || phase === 'done'
                      return (
                        <div key={stage.id} className="relative pl-7">
                          <span className="absolute left-[7px] top-5 h-full w-px bg-line" />
                          <span
                            className={
                              'absolute left-0 top-[5px] flex h-3.5 w-3.5 items-center justify-center rounded-full border ' +
                              (done
                                ? 'border-signal bg-signal'
                                : active
                                ? 'border-signal bg-base'
                                : 'border-line-strong bg-base')
                            }
                          >
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />}
                          </span>
                          <div className="pb-5">
                            <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
                              <span className={done || active ? 'text-ink' : 'text-ink-faint'}>
                                {stage.label}
                              </span>
                              {active && (
                                <span className="relative h-3 w-12 overflow-hidden rounded-full bg-line">
                                  <span className="absolute inset-y-0 w-1/3 bg-signal/70 animate-sweep" />
                                </span>
                              )}
                            </div>
                            <div className="mt-2">{renderStage(stage, sample, events, shown)}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* result strip */}
            <AnimatePresence>
              {routeShown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-line bg-panel-2"
                >
                  <div className="grid gap-4 p-5 md:grid-cols-[auto_1fr] md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-display text-3xl text-ink">
                          {(phase === 'done' ? finalTotal : runningTotal).toFixed(1)}
                        </div>
                        <div className="mono text-[10px] text-ink-faint">of {MAX_SCORE}</div>
                      </div>
                      <div
                        className={
                          'rounded-lg border px-3 py-2 ' +
                          BAND_STYLE[band].bg + ' ' + BAND_STYLE[band].border
                        }
                      >
                        <div className="mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                          Routed
                        </div>
                        <div className={'text-sm font-semibold uppercase ' + BAND_STYLE[band].text}>
                          {band}
                        </div>
                      </div>
                    </div>
                    <div className="text-[13px] text-ink-dim">
                      {band === 'hot' && 'Score 8 or above. Goes to the Hot sequence: a personalised, founder-style opening email.'}
                      {band === 'warm' && 'Score between 4 and 8. Goes to the Warm sequence: a problem-led standard nurture.'}
                      {band === 'cold' && skipped && 'Score 2 or below. The agent skips the sequence entirely. No email is sent.'}
                      {band === 'cold' && !skipped && 'Score under 4. Cold sequence: a short, low-cost touch.'}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* email / decision */}
            <AnimatePresence>
              {emailShown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-line p-5"
                >
                  {sample.email_draft ? (
                    <div className="rounded-lg border border-line bg-base">
                      <div className="mono flex items-center justify-between border-b border-line px-4 py-2 text-[11px] text-ink-faint">
                        <span>drafted email</span>
                        <span className={BAND_STYLE[band].text}>{band} sequence</span>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-ink">
                          <span className="text-ink-faint">Subject: </span>
                          {sample.email_draft.subject}
                        </div>
                        <p className="mono mt-3 whitespace-pre-line text-[12.5px] leading-relaxed text-ink-dim">
                          {sample.email_draft.body}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-cold/40 bg-cold/8 p-4">
                      <div className="mono text-[11px] uppercase tracking-[0.14em] text-cold">
                        No email drafted
                      </div>
                      <p className="mt-2 text-[13px] text-ink-dim">
                        The agent decided not to send. At a score this low, outreach would burn
                        domain reputation for a near-zero-fit prospect. The lead is logged and
                        archived. Knowing when not to act is part of the job.
                      </p>
                    </div>
                  )}
                  {logShown && (
                    <div className="mono mt-3 text-[11px] text-ink-faint">
                      {'>'} decision chain written to log · status=done
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function renderStage(
  stage: Stage,
  sample: Sample,
  events: Ev[],
  shown: (i: number) => boolean,
) {
  const isShown = (pred: (e: Ev) => boolean) => {
    const idx = events.findIndex(pred)
    return idx >= 0 && shown(idx)
  }

  if (stage.id === 'ingest') {
    if (!isShown((e) => e.k === 'ingest')) return <Pending />
    return (
      <div className="mono text-[12px] text-ink-dim">
        webhook received · payload valid (Zod) · idempotency key fresh
      </div>
    )
  }

  if (stage.id === 'enrich') {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {sample.enrichment.map((t, i) => {
          if (!isShown((e) => e.k === 'enrich' && e.i === i)) return <Pending key={i} />
          return (
            <div key={i} className="rounded-lg border border-line bg-base p-3">
              <div className="mono text-[11px] text-signal">{t.tool}</div>
              <div className="mt-1.5 space-y-0.5">
                {t.lines.map((l, j) => (
                  <div key={j} className="mono text-[11px] leading-snug text-ink-dim">{l}</div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (stage.id === 'assess') {
    return (
      <div className="space-y-1.5">
        {sample.assess.map((a, i) => {
          if (!isShown((e) => e.k === 'assess' && e.i === i)) return <Pending key={i} />
          const isScore = a.action === 'score_now'
          return (
            <div key={i} className="rounded-lg border border-line bg-base px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={'mono text-[11px] ' + (isScore ? 'text-signal' : 'text-warm')}>
                  {a.action}
                </span>
                {!isScore && <span className="mono text-[10px] text-ink-faint">deepen round</span>}
              </div>
              <div className="mt-1 text-[12px] text-ink-dim">{a.note}</div>
            </div>
          )
        })}
      </div>
    )
  }

  if (stage.id === 'score') {
    return (
      <div className="space-y-1.5">
        {sample.criteria.map((c, i) => {
          if (!isShown((e) => e.k === 'crit' && e.i === i)) return <Pending key={i} />
          const meta = ICP_CRITERIA.find((m) => m.id === c.id)!
          const pct = Math.round((c.score / meta.weight) * 100)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-lg border border-line bg-base px-3 py-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] text-ink">{meta.name}</span>
                <span className="mono text-[11px] text-ink-dim">
                  {c.score.toFixed(1)}<span className="text-ink-faint">/{meta.weight.toFixed(1)}</span>
                </span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: pct + '%' }}
                  transition={{ duration: 0.5 }}
                  className={'h-full rounded-full ' + (pct >= 60 ? 'bg-signal' : pct >= 30 ? 'bg-warm' : 'bg-cold')}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-ink-faint">{c.evidence}</div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  if (stage.id === 'route') {
    if (!isShown((e) => e.k === 'route')) return <Pending />
    return <div className="mono text-[12px] text-ink-dim">band computed · sequence selected</div>
  }

  if (stage.id === 'email') {
    if (!isShown((e) => e.k === 'email')) return <Pending />
    return (
      <div className="mono text-[12px] text-ink-dim">
        {sample.email_draft ? 'opening email generated' : 'sequence skipped, no email'}
      </div>
    )
  }

  if (stage.id === 'log') {
    if (!isShown((e) => e.k === 'log')) return <Pending />
    return <div className="mono text-[12px] text-ink-dim">decision chain persisted</div>
  }

  return null
}

function Pending() {
  return <div className="mono text-[11px] text-ink-faint">working...</div>
}
