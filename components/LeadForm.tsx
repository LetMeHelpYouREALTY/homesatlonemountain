'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { validateContactForm, formatPhone, type ValidationError } from '@/lib/validations/contact'

const PROPERTY_INTEREST_OPTIONS = [
  { value: 'buying', label: 'Buying a home' },
  { value: 'selling', label: 'Selling my home' },
  { value: 'both', label: 'Buying and selling' },
] as const

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: 'both' as string,
  })
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => prev.filter((err) => err.field !== name))
  }

  const handlePhoneBlur = () => {
    if (formData.phone) {
      setFormData((prev) => ({ ...prev, phone: formatPhone(prev.phone) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
    })
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message || undefined,
          propertyInterest: formData.propertyInterest,
          source: 'homesatlonemountain.com',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyInterest: 'both',
      })
    } catch (error) {
      console.error('Lead form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border bg-white/95 transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent ${
      getFieldError(field)
        ? 'border-red-400 focus:ring-red-400'
        : 'border-luxury-stone text-luxury-navy placeholder:text-luxury-charcoal/60'
    }`

  if (submitStatus === 'success') {
    return (
      <div className="rounded-xl border border-luxury-green/30 bg-luxury-cream/80 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-luxury-green/20">
          <svg
            className="h-8 w-8 text-luxury-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-luxury-navy">Thank you!</h3>
        <p className="mt-2 text-luxury-charcoal">
          Dr. Jan Duffy will contact you shortly about your Lone Mountain real estate needs.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
          Something went wrong. Please try again or call{' '}
          <a href="tel:+17025001955" className="font-semibold underline">
            702-500-1955
          </a>
          .
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-luxury-navy">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass('name')}
          placeholder="Your name"
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-luxury-navy">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass('email')}
          placeholder="your@email.com"
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-luxury-navy">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          className={inputClass('phone')}
          placeholder="(702) 555-1234"
        />
        {getFieldError('phone') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="propertyInterest"
          className="mb-1.5 block text-sm font-medium text-luxury-navy"
        >
          I&apos;m interested in
        </label>
        <select
          id="propertyInterest"
          name="propertyInterest"
          value={formData.propertyInterest}
          onChange={handleChange}
          className={inputClass('propertyInterest')}
        >
          {PROPERTY_INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-luxury-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${inputClass('message')} resize-none`}
          placeholder="How can we help you?"
        />
      </div>

      <input type="hidden" name="source" value="homesatlonemountain.com" />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-luxury-navy py-3.5 font-semibold text-white hover:bg-luxury-navy-light disabled:opacity-60 transition-all"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Get in Touch'
        )}
      </Button>
    </form>
  )
}
