import { useState } from 'react'
import { SectionHead, Reveal } from './ui'
import AgentReplay from './AgentReplay'
import ChatAsTeodor from './ChatAsTeodor'

type Tab = 'chat' | 'replay'

export default function AgentDemo() {
  const [tab, setTab] = useState<Tab>('chat')
  return (
    <section id="demo" className="relative z-10 scroll-mt-20 bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="01" kicker="Live agent"
          title={<>Ask me anything, or watch an agent think.</>}
          lead="Two live things in one place. The chat answers as me, based only on public facts. Or switch to icp-agent and watch a real lead-scoring pipeline play out step by step."
        />
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-line bg-panel/90 backdrop-blur-sm">
            <div role="tablist" className="flex border-b border-line bg-panel-2/80">
              {([['chat', 'Ask me anything'], ['replay', 'Watch an agent run']] as [Tab, string][]).map(([id, label]) => (
                <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
                  className={'mono px-5 py-3 text-[11px] uppercase tracking-[0.14em] transition-colors ' +
                    (tab === id ? 'text-accent border-b-2 border-accent' : 'text-ink-faint hover:text-ink')}>
                  {label}
                </button>
              ))}
            </div>
            {tab === 'chat' ? <ChatAsTeodor /> : <AgentReplay />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
