import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SAMPLES, type Sample } from '../data/icpSamples'
import { ICP_CRITERIA, MAX_SCORE, bandFromScore, shouldSkipCold, totalScore } from '../lib/icp'


type Ev =
  | { k: 'ingest' } | { k: 'enrich'; i: number } | { k: 'assess'; i: number }
  | { k: 'crit'; i: number } | { k: 'route' } | { k: 'email' } | { k: 'log' }
interface Stage { id: string; label: string; from: number; to: number }

function buildRun(s: Sample): { events: Ev[]; stages: Stage[] } {
  const events: Ev[] = []
  const raw: { id: string; label: string; from: number }[] = []
  const mark = (id: string, label: string) => raw.push({ id, label, from: events.length })
  mark('ingest', 'Ingest'); events.push({ k: 'ingest' })
  mark('enrich', 'Enrich'); s.enrichment.forEach((_, i) => events.push({ k: 'enrich', i }))
  mark('assess', 'Assess loop'); s.assess.forEach((_, i) => events.push({ k: 'assess', i }))
  mark('score', 'Score against ICP'); s.criteria.forEach((_, i) => events.push({ k: 'crit', i }))
  mark('route', 'Route'); events.push({ k: 'route' })
  mark('email', s.email_draft ? 'Draft email' : 'Decision'); events.push({ k: 'email' })
  mark('log', 'Log'); events.push({ k: 'log' })
  const stages: Stage[] = raw.map((r, idx) => ({ ...r, to: idx + 1 < raw.length ? raw[idx + 1].from : events.length }))
  return { events, stages }
}

const DELAY: Record<Ev['k'], number> = { ingest: 560, enrich: 720, assess: 860, crit: 360, route: 640, email: 780, log: 480 }
const BAND = {
  hot: { t: 'text-hot', b: 'border-hot/40', bg: 'bg-hot/10' },
  warm: { t: 'text-warm', b: 'border-warm/40', bg: 'bg-warm/10' },
  cold: { t: 'text-cold', b: 'border-cold/40', bg: 'bg-cold/10' },
}

