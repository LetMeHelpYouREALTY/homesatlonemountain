import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { AmenityMap } from '@/components/maps/AmenityMap'
import { agentInfo, officeInfo } from '@/lib/site-config'
import { amenitiesPageFaqs } from '@/lib/lone-mountain-amenities-data'
import { LONE_MOUNTAIN_COMMUNITY } from '@/lib/lone-mountain-map'
import {
  generateAmenitiesItemListSchema,
  generateBreadcrumbSchema,
  generateCommunityPlaceSchema,
  generateDrJanDuffyAgentSchema,
  generateFaqSchema,
} from '@/lib/schema'
import { Phone, MapPin, Mail } from '@/components/ui/Icons'

export const dynamic = 'force-static'
export const revalidate = 3600

const pageTitle = `Nearby Amenities in ${LONE_MOUNTAIN_COMMUNITY.name}, Las Vegas`
const pageDescription =
  'Interactive map of restaurants, parks, grocery, healthcare, schools, and shopping near Lone Mountain, Northwest Las Vegas. Local guide from Dr. Jan Duffy. Call 702-222-1964.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/amenities',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/amenities',
  },
}

export default function AmenitiesPage() {
  return (
    <Container>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Nearby Amenities', url: '/amenities' },
        ])}
      />
      <SchemaMarkup schema={generateFaqSchema(amenitiesPageFaqs)} />
      <SchemaMarkup schema={generateCommunityPlaceSchema()} />
      <SchemaMarkup schema={generateAmenitiesItemListSchema()} />
      <SchemaMarkup schema={generateDrJanDuffyAgentSchema()} />

      <article className="mx-auto max-w-4xl py-16 sm:py-20">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-luxury-navy sm:text-5xl">
            Nearby Amenities in {LONE_MOUNTAIN_COMMUNITY.name}, Las Vegas
          </h1>
          <p className="mt-6 text-lg text-luxury-charcoal leading-relaxed">
            Lone Mountain sits in Northwest Las Vegas with mountain views, family neighborhoods, and quick access to
            Summerlin, US-95, and the Las Vegas Beltway. Use the interactive map below to explore dining, parks,
            grocery, healthcare, and schools—or read the hyperlocal summaries for buyers comparing blocks in{' '}
            {LONE_MOUNTAIN_COMMUNITY.zip} and surrounding zip codes.
          </p>
        </header>

        <section className="mb-16" aria-labelledby="amenity-map-heading">
          <h2 id="amenity-map-heading" className="text-2xl font-bold text-luxury-navy mb-4">
            Interactive amenity map
          </h2>
          <p className="text-luxury-charcoal mb-6">
            Center point: {LONE_MOUNTAIN_COMMUNITY.centerAddress} ({LONE_MOUNTAIN_COMMUNITY.centerSource}).
          </p>
          <AmenityMap defaultCategory="grocery" />
        </section>

        <div className="space-y-12 text-luxury-charcoal">
          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Dining &amp; cafes</h2>
            <p className="mt-4">
              Northwest Las Vegas chains and local favorites line Cheyenne Avenue, Craig Road, and the Centennial Hills
              corridor. Summerlin and Downtown Summerlin add chef-driven restaurants within a short drive. For a specific
              Lone Mountain address, Dr. Jan Duffy can map your commute to favorite spots.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Parks &amp; recreation</h2>
            <p className="mt-4">
              <strong>Lone Mountain Regional Park</strong> (9825 W Lone Mountain Rd) is the anchor Clark County park with
              trails, sports fields, and picnic pavilions. <strong>Majestic Park</strong> (3997 N Hualapai Way) and{' '}
              <strong>Skyridge Park</strong> (10500 Stange Ave) add playgrounds and open space for families in the
              area.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Grocery &amp; daily errands</h2>
            <p className="mt-4">
              <strong>Albertsons</strong> at 6730 N Hualapai Way and 7151 W Craig Rd, plus{' '}
              <strong>Walmart Supercenter</strong> at 10440 W Cheyenne Ave, are go-to options for Lone Mountain
              residents stocking up without crossing town.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Healthcare</h2>
            <p className="mt-4">
              <strong>Centennial Hills Hospital Medical Center</strong> (6900 N Durango Dr),{' '}
              <strong>MountainView Hospital</strong> (3100 N Tenaya Way), and{' '}
              <strong>Summerlin Hospital Medical Center</strong> (6575 Town Center Dr) provide emergency and specialty
              care within a typical Northwest Las Vegas drive from Lone Mountain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Shopping</h2>
            <p className="mt-4">
              Centennial Hills retail, Craig Road corridors, and <strong>Downtown Summerlin</strong> (1980 Festival
              Plaza Dr) cover big-box, boutique, and entertainment shopping west of the Strip.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Schools</h2>
            <p className="mt-4">
              Clark County School District serves Lone Mountain. Nearby public schools include{' '}
              <strong>Decker Elementary</strong> (8825 Paddle Wheel Dr), <strong>Paul Allen Elementary</strong> (8101 Oso
              Blanca Rd), and <strong>Centennial High School</strong> (10200 W Centennial Pkwy). Always confirm
              attendance boundaries for the exact home you are buying.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury-navy">Commute &amp; key destinations</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                <strong>Las Vegas Strip:</strong> often about 25–40 minutes by car depending on traffic (approximate).
              </li>
              <li>
                <strong>Harry Reid International Airport:</strong> often about 25–35 minutes southeast (approximate).
              </li>
              <li>
                <strong>Downtown Summerlin:</strong> often about 15–25 minutes west (approximate).
              </li>
              <li>
                <strong>US-95 &amp; Las Vegas Beltway (215):</strong> primary freeway access for commuters from Lone
                Mountain.
              </li>
            </ul>
          </section>

          <section aria-labelledby="amenities-faq-heading">
            <h2 id="amenities-faq-heading" className="text-2xl font-bold text-luxury-navy">
              Lone Mountain amenities FAQ
            </h2>
            <dl className="mt-6 space-y-6">
              {amenitiesPageFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                  <dd className="mt-2">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside
          className="mt-16 p-8 rounded-xl bg-luxury-navy text-white"
          aria-labelledby="agent-cta-heading"
        >
          <h2 id="agent-cta-heading" className="text-2xl font-bold mb-3">
            Your Lone Mountain real estate expert
          </h2>
          <p className="text-white/90 mb-6">
            {agentInfo.name}, {agentInfo.title} — {agentInfo.brokerage}. License {agentInfo.license}. I tour Lone
            Mountain with buyers every week and can match you to homes near the parks, schools, and errands you care
            about.
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-luxury-gold shrink-0" />
              <a href={agentInfo.phoneTel} className="hover:text-luxury-gold font-semibold">
                {agentInfo.phoneFormatted}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-luxury-gold shrink-0" />
              <a href={`mailto:${agentInfo.email}`} className="hover:text-luxury-gold">
                {agentInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5" />
              <a
                href={officeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-luxury-gold"
              >
                {officeInfo.address.full}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-luxury-gold text-luxury-navy px-6 py-3 font-bold hover:bg-luxury-gold-light transition-colors"
            >
              Contact Dr. Jan Duffy
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Lone Mountain listings
            </Link>
          </div>
        </aside>
      </article>
    </Container>
  )
}
