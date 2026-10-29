import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import Script from 'next/script'
import { CalendlyBadge } from '@/components/calendly/CalendlyBadge'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MapsProvider } from '@/components/providers/MapsProvider'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homesatlonemountain.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy',
    template: '%s | Lone Mountain Las Vegas'
  },
  description: 'Search Lone Mountain homes for sale in Las Vegas. Get expert guidance from Dr. Jan Duffy, 30+ years local experience. Updated daily listings, market reports, neighborhood insights.',
  keywords: ['Lone Mountain homes for sale', 'Lone Mountain Las Vegas', 'Las Vegas real estate', 'homes near Lone Mountain', 'Northwest Las Vegas homes', 'Lone Mountain real estate agent', 'Dr. Jan Duffy realtor'],
  authors: [{ name: 'Dr. Jan Duffy', url: siteUrl }],
  openGraph: {
    title: 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy',
    description: 'Search Lone Mountain homes for sale in Las Vegas. Get expert guidance from Dr. Jan Duffy, 30+ years local experience. Updated daily listings, market reports, neighborhood insights.',
    url: '/',
    siteName: 'Homes at Lone Mountain',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Homes at Lone Mountain'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy',
    description: 'Search Lone Mountain homes for sale in Las Vegas. Get expert guidance from Dr. Jan Duffy, 30+ years local experience.',
    images: ['/og-image.jpg'] // Use same image as Open Graph for consistency
  },
  alternates: {
    canonical: './', // Resolves to current route (metadataBase + path) per page
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <SchemaMarkup schema={organizationSchema} />
        <SchemaMarkup schema={websiteSchema} />
        {/* RealScout Widget Script - load before interactive; UMD needs classic script, not module */}
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="beforeInteractive"
        />
        <style>{`
          realscout-office-listings {
            --rs-listing-divider-color: #0e64c8;
            width: 100%;
          }
        `}</style>
      </head>
      <body className={`${inter.className} h-full`}>
        <MapsProvider>
          <AnalyticsProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
            <CalendlyBadge />
          </AnalyticsProvider>
        </MapsProvider>
      </body>
    </html>
  )
} 