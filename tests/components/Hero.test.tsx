import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/Hero'

describe('Hero', () => {
  it('shows the updated stat band', () => {
    render(<Hero />)
    expect(screen.getByText(/09 systems shipped/)).toBeInTheDocument()
    expect(screen.getByText(/~4 weeks notice/)).toBeInTheDocument()
    expect(screen.queryByText(/Est\. 2024/)).not.toBeInTheDocument()
  })

  it('has a CV download link that opens in a new tab with a base-aware href', () => {
    render(<Hero />)
    const cv = screen.getByRole('link', { name: /Download CV \(PDF\)/i })
    expect(cv).toHaveAttribute('target', '_blank')
    expect(cv.getAttribute('href')).toMatch(/cv\/teodor-lutoiu-cv\.pdf$/)
  })

  it('keeps the two existing primary CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Run the live agent/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Selected work/i })).toBeInTheDocument()
  })
})
