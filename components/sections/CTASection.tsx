import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Phone, Mail, Home } from '@/components/ui/Icons'

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-luxury-navy to-luxury-navy-light text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Lone Mountain Home?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get expert Lone Mountain real estate guidance. Buy or sell with Dr. Jan Duffy—your trusted Northwest Las Vegas agent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold-light">
              <a href="tel:+17025001955" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call 702-500-1955
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/properties" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Lone Mountain Listings
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
          </div>

          <p className="text-white/70 text-sm">
            Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada Properties
          </p>
        </div>
      </div>
    </section>
  )
}
