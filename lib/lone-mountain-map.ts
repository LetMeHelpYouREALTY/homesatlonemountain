/**
 * Lone Mountain community map configuration.
 * Center: Clark County Lone Mountain Regional Park (representative hub for the area).
 * @see https://www.clarkcountynv.gov — 9825 W. Lone Mountain Rd., Las Vegas, NV 89129
 * Coordinates verified via OpenStreetMap Nominatim (Sep 2026).
 */
export const LONE_MOUNTAIN_COMMUNITY = {
  name: 'Lone Mountain',
  fullName: 'Lone Mountain, Las Vegas',
  city: 'Las Vegas',
  state: 'NV',
  zip: '89129',
  center: {
    lat: 36.247787,
    lng: -115.32163,
  },
  centerLabel: 'Lone Mountain area',
  centerAddress: '9825 W Lone Mountain Rd, Las Vegas, NV 89129',
  centerSource:
    'Clark County Lone Mountain Regional Park, 9825 W Lone Mountain Rd, Las Vegas, NV 89129 (OpenStreetMap geocode)',
  defaultZoom: 13,
  searchRadiusMeters: 8000,
} as const

export type AmenityCategoryId =
  | 'restaurants'
  | 'cafes'
  | 'grocery'
  | 'parks'
  | 'golf'
  | 'healthcare'
  | 'pharmacies'
  | 'shopping'
  | 'parking'
  | 'fitness'
  | 'schools'

export type AmenityCategory = {
  id: AmenityCategoryId
  label: string
  /** Google Places (New) primary types for searchNearby */
  primaryTypes: string[]
  /** Schema.org subtype for curated static entries */
  schemaType: string
}

/** Northwest Las Vegas Lone Mountain area — schools included; standard amenity order */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  { id: 'restaurants', label: 'Restaurants', primaryTypes: ['restaurant'], schemaType: 'Restaurant' },
  { id: 'cafes', label: 'Cafes', primaryTypes: ['cafe', 'coffee_shop'], schemaType: 'CafeOrCoffeeShop' },
  { id: 'grocery', label: 'Grocery', primaryTypes: ['grocery_store', 'supermarket'], schemaType: 'GroceryStore' },
  { id: 'parks', label: 'Parks', primaryTypes: ['park'], schemaType: 'Park' },
  { id: 'golf', label: 'Golf', primaryTypes: ['golf_course'], schemaType: 'GolfCourse' },
  { id: 'healthcare', label: 'Healthcare', primaryTypes: ['hospital', 'doctor'], schemaType: 'Hospital' },
  { id: 'pharmacies', label: 'Pharmacies', primaryTypes: ['pharmacy'], schemaType: 'Pharmacy' },
  { id: 'shopping', label: 'Shopping', primaryTypes: ['shopping_mall'], schemaType: 'ShoppingCenter' },
  { id: 'parking', label: 'Parking', primaryTypes: ['parking'], schemaType: 'ParkingFacility' },
  { id: 'fitness', label: 'Fitness', primaryTypes: ['gym'], schemaType: 'ExerciseGym' },
  { id: 'schools', label: 'Schools', primaryTypes: ['school'], schemaType: 'School' },
]

export function getCategoryById(id: AmenityCategoryId): AmenityCategory {
  const category = AMENITY_CATEGORIES.find((c) => c.id === id)
  if (!category) {
    const fallback = AMENITY_CATEGORIES[0]
    return fallback
  }
  return category
}

export function directionsUrl(lat: number, lng: number, placeName?: string): string {
  const query = placeName ? encodeURIComponent(placeName) : `${lat},${lng}`
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`
}

export function embedMapUrl(lat: number, lng: number, zoom = 14): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`
}
