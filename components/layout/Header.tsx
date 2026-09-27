'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown } from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Lone Mountain Listings' },
    { href: '/neighborhood', label: 'Lone Mountain Neighborhood' },
    { href: '/amenities', label: 'Nearby Amenities' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const serviceLinks = [
    { href: '/buyers', label: 'Buy a Lone Mountain Home' },
    { href: '/sellers', label: 'Sell Your Lone Mountain Home' },
    { href: '/home-valuation', label: 'Lone Mountain Home Valuation' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Lone Mountain Market Updates' },
    { href: '/market-report', label: 'Market Report' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className={`flex items-center justify-between ${isScrolled ? 'h-12' : 'h-16'}`}>
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link href="/" className="text-xl md:text-2xl font-bold text-luxury-navy hover:text-luxury-gold transition-colors">
                Lone Mountain
              </Link>
              <a href="tel:+17022221964" className="text-sm text-luxury-charcoal hover:text-luxury-gold transition-colors font-medium">
                702-222-1964
              </a>
            </div>
            <div className="ml-8 hidden lg:flex items-center space-x-6">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-luxury-navy hover:text-luxury-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  className="flex items-center text-base font-medium text-luxury-navy hover:text-luxury-gold transition-colors"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                >
                  Services
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {isServicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-luxury-stone"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-luxury-navy hover:bg-luxury-cream hover:text-luxury-gold"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-luxury-gold text-luxury-navy hover:bg-luxury-gold-light hidden sm:flex">
              <a href="tel:+17022221964" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call 702-222-1964
              </a>
            </Button>
            <button
              className="lg:hidden p-2 text-luxury-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-luxury-stone">
            <div className="flex flex-col space-y-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-luxury-navy hover:text-luxury-gold font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-luxury-stone">
                <span className="text-xs font-semibold text-luxury-charcoal uppercase px-2">Services</span>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 px-2 text-luxury-navy hover:text-luxury-gold font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button asChild className="bg-luxury-gold text-luxury-navy mt-4">
                <a href="tel:+17022221964" className="flex items-center justify-center gap-2 py-3">
                  <Phone className="h-4 w-4" />
                  Call 702-222-1964
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
