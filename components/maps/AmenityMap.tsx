'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { mapStyles } from '@/lib/mapStyles'
import {
  AMENITY_CATEGORIES,
  LONE_MOUNTAIN_COMMUNITY,
  directionsUrl,
  type AmenityCategoryId,
} from '@/lib/lone-mountain-map'
import { searchNearbyPlacesForCategory, type MapPlaceResult } from '@/lib/search-nearby-places'
import {
  installGoogleMapsAuthFailureHandler,
  mapsAuthFailed,
} from '@/lib/google-maps-loader'
import { AmenityMapFallback } from '@/components/maps/AmenityMapFallback'
import { StaticAmenityList } from '@/components/maps/StaticAmenityList'

const MAP_HEIGHT_CLASS = 'h-[min(420px,60vh)] min-h-[320px]'

const libraries: ('places' | 'geometry')[] = ['places', 'geometry']

type AmenityMapProps = {
  defaultCategory?: AmenityCategoryId
  showStaticListOnFallback?: boolean
  className?: string
}

function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: AmenityCategoryId
  onSelect: (id: AmenityCategoryId) => void
}) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-4"
      role="tablist"
      aria-label="Filter nearby amenities by category"
    >
      {AMENITY_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="amenity-map-panel"
            id={`amenity-tab-${category.id}`}
            onClick={() => onSelect(category.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold focus-visible:ring-offset-2 ${
              isActive
                ? 'bg-luxury-navy text-white'
                : 'bg-luxury-cream text-luxury-navy hover:bg-luxury-stone/60 border border-luxury-stone'
            }`}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}

function AmenityMapInteractive({
  defaultCategory = 'restaurants',
  showStaticListOnFallback = true,
  className = '',
}: AmenityMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID

  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory)
  const [places, setPlaces] = useState<MapPlaceResult[]>([])
  const [loadingPlaces, setLoadingPlaces] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<MapPlaceResult | null>(null)
  const [mapError, setMapError] = useState(() => !apiKey || mapsAuthFailed)
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false)

  useEffect(() => {
    installGoogleMapsAuthFailureHandler()
  }, [])

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'amenity-map-loader',
    googleMapsApiKey: apiKey,
    libraries,
  })

  const center = LONE_MOUNTAIN_COMMUNITY.center

  useEffect(() => {
    const onAuthFailure = () => {
      setMapError(true)
      setSelectedPlace(null)
      setPlaces([])
    }
    if (mapsAuthFailed) {
      onAuthFailure()
    }
    window.addEventListener('gmaps:auth-failure', onAuthFailure)
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFailure)
  }, [])

  const loadPlaces = useCallback(async (categoryId: AmenityCategoryId) => {
    if (!isLoaded || loadError || mapError) {
      return
    }
    setLoadingPlaces(true)
    setPlacesSearchFailed(false)
    setSelectedPlace(null)
    try {
      const results = await searchNearbyPlacesForCategory(categoryId, center)
      setPlaces(results)
      if (results.length === 0) {
        setPlacesSearchFailed(true)
      }
    } catch {
      setPlaces([])
      setPlacesSearchFailed(true)
    } finally {
      setLoadingPlaces(false)
    }
  }, [center, isLoaded, loadError, mapError])

  useEffect(() => {
    if (loadError) {
      setMapError(true)
    }
  }, [loadError])

  useEffect(() => {
    if (isLoaded && !loadError && !mapError) {
      loadPlaces(activeCategory)
    }
  }, [activeCategory, isLoaded, loadError, mapError, loadPlaces])

  if (!apiKey || mapError) {
    return (
      <AmenityMapFallback
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        showStaticList={showStaticListOnFallback}
        className={className}
      />
    )
  }

  if (!isLoaded) {
    return (
      <div className={className}>
        <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div
          className={`w-full ${MAP_HEIGHT_CLASS} rounded-lg bg-luxury-cream animate-pulse border border-luxury-stone`}
          aria-hidden="true"
        />
      </div>
    )
  }

  const communityMarkerIcon: google.maps.Symbol | undefined =
    typeof google !== 'undefined'
      ? {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#d69e2e',
          fillOpacity: 1,
          strokeColor: '#1a365d',
          strokeWeight: 3,
          scale: 14,
        }
      : undefined

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: mapStyles,
    ...(mapId ? { mapId } : {}),
  }

  return (
    <div className={className}>
      <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div
        id="amenity-map-panel"
        role="tabpanel"
        aria-labelledby={`amenity-tab-${activeCategory}`}
        className={`relative w-full ${MAP_HEIGHT_CLASS} rounded-lg overflow-hidden border border-luxury-stone shadow-sm`}
      >
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={LONE_MOUNTAIN_COMMUNITY.defaultZoom}
          options={mapOptions}
        >
          <MarkerF
            position={center}
            title={LONE_MOUNTAIN_COMMUNITY.name}
            icon={communityMarkerIcon}
            onClick={() =>
              setSelectedPlace({
                id: 'community-center',
                name: LONE_MOUNTAIN_COMMUNITY.name,
                address: LONE_MOUNTAIN_COMMUNITY.centerAddress,
                lat: center.lat,
                lng: center.lng,
                category: activeCategory,
              })
            }
          />
          {places.map((place) => (
            <MarkerF
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="max-w-[220px] text-luxury-navy">
                <p className="font-semibold">{selectedPlace.name}</p>
                {selectedPlace.address && (
                  <p className="text-sm mt-1 text-gray-700">{selectedPlace.address}</p>
                )}
                <a
                  href={
                    selectedPlace.googleMapsUri ??
                    directionsUrl(selectedPlace.lat, selectedPlace.lng, selectedPlace.name)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-luxury-gold hover:underline mt-2 inline-block"
                >
                  Directions
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        {loadingPlaces && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/40 pointer-events-none"
            aria-live="polite"
          >
            <span className="bg-white px-4 py-2 rounded-full text-sm text-luxury-charcoal shadow">
              Loading places…
            </span>
          </div>
        )}
      </div>

      {(placesSearchFailed || places.length === 0) && !loadingPlaces && (
        <div className="mt-4">
          <p className="text-sm text-luxury-charcoal mb-3">
            Live results are unavailable for this filter. Verified places near Lone Mountain:
          </p>
          <StaticAmenityList categoryFilter={activeCategory} limit={8} />
        </div>
      )}
    </div>
  )
}

export function AmenityMap(props: AmenityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={props.className}>
      {!isInView ? (
        <div
          className={`w-full ${MAP_HEIGHT_CLASS} rounded-lg bg-luxury-cream border border-luxury-stone`}
          aria-label="Map loads when scrolled into view"
        />
      ) : (
        <AmenityMapInteractive {...props} />
      )}
    </div>
  )
}
