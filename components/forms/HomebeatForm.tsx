'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  HOMEBEAT_FREQUENCIES,
  homebeatFrequencyLabel,
  isHomebeatFrequency,
  type HomebeatFrequency,
} from '@/lib/homebeat'
import { formatPhone } from '@/lib/validations/contact'

const inputClass =
  'mt-1 w-full rounded-lg border border-luxury-stone px-4 py-2 text-luxury-navy focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold'

export function HomebeatForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [frequency, setFrequency] = useState<HomebeatFrequency>('monthly')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/homebeats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, frequency }),
      })
      const payload = (await response.json()) as { error?: string; message?: string }
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to start your Homebeat.')
      }
      setSuccess(payload.message || 'Your first Homebeat is on the way.')
      setName('')
      setEmail('')
      setPhone('')
      setAddress('')
      setFrequency('monthly')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to start your Homebeat. Call 702-222-1964.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800">Homebeat started</h3>
        <p className="mt-2 text-green-700">{success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="homebeat-name" className="text-sm font-medium text-luxury-navy">
          Name
        </label>
        <input
          id="homebeat-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="homebeat-email" className="text-sm font-medium text-luxury-navy">
          Email
        </label>
        <input
          id="homebeat-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="homebeat-phone" className="text-sm font-medium text-luxury-navy">
          Phone
        </label>
        <input
          id="homebeat-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          onBlur={() => phone && setPhone(formatPhone(phone))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="homebeat-address" className="text-sm font-medium text-luxury-navy">
          Lone Mountain property address
        </label>
        <input
          id="homebeat-address"
          name="address"
          type="text"
          required
          placeholder="1234 Example Dr, Las Vegas, NV 89129"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="homebeat-frequency" className="text-sm font-medium text-luxury-navy">
          Update frequency
        </label>
        <select
          id="homebeat-frequency"
          name="frequency"
          value={frequency}
          onChange={(event) => {
            if (isHomebeatFrequency(event.target.value)) {
              setFrequency(event.target.value)
            }
          }}
          className={inputClass}
        >
          {HOMEBEAT_FREQUENCIES.map((option) => (
            <option key={option} value={option}>
              {homebeatFrequencyLabel(option)}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-luxury-gold font-semibold text-luxury-navy hover:bg-luxury-gold/90 disabled:opacity-50"
      >
        {isSubmitting ? 'Starting Homebeat...' : 'Start my Lone Mountain Homebeat'}
      </Button>
    </form>
  )
}
