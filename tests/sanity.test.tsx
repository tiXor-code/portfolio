import { render, screen } from '@testing-library/react'

describe('test harness', () => {
  it('runs and renders DOM', () => {
    render(<div>harness ok</div>)
    expect(screen.getByText('harness ok')).toBeInTheDocument()
  })
})
