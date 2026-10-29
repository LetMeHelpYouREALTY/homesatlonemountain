'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { validateContactForm, formatPhone, type ContactFormData, type ValidationError } from '@/lib/validations/contact'

interface ContactFormProps {
  source?: string
  onSuccess?: () => void
}

export function ContactForm({ source = 'website', onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    setErrors(prev => prev.filter(err => err.field !== name))
  }

  const handlePhoneBlur = () => {
    if (formData.phone) {
      setFormData(prev => ({ ...prev, phone: formatPhone(prev.phone || '') }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate
    const validationErrors = validateContactForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      onSuccess?.()
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (field: string) => errors.find(e => e.field === field)?.message

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Dr. Jan Duffy will be in touch soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Something went wrong. Please try again or call 702-500-1955.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-luxury-navy mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
            getFieldError('name') ? 'border-red-500' : 'border-luxury-stone'
          }`}
          placeholder="Your name"
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-luxury-navy mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
            getFieldError('email') ? 'border-red-500' : 'border-luxury-stone'
          }`}
          placeholder="your@email.com"
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-luxury-navy mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
            getFieldError('phone') ? 'border-red-500' : 'border-luxury-stone'
          }`}
          placeholder="(702) 555-1234"
        />
        {getFieldError('phone') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-luxury-navy mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-luxury-stone rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
          placeholder="How can we help you?"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-luxury-navy hover:bg-luxury-navy-light disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
