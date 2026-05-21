// Faithful port of the scoring + routing logic from the icp-agent repo
// (src/agent/icp.ts). The browser demo runs this exact code.

export interface IcpCriterion {
  id: string
  name: string
  weight: number
}

export const ICP_CRITERIA: readonly IcpCriterion[] = [
  { id: 'company_size', name: 'Company size (10-200 employees)', weight: 2.5 },
  { id: 'industry_fit', name: 'Industry fit', weight: 2.0 },
  { id: 'geography', name: 'Geography (English-speaking)', weight: 1.0 },
  { id: 'tech_stack_modernity', name: 'Tech stack modernity', weight: 1.5 },
  { id: 'growth_signals', name: 'Growth signals', weight: 1.5 },
  { id: 'buyer_reachability', name: 'Buyer reachability', weight: 1.5 },
] as const

export const MAX_SCORE = ICP_CRITERIA.reduce((s, c) => s + c.weight, 0)

export type Band = 'hot' | 'warm' | 'cold'

export function bandFromScore(score: number): Band {
  if (score >= 8) return 'hot'
  if (score >= 4) return 'warm'
  return 'cold'
}

export function shouldSkipCold(score: number): boolean {
  return score <= 2
}

export function totalScore(scores: number[]): number {
  return Math.round(scores.reduce((s, n) => s + n, 0) * 10) / 10
}
