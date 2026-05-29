import { JOURNEY } from '../../src/data/journey'

describe('JOURNEY data', () => {
  it('has 5 stops ending with Ministeru\' Creativ', () => {
    expect(JOURNEY).toHaveLength(5)
    expect(JOURNEY[JOURNEY.length - 1].org).toBe("Ministeru' Creativ")
  })

  it('marks EA as ongoing (Present), not 2025', () => {
    const ea = JOURNEY.find((j) => j.org === 'Electronic Arts')
    expect(ea).toBeDefined()
    expect(ea!.period).toBe('2024 - Present')
  })

  it('uses no em or en dashes in any period range', () => {
    for (const j of JOURNEY) {
      expect(j.period).not.toMatch(/[–—]/)
    }
  })

  it('every stop has period, org, role, note', () => {
    for (const j of JOURNEY) {
      expect(j.period).toBeTruthy()
      expect(j.org).toBeTruthy()
      expect(j.role).toBeTruthy()
      expect(j.note).toBeTruthy()
    }
  })
})
