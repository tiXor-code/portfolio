import { render, screen, fireEvent } from '@testing-library/react'
import AgentDemo from '../../src/components/AgentDemo'

describe('AgentDemo tabs', () => {
  it('defaults to the chat tab and can switch to the replay', () => {
    render(<AgentDemo />)
    expect(screen.getByRole('tab', { name: /ask me anything/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/grounded in my public profile/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /watch an agent run/i }))
    expect(screen.getByText('Inbound lead')).toBeInTheDocument()
  })
})
