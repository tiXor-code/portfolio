import { render, screen } from '@testing-library/react'
import Nav from '../../src/components/Nav'

describe('Nav', () => {
  it('renders a GitHub link with an accessible label and correct href', () => {
    render(<Nav />)
    const gh = screen.getByLabelText('GitHub')
    expect(gh).toHaveAttribute('href', 'https://github.com/tiXor-code')
    expect(gh).toHaveAttribute('target', '_blank')
  })

  it('still shows the AVAILABLE FOR WORK pill', () => {
    render(<Nav />)
    expect(screen.getByText('AVAILABLE FOR WORK')).toBeInTheDocument()
  })
})
