import { Metadata } from 'next'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { generateFaqSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const faqs = [
  {
    question: 'Who is Dr. Jan Duffy?',
    answer: 'Dr. Jan Duffy is a licensed real estate professional with over 30 years of experience in Las Vegas real estate. She specializes in Lone Mountain and Northwest Las Vegas, helping buyers and sellers achieve their goals. License #S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.',
  },
  {
    question: 'How do I search for homes in Lone Mountain?',
    answer: 'You can browse current Lone Mountain listings on this site. Our RealScout integration shows live MLS listings. For a personalized search based on your criteria, call Dr. Jan Duffy at 702-500-1955 or use our contact form.',
  },
  {
    question: 'What is the Lone Mountain real estate market like?',
    answer: 'Lone Mountain is a sought-after Northwest Las Vegas neighborhood. Market conditions vary; Dr. Jan Duffy provides current market insights, comparable sales, and pricing guidance. Check our blog for market updates.',
  },
  {
    question: 'How do I get my home valued?',
    answer: 'Contact Dr. Jan Duffy at 702-500-1955 for a free, no-obligation home valuation. She will review comparable sales and market data to give you an accurate estimate of your property\'s value.',
  },
  {
    question: 'What areas does Homes at Lone Mountain serve?',
    answer: 'We focus on Lone Mountain, Northwest Las Vegas, Summerlin, and surrounding communities. Dr. Jan Duffy has deep local knowledge across the greater Las Vegas area.',
  },
  {
    question: 'How can I contact Dr. Jan Duffy?',
    answer: 'Call 702-500-1955 or visit our Contact page. Dr. Jan Duffy responds promptly to all inquiries and offers free consultations for buyers and sellers.',
  },
]

export const metadata: Metadata = {
  title: 'FAQ | Lone Mountain Real Estate | Dr. Jan Duffy',
  description: 'Frequently asked questions about Lone Mountain real estate, home buying, selling, and working with Dr. Jan Duffy. Get answers from a 30+ year Las Vegas expert.',
  openGraph: {
    title: 'FAQ | Lone Mountain Real Estate',
    description: 'FAQs about Lone Mountain homes, buying, selling, and Dr. Jan Duffy.',
    url: 'https://www.homesatlonemountain.com/faq',
  },
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }])} />
      <SchemaMarkup schema={generateFaqSchema(faqs)} />
      <div className="mx-auto max-w-3xl py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-luxury-navy sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-lg text-luxury-charcoal">
          Common questions about Lone Mountain real estate, buying, selling, and working with Dr. Jan Duffy.
        </p>

        <dl className="mt-16 space-y-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-luxury-stone pb-10 last:border-0">
              <dt className="text-xl font-semibold text-luxury-navy">{faq.question}</dt>
              <dd className="mt-4 text-luxury-charcoal">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 p-6 bg-luxury-cream rounded-lg border border-luxury-stone">
          <p className="text-lg font-semibold text-luxury-navy">Still have questions?</p>
          <p className="mt-2 text-luxury-charcoal">
            Call Dr. Jan Duffy at <a href="tel:+17025001955" className="text-luxury-gold font-semibold hover:underline">702-500-1955</a> for a personal consultation.
          </p>
        </div>
      </div>

      <section className="mt-16 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-luxury-navy mb-6 text-center">Lone Mountain Homes for Sale</h2>
        <RealScoutWidget />
      </section>
    </div>
  )
}
