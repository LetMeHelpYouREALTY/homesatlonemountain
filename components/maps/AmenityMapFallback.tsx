import {
  AMENITY_CATEGORIES,
  LONE_MOUNTAIN_COMMUNITY,
  embedMapUrl,
  type AmenityCategoryId,
} from '@/lib/lone-mountain-map'
import { StaticAmenityList } from '@/components/maps/StaticAmenityList'

type AmenityMapFallbackProps = {
  activeCategory?: AmenityCategoryId
  onCategoryChange?: (id: AmenityCategoryId) => void
  showStaticList?: boolean
  className?: string
}

export function AmenityMapFallback({
  activeCategory = 'grocery',
  onCategoryChange,
  showStaticList = true,
  className = '',
}: AmenityMapFallbackProps) {
  const { lat, lng } = LONE_MOUNTAIN_COMMUNITY.center

  return (
    <div className={className}>
      {onCategoryChange && (
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
                onClick={() => onCategoryChange(category.id)}
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
      )}

      <div
        className="w-full h-[min(420px,60vh)] min-h-[320px] rounded-lg overflow-hidden border border-luxury-stone shadow-sm bg-luxury-cream"
        role="region"
        aria-label={`Map of ${LONE_MOUNTAIN_COMMUNITY.name}, Las Vegas`}
      >
        <iframe
          title={`${LONE_MOUNTAIN_COMMUNITY.name} area map`}
          src={embedMapUrl(lat, lng, LONE_MOUNTAIN_COMMUNITY.defaultZoom)}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-xs text-luxury-charcoal mt-2">
        Interactive amenity search loads when Google Maps is configured. Center:{' '}
        {LONE_MOUNTAIN_COMMUNITY.centerAddress}.
      </p>
      {showStaticList && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-luxury-navy mb-3">
            Featured places near Lone Mountain
          </h3>
          <StaticAmenityList categoryFilter={activeCategory} limit={activeCategory ? 8 : 6} />
        </div>
      )}
    </div>
  )
}
