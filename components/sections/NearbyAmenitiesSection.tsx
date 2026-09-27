import Link from 'next/link'
import { AmenityMap } from '@/components/maps/AmenityMap'
import { LONE_MOUNTAIN_COMMUNITY } from '@/lib/lone-mountain-map'

type NearbyAmenitiesSectionProps = {
  title?: string
  description?: string
  compact?: boolean
}

export function NearbyAmenitiesSection({
  title = `Life Near ${LONE_MOUNTAIN_COMMUNITY.name}`,
  description = `Explore restaurants, parks, grocery, healthcare, schools, and more around ${LONE_MOUNTAIN_COMMUNITY.fullName}. Dr. Jan Duffy helps buyers compare locations block by block.`,
  compact = false,
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      className="py-16 md:py-20 bg-luxury-cream"
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            id="nearby-amenities-heading"
            className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-luxury-charcoal">{description}</p>
          <Link
            href="/amenities"
            className="inline-block mt-4 text-luxury-gold font-semibold hover:underline"
          >
            View full Nearby Amenities guide →
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <AmenityMap
            defaultCategory={compact ? 'parks' : 'grocery'}
            showStaticListOnFallback={!compact}
          />
        </div>
      </div>
    </section>
  )
}
