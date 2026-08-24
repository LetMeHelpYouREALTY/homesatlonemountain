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
    description: 'Lone Mountain is a Northwest Las Vegas neighborhood in ZIP 89129 around Lone Mountain peak. Rural Neighborhood Preservation zoning supports ranch homes, horse-capable lots, The Legends condos, and custom estates on 0.4- to 1.5-acre parcels.',
    highlights: [
      'Lone Mountain peak views',
      'Ranch homes and custom estates',
      'Rural Neighborhood Preservation lots',
      'The Legends gated condos',
      '215 Beltway and U.S. 95 access',
      'Trails at Lone Mountain Regional Park',
      'Eileen Conners, Leavitt, and Centennial High zones by address',
    ],
    priceRange: {
      min: 229000,
      max: 3800000,
    },
    averagePrice: 455000,
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
