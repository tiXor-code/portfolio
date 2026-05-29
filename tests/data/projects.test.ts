import { PROJECTS } from '../../src/data/projects'

describe('PROJECTS data', () => {
  it('has exactly 9 cards in the spec order', () => {
    expect(PROJECTS.map((p) => p.id)).toEqual([
      'icp-agent',
      'support-agent',
      'cv-tailor',
      'wiki-substrate',
      'gepa',
      'jobmap',
      'openclaw',
      'ministeru',
      'orb-bot',
    ])
  })

  it('every card has the required fields and a valid accent', () => {
    for (const p of PROJECTS) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.kind).toBeTruthy()
      expect(p.summary).toBeTruthy()
      expect(p.detail).toBeTruthy()
      expect(p.stack.length).toBeGreaterThan(0)
      expect(['signal', 'warm', 'cold']).toContain(p.accent)
      expect(Array.isArray(p.links)).toBe(true)
    }
  })

  it('every link has a label and an http(s) href', () => {
    for (const p of PROJECTS) {
      for (const l of p.links) {
        expect(l.label.length).toBeGreaterThan(0)
        expect(l.href).toMatch(/^https?:\/\//)
      }
    }
  })

  it('the publishable new cards carry a tiXor-code GitHub link; gepa is intentionally link-less for now', () => {
    const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))
    for (const id of ['cv-tailor', 'wiki-substrate']) {
      expect(
        byId[id].links.some((l) => l.href.includes('github.com/tiXor-code')),
      ).toBe(true)
    }
    // gepa-prompt-lab needs a token scrub + history rewrite before going public
    expect(byId['gepa'].links).toEqual([])
  })

  it('contains no em or en dashes in copy', () => {
    for (const p of PROJECTS) {
      expect(`${p.summary} ${p.detail} ${p.kind}`).not.toMatch(/[–—]/)
    }
  })
})
