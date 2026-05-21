// Sample leads for the live agent demo. Enrichment and per-criterion
// judgement are captured from real runs of the icp-agent against these
// domains; aggregation and routing run live via src/lib/icp.ts.

export interface ToolResult {
  tool: string
  lines: string[]
}
export interface AssessStep {
  action: 'score_now' | 'fetch_linkedin' | 'fetch_news' | 'fetch_email_finder'
  note: string
}
export interface CriterionResult {
  id: string
  score: number
  evidence: string
}
export interface Sample {
  id: string
  company: string
  domain: string
  email: string
  blurb: string
  enrichment: ToolResult[]
  assess: AssessStep[]
  criteria: CriterionResult[]
  email_draft: { subject: string; body: string } | null
}

export const SAMPLES: Sample[] = [
  {
    id: 'linear',
    company: 'Linear',
    domain: 'linear.app',
    email: 'founders@linear.app',
    blurb: 'Rich data. Clean fast path.',
    enrichment: [
      {
        tool: 'scrape(linear.app)',
        lines: [
          'description: issue tracking and project planning for software teams',
          'tech_signals: Next.js, Vercel, TypeScript, Stripe',
          'blog: changelog updated 4 days ago',
          'hiring: 6 open roles',
        ],
      },
      {
        tool: 'hunter.domainSearch',
        lines: [
          'size: 51-200',
          'industry: Computer Software',
          'country: United States',
          'emails: karri@linear.app (CEO), nan@linear.app (Head of Design)',
        ],
      },
    ],
    assess: [
      { action: 'score_now', note: 'All six signals present after first-pass enrichment. No deepen round needed.' },
    ],
    criteria: [
      { id: 'company_size', score: 2.3, evidence: 'Hunter size 51-200. Core SMB band.' },
      { id: 'industry_fit', score: 2.0, evidence: 'Dev-tools SaaS. Primary target segment.' },
      { id: 'geography', score: 1.0, evidence: 'US-headquartered, English-first.' },
      { id: 'tech_stack_modernity', score: 1.5, evidence: 'Next.js, Vercel, Stripe. Product-thinking team.' },
      { id: 'growth_signals', score: 1.4, evidence: 'Changelog 4 days old, 6 open roles.' },
      { id: 'buyer_reachability', score: 1.3, evidence: 'Two verified decision-maker emails found.' },
    ],
    email_draft: {
      subject: 'the 4-day changelog gap',
      body: 'Hi Karri,\n\nLinear shipped twice this week with six roles open. Teams moving that fast usually have one bottleneck the changelog never shows: the work that never gets logged, because logging it is friction.\n\nThat is the gap I build agents to close. Genuine question, not a pitch: where does work most often fall out of Linear for your team today?\n\nTeodor',
    },
  },
  {
    id: 'vercel',
    company: 'Vercel',
    domain: 'vercel.com',
    email: 'andrei@vercel.com',
    blurb: 'Strong fit, wrong size.',
    enrichment: [
      {
        tool: 'scrape(vercel.com)',
        lines: [
          'description: the frontend cloud. build and deploy on the web',
          'tech_signals: Next.js, Turbopack, Edge Functions, Stripe',
          'blog: ships multiple times per week',
          'hiring: 40+ open roles',
        ],
      },
      {
        tool: 'hunter.domainSearch',
        lines: [
          'size: 501-1000',
          'industry: Internet',
          'country: United States',
          'emails: press@vercel.com, careers@vercel.com',
        ],
      },
    ],
    assess: [
      { action: 'score_now', note: 'Enrichment complete on first pass. Size flag carried into scoring.' },
    ],
    criteria: [
      { id: 'company_size', score: 0.6, evidence: 'Size 501-1000. Above the 200 ceiling: multi-stakeholder procurement.' },
      { id: 'industry_fit', score: 2.0, evidence: 'Developer infrastructure. Strong segment fit.' },
      { id: 'geography', score: 1.0, evidence: 'US, English-first.' },
      { id: 'tech_stack_modernity', score: 1.5, evidence: 'Owns a modern stack end to end.' },
      { id: 'growth_signals', score: 1.5, evidence: 'Weekly shipping cadence, 40+ open roles.' },
      { id: 'buyer_reachability', score: 0.9, evidence: 'Only generic inboxes found. No direct decision-maker.' },
    ],
    email_draft: {
      subject: 'a question about inbound triage',
      body: 'Hi there,\n\nPlatform teams at Vercel’s scale almost always get more qualified inbound than any human can triage well. The cost is not lost leads, it is slow first-touch on the good ones.\n\nI build routing agents that score and prioritise inbound automatically. If first-touch speed is on the roadmap this quarter, I am happy to walk through how it works.\n\nTeodor',
    },
  },
  {
    id: 'northwind',
    company: 'Northwind Supplies',
    domain: 'northwind-supplies.co',
    email: 'info@northwind-supplies.co',
    blurb: 'Sparse data. Forces the deepen loop.',
    enrichment: [
      {
        tool: 'scrape(northwind-supplies.co)',
        lines: [
          'description: industrial parts and fasteners distributor',
          'tech_signals: WordPress, jQuery',
          'blog: last post 2022',
          'hiring: none detected',
        ],
      },
      {
        tool: 'hunter.domainSearch',
        lines: [
          'size: unknown',
          'industry: Wholesale',
          'country: unknown',
          'emails: info@northwind-supplies.co',
        ],
      },
    ],
    assess: [
      { action: 'fetch_linkedin', note: 'First-pass enrichment is sparse. Pulling LinkedIn to confirm size and industry.' },
      { action: 'fetch_news', note: 'LinkedIn page minimal. Checking for recent news or funding signals.' },
      { action: 'score_now', note: 'Two deepen rounds used, no new positive signal. Scoring on what we have.' },
    ],
    criteria: [
      { id: 'company_size', score: 0.5, evidence: 'No reliable employee count after deepen.' },
      { id: 'industry_fit', score: 0.3, evidence: 'Brick-and-mortar wholesale. Anti-segment.' },
      { id: 'geography', score: 0.5, evidence: 'Country could not be confirmed.' },
      { id: 'tech_stack_modernity', score: 0.2, evidence: 'WordPress and jQuery only. No modern framework.' },
      { id: 'growth_signals', score: 0.1, evidence: 'Blog stale since 2022. No hiring, no news.' },
      { id: 'buyer_reachability', score: 0.2, evidence: 'Only a generic info@ inbox.' },
    ],
    email_draft: null,
  },
]
