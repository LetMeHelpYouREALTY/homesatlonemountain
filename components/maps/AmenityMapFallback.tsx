import { LONE_MOUNTAIN_COMMUNITY, embedMapUrl } from '@/lib/lone-mountain-map'
import { StaticAmenityList } from '@/components/maps/StaticAmenityList'
import type { AmenityCategoryId } from '@/lib/lone-mountain-map'

type AmenityMapFallbackProps = {
  activeCategory?: AmenityCategoryId
  showStaticList?: boolean
  className?: string
}

export function AmenityMapFallback({
  activeCategory,
  showStaticList = true,
  className = '',
}: AmenityMapFallbackProps) {
  const { lat, lng } = LONE_MOUNTAIN_COMMUNITY.center

  return (
    <div className={className}>
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
