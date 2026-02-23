import { Metadata } from 'next'
import Link from 'next/link'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { Phone, CheckCircle } from '@/components/ui/Icons'

export const metadata: Metadata = {
  title: 'Lone Mountain Home Valuation',
  description: 'Get a free Lone Mountain home valuation. What is your Lone Mountain home worth? Dr. Jan Duffy provides accurate CMA for Northwest Las Vegas. Call 702-222-1964.',
  keywords: ['Lone Mountain home valuation', 'Lone Mountain home value', 'what is my Lone Mountain home worth', 'free Lone Mountain CMA'],
  openGraph: {
    title: 'Lone Mountain Home Valuation | Dr. Jan Duffy',
    description: 'Get a free Lone Mountain home valuation. Dr. Jan Duffy provides accurate CMAs using current MLS data and local expertise. Call 702-222-1964.',
    url: 'https://www.homesatlonemountain.com/home-valuation',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Home Valuation | Dr. Jan Duffy',
    description: 'Get a free, accurate Lone Mountain home valuation from Dr. Jan Duffy. Call 702-222-1964.',
  },
}

const faqs = [
  {
    question: 'How accurate are online home value estimates for Lone Mountain?',
    answer: 'Online estimates can be off by 5-15% or more. A professional CMA from Dr. Jan Duffy uses current Lone Mountain MLS data, comparable sales, and local expertise for accurate pricing.',
  },
  {
    question: 'What affects my Lone Mountain home\'s value?',
    answer: 'Location, size, condition, upgrades, lot characteristics, and Lone Mountain market conditions. Dr. Jan analyzes all factors for your specific property.',
  },
  {
    question: 'How long does a Lone Mountain home valuation take?',
    answer: 'Dr. Jan typically provides a comprehensive Lone Mountain market analysis within 24-48 hours. Call 702-222-1964 to get started.',
  },
]

export default function HomeValuationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Home Valuation', url: '/home-valuation' }])} />
      <SchemaMarkup schema={generateFaqSchema(faqs)} />
      <div className="py-16">
        <nav className="text-sm text-luxury-charcoal mb-8">
          <Link href="/" className="hover:text-luxury-gold">Home</Link>
          {' / '}
          <span className="text-luxury-navy">Lone Mountain Home Valuation</span>
        </nav>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
            What&apos;s Your Lone Mountain Home Worth?
          </h1>
          <p className="text-xl text-luxury-charcoal">
            Free, no-obligation Lone Mountain home valuation from Dr. Jan Duffy. 30+ years of Northwest Las Vegas expertise. Accurate pricing for your Lone Mountain property.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          <div className="bg-luxury-cream rounded-lg p-8">
            <h2 className="text-2xl font-bold text-luxury-navy mb-4">Get Your Free Lone Mountain Valuation</h2>
            <p className="text-luxury-charcoal mb-6">
              Call Dr. Jan Duffy at 702-222-1964 for a comprehensive Lone Mountain market analysis. Provide your address and property details—receive an accurate price range within 24-48 hours.
            </p>
            <div className="space-y-3 mb-8">
              {['Lone Mountain comparable sales analysis', 'Current market conditions', 'Feature-by-feature adjustments', 'Strategic pricing recommendations', 'No obligation'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-luxury-green flex-shrink-0" />
                  <span className="text-luxury-navy">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="tel:+17022221964"
              className="inline-flex items-center gap-2 bg-luxury-gold text-luxury-navy px-6 py-3 rounded-lg font-bold hover:bg-luxury-gold-light transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call 702-222-1964
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-luxury-navy mb-4">Lone Mountain FAQs</h2>
            <dl className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                  <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
                </div>
              ))}
            </dl>
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
