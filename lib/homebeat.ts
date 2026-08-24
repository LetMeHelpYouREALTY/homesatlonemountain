export const HOMEBEAT_FREQUENCIES = [
  'monthly',
  'quarterly',
  'semi-annually',
  'annually',
] as const

export type HomebeatFrequency = (typeof HOMEBEAT_FREQUENCIES)[number]

export function isHomebeatFrequency(value: string): value is HomebeatFrequency {
  return (HOMEBEAT_FREQUENCIES as readonly string[]).includes(value)
}

export function homebeatFrequencyLabel(frequency: HomebeatFrequency): string {
  switch (frequency) {
    case 'monthly':
      return 'Monthly'
    case 'quarterly':
      return 'Quarterly'
    case 'semi-annually':
      return 'Twice a year'
    case 'annually':
      return 'Yearly'
    default: {
      const _exhaustive: never = frequency
      return _exhaustive
    }
  }
}
