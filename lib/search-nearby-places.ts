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
  googleMapsUri?: string
  category: AmenityCategoryId
}

type LatLng = { lat: number; lng: number }

const categorySearchCache = new Map<string, Promise<MapPlaceResult[]>>()

function placeToResult(
  place: google.maps.places.Place,
  categoryId: AmenityCategoryId,
  index: number
): MapPlaceResult | null {
  if (!place.location) {
    return null
  }

  const { lat, lng } = place.location.toJSON()

  return {
    id: place.id ?? `${categoryId}-${index}`,
    name: place.displayName ?? 'Place',
    address: place.formattedAddress ?? '',
    lat,
    lng,
    googleMapsUri: place.googleMapsURI ?? undefined,
    category: categoryId,
  }
}

async function searchCategoryOnce(
  center: LatLng,
  categoryId: AmenityCategoryId,
  radius: number
): Promise<MapPlaceResult[]> {
  const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId)
  if (!category || typeof google === 'undefined' || !google.maps?.importLibrary) {
    return []
  }

  const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary
  if (!Place?.searchNearby) {
    return []
  }

  const { places } = await Place.searchNearby({
    fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', 'id'],
    locationRestriction: {
      center: { lat: center.lat, lng: center.lng },
      radius,
    },
    includedPrimaryTypes: category.primaryTypes,
    maxResultCount: 10,
    rankPreference: 'POPULARITY' as google.maps.places.SearchNearbyRankPreference & string,
  })

  return places
    .map((place, index) => placeToResult(place, categoryId, index))
    .filter((p): p is MapPlaceResult => p !== null)
}

/** One Places searchNearby call per category per page session (cached). */
export function searchNearbyPlacesForCategory(
  categoryId: AmenityCategoryId,
  center: LatLng = LONE_MOUNTAIN_COMMUNITY.center,
  radius = LONE_MOUNTAIN_COMMUNITY.searchRadiusMeters
): Promise<MapPlaceResult[]> {
  const cacheKey = `${categoryId}:${center.lat}:${center.lng}:${radius}`
  let pending = categorySearchCache.get(cacheKey)

  if (!pending) {
    pending = searchCategoryOnce(center, categoryId, radius)
    pending.catch(() => {
      categorySearchCache.delete(cacheKey)
    })
    categorySearchCache.set(cacheKey, pending)
  }

  return pending
}
