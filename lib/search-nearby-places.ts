import {
  AMENITY_CATEGORIES,
  LONE_MOUNTAIN_COMMUNITY,
  type AmenityCategoryId,
} from '@/lib/lone-mountain-map'

export type MapPlaceResult = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  rating?: number
  category: AmenityCategoryId
}

type LatLng = { lat: number; lng: number }

function legacyTypeForCategory(categoryId: AmenityCategoryId): string | null {
  const map: Record<AmenityCategoryId, string> = {
    restaurants: 'restaurant',
    cafes: 'cafe',
    grocery: 'grocery_or_supermarket',
    parks: 'park',
    golf: 'golf_course',
    healthcare: 'hospital',
    pharmacies: 'pharmacy',
    shopping: 'shopping_mall',
    parking: 'parking',
    fitness: 'gym',
    schools: 'school',
  }
  return map[categoryId] ?? null
}

async function searchWithNewPlacesApi(
  center: LatLng,
  categoryId: AmenityCategoryId,
  radius: number
): Promise<MapPlaceResult[] | null> {
  const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId)
  if (!category || typeof google === 'undefined' || !google.maps?.importLibrary) {
    return null
  }

  try {
    const placesLib = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary
    const Place = placesLib.Place
    if (!Place?.searchNearby) {
      return null
    }

    const { places } = await Place.searchNearby({
      fields: ['displayName', 'location', 'formattedAddress', 'rating', 'id'],
      locationRestriction: {
        center: { lat: center.lat, lng: center.lng },
        radius,
      },
      includedPrimaryTypes: category.primaryTypes,
      maxResultCount: 15,
    })

    return places
      .filter((p) => p.location)
      .map((place, index) => ({
        id: place.id ?? `${categoryId}-${index}`,
        name: place.displayName ?? 'Place',
        address: place.formattedAddress ?? '',
        lat: place.location!.lat(),
        lng: place.location!.lng(),
        rating: place.rating ?? undefined,
        category: categoryId,
      }))
  } catch {
    return null
  }
}

function searchWithLegacyType(
  center: LatLng,
  categoryId: AmenityCategoryId,
  radius: number,
  type: string
): Promise<MapPlaceResult[]> {
  return new Promise((resolve) => {
    if (typeof google === 'undefined' || !google.maps?.places) {
      resolve([])
      return
    }

    const service = new google.maps.places.PlacesService(document.createElement('div'))

    service.nearbySearch(
      {
        location: center,
        radius,
        type,
      },
      (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
          resolve([])
          return
        }

        resolve(
          results.slice(0, 15).map((place, index) => ({
            id: place.place_id ?? `${categoryId}-legacy-${index}`,
            name: place.name ?? 'Place',
            address: place.vicinity ?? '',
            lat: place.geometry?.location?.lat() ?? center.lat,
            lng: place.geometry?.location?.lng() ?? center.lng,
            rating: place.rating,
            category: categoryId,
          }))
        )
      }
    )
  })
}

/** Search nearby places for one category; prefers Places API (New), falls back to legacy nearbySearch */
export async function searchNearbyPlacesForCategory(
  categoryId: AmenityCategoryId,
  center: LatLng = LONE_MOUNTAIN_COMMUNITY.center,
  radius = LONE_MOUNTAIN_COMMUNITY.searchRadiusMeters
): Promise<MapPlaceResult[]> {
  const fromNew = await searchWithNewPlacesApi(center, categoryId, radius)
  if (fromNew && fromNew.length > 0) {
    return fromNew
  }

  const legacyType = legacyTypeForCategory(categoryId)
  if (legacyType) {
    const legacy = await searchWithLegacyType(center, categoryId, radius, legacyType)
    if (legacy.length > 0) {
      return legacy
    }
  }

  if (categoryId === 'healthcare') {
    const doctors = await searchWithLegacyType(center, categoryId, radius, 'doctor')
    if (doctors.length > 0) {
      return doctors
    }
  }

  if (categoryId === 'cafes') {
    return new Promise((resolve) => {
      if (typeof google === 'undefined' || !google.maps?.places) {
        resolve([])
        return
      }
      const service = new google.maps.places.PlacesService(document.createElement('div'))
      service.nearbySearch(
        { location: center, radius, keyword: 'coffee' },
        (results, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
            resolve([])
            return
          }
          resolve(
            results.slice(0, 15).map((place, index) => ({
              id: place.place_id ?? `cafe-${index}`,
              name: place.name ?? 'Cafe',
              address: place.vicinity ?? '',
              lat: place.geometry?.location?.lat() ?? center.lat,
              lng: place.geometry?.location?.lng() ?? center.lng,
              rating: place.rating,
              category: 'cafes' as AmenityCategoryId,
            }))
          )
        }
      )
    })
  }

  return []
}
