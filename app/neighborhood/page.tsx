import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm'
import { generateFaqSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/schema'
import { agentInfo, officeInfo } from '@/lib/site-config'
import {
  googleReviewsSearchUrl,
  loneMountainParkMapEmbedUrl,
  officeHours,
  officeMapEmbedUrl,
  neighborhoodFaqs,
  neighborhoodMarketAsOf,
  neighborhoodPockets,
  priceTiers,
} from '@/lib/lone-mountain-neighborhood'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Lone Mountain Ranch Homes for Sale | Las Vegas 89129 Real Estate',
  description:
    'Lone Mountain ranch homes, RNP lots, The Legends condos, and custom estates in Las Vegas ZIP 89129. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties. Call 702-222-1964.',
  keywords: [
    'Lone Mountain ranch homes Las Vegas',
    'Lone Mountain 89129',
    'The Estates at Lone Mountain',
    'Rural Neighborhood Preservation Las Vegas',
    'The Legends Las Vegas condos',
  ],
  openGraph: {
    title: 'Lone Mountain Ranch Homes for Sale | Las Vegas 89129',
    description:
      'Ranch homes, horse-zoned RNP lots, gated condos, and custom estates around Lone Mountain peak. Call Dr. Jan Duffy at 702-222-1964.',
    url: 'https://www.homesatlonemountain.com/neighborhood',
  },
}

