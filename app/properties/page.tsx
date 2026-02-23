import { Metadata } from 'next'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import dynamicImport from 'next/dynamic'
import { PropertiesList } from '@/components/properties/PropertiesList'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'

// Force static generation for SEO
export const dynamic = 'force-static'
export const revalidate = 3600 // Rebuild every hour

export const metadata: Metadata = {
  title: 'Lone Mountain Properties for Sale',
  description: 'Browse all homes for sale in Lone Mountain, Las Vegas. Find your dream property with Dr. Jan Duffy\'s expert guidance and local knowledge. Updated daily listings. Call 702-222-1964.',
  openGraph: {
    title: 'Lone Mountain Properties for Sale | Dr. Jan Duffy',
    description: 'Browse all homes for sale in Lone Mountain, Las Vegas. Updated daily MLS listings with expert guidance from Dr. Jan Duffy.',
    url: 'https://www.homesatlonemountain.com/properties',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Properties for Sale',
    description: 'Browse all homes for sale in Lone Mountain, Las Vegas. Updated daily listings. Expert guidance from Dr. Jan Duffy.',
  },
}

const FeatureSection = dynamicImport(() => import('@/components/layout/FeatureSection').then(mod => mod.FeatureSection), { ssr: false })

const propertiesFaqs = [
  { question: 'How do I search for homes in Lone Mountain?', answer: 'Use our property search above to browse current MLS listings. For a personalized search based on your criteria and budget, call Dr. Jan Duffy at 702-222-1964.' },
  { question: 'Are the listings updated in real time?', answer: 'Yes. Our listings are pulled directly from the Multiple Listing Service (MLS) and are updated regularly. Contact Dr. Jan Duffy for the most current availability.' },
]

export default function PropertiesPage() {
  return (
    <div className="py-16">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Properties', url: '/properties' }])} />
      <SchemaMarkup schema={generateFaqSchema(propertiesFaqs)} />
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Lone Mountain Homes for Sale",
        "description": "Browse all homes for sale in Lone Mountain, Las Vegas. Find your dream property with Dr. Jan Duffy's expert guidance and local knowledge.",
        "url": "https://www.homesatlonemountain.com/properties"
      }} />
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-luxury-navy mb-4">
            Lone Mountain Homes for Sale - Las Vegas, Nevada
          </h1>
          <p className="text-xl text-luxury-charcoal mb-2">
            Discover your perfect home in the Lone Mountain area
          </p>
          <p className="text-lg text-luxury-charcoal">
            Expert guidance from Dr. Jan Duffy | Call <a href="tel:+17022221964" className="text-luxury-gold font-semibold hover:underline">702-222-1964</a>
          </p>
        </div>

        {/* RealScout Widget */}
        <div className="mb-16 bg-white rounded-lg shadow-lg p-6">
          <RealScoutWidget />
        </div>

        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-luxury-navy mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {propertiesFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PropertiesList />

        <FeatureSection variant="alt1" ctaText="See All Lone Mountain Listings!" ctaButtonText="Browse All Homes" ctaIconUrl="/icons/house.svg" />
      </div>
    </div>
  )
}