import { readFileSync } from 'node:fs'

const html = readFileSync('index.html', 'utf8')

describe('index.html meta + structured data', () => {
  it('meta description mentions TypeScript and Python and uses no em/en dash', () => {
    const m = html.match(/<meta name="description" content="([^"]*)"/)
    expect(m).not.toBeNull()
    expect(m![1]).toContain('TypeScript and Python')
    expect(m![1]).not.toMatch(/[–—]/)
  })

  it('og:description matches the new description text', () => {
    const m = html.match(/<meta property="og:description" content="([^"]*)"/)
    expect(m).not.toBeNull()
    expect(m![1]).toContain('TypeScript and Python')
  })

  it('JSON-LD Person is expanded with knowsAbout, worksFor, alumniOf', () => {
    expect(html).toContain('"knowsAbout"')
    expect(html).toContain('"worksFor"')
    expect(html).toContain('"alumniOf"')
    expect(html).toContain('Retrieval-Augmented Generation')
  })
})
