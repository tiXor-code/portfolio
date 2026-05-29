import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatAsTeodor from '../../src/components/ChatAsTeodor'
import * as client from '../../src/lib/chatClient'
import { vi } from 'vitest'

describe('ChatAsTeodor', () => {
  it('shows the grounded-sources header and starter chips', () => {
    render(<ChatAsTeodor />)
    expect(screen.getByText(/grounded in my public profile/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /are you available/i })).toBeInTheDocument()
  })
  it('sends a message and renders the streamed reply', async () => {
    vi.spyOn(client, 'streamChat').mockImplementation(async (_u, _m, onDelta) => { onDelta('I am available.'); return 'I am available.' })
    render(<ChatAsTeodor />)
    fireEvent.change(screen.getByPlaceholderText(/ask/i), { target: { value: 'are you free?' } })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    await waitFor(() => expect(screen.getByText('I am available.')).toBeInTheDocument())
  })
  it('shows the degraded fallback when the endpoint errors', async () => {
    vi.spyOn(client, 'streamChat').mockRejectedValue(new Error('down'))
    render(<ChatAsTeodor />)
    fireEvent.change(screen.getByPlaceholderText(/ask/i), { target: { value: 'hi' } })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    await waitFor(() => expect(screen.getByText(/email me at contact@teodorlutoiu\.com/i)).toBeInTheDocument())
  })
})
