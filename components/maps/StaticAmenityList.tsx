import {
  CURATED_AMENITIES,
  type CuratedAmenity,
} from '@/lib/lone-mountain-amenities-data'
import {
  AMENITY_CATEGORIES,
  directionsUrl,
  type AmenityCategoryId,
} from '@/lib/lone-mountain-map'

type StaticAmenityListProps = {
  categoryFilter?: AmenityCategoryId
  limit?: number
  className?: string
}

function labelForCategory(id: AmenityCategoryId): string {
  return AMENITY_CATEGORIES.find((c) => c.id === id)?.label ?? id
}

export function StaticAmenityList({
  categoryFilter,
  limit,
  className = '',
}: StaticAmenityListProps) {
  let items: CuratedAmenity[] = CURATED_AMENITIES
  if (categoryFilter) {
    items = items.filter((item) => item.category === categoryFilter)
  }
  if (limit) {
    items = items.slice(0, limit)
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-luxury-charcoal">
        Explore the map filters above for live nearby results.
      </p>
    )
  }

  return (
    <ul className={`space-y-3 ${className}`} aria-label="Curated nearby places">
      {items.map((item) => (
        <li
          key={`${item.name}-${item.address}`}
          className="rounded-lg border border-luxury-stone bg-white p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-luxury-navy">{item.name}</p>
              <p className="text-sm text-luxury-charcoal mt-1">{item.address}</p>
              <p className="text-xs text-luxury-charcoal/80 mt-1">
                {labelForCategory(item.category)}
              </p>
              {item.note && (
                <p className="text-sm text-luxury-charcoal mt-2">{item.note}</p>
              )}
            </div>
            <a
              href={directionsUrl(0, 0, `${item.name}, ${item.address}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-luxury-gold hover:underline shrink-0"
            >
              Directions
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
