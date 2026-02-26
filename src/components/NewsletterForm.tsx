import { useState, useRef, useEffect, useId } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()
  const errorId = `${id}-error`
  const inputId = `${id}-email`

  useEffect(() => {
    if (status === 'error') {
      inputRef.current?.focus()
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status === 'error') {
      setStatus('idle')
      setMessage('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    // Simulate API call
    setTimeout(() => {
      if (email.includes('error') || email.includes('fail')) {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      } else {
        setStatus('success')
        setMessage('Successfully subscribed! Check your inbox.')
        setEmail('')
      }
    }, 1500)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}
      aria-labelledby="newsletter-title"
    >
      <h3 id="newsletter-title">Subscribe to our newsletter</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
        <label htmlFor={inputId} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
          Email address
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            ref={inputRef}
            id={inputId}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleChange}
            required
            autoComplete="email"
            spellCheck={false}
            aria-invalid={status === 'error' ? 'true' : undefined}
            aria-describedby={status === 'error' ? errorId : undefined}
            disabled={status === 'loading'}
            style={{
              padding: '0.5rem',
              flex: 1,
              border: status === 'error' ? '1px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
            style={{ minWidth: '100px' }}
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </div>
      </div>

      {/* Live region for feedback */}
      <div aria-live="polite" aria-atomic="true" style={{ marginTop: '0.5rem', minHeight: '1.5em' }}>
        {message && (
          <p
            id={errorId}
            style={{
            color: status === 'success' ? '#2e7d32' : '#d32f2f',
            margin: 0
          }}>
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
