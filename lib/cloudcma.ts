import type { HomebeatFrequency } from '@/lib/homebeat'

export const CLOUDCMA_HOMEBEAT_URL = 'https://cloudcma.com/homebeats/widget'

export type CreateHomebeatInput = {
  apiKey: string
  frequency: HomebeatFrequency
  address: string
  name: string
  email: string
  phone?: string
  callbackUrl?: string
}

export type CreateHomebeatResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; error: string }

export async function createHomebeat(
  input: CreateHomebeatInput
): Promise<CreateHomebeatResult> {
  const response = await fetch(CLOUDCMA_HOMEBEAT_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      automation: {
        api_key: input.apiKey,
        frequency: input.frequency,
        welcome_email: 'true',
        report: {
          prop_type: null,
          callback_url: input.callbackUrl ?? null,
        },
        subject_property: {
          address: input.address,
          geo_lat: null,
          geo_lon: null,
        },
        lead: {
          name: input.name,
          email_address: input.email,
          phone: input.phone || null,
        },
      },
    }),
  })

  const raw = await response.text()
  let parsed: unknown = raw
  try {
    parsed = raw ? JSON.parse(raw) : {}
  } catch {
    parsed = { error: raw }
  }

  if (!response.ok) {
    const error =
      typeof parsed === 'object' &&
      parsed !== null &&
      'error' in parsed &&
      typeof parsed.error === 'string'
        ? parsed.error
        : 'Unable to start a Homebeat for this address.'
    return { ok: false, status: response.status, error }
  }

  return { ok: true, data: parsed }
}
