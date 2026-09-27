import Link from 'next/link'
import { agentStats, loneMountainStats } from '@/lib/site-config'

export function HeroSection() {
  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden bg-gradient-to-br from-luxury-navy via-luxury-navy-light to-luxury-navy-dark">

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Lone Mountain Homes for Sale
          <br />
          <span className="text-luxury-gold">Northwest Las Vegas</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Your trusted Lone Mountain real estate expert. Buy or sell homes in Lone Mountain with Dr. Jan Duffy—30+ years of Las Vegas experience.
        </p>

        {/* RealScout Simple Search - Lone Mountain focus */}
        <div className="realscout-wrapper w-full max-w-2xl mb-6">
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>`,
            }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm mb-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{agentStats.yearsExperience}+</span>
            <span>Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{loneMountainStats.medianPriceFormatted}</span>
            <span>Lone Mountain Median</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{agentStats.averageRating}★</span>
            <span>Average Rating</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+17022221964"
            className="inline-flex items-center justify-center bg-luxury-gold text-luxury-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-luxury-gold-light transition-colors"
          >
            Call 702-222-1964
          </a>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
          >
            View Lone Mountain Listings
          </Link>
        </div>
      </div>
    </div>
  )
}
