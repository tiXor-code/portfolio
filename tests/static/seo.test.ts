import { readFileSync, existsSync } from 'node:fs'

describe('SEO static files', () => {
  it('robots.txt allows all and points to the sitemap', () => {
    expect(existsSync('public/robots.txt')).toBe(true)
    const robots = readFileSync('public/robots.txt', 'utf8')
    expect(robots).toMatch(/User-agent:\s*\*/)
    expect(robots).toContain('Sitemap: https://teodorlutoiu.com/sitemap.xml')
  })

  it('sitemap.xml lists the homepage', () => {
    expect(existsSync('public/sitemap.xml')).toBe(true)
    const sitemap = readFileSync('public/sitemap.xml', 'utf8')
    expect(sitemap).toContain('<loc>https://teodorlutoiu.com/</loc>')
  })
})
