import { render, screen } from '@testing-library/react'
import AgentReplay from '../../src/components/AgentReplay'
describe('AgentReplay', () => {
  it('renders the lead picker and run control', () => {
    render(<AgentReplay />)
    expect(screen.getByText('Inbound lead')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /run agent/i })).toBeInTheDocument()
  })
})
