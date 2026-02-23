import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import dynamicImport from 'next/dynamic'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema } from '@/lib/schema'
import { assetPaths } from '@/lib/site-config'

// Force static generation for SEO
export const dynamic = 'force-static'
export const revalidate = 3600

const FeatureSection = dynamicImport(() => import('@/components/layout/FeatureSection').then(mod => mod.FeatureSection), { ssr: false })

const aboutFaqs = [
  { question: 'Who is Dr. Jan Duffy?', answer: 'Dr. Jan Duffy is a licensed real estate professional with over 30 years of experience in Las Vegas real estate. She specializes in Lone Mountain and Northwest Las Vegas, helping buyers and sellers achieve their goals. License #S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.' },
  { question: 'Why choose Homes at Lone Mountain?', answer: 'We offer personalized service, deep local market knowledge, integrity in every transaction, and a commitment to helping clients find their perfect home in the Lone Mountain community.' },
]

export const metadata: Metadata = {
  title: 'About Dr. Jan Duffy | Homes at Lone Mountain',
  description: 'Meet Dr. Jan Duffy, your trusted Lone Mountain real estate expert. 30+ years of Northwest Las Vegas experience helping buyers and sellers achieve their real estate goals.',
  openGraph: {
    title: 'About Dr. Jan Duffy | Homes at Lone Mountain',
    description: 'Meet Dr. Jan Duffy, your trusted Lone Mountain real estate expert. 30+ years of Northwest Las Vegas experience helping buyers and sellers achieve their real estate goals.',
    url: 'https://www.homesatlonemountain.com/about',
    type: 'profile',
    images: [
      {
        url: assetPaths.agentPhotoUrl,
        width: 800,
        height: 800,
        alt: 'Dr. Jan Duffy, Lone Mountain Realtor'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Jan Duffy | Homes at Lone Mountain',
    description: 'Meet Dr. Jan Duffy, your trusted Lone Mountain real estate expert. 30+ years of Northwest Las Vegas experience helping buyers and sellers achieve their real estate goals.',
    images: [`https://www.homesatlonemountain.com${assetPaths.agentPhoto}`]
  }
}

export default function AboutPage() {
  return (
    <Container>
      <SchemaMarkup schema={generateFaqSchema(aboutFaqs)} />
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Dr. Jan Duffy",
        "areaServed": "Lone Mountain, Las Vegas",
        "url": "https://www.homesatlonemountain.com/about",
        "image": assetPaths.agentPhotoUrl,
        "telephone": "+1-702-222-1964"
      }} />
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <div className="mx-auto mb-8 w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-luxury-gold shadow-xl ring-2 ring-luxury-navy/10">
            <img
              src={assetPaths.agentPhoto.replace(/\s/g, '%20')}
              alt="Dr. Jan Duffy, Lone Mountain Real Estate Expert"
              className="w-full h-full object-cover"
              width={224}
              height={224}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-luxury-navy sm:text-6xl">
            About Homes at Lone Mountain
          </h1>
          <p className="mt-6 text-lg leading-8 text-luxury-charcoal">
            We are dedicated to helping you find your perfect home in the beautiful Lone Mountain area. With years of experience and deep local knowledge, we provide personalized service to match you with your dream property.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-luxury-navy">Our Mission</h2>
            <p className="mt-4 text-luxury-charcoal">
              To provide exceptional real estate services that help our clients achieve their dreams of homeownership in the Lone Mountain community, while maintaining the highest standards of integrity and professionalism.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-luxury-navy">Our Values</h2>
            <ul className="mt-4 space-y-4 text-luxury-charcoal">
              <li>• Integrity in every transaction</li>
              <li>• Personalized attention to each client</li>
              <li>• Deep knowledge of the local market</li>
              <li>• Commitment to community growth</li>
              <li>• Excellence in service delivery</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-luxury-navy">Why Choose Us</h2>
            <p className="mt-4 text-luxury-charcoal">
              With our extensive experience in the Lone Mountain real estate market, we understand the unique characteristics and opportunities this area offers. We combine this knowledge with cutting-edge technology and personalized service to ensure you find the perfect property that meets your needs and exceeds your expectations.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-luxury-navy">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-4">
              {aboutFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                  <dd className="mt-1 text-luxury-charcoal">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <FeatureSection variant="alt2" ctaText="Meet Jan & See Her Top Listings!" ctaButtonText="Meet Jan's Picks" ctaIconUrl="/icons/user.svg" />
      </div>

      {/* Properties Listings Section */}
      <div className="mt-16 py-12 bg-white rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-luxury-navy">Available Properties</h2>
            <p className="text-lg text-luxury-charcoal">Browse our current listings</p>
          </div>
          <RealScoutWidget />
        </div>
      </div>
    </Container>
  )
} 