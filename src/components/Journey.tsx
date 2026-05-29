import { JOURNEY } from '../data/journey'
import { SectionHead, Reveal } from './ui'

export default function Journey() {
  return (
    <section id="path" className="relative z-10 scroll-mt-20 border-t border-line bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="04" kicker="The path here"
          title={<>Games taught me how to ship. AI is what I ship now.</>}
          lead="Five years from a games degree to producing at EA, then founding a studio and going full-time on AI. The shipping discipline is what the agents and pipelines run on."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(320px,_400px)]">
          <div>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.org} delay={i * 0.05}>
                <div className="grid grid-cols-[auto_1fr] gap-5 pb-7 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className={'mt-1.5 h-2.5 w-2.5 rounded-full ' + (i === JOURNEY.length - 1 ? 'bg-accent' : 'bg-line-2')} />
                    {i < JOURNEY.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                  </div>
                  <div className="-mt-0.5">
                    <div className="mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{j.period}</div>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5">
                      <span className="display text-[1.15rem] font-medium text-ink">{j.org}</span>
                      <span className="text-[13px] text-ink-dim">{j.role}</span>
                    </div>
                    <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-ink-faint">{j.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="lg:h-full">
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
              <img
                src={import.meta.env.BASE_URL + 'images/journey/brussels-street.jpg'}
                alt="Teodor in Brussels during the Play For Democracy project"
                loading="lazy"
                className="h-72 w-full flex-1 object-cover lg:h-auto"
              />
              <figcaption className="border-t border-line px-4 py-3 text-[12px] text-ink-faint">
                Brussels, 2024. The Play For Democracy work, on its way to the European Parliament.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
