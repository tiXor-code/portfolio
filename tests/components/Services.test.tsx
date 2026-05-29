import { render, screen } from '@testing-library/react'
import Services from '../../src/components/Services'

describe('Services ATS strip', () => {
  it('renders a definition list with the four stack categories', () => {
    render(<Services />)
    const terms = screen.getAllByRole('term').map((t) => t.textContent)
    expect(terms).toEqual(
      expect.arrayContaining(['Languages', 'AI / LLM', 'Frameworks', 'Infra']),
    )
    expect(screen.getAllByRole('definition').length).toBeGreaterThanOrEqual(4)
  })

  it('surfaces ATS keywords in the definitions', () => {
    render(<Services />)
    expect(screen.getByText(/Python · TypeScript · JavaScript · SQL · Node\.js/)).toBeInTheDocument()
    expect(screen.getByText(/MCP/)).toBeInTheDocument()
    expect(screen.getByText(/Vercel · Azure App Services/)).toBeInTheDocument()
  })

  it('keeps the existing capability tiles', () => {
    render(<Services />)
    expect(screen.getByText('Autonomous agents')).toBeInTheDocument()
    expect(screen.getByText('RAG systems')).toBeInTheDocument()
  })
})
