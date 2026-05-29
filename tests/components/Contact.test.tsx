import { render, screen } from '@testing-library/react'
import Contact from '../../src/components/Contact'

describe('Contact', () => {
  it('renders four channel cards including CV (PDF)', () => {
    render(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('CV (PDF)')).toBeInTheDocument()
  })

  it('the CV channel opens the PDF in a new tab with a base-aware href', () => {
    render(<Contact />)
    const cv = screen.getByRole('link', { name: /CV \(PDF\)/i })
    expect(cv).toHaveAttribute('target', '_blank')
    expect(cv.getAttribute('href')).toMatch(/cv\/teodor-lutoiu-cv\.pdf$/)
  })

  it('the email channel still opens in the same tab', () => {
    render(<Contact />)
    const email = screen.getByRole('link', { name: /contact@teodorlutoiu\.com/i })
    expect(email).not.toHaveAttribute('target', '_blank')
  })
})
