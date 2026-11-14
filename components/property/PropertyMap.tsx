'use client'

import React, { useState } from 'react'
import Map, { MapMarker } from '@/components/ui/Map'
import { useNearbyPlaces, NearbyPlace } from '@/hooks/useNearbyPlaces'

interface PropertyMapProps {
  propertyLocation: google.maps.LatLngLiteral
  propertyTitle: string
  className?: string
}

const placeIcons = {
  school: '/icons/school.svg',
  restaurant: '/icons/restaurant.svg',
  park: '/icons/park.svg',
  shopping: '/icons/shopping.svg',
}

const propertyIcon = {
  // 0 is google.maps.SymbolPath.CIRCLE; reading the enum here ran on the server, where the Maps script is not loaded, and crashed the page
  path: 0 as google.maps.SymbolPath,
  fillColor: '#3A8DDE',
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 2,
  scale: 12,
}

export default function PropertyMap({
  propertyLocation,
  propertyTitle,
  className = '',
}: PropertyMapProps) {
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null)
  const { places, loading, error } = useNearbyPlaces({
    location: propertyLocation,
    radius: 1500, // 1.5km radius
  })

  const markers: MapMarker[] = [
    {
      position: propertyLocation,
      title: propertyTitle,
      icon: propertyIcon,
    },
    ...places.map((place) => ({
      position: place.position,
      title: place.name,
      icon: placeIcons[place.type],
    })),
  ]

  const handleMarkerClick = (marker: MapMarker) => {
    const place = places.find((p) => p.name === marker.title)
    setSelectedPlace(place || null)
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p>Error loading nearby places: {error}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <Map
        center={propertyLocation}
        zoom={15}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        className={`${className} ${loading ? 'opacity-50' : ''}`}
      />
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold text-lg mb-1">{selectedPlace.name}</h3>
          <div className="text-sm text-gray-600">
            {selectedPlace.distance && (
              <p className="mb-1">Distance: {selectedPlace.distance}</p>
            )}
            {selectedPlace.rating && (
              <p>Rating: {selectedPlace.rating} ⭐</p>
            )}
          </div>
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 px-4 py-2 rounded-full text-gray-600">
            Loading nearby places...
          </div>
        </div>
      )}
    </div>
  )
} 