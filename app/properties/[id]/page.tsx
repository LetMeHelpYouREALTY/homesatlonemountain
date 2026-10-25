import React from 'react'
import { notFound } from 'next/navigation'
import { allProperties } from 'contentlayer/generated'
import PropertyMap from '@/components/property/PropertyMap'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { generatePropertySchema, generateBreadcrumbSchema } from '@/lib/schema'
import { RealScoutWidget } from '@/components/properties/RealScoutWidget'

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyPage(props: PropertyPageProps) {
  const params = await props.params;
  const property = allProperties.find((p) => p.url === `/properties/${params.id}`)

  if (!property) {
    notFound()
  }

  const propertySchema = generatePropertySchema({
    title: property.title,
    description: property.description,
    address: property.address,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    squareFeet: property.squareFeet,
    images: property.images,
    features: property.features,
    latitude: property.latitude,
    longitude: property.longitude,
    status: property.status,
    url: property.url,
  })

  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Properties', url: '/properties' }, { name: property.title, url: property.url }])} />
      <SchemaMarkup schema={propertySchema} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-luxury-navy">{property.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="card-luxury">
              <h2 className="text-2xl font-semibold mb-4 text-luxury-navy">Property Details</h2>
              <p className="text-luxury-charcoal mb-4">{property.address}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-luxury-charcoal">Price</p>
                  <p className="text-lg font-semibold text-luxury-navy">${property.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-luxury-charcoal">Bedrooms</p>
                  <p className="text-lg font-semibold text-luxury-navy">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-luxury-charcoal">Bathrooms</p>
                  <p className="text-lg font-semibold text-luxury-navy">{property.bathrooms}</p>
                </div>
              </div>
              <div className="prose max-w-none text-luxury-charcoal">
                {property.description}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-luxury-navy">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-luxury-charcoal">
                      <svg
                        className="w-5 h-5 text-luxury-gold mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <PropertyMap
              propertyLocation={{ lat: property.latitude, lng: property.longitude }}
              propertyTitle={property.title}
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
        {/* RealScout Office Listings - on every page per SEO/engagement */}
        <section className="mt-12 pt-12 border-t border-luxury-stone">
          <h2 className="text-2xl font-bold text-luxury-navy mb-6">More Lone Mountain Homes for Sale</h2>
          <RealScoutWidget />
        </section>
      </div>
    </>
  )
} 