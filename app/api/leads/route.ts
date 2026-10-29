import { NextRequest, NextResponse } from 'next/server'

const FUB_API_URL = 'https://api.followupboss.com/v1/events'
const FUB_API_KEY = process.env.FUB_API_KEY

const EVENT_TYPE_MAP: Record<string, string> = {
  buying: 'General Inquiry',
  selling: 'Seller Inquiry',
  both: 'General Inquiry',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      message,
      propertyInterest = 'both',
      source = 'homesatlonemountain.com',
    } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const nameParts = (name || '').trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    const eventType = EVENT_TYPE_MAP[propertyInterest] || 'General Inquiry'

    const payload = {
      source,
      type: eventType,
      person: {
        firstName: firstName || 'Unknown',
        lastName: lastName || 'Contact',
        emails: [{ value: email.trim() }],
        ...(phone && { phones: [{ value: String(phone).replace(/\D/g, '') }] }),
      },
      ...(message && { value: message.trim() }),
    }

    if (!FUB_API_KEY) {
      console.warn('FUB_API_KEY not set - logging lead locally:', payload)
      return NextResponse.json({
        success: true,
        message: 'Thank you! Dr. Jan Duffy will contact you shortly.',
      })
    }

    const response = await fetch(FUB_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${FUB_API_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.status === 204) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! Dr. Jan Duffy will contact you shortly.',
      })
    }

    if (!response.ok) {
      const errText = await response.text()
      console.error('FUB API error:', response.status, errText)
      return NextResponse.json(
        { error: 'Unable to submit your request. Please try again or call 702-500-1955.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Dr. Jan Duffy will contact you shortly.',
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call 702-500-1955.' },
      { status: 500 }
    )
  }
}
