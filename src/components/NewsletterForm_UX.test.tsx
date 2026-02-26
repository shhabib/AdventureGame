import { render, screen, fireEvent, act } from '@testing-library/react'
import { NewsletterForm } from './NewsletterForm'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

describe('NewsletterForm UX Improvements', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('moves focus to input on error', async () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    // Trigger error
    fireEvent.change(input, { target: { value: 'fail@example.com' } })
    fireEvent.click(button)

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    // Verify focus moved to input
    expect(input).toHaveFocus()
  })

  it('clears error state when user types', async () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    // Trigger error first
    fireEvent.change(input, { target: { value: 'fail@example.com' } })
    fireEvent.click(button)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toBeDisabled()

    // User starts typing (clear input)
    const reQueriedInput = screen.getByLabelText(/email address/i)
    fireEvent.change(reQueriedInput, { target: { value: '' } })
    expect(reQueriedInput).toHaveValue('')

    // Error message should disappear and status should not be error
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
  })

  it('links error message to input via aria-describedby', async () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText(/email address/i)
    const button = screen.getByRole('button', { name: /subscribe/i })

    // Trigger error
    fireEvent.change(input, { target: { value: 'fail@example.com' } })
    fireEvent.click(button)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    const inputElement = screen.getByLabelText(/email address/i)
    const describedBy = inputElement.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    // Check if the element with that ID exists and has the error text
    // Note: The message is inside a live region div, but the aria-describedby might point to the p inside it or the div itself.
    if (describedBy) {
        const messageEl = document.getElementById(describedBy)
        expect(messageEl).toHaveTextContent(/something went wrong/i)
    }
  })
})
