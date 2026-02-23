import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { Phone, CheckCircle, TrendingUp } from '@/components/ui/Icons'

export const metadata: Metadata = {
  title: 'Sell Your Lone Mountain Home',
  description: 'Sell your Lone Mountain home with Dr. Jan Duffy. Maximize your Lone Mountain sale price. 30+ years Northwest Las Vegas experience. Free valuation. Call 702-222-1964.',
  keywords: ['sell Lone Mountain home', 'Lone Mountain home seller', 'Lone Mountain real estate seller', 'sell house Lone Mountain'],
  openGraph: {
    title: 'Sell Your Lone Mountain Home | Dr. Jan Duffy',
    description: 'Sell your Lone Mountain home and maximize your sale price. 30+ years Northwest Las Vegas experience. Free home valuation. Call 702-222-1964.',
    url: 'https://www.homesatlonemountain.com/sellers',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Lone Mountain Home | Dr. Jan Duffy',
    description: 'Maximize your Lone Mountain home sale price with Dr. Jan Duffy. Free valuation. 30+ years experience.',
  },
}

export default function SellersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Sellers', url: '/sellers' }])} />
      <div className="py-16">
        <nav className="text-sm text-luxury-charcoal mb-8">
          <Link href="/" className="hover:text-luxury-gold">Home</Link>
          {' / '}
          <span className="text-luxury-navy">Sell Your Lone Mountain Home</span>
        </nav>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
            Sell Your Lone Mountain Home
          </h1>
          <p className="text-xl text-luxury-charcoal">
            Get top dollar for your Lone Mountain property. Dr. Jan Duffy combines 30+ years of Northwest Las Vegas expertise with professional marketing to sell your Lone Mountain home fast and for the best price.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-luxury-cream rounded-lg p-8">
            <h2 className="text-2xl font-bold text-luxury-navy mb-4">Lone Mountain Seller Services</h2>
            <ul className="space-y-3">
              {['Free Lone Mountain home valuation', 'Strategic pricing for maximum Lone Mountain sale price', 'Professional marketing of your Lone Mountain listing', 'Expert negotiation for your Lone Mountain sale', 'Smooth closing with 30+ years experience'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-luxury-green flex-shrink-0" />
                  <span className="text-luxury-navy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-luxury-navy text-white rounded-lg p-8">
            <TrendingUp className="h-12 w-12 text-luxury-gold mb-4" />
            <h2 className="text-2xl font-bold mb-4">Lone Mountain Market Insight</h2>
            <p className="text-white/90 mb-4">
              Lone Mountain homes are in demand. Well-priced properties typically sell within 30-45 days. Dr. Jan Duffy provides accurate pricing from day one—the key to selling your Lone Mountain home fast and for top dollar.
            </p>
            <a
              href="tel:+17022221964"
              className="inline-flex items-center gap-2 bg-luxury-gold text-luxury-navy px-6 py-3 rounded-lg font-bold hover:bg-luxury-gold-light transition-colors"
            >
              <Phone className="h-5 w-5" />
              Get Your Free Lone Mountain Valuation
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
