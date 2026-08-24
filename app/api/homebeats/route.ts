import { NextRequest, NextResponse } from 'next/server'
import { createHomebeat } from '@/lib/cloudcma'
import { isHomebeatFrequency } from '@/lib/homebeat'
import { isValidEmail, isValidPhone } from '@/lib/validations/contact'

const FUB_API_URL = 'https://api.followupboss.com/v1/events'
const FUB_API_KEY = process.env.FUB_API_KEY
const CLOUDCMA_API_KEY = process.env.CLOUDCMA_API_KEY

async function logHomebeatToFollowUpBoss(input: {
  name: string
  email: string
  phone?: string
  address: string
  frequency: string
}) {
  if (!FUB_API_KEY) {
    return
  }

  const nameParts = input.name.trim().split(/\s+/)
  const firstName = nameParts[0] || 'Unknown'
  const lastName = nameParts.slice(1).join(' ') || 'Homebeat'

  const response = await fetch(FUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${FUB_API_KEY}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: 'homesatlonemountain.com',
      type: 'Seller Inquiry',
      person: {
        firstName,
        lastName,
        emails: [{ value: input.email }],
        ...(input.phone && {
          phones: [{ value: input.phone.replace(/\D/g, '') }],
        }),
        tags: ['Homebeat', 'Lone Mountain', 'home-valuation'],
      },
      value: `Cloud CMA Homebeat (${input.frequency}) for ${input.address}`,
    }),
  })

  if (!response.ok && response.status !== 204) {
    const errText = await response.text()
    console.error('FUB Homebeat log error:', response.status, errText)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const address = String(body.address || body.propertyAddress || '').trim()
    const frequencyValue = String(body.frequency || 'monthly').trim()

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
    }
    if (!address) {
      return NextResponse.json(
        { error: 'Please enter the Lone Mountain property address.' },
        { status: 400 }
      )
    }
    if (!isHomebeatFrequency(frequencyValue)) {
      return NextResponse.json({ error: 'Choose a valid update frequency.' }, { status: 400 })
    }

    if (!CLOUDCMA_API_KEY) {
      console.error('CLOUDCMA_API_KEY is not set')
      return NextResponse.json(
        {
          error:
            'Homebeat signup is not configured yet. Call 702-222-1964 for a Lone Mountain valuation.',
        },
        { status: 503 }
      )
    }

    const result = await createHomebeat({
      apiKey: CLOUDCMA_API_KEY,
      frequency: frequencyValue,
      address,
      name,
      email,
      phone: phone || undefined,
    })

    if (!result.ok) {
      console.error('Cloud CMA Homebeat error:', result.status, result.error)
      return NextResponse.json(
        {
          error:
            result.error ||
            'Unable to start a Homebeat for this address. Call 702-222-1964.',
        },
        { status: result.status >= 400 && result.status < 500 ? result.status : 502 }
      )
    }

    await logHomebeatToFollowUpBoss({
      name,
      email,
      phone,
      address,
      frequency: frequencyValue,
    })

    return NextResponse.json({
      success: true,
      message: 'Your first Lone Mountain Homebeat is on the way. Check your email.',
    })
  } catch (error) {
    console.error('Homebeat signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Call 702-222-1964.' },
      { status: 500 }
    )
  }
}
