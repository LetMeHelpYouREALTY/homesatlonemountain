import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 3600

const servicesFaq = [
  {
    question: 'What real estate services does Dr. Jan Duffy offer?',
    answer: 'Dr. Jan Duffy provides full-service real estate for buyers and sellers in Lone Mountain and Northwest Las Vegas, including home valuations, listing representation, buyer representation, market analysis, and relocation assistance.',
  },
  {
    question: 'How do I get a home valuation for my Lone Mountain property?',
    answer: 'Contact Dr. Jan Duffy at 702-222-1964 for a free, no-obligation home valuation. She will analyze comparable sales and current market conditions to provide an accurate estimate of your home\'s value.',
  },
  {
    question: 'What areas does Homes at Lone Mountain serve?',
    answer: 'We specialize in Lone Mountain, Northwest Las Vegas, Summerlin, and surrounding communities. Dr. Jan Duffy has 30+ years of local expertise in the greater Las Vegas area.',
  },
]

export const metadata: Metadata = {
  title: 'Real Estate Services | Lone Mountain Buyers & Sellers | Dr. Jan Duffy',
  description: 'Expert Lone Mountain real estate services: home valuations, buyer & seller representation, market analysis. Dr. Jan Duffy, 30+ years Las Vegas experience. Call 702-222-1964.',
  openGraph: {
    title: 'Real Estate Services | Lone Mountain | Dr. Jan Duffy',
    description: 'Expert real estate services in Lone Mountain: valuations, buyer & seller representation, market analysis. 30+ years experience.',
    url: 'https://www.homesatlonemountain.com/services',
  },
}

export default function ServicesPage() {
  return (
    <Container>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])} />
      <SchemaMarkup schema={generateFaqSchema(servicesFaq)} />
      <div className="mx-auto max-w-3xl py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-luxury-navy sm:text-5xl">
          Real Estate Services in Lone Mountain
        </h1>
        <p className="mt-6 text-lg text-luxury-charcoal">
          Dr. Jan Duffy offers full-service real estate support for buyers and sellers in Lone Mountain and Northwest Las Vegas. With 30+ years of local experience, she guides you through every step of the process.
        </p>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">For Buyers</h2>
            <ul className="mt-4 space-y-3 text-luxury-charcoal">
              <li>• Personalized home search matching your criteria and budget</li>
              <li>• Neighborhood tours and market insights</li>
              <li>• Negotiation and transaction coordination</li>
              <li>• Relocation assistance for out-of-area buyers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">For Sellers</h2>
            <ul className="mt-4 space-y-3 text-luxury-charcoal">
              <li>• Free home valuation and comparative market analysis</li>
              <li>• Strategic pricing and marketing plans</li>
              <li>• Professional staging and photography coordination</li>
              <li>• Full representation through closing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6">
              {servicesFaq.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                  <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="mt-12 p-6 bg-luxury-cream rounded-lg border border-luxury-stone">
          <p className="text-lg font-semibold text-luxury-navy">Ready to get started?</p>
          <p className="mt-2 text-luxury-charcoal">
            Call Dr. Jan Duffy at <a href="tel:+17022221964" className="text-luxury-gold font-semibold hover:underline">702-222-1964</a> or{' '}
            <Link href="/contact" className="text-luxury-gold font-semibold hover:underline">contact us online</Link>.
          </p>
          <p className="mt-2 text-sm text-luxury-charcoal">License #S.0197614.LLC | Berkshire Hathaway HomeServices Nevada Properties</p>
        </div>
      </div>

      <section className="mt-16 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-luxury-navy mb-6 text-center">Lone Mountain Homes for Sale</h2>
        <RealScoutWidget />
      </section>
    </Container>
  )
}
