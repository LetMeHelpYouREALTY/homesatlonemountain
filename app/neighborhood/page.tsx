import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'
import Link from 'next/link'
import { NearbyAmenitiesSection } from '@/components/sections/NearbyAmenitiesSection'

export const dynamic = 'force-static'
export const revalidate = 3600

const neighborhoodFaq = [
  {
    question: 'Where is Lone Mountain in Las Vegas?',
    answer: 'Lone Mountain is located in Northwest Las Vegas, Nevada. The area is bounded roughly by US-95 to the east, Kyle Canyon Road to the north, and features mountain views and easy access to Summerlin and Downtown Las Vegas.',
  },
  {
    question: 'What are the average home prices in Lone Mountain?',
    answer: 'Lone Mountain homes typically range from approximately $400,000 to over $2 million, depending on size, age, and amenities. Current market conditions vary; contact Dr. Jan Duffy for up-to-date pricing and trends.',
  },
  {
    question: 'Are there good schools in the Lone Mountain area?',
    answer: 'Yes. Lone Mountain is served by Clark County School District schools. The area is near several highly rated elementary, middle, and high schools. Dr. Jan Duffy can provide specific school information for properties you\'re considering.',
  },
]

export const metadata: Metadata = {
  title: 'Lone Mountain Neighborhood Guide | Las Vegas Real Estate',
  description: 'Discover Lone Mountain, Northwest Las Vegas: schools, amenities, lifestyle, and homes for sale. Expert neighborhood insights from Dr. Jan Duffy. 702-222-1964.',
  openGraph: {
    title: 'Lone Mountain Neighborhood Guide | Las Vegas',
    description: 'Discover Lone Mountain: schools, amenities, lifestyle. Expert insights from Dr. Jan Duffy.',
    url: 'https://www.homesatlonemountain.com/neighborhood',
  },
}

export default function NeighborhoodPage() {
  return (
    <Container>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Neighborhood', url: '/neighborhood' }])} />
      <SchemaMarkup schema={generateFaqSchema(neighborhoodFaq)} />
      <div className="mx-auto max-w-3xl py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-luxury-navy sm:text-5xl">
          Lone Mountain Neighborhood Guide
        </h1>
        <p className="mt-6 text-lg text-luxury-charcoal">
          Lone Mountain is one of Las Vegas’s most desirable Northwest neighborhoods, offering mountain views, family-friendly communities, and convenient access to shopping, dining, and recreation.
        </p>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Location & Lifestyle</h2>
            <p className="mt-4 text-luxury-charcoal">
              Located in Northwest Las Vegas, Lone Mountain provides a blend of suburban comfort and natural scenery. Residents enjoy spacious single-family homes, well-maintained streets, and a strong sense of community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Schools & Education</h2>
            <p className="mt-4 text-luxury-charcoal">
              The area is served by Clark County School District. Families have access to a variety of public and private educational options. Contact Dr. Jan Duffy for school boundary and rating information for specific properties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Amenities & Recreation</h2>
            <ul className="mt-4 space-y-2 text-luxury-charcoal">
              <li>• Parks and outdoor recreation</li>
              <li>• Shopping and dining nearby</li>
              <li>• Easy access to Summerlin and Downtown</li>
              <li>• Mountain views and hiking opportunities</li>
            </ul>
            <p className="mt-4">
              <Link href="/amenities" className="text-luxury-gold font-semibold hover:underline">
                Explore the interactive Nearby Amenities map →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6">
              {neighborhoodFaq.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                  <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="mt-12 p-6 bg-luxury-cream rounded-lg border border-luxury-stone">
          <p className="text-lg font-semibold text-luxury-navy">Explore Lone Mountain homes</p>
          <p className="mt-2 text-luxury-charcoal">
            Dr. Jan Duffy has 30+ years of experience in Lone Mountain real estate. <Link href="/contact" className="text-luxury-gold font-semibold hover:underline">Contact her</Link> or call <a href="tel:+17022221964" className="text-luxury-gold font-semibold hover:underline">702-222-1964</a> for a personalized consultation.
          </p>
        </div>
      </div>

      <NearbyAmenitiesSection
        title="What's Nearby in Lone Mountain"
        compact
      />

      <section className="mt-16 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-luxury-navy mb-6 text-center">Homes for Sale in Lone Mountain</h2>
        <RealScoutWidget />
      </section>
    </Container>
  )
}
