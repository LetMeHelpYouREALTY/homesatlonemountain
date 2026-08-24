'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { validateLeadForm, formatPhone, type LeadFormData, type ValidationError } from '@/lib/validations/contact'

interface LeadCaptureFormProps {
  leadType: 'buyer' | 'seller' | 'valuation' | 'general'
  title?: string
  buttonText?: string
  showAddress?: boolean
  showMessage?: boolean
  messagePlaceholder?: string
  source?: string
  onSuccess?: () => void
}

export function LeadCaptureForm({
  leadType,
  title = 'Get Started',
  buttonText = 'Submit',
  showAddress = false,
  showMessage = false,
  messagePlaceholder = 'How can we help?',
  source = 'website',
  onSuccess,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    leadType,
    propertyAddress: '',
    message: '',
  })
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => prev.filter(err => err.field !== name))
  }

  const handlePhoneBlur = () => {
    if (formData.phone) {
      setFormData(prev => ({ ...prev, phone: formatPhone(prev.phone || '') }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateLeadForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', leadType, propertyAddress: '', message: '' })
      onSuccess?.()
    } catch (error) {
      console.error('Lead capture error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (field: string) => errors.find(e => e.field === field)?.message

  if (submitStatus === 'success') {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Dr. Jan Duffy will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h3 className="text-xl font-bold text-luxury-navy mb-4">{title}</h3>}

      {submitStatus === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="px-4 py-2 border border-luxury-stone rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
          placeholder="Phone"
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
            getFieldError('phone') ? 'border-red-500' : 'border-luxury-stone'
          }`}
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email *"
        required
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
          getFieldError('email') ? 'border-red-500' : 'border-luxury-stone'
        }`}
      />
      {getFieldError('email') && (
        <p className="text-sm text-red-600">{getFieldError('email')}</p>
      )}

      {(showAddress || leadType === 'valuation') && (
        <>
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="Property Address *"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold ${
              getFieldError('propertyAddress') ? 'border-red-500' : 'border-luxury-stone'
            }`}
          />
          {getFieldError('propertyAddress') && (
            <p className="text-sm text-red-600">{getFieldError('propertyAddress')}</p>
          )}
        </>
      )}

      {showMessage && (
        <textarea
          id="lead-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={messagePlaceholder}
          rows={4}
          aria-label="Search criteria"
          className="w-full rounded-lg border border-luxury-stone px-4 py-2 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold"
        />
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-navy font-semibold disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : buttonText}
      </Button>
    </form>
  )
}
