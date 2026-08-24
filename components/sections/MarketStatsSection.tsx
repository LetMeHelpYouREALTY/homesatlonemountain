import Link from 'next/link'
import { loneMountainStats } from '@/lib/site-config'

export function MarketStatsSection() {
  return (
    <section className="py-16 bg-luxury-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lone Mountain Real Estate Market | {loneMountainStats.lastUpdated}
          </h2>
          <p className="text-white/80">
            Current Lone Mountain and Northwest Las Vegas market data
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">
              {loneMountainStats.medianPriceFormatted}
            </div>
            <div className="text-white/80 text-sm">Lone Mountain Median List</div>
            {loneMountainStats.medianNote ? (
              <div className="mt-1 text-xs text-white/70">{loneMountainStats.medianNote}</div>
            ) : null}
            {loneMountainStats.yearOverYearChange ? (
              <div className="text-luxury-green text-sm">{loneMountainStats.yearOverYearChange} YoY</div>
            ) : null}
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">
              {loneMountainStats.daysOnMarket}
            </div>
            <div className="text-white/80 text-sm">Avg Days on Market</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">30+</div>
            <div className="text-white/80 text-sm">Years Lone Mountain Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2">500+</div>
            <div className="text-white/80 text-sm">Properties Sold</div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block bg-luxury-gold hover:bg-luxury-gold-light text-luxury-navy px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Lone Mountain Market Updates
          </Link>
        </div>
      </div>
    </section>
  )
}
