import { agentInfo, assetPaths } from './site-config'
import { LONE_MOUNTAIN_COMMUNITY } from '@/lib/lone-mountain-map'
import { CURATED_AMENITIES } from '@/lib/lone-mountain-amenities-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homesatlonemountain.com'

// Logo path - matches public folder
const logoPath = '/icons/White Logo Berkshire Hathaway HomeServices Nevada.jpg'

// NAP must match GBP; uses BHHS office address
const officeAddress = {
  streetAddress: '9406 W Lake Mead Blvd, Suite 100',
  addressLocality: 'Las Vegas',
  addressRegion: 'NV',
  postalCode: '89134',
  addressCountry: 'US'
}

const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '10:00',
    closes: '16:00'
  }
]

const socialProfiles = [
  'https://www.facebook.com/homesatlonemountain',
  'https://www.instagram.com/homesatlonemountain',
  'https://www.linkedin.com/company/homes-at-lone-mountain'
]

export function generatePropertySchema(property: {
  title: string
  description: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  images: string[]
  features: string[]
  latitude: number
  longitude: number
  status: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: property.title,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address.split(',')[0],
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89129',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude,
      longitude: property.longitude
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: property.status === 'active' ? 'InStock' : 'SoldOut'
    },
    numberOfRooms: property.bedrooms + 2, // bedrooms + living room + kitchen
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.squareFeet,
      unitCode: 'FTK'
    },
    image: property.images.map(img => `https://www.homesatlonemountain.com${img}`),
    amenityFeature: property.features.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      name: feature
    })),
    url: `https://www.homesatlonemountain.com${property.url}`
  }
}

interface BlogPostSchemaInput {
  title: string
  description: string
  image: string
  published: string
  author: string
  url: string
}

export function generateBlogPostSchema(post: BlogPostSchemaInput) {
  const url = post.url.startsWith('http') ? post.url : `${baseUrl}${post.url}`
  const image = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.published,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Homes at Lone Mountain',
      logo: {
        '@type': 'ImageObject',
        url: logoPath,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

/** Primary agent entity for site-wide JSON-LD (Dr. Jan Duffy). */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: agentInfo.name,
    jobTitle: agentInfo.title,
    description:
      'Licensed Nevada REALTOR specializing in Lone Mountain and Northwest Las Vegas homes for sale.',
    url: baseUrl,
    image: assetPaths.agentPhotoUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoPath,
      width: '180',
      height: '60'
    },
    identifier: agentInfo.license,
    worksFor: {
      '@type': 'Organization',
      name: agentInfo.brokerage,
      address: {
        '@type': 'PostalAddress',
        ...officeAddress
      }
    },
    address: {
      '@type': 'PostalAddress',
      ...officeAddress
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2455,
      longitude: -115.2541
    },
    telephone: '+1-702-222-1964',
    email: agentInfo.email,
    sameAs: socialProfiles,
    openingHoursSpecification,
    areaServed: {
      '@type': 'Place',
      name: 'Lone Mountain, Las Vegas, Nevada'
    }
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

export function generateCommunityPlaceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${baseUrl}/amenities#community`,
    name: LONE_MOUNTAIN_COMMUNITY.fullName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LONE_MOUNTAIN_COMMUNITY.centerAddress.split(',')[0],
      addressLocality: LONE_MOUNTAIN_COMMUNITY.city,
      addressRegion: LONE_MOUNTAIN_COMMUNITY.state,
      postalCode: LONE_MOUNTAIN_COMMUNITY.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LONE_MOUNTAIN_COMMUNITY.center.lat,
      longitude: LONE_MOUNTAIN_COMMUNITY.center.lng,
    },
  }
}

export function generateDrJanDuffyAgentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#agent`,
    name: 'Dr. Jan Duffy',
    jobTitle: 'REALTOR®',
    telephone: '+1-702-222-1964',
    email: 'info@homesatlonemountain.com',
    url: `${baseUrl}/about`,
    worksFor: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Place',
      name: LONE_MOUNTAIN_COMMUNITY.fullName,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: LONE_MOUNTAIN_COMMUNITY.center.lat,
        longitude: LONE_MOUNTAIN_COMMUNITY.center.lng,
      },
    },
  }
}

export function generateAmenitiesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Featured places near ${LONE_MOUNTAIN_COMMUNITY.name}`,
    itemListElement: CURATED_AMENITIES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        url: place.sourceUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.address.split(',')[0],
          addressLocality: LONE_MOUNTAIN_COMMUNITY.city,
          addressRegion: LONE_MOUNTAIN_COMMUNITY.state,
          addressCountry: 'US',
        },
      },
    })),
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.homesatlonemountain.com/#website',
    name: 'Homes at Lone Mountain',
    url: 'https://www.homesatlonemountain.com',
    publisher: {
      '@id': `${baseUrl}/#agent`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.homesatlonemountain.com/properties?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
} 