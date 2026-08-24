import { HeroSection } from '@/components/sections/HeroSection'
import { LoneMountainListings } from '@/components/sections/LoneMountainListings'
import { MarketStatsSection } from '@/components/sections/MarketStatsSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { loneMountainFaqs } from '@/lib/lone-mountain-faqs'
import { CTASection } from '@/components/sections/CTASection'
import { CalendlyWidget } from '@/components/calendly/CalendlyWidget'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generateFaqSchema } from '@/lib/schema'
import { loneMountainHighlights } from '@/lib/site-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy',
  description:
    'Lone Mountain homes for sale. Expert Lone Mountain real estate with Dr. Jan Duffy. 30+ years Northwest Las Vegas experience. Buy or sell Lone Mountain homes. Call 702-222-1964.',
  keywords: [
    'Lone Mountain homes for sale',
    'Lone Mountain real estate',
    'Lone Mountain Las Vegas',
    'Lone Mountain real estate agent',
    'homes in Lone Mountain',
    'Northwest Las Vegas homes',
    'Dr. Jan Duffy Lone Mountain',
  ],
  openGraph: {
    title: 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy',
    description: 'Lone Mountain homes for sale. Expert real estate with Dr. Jan Duffy. 30+ years experience. Buy or sell in Lone Mountain.',
    url: '/',
  },
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={generateFaqSchema(loneMountainFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <main className="bg-white">
        <HeroSection />
        <LoneMountainListings />

        {/* Lone Mountain Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
                Why Choose Lone Mountain for Your Next Home?
              </h2>
              <p className="text-lg text-luxury-charcoal leading-relaxed">
                Lone Mountain in ZIP 89129 wraps around the peak with ranch homes, Rural Neighborhood Preservation lots,
                and custom estates. Dr. Jan Duffy has closed 500+ transactions across Northwest Las Vegas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {loneMountainHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-luxury-cream">
                  <span className="text-luxury-gold text-xl">✓</span>
                  <span className="font-medium text-luxury-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarketStatsSection />

        {/* Lone Mountain Neighborhood Links */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4">
                Explore Lone Mountain & Northwest Las Vegas
              </h2>
              <p className="text-lg text-luxury-charcoal max-w-2xl mx-auto">
                Your guide to Lone Mountain real estate and surrounding Northwest Las Vegas communities
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/neighborhood"
                className="block p-6 rounded-lg bg-luxury-cream hover:bg-luxury-stone/50 transition-colors text-center"
              >
                <h3 className="font-bold text-luxury-navy text-lg">Lone Mountain ranch homes</h3>
                <p className="text-sm text-luxury-charcoal mt-1">89129 RNP lots, The Estates, The Legends</p>
              </Link>
              <Link
                href="/properties"
                className="block p-6 rounded-lg bg-luxury-cream hover:bg-luxury-stone/50 transition-colors text-center"
              >
                <h3 className="font-bold text-luxury-navy text-lg">Lone Mountain Listings</h3>
                <p className="text-sm text-luxury-charcoal mt-1">Current homes for sale</p>
              </Link>
              <Link
                href="/home-valuation"
                className="block p-6 rounded-lg bg-luxury-cream hover:bg-luxury-stone/50 transition-colors text-center"
              >
                <h3 className="font-bold text-luxury-navy text-lg">Lone Mountain Home Value</h3>
                <p className="text-sm text-luxury-charcoal mt-1">Free property valuation</p>
              </Link>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection />

        {/* Lead capture – Ready to Find Your Mountain Retreat */}
        <section className="py-16 md:py-24 bg-luxury-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div className="mb-10 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4">
                  Ready to Find Your Mountain Retreat?
                </h2>
                <p className="text-lg text-luxury-charcoal leading-relaxed mb-6">
                  Explore homes for sale in Lone Mountain and Northwest Las Vegas. From mountain-view estates to ranch floor plans and gated condos, Dr. Jan Duffy can match the right 89129 pocket.
                </p>
                <ul className="space-y-3 text-luxury-charcoal">
                  <li className="flex items-center gap-2">
                    <span className="text-luxury-gold">✓</span>
                    Free Lone Mountain market insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-luxury-gold">✓</span>
                    Personalized home search & listings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-luxury-gold">✓</span>
                    30+ years Las Vegas real estate expertise
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-luxury-stone bg-white overflow-hidden shadow-sm">
                <CalendlyWidget height="630px" />
              </div>
            </div>
          </div>
        </section>

        <CTASection />

        <div className="bg-luxury-cream py-4 text-center text-sm text-luxury-charcoal">
          Last Updated: August 2026 | Homes at Lone Mountain | Lone Mountain Real Estate | Dr. Jan Duffy
        </div>
      </main>
    </>
  )
}
