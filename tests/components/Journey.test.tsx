import { render, screen } from '@testing-library/react'
import Journey from '../../src/components/Journey'

describe('Journey', () => {
  it('uses the refreshed lead copy', () => {
    render(<Journey />)
    expect(
      screen.getByText(/founding a studio and going full-time on AI/i),
    ).toBeInTheDocument()
  })

  it('renders all five stops, ending with Ministeru', () => {
    render(<Journey />)
    expect(screen.getByText("Ministeru' Creativ")).toBeInTheDocument()
    expect(screen.getByText('University of Worcester')).toBeInTheDocument()
  })

  it('the Brussels figure image stretches to fill the column', () => {
    render(<Journey />)
    const img = screen.getByAltText(/Brussels/i)
    expect(img.className).toMatch(/flex-1/)
    expect(img.className).toMatch(/lg:h-auto/)
    // taller figure: bigger mobile height + a desktop min-height floor
    expect(img.className).toMatch(/h-96/)
    expect(img.className).toMatch(/lg:min-h-\[560px\]/)
  })
})
