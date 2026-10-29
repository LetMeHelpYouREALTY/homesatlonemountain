'use client'

import { Star } from '@/components/ui/Icons'

export interface Review {
  id: number
  name: string
  location: string
  rating: number
  text: string
}

export const loneMountainReviews: Review[] = [
  {
    id: 1,
    name: 'The Smith Family',
    location: 'Lone Mountain, Las Vegas',
    rating: 5,
    text: 'Dr. Duffy made our Lone Mountain home purchase a breeze. Her expertise and care are unmatched!',
  },
  {
    id: 2,
    name: 'M. Johnson',
    location: 'Northwest Las Vegas',
    rating: 5,
    text: "We sold above asking thanks to Jan's strategy and local Lone Mountain knowledge.",
  },
  {
    id: 3,
    name: 'The Martinez Family',
    location: 'Lone Mountain',
    rating: 5,
    text: 'Found our dream home in Lone Mountain. Dr. Jan Duffy guided us every step of the way.',
  },
]

interface ReviewsSectionProps {
  reviews?: Review[]
  title?: string
  subtitle?: string
  googleReviewsUrl?: string
}

export function ReviewsSection({
  reviews = loneMountainReviews,
  title = 'Lone Mountain Client Reviews',
  subtitle = 'What clients say about buying and selling homes in Lone Mountain with Dr. Jan Duffy',
  googleReviewsUrl = 'https://search.google.com/local/writereview?placeid=ChIJ7XLw8ta5yIARjTZPjgHJWVQ',
}: ReviewsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-luxury-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
            {title}
          </h2>
          <p className="text-xl text-luxury-charcoal max-w-3xl mx-auto">{subtitle}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < 5 ? 'text-luxury-gold fill-luxury-gold' : 'text-luxury-stone'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-luxury-navy">5.0</span>
            <span className="text-luxury-charcoal">(50 Realtor.com reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center mr-4">
                  <span className="text-luxury-navy font-bold">{review.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-luxury-navy">{review.name}</h3>
                  <p className="text-sm text-luxury-charcoal">{review.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-luxury-gold fill-luxury-gold' : 'text-luxury-stone'
                    }`}
                  />
                ))}
              </div>
              <p className="text-luxury-charcoal italic">&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-luxury-gold hover:text-luxury-gold-light font-semibold"
          >
            Read More Lone Mountain Reviews on Google
            <Star className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
          </a>
        </div>
      </div>
    </section>
  )
}
