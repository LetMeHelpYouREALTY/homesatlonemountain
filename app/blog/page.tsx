import { Metadata } from 'next'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { FeatureSection } from '@/components/layout/FeatureSectionClient'
import { BlogList } from '@/components/blog/BlogList'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'

// Force static generation for SEO
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Lone Mountain Real Estate Blog | Homes at Lone Mountain',
  description: 'Read the latest news, tips, and market trends for Lone Mountain real estate. Stay informed with Dr. Jan Duffy\'s expert blog.',
  openGraph: {
    title: 'Lone Mountain Real Estate Blog | Homes at Lone Mountain',
    description: 'Read the latest news, tips, and market trends for Lone Mountain real estate. Stay informed with Dr. Jan Duffy\'s expert blog.',
    url: 'https://www.homesatlonemountain.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://www.homesatlonemountain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lone Mountain Real Estate Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Real Estate Blog | Homes at Lone Mountain',
    description: 'Read the latest news, tips, and market trends for Lone Mountain real estate. Stay informed with Dr. Jan Duffy\'s expert blog.',
    images: ['https://www.homesatlonemountain.com/og-image.jpg']
  }
}


const blogFaqs = [
  { question: 'What does the Lone Mountain real estate blog cover?', answer: 'Our blog covers market updates, neighborhood insights, buying and selling tips, and local real estate trends for Lone Mountain and Northwest Las Vegas. Written by Dr. Jan Duffy with 30+ years of experience.' },
  { question: 'How often is the blog updated?', answer: 'We publish new articles regularly to keep you informed about the Lone Mountain market. Subscribe or check back often for the latest insights.' },
]

export default function BlogPage() {
  return (
    <div className="py-16">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }])} />
      <SchemaMarkup schema={generateFaqSchema(blogFaqs)} />
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Lone Mountain Real Estate Blog",
        "description": "Read the latest news, tips, and market trends for Lone Mountain real estate. Stay informed with Dr. Jan Duffy's expert blog.",
        "url": "https://www.homesatlonemountain.com/blog"
      }} />
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-luxury-navy mb-4">
            Lone Mountain Real Estate Market Updates
          </h1>
          <p className="text-xl text-luxury-charcoal mb-2">
            Stay informed about the Lone Mountain real estate market
          </p>
          <p className="text-lg text-luxury-charcoal">
            Expert insights from Dr. Jan Duffy | <a href="tel:+17025001955" className="text-luxury-gold font-semibold hover:underline">702-500-1955</a>
          </p>
        </div>

        <BlogList />

        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-luxury-navy mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {blogFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        <FeatureSection variant="alt1" ctaText="Explore the Latest Blog-Featured Listings!" ctaButtonText="See Blog Picks" ctaIconUrl="/icons/blog.svg" />

        {/* Properties Listings Section */}
        <div className="mt-16 py-12 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-luxury-navy">Available Properties</h2>
            <p className="text-lg text-luxury-charcoal">Browse our current listings</p>
          </div>
          <RealScoutWidget />
        </div>
      </div>
    </div>
  )
}