export default function NeighborhoodPage() {
  return (
    <Container>
      <SchemaMarkup schema={generateOrganizationSchema()} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Lone Mountain Ranch Homes', url: '/neighborhood' },
        ])}
      />
      <SchemaMarkup schema={generateFaqSchema(neighborhoodFaqs)} />

      <article className="mx-auto max-w-3xl py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-luxury-gold">
          ZIP 89129 · Northwest Las Vegas
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-luxury-navy sm:text-5xl">
          Lone Mountain Ranch Homes in Las Vegas
        </h1>
        <p className="mt-6 text-lg text-luxury-charcoal">
          Lone Mountain sits in Northwest Las Vegas ZIP 89129, around the standalone Lone Mountain peak. Clark County
          Rural Neighborhood Preservation zoning keeps lots larger than nearby master-planned tracts. Inventory includes
          horse-capable parcels, custom luxury mini-estates, and single-story ranch homes, with trailheads at the base
          of the peak.
        </p>
        <p className="mt-4 text-luxury-charcoal">
          <Link href="/properties" className="font-semibold text-luxury-gold hover:underline">
            Lone Mountain homes for sale
          </Link>{' '}
          update from the MLS. Dr. Jan Duffy with {agentInfo.brokerage} works this pocket from{' '}
          {officeInfo.address.full}. Call{' '}
          <a href={agentInfo.phoneTel} className="font-semibold text-luxury-gold hover:underline">
            702-222-1964
          </a>
          .
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={agentInfo.phoneTel}
            className="inline-flex items-center rounded-md bg-luxury-gold px-4 py-2 font-semibold text-luxury-navy hover:bg-luxury-gold-light"
          >
            Call 702-222-1964
          </a>
          <a
            href={officeInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-luxury-navy px-4 py-2 font-semibold text-luxury-navy hover:bg-luxury-cream"
          >
            Directions
          </a>
          <a
            href={googleReviewsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-luxury-navy px-4 py-2 font-semibold text-luxury-navy hover:bg-luxury-cream"
          >
            View Google Reviews
          </a>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Real estate market snapshot</h2>
          <p className="mt-4 text-luxury-charcoal">
            Listings span condos, ranch floor plans, and gated custom compounds. Figures below were researched{' '}
            {neighborhoodMarketAsOf}. Prices move with inventory—confirm any address with a live CMA before you write.
          </p>
          <div className="mt-8 grid gap-6">
            {priceTiers.map((tier) => (
              <div key={tier.name} className="rounded-lg border border-luxury-stone bg-luxury-cream p-6">
                <h3 className="text-xl font-bold text-luxury-navy">{tier.name}</h3>
                <p className="mt-1 font-semibold text-luxury-gold">{tier.range}</p>
                <p className="mt-3 text-luxury-charcoal">{tier.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Neighborhood pockets</h2>
          <div className="mt-8 space-y-8">
            {neighborhoodPockets.map((pocket) => (
              <div key={pocket.name}>
                <h3 className="text-xl font-semibold text-luxury-navy">{pocket.name}</h3>
                <p className="mt-3 text-luxury-charcoal">{pocket.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Parks, trails, schools, and commute</h2>
          <ul className="mt-4 space-y-4 text-luxury-charcoal">
            <li>
              <strong className="text-luxury-navy">Lone Mountain Regional Park:</strong> Walking paths, pavilions,
              playgrounds, and an equestrian center sit at the east base of the peak (near N. Jensen Street).
            </li>
            <li>
              <strong className="text-luxury-navy">Trails:</strong> A packed-gravel perimeter path of about 2.2 miles
              circles the peak for hikers, runners, and horseback riders. Combined park-and-loop routes measure about
              3.2 miles.
            </li>
            <li>
              <strong className="text-luxury-navy">Clark County School District:</strong> Many 89129 addresses, including{' '}
              <Link href="/properties" className="font-semibold text-luxury-gold hover:underline">
                homes near The Legends
              </Link>
              , are zoned to Eileen Conners Elementary School, Justice Myron E. Leavitt Middle School, and Centennial
              High School. Confirm the assigned campuses for the exact street.
            </li>
            <li>
              <strong className="text-luxury-navy">Location:</strong> Directly north of Summerlin, with ramps to the 215
              Beltway and U.S. 95. Downtown Summerlin shopping is a short drive; the Las Vegas Strip is typically about
              20 minutes southeast, depending on traffic.
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Lone Mountain peak map</h2>
          <p className="mt-3 text-sm text-luxury-charcoal">
            Pin at Lone Mountain Regional Park, Las Vegas, NV 89129.
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-luxury-stone">
            <iframe
              title="Map of Lone Mountain Regional Park in Las Vegas ZIP 89129"
              src={loneMountainParkMapEmbedUrl}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Visit Homes at Lone Mountain</h2>
          <p className="mt-4 text-luxury-charcoal">
            <strong>Homes at Lone Mountain</strong>
            <br />
            {officeInfo.address.full}
            <br />
            <a href={agentInfo.phoneTel} className="font-semibold text-luxury-gold hover:underline">
              {agentInfo.phoneFormatted}
            </a>
          </p>
          <ul className="mt-4 text-luxury-charcoal">
            {officeHours.map((row) => (
              <li key={row.days}>
                {row.days}: {row.hours}
              </li>
            ))}
          </ul>
          <div className="mt-4 overflow-hidden rounded-lg border border-luxury-stone">
            <iframe
              title={`Google Map pin for ${officeInfo.address.full}`}
              src={officeMapEmbedUrl}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-luxury-navy">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {neighborhoodFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-luxury-navy">{faq.question}</dt>
                <dd className="mt-2 text-luxury-charcoal">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 rounded-lg border border-luxury-stone bg-luxury-cream p-6">
          <h2 className="text-2xl font-bold text-luxury-navy">Buy or sell a Lone Mountain ranch home</h2>
          <p className="mt-3 text-luxury-charcoal">
            Tell Dr. Jan Duffy your price tier (condo, standard single-family, or custom estate), whether you need a
            no-HOA or horse-zoned parcel, and if you want a ranch layout or a modern custom build.
          </p>
          <div className="mt-6 rounded-lg border border-luxury-stone bg-white p-6">
            <LeadCaptureForm
              leadType="buyer"
              title="Request Lone Mountain matches"
              buttonText="Send my criteria"
              source="neighborhood-ranch-guide"
              showMessage
              messagePlaceholder="Price tier, HOA or horse zoning, ranch vs. custom build"
            />
          </div>
          <p className="mt-4 text-sm text-luxury-charcoal">
            Or{' '}
            <Link href="/contact" className="font-semibold text-luxury-gold hover:underline">
              open the contact page
            </Link>{' '}
            /{' '}
            <Link href="/home-valuation" className="font-semibold text-luxury-gold hover:underline">
              request a Lone Mountain home valuation
            </Link>
            .
          </p>
        </section>
      </article>

      <section className="mt-8 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-luxury-navy">
          Lone Mountain homes for sale
        </h2>
        <RealScoutWidget />
      </section>
    </Container>
  )
}