export default function AgentReplay() {
  const [sampleId, setSampleId] = useState(SAMPLES[0].id)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [cursor, setCursor] = useState(0)
  const sample = useMemo(() => SAMPLES.find((s) => s.id === sampleId)!, [sampleId])
  const { events, stages } = useMemo(() => buildRun(sample), [sample])

  useEffect(() => {
    if (phase !== 'running') return
    if (cursor >= events.length) { setPhase('done'); return }
    const t = setTimeout(() => setCursor((c) => c + 1), DELAY[events[cursor].k])
    return () => clearTimeout(t)
  }, [phase, cursor, events])

  const run = () => { setCursor(0); setPhase('running') }
  const reset = () => { setCursor(0); setPhase('idle') }
  const pick = (id: string) => { if (phase === 'running') return; setSampleId(id); setCursor(0); setPhase('idle') }
  const shown = (i: number) => cursor > i || phase === 'done'

  const finalTotal = totalScore(sample.criteria.map((c) => c.score))
  const revealed = sample.criteria.filter((_, i) => shown(events.findIndex((e) => e.k === 'crit' && e.i === i)))
  const runningTotal = totalScore(revealed.map((c) => c.score))
  const band = bandFromScore(finalTotal)
  const skipped = shouldSkipCold(finalTotal)
  const routeShown = shown(events.findIndex((e) => e.k === 'route'))
  const emailShown = shown(events.findIndex((e) => e.k === 'email'))
  const logShown = shown(events.findIndex((e) => e.k === 'log'))

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel/90 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line bg-panel-2/80 px-5 py-3">
        <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <span className={'h-1.5 w-1.5 rounded-full ' + (phase === 'running' ? 'bg-accent animate-blink' : phase === 'done' ? 'bg-accent' : 'bg-line-2')} />
          icp-agent <span className="text-line-2">/</span>
          {phase === 'idle' ? 'idle' : phase === 'running' ? 'processing' : 'complete'}
        </div>
        <a href="https://github.com/tiXor-code/icp-agent" target="_blank" rel="noreferrer"
          className="mono text-[11px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-accent">
          source &#8599;
        </a>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
          <div className="mono mb-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">Inbound lead</div>
          <div className="space-y-2">
            {SAMPLES.map((s) => {
              const active = s.id === sampleId
              return (
                <button key={s.id} onClick={() => pick(s.id)} disabled={phase === 'running'}
                  className={'w-full rounded-xl border p-3.5 text-left transition-colors ' +
                    (active ? 'border-accent/50 bg-accent/8' : 'border-line bg-panel-2 hover:border-line-2') +
                    (phase === 'running' ? ' cursor-not-allowed opacity-60' : '')}>
                  <div className="flex items-center justify-between">
                    <span className="display text-sm font-medium text-ink">{s.company}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </div>
                  <div className="mono mt-0.5 text-[11px] text-ink-faint">{s.domain}</div>
                  <div className="mt-1.5 text-[12px] text-ink-dim">{s.blurb}</div>
                </button>
              )
            })}
          </div>
          <button onClick={phase === 'idle' ? run : reset}
            className={'mono mt-4 w-full rounded-xl px-4 py-3 text-[13px] font-medium uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 ' +
              (phase === 'idle' ? 'bg-accent text-base' : 'border border-line-2 bg-panel-2 text-ink')}>
            {phase === 'idle' ? 'Run agent' : phase === 'running' ? 'Running...' : 'Reset'}
          </button>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
            Enrichment and model judgement are captured from real runs. Aggregation and routing execute live.
          </p>
        </div>

        <div className="min-h-[360px] p-6">
          {phase === 'idle' && (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <div className="mono text-sm text-ink-faint">
                &gt; agent idle
                <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-accent animate-blink" />
              </div>
              <p className="mt-2 max-w-xs text-[13px] text-ink-dim">Pick a lead and press Run agent. The pipeline plays out step by step.</p>
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
                    <span className={'absolute left-0 top-[5px] flex h-3.5 w-3.5 items-center justify-center rounded-full border ' +
                      (done ? 'border-accent bg-accent' : 'border-line-2 bg-base')}>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />}
                    </span>
                    <div className="pb-6">
                      <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                        <span className={done || active ? 'text-ink' : 'text-ink-faint'}>{stage.label}</span>
                        {active && (
                          <span className="relative h-3 w-12 overflow-hidden rounded-full bg-line">
                            <span className="absolute inset-y-0 w-1/3 bg-accent/70 animate-sweep" />
                          </span>
                        )}
                      </div>
                      <div className="mt-2.5">{renderStage(stage, sample, events, shown)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {routeShown && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-line bg-panel-2/80">
            <div className="grid gap-5 p-6 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <div className="display text-4xl text-ink">{(phase === 'done' ? finalTotal : runningTotal).toFixed(1)}</div>
                  <div className="mono text-[10px] text-ink-faint">of {MAX_SCORE}</div>
                </div>
                <div className={'rounded-xl border px-4 py-2.5 ' + BAND[band].bg + ' ' + BAND[band].b}>
                  <div className="mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Routed</div>
                  <div className={'display text-base font-semibold uppercase ' + BAND[band].t}>{band}</div>
                </div>
              </div>
              <div className="text-[13px] leading-relaxed text-ink-dim">
                {band === 'hot' && 'Score 8 or above. Hot sequence: a personalised, founder-style opening email.'}
                {band === 'warm' && 'Score between 4 and 8. Warm sequence: a problem-led standard nurture.'}
                {band === 'cold' && skipped && 'Score 2 or below. The agent skips the sequence entirely. No email is sent.'}
                {band === 'cold' && !skipped && 'Score under 4. Cold sequence: a short, low-cost touch.'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {emailShown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-line p-6">
            {sample.email_draft ? (
              <div className="rounded-xl border border-line bg-base">
                <div className="mono flex items-center justify-between border-b border-line px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  <span>drafted email</span><span className={BAND[band].t}>{band} sequence</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-ink"><span className="text-ink-faint">Subject: </span>{sample.email_draft.subject}</div>
                  <p className="mono mt-3 whitespace-pre-line text-[12.5px] leading-relaxed text-ink-dim">{sample.email_draft.body}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-cold/40 bg-cold/8 p-5">
                <div className="mono text-[11px] uppercase tracking-[0.14em] text-cold">No email drafted</div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
                  The agent decided not to send. At a score this low, outreach would burn domain reputation
                  for a near-zero-fit prospect. The lead is logged and archived. Knowing when not to act
                  is part of the job.
                </p>
              </div>
            )}
            {logShown && <div className="mono mt-3 text-[11px] text-ink-faint">&gt; decision chain written to log &middot; status=done</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function renderStage(stage: Stage, sample: Sample, events: Ev[], shown: (i: number) => boolean) {
  const is = (pred: (e: Ev) => boolean) => { const i = events.findIndex(pred); return i >= 0 && shown(i) }

  if (stage.id === 'ingest')
    return is((e) => e.k === 'ingest')
      ? <div className="mono text-[12px] text-ink-dim">webhook received &middot; payload valid (Zod) &middot; idempotency key fresh</div>
      : <Pending />

  if (stage.id === 'enrich')
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {sample.enrichment.map((t, i) =>
          is((e) => e.k === 'enrich' && e.i === i) ? (
            <div key={i} className="rounded-xl border border-line bg-base p-3.5">
              <div className="mono text-[11px] text-accent">{t.tool}</div>
              <div className="mt-2 space-y-0.5">
                {t.lines.map((l, j) => <div key={j} className="mono text-[11px] leading-snug text-ink-dim">{l}</div>)}
              </div>
            </div>
          ) : <Pending key={i} />,
        )}
      </div>
    )

  if (stage.id === 'assess')
    return (
      <div className="space-y-1.5">
        {sample.assess.map((a, i) => {
          if (!is((e) => e.k === 'assess' && e.i === i)) return <Pending key={i} />
          const isScore = a.action === 'score_now'
          return (
            <div key={i} className="rounded-xl border border-line bg-base px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span className={'mono text-[11px] ' + (isScore ? 'text-hot' : 'text-warm')}>{a.action}</span>
                {!isScore && <span className="mono text-[10px] uppercase tracking-wide text-ink-faint">deepen round</span>}
              </div>
              <div className="mt-1 text-[12px] text-ink-dim">{a.note}</div>
            </div>
          )
        })}
      </div>
    )

  if (stage.id === 'score')
    return (
      <div className="space-y-1.5">
        {sample.criteria.map((c, i) => {
          if (!is((e) => e.k === 'crit' && e.i === i)) return <Pending key={i} />
          const meta = ICP_CRITERIA.find((m) => m.id === c.id)!
          const pct = Math.round((c.score / meta.weight) * 100)
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-line bg-base px-3.5 py-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] text-ink">{meta.name}</span>
                <span className="mono text-[11px] text-ink-dim">{c.score.toFixed(1)}<span className="text-ink-faint">/{meta.weight.toFixed(1)}</span></span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                <motion.div initial={{ width: 0 }} animate={{ width: pct + '%' }} transition={{ duration: 0.5 }}
                  className={'h-full rounded-full ' + (pct >= 60 ? 'bg-hot' : pct >= 30 ? 'bg-warm' : 'bg-cold')} />
              </div>
              <div className="mt-1.5 text-[11px] text-ink-faint">{c.evidence}</div>
            </motion.div>
          )
        })}
      </div>
    )

  if (stage.id === 'route')
    return is((e) => e.k === 'route')
      ? <div className="mono text-[12px] text-ink-dim">band computed &middot; sequence selected</div> : <Pending />

  if (stage.id === 'email')
    return is((e) => e.k === 'email')
      ? <div className="mono text-[12px] text-ink-dim">{sample.email_draft ? 'opening email generated' : 'sequence skipped, no email'}</div>
      : <Pending />

  if (stage.id === 'log')
    return is((e) => e.k === 'log')
      ? <div className="mono text-[12px] text-ink-dim">decision chain persisted</div> : <Pending />

  return null
}

function Pending() {
  return <div className="mono text-[11px] text-ink-faint">working...</div>
}
