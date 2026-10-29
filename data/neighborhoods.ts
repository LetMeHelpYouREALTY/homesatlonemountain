/**
 * Neighborhood Data
 * Information about Lone Mountain and surrounding areas
 */

export interface Neighborhood {
  id: string
  name: string
  slug: string
  description: string
  highlights: string[]
  priceRange: {
    min: number
    max: number
  }
  averagePrice: number
  homeStyles: string[]
  yearBuiltRange: string
  coordinates: {
    lat: number
    lng: number
  }
  zipCodes: string[]
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 'lone-mountain',
    name: 'Lone Mountain',
    slug: 'lone-mountain',
    description: 'Lone Mountain is a premier Northwest Las Vegas neighborhood known for stunning mountain views, spacious homes, and nearby public schools. Located at the base of the iconic Lone Mountain peak, this community offers a perfect blend of natural beauty and suburban convenience.',
    highlights: [
      'Stunning mountain views',
      'Spacious single-family homes',
      'Nearby public schools',
      'Community',
      'Easy access to Summerlin',
      'Parks and hiking trails',
      'Strong property values',
    ],
    priceRange: {
      min: 400000,
      max: 2000000,
    },
    averagePrice: 550000,
    homeStyles: ['Single-Family', 'Custom Homes', 'Luxury Estates'],
    yearBuiltRange: '1990-Present',
    coordinates: {
      lat: 36.2455,
      lng: -115.2541,
    },
    zipCodes: ['89129', '89149', '89131'],
  },
  {
    id: 'centennial-hills',
    name: 'Centennial Hills',
    slug: 'centennial-hills',
    description: 'Adjacent to Lone Mountain, Centennial Hills offers newer construction and master-planned communities with excellent amenities.',
    highlights: [
      'Master-planned communities',
      'Newer construction',
      'Community parks',
      'Shopping and dining',
    ],
    priceRange: {
      min: 350000,
      max: 1500000,
    },
    averagePrice: 480000,
    homeStyles: ['Single-Family', 'Townhomes'],
    yearBuiltRange: '2000-Present',
    coordinates: {
      lat: 36.2700,
      lng: -115.2600,
    },
    zipCodes: ['89131', '89149', '89166'],
  },
]

export const primaryNeighborhood = neighborhoods.find(n => n.id === 'lone-mountain')!
