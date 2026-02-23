import { Metadata } from 'next'
import Link from 'next/link'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { assetPaths } from '@/lib/site-config'
import { Phone, Search, Home, Key, CheckCircle } from '@/components/ui/Icons'

export const metadata: Metadata = {
  title: 'Buy a Home in Lone Mountain',
  description: 'Buy a home in Lone Mountain, Northwest Las Vegas. Dr. Jan Duffy guides Lone Mountain buyers through every step. Free consultation. Call 702-222-1964.',
  keywords: ['buy Lone Mountain home', 'Lone Mountain home buyer', 'homes for sale Lone Mountain', 'Lone Mountain real estate buyer'],
  openGraph: {
    title: 'Buy a Home in Lone Mountain | Dr. Jan Duffy',
    description: 'Buy a home in Lone Mountain, Northwest Las Vegas. Expert buyer guidance from Dr. Jan Duffy, 30+ years experience. Free consultation.',
    url: 'https://www.homesatlonemountain.com/buyers',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy a Home in Lone Mountain | Dr. Jan Duffy',
    description: 'Expert Lone Mountain buyer guidance from Dr. Jan Duffy. Free consultation. Call 702-222-1964.',
  },
}

const steps = [
  { icon: Search, title: 'Find Your Lone Mountain Home', desc: 'Browse Lone Mountain listings and get alerts for new properties matching your criteria.' },
  { icon: Home, title: 'Tour Lone Mountain Properties', desc: 'Dr. Jan schedules showings and provides neighborhood insights for each Lone Mountain home.' },
  { icon: Key, title: 'Make an Offer & Close', desc: 'Expert negotiation for Lone Mountain purchases. Smooth closing with 30+ years experience.' },
]

export default function BuyersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Buyers', url: '/buyers' }])} />
      <div className="py-16">
        <nav className="text-sm text-luxury-charcoal mb-8">
          <Link href="/" className="hover:text-luxury-gold">Home</Link>
          {' / '}
          <span className="text-luxury-navy">Buy a Lone Mountain Home</span>
        </nav>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
            Buy a Home in Lone Mountain
          </h1>
          <p className="text-xl text-luxury-charcoal">
            Expert buyer representation for Lone Mountain and Northwest Las Vegas. Dr. Jan Duffy helps you find your perfect Lone Mountain home with 30+ years of local experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="text-center p-6 bg-luxury-cream rounded-lg">
                <Icon className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                <h3 className="font-bold text-luxury-navy mb-2">{step.title}</h3>
                <p className="text-luxury-charcoal text-sm">{step.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-luxury-navy text-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Why Buy in Lone Mountain with Dr. Jan Duffy?</h2>
          <ul className="space-y-2">
            {['30+ years Lone Mountain and Northwest Las Vegas experience', 'Access to all Lone Mountain MLS listings', 'Expert negotiation for your Lone Mountain purchase', 'Free buyer representation—sellers typically pay commission', 'Neighborhood tours and school information'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="tel:+17022221964"
            className="inline-flex items-center gap-2 mt-6 bg-luxury-gold text-luxury-navy px-6 py-3 rounded-lg font-bold hover:bg-luxury-gold-light transition-colors"
          >
            <Phone className="h-5 w-5" />
            Call 702-222-1964
          </a>
        </div>

        <div className="mb-16 p-6 bg-luxury-cream rounded-lg">
          <h2 className="text-2xl font-bold text-luxury-navy mb-4">Free Buyer&apos;s Guide</h2>
          <p className="text-luxury-charcoal mb-4">Download our guide: Things to Consider When Buying a Home Winter 2026.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={assetPaths.buyerGuide}
              download
              className="inline-flex items-center gap-2 bg-luxury-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-luxury-navy-light transition-colors"
            >
              Download Buyer&apos;s Guide (PDF)
            </a>
            <a
              href={assetPaths.buyerGuideSpanish}
              download
              className="inline-flex items-center gap-2 border-2 border-luxury-navy text-luxury-navy px-6 py-3 rounded-lg font-semibold hover:bg-luxury-navy hover:text-white transition-colors"
            >
              Descargar Guía en Español
            </a>
          </div>
        </div>

        <section className="py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-luxury-navy mb-6 text-center">Lone Mountain Homes for Sale</h2>
          <RealScoutWidget />
        </section>
      </div>
    </div>
  )
}
