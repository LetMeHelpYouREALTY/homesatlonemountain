import { useState, useEffect } from 'react'

export interface NearbyPlace {
  name: string
  type: 'school' | 'restaurant' | 'park' | 'shopping'
  position: google.maps.LatLngLiteral
  distance?: string
  rating?: number
}

interface UseNearbyPlacesProps {
  location: google.maps.LatLngLiteral
  radius?: number // in meters
  types?: string[]
}

export function useNearbyPlaces({
  location,
  radius = 1000,
  types = ['school', 'restaurant', 'park', 'shopping_mall'],
}: UseNearbyPlacesProps) {
  const [places, setPlaces] = useState<NearbyPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchNearbyPlaces = async () => {
      try {
        setLoading(true)
        setError(null)

        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        )

        const allPlaces: NearbyPlace[] = []

        for (const type of types) {
          const request: google.maps.places.PlaceSearchRequest = {
            location,
            radius,
            type,
          }

          const results = await new Promise<google.maps.places.PlaceResult[]>(
            (resolve, reject) => {
              service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  resolve(results)
                } else {
                  reject(new Error(`Places search failed for type: ${type}`))
                }
              })
            }
          )

          const mappedPlaces = results.map((place): NearbyPlace => {
            const placeType = type === 'shopping_mall' ? 'shopping' : type
            return {
              name: place.name || '',
              type: placeType as NearbyPlace['type'],
              position: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
              },
              rating: place.rating,
              distance: place.vicinity
                ? `${calculateDistance(location, {
                    lat: place.geometry?.location?.lat() || 0,
                    lng: place.geometry?.location?.lng() || 0,
                  }).toFixed(1)} miles`
                : undefined,
            }
          })

          allPlaces.push(...mappedPlaces)
        }

        setPlaces(allPlaces)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch nearby places')
      } finally {
        setLoading(false)
      }
    }

    // The Maps script loads after first render; wait for it instead of
    // calling google.maps before it exists (that threw "google is not defined").
    let cancelled = false
    let tries = 0
    const start = () => {
      if (cancelled) return
      const g = (globalThis as { google?: typeof google }).google
      if (g?.maps?.places) {
        searchNearbyPlaces()
      } else if (tries++ < 40) {
        setTimeout(start, 250)
      } else {
        setLoading(false)
      }
    }

    if (location) {
      start()
    }
    return () => {
      cancelled = true
    }
  }, [location, radius, types])

  return { places, loading, error }
}

function calculateDistance(
  point1: google.maps.LatLngLiteral,
  point2: google.maps.LatLngLiteral
): number {
  const R = 3959 // Earth's radius in miles
  const lat1 = point1.lat * (Math.PI / 180)
  const lat2 = point2.lat * (Math.PI / 180)
  const dLat = lat2 - lat1
  const dLon = (point2.lng - point1.lng) * (Math.PI / 180)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
} 