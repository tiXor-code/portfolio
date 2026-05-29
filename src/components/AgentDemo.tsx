import { SectionHead, Reveal } from './ui'
import AgentReplay from './AgentReplay'

export default function AgentDemo() {
  return (
    <section id="demo" className="relative z-10 scroll-mt-20 bg-base py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="01" kicker="Live agent"
          title={<>Hand the agent a lead. Watch it think.</>}
          lead="This is icp-agent, one of my projects, running in your browser. Pick a company and it enriches the lead, decides whether to dig deeper, scores it, routes it, and drafts the outreach. The scoring and routing are the real code from the repo."
        />

        <Reveal delay={0.1} className="mt-12">
          <AgentReplay />
        </Reveal>
      </div>
    </section>
  )
}
