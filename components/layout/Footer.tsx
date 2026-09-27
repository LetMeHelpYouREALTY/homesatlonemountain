import React from 'react'
import Link from 'next/link'
import { agentInfo, officeInfo } from '@/lib/site-config'
import { Phone, Mail, MapPin } from '@/components/ui/Icons'

const quickLinks = [
  { name: 'Lone Mountain Listings', href: '/properties' },
  { name: 'Neighborhood', href: '/neighborhood' },
  { name: 'Nearby Amenities', href: '/amenities' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
]

const serviceLinks = [
  { name: 'Buy a Lone Mountain Home', href: '/buyers' },
  { name: 'Sell Your Lone Mountain Home', href: '/sellers' },
  { name: 'Home Valuation', href: '/home-valuation' },
  { name: 'Services', href: '/services' },
  { name: 'Market Updates', href: '/blog' },
  { name: 'Market Report', href: '/market-report' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-luxury-navy text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">Homes at Lone Mountain</h3>
            <p className="text-white/80 mb-4 text-sm">
              Your trusted Lone Mountain real estate expert. Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties—30+ years serving Northwest Las Vegas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-luxury-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Lone Mountain Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-luxury-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAP - Name, Address, Phone (GBP/local SEO) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Dr. Jan Duffy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-luxury-gold flex-shrink-0 mt-0.5" />
                <a
                  href={officeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-gold transition-colors text-sm"
                >
                  {officeInfo.address.full}
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-luxury-gold flex-shrink-0" />
                <Link
                  href={agentInfo.phoneTel}
                  className="text-white/80 hover:text-luxury-gold transition-colors text-sm"
                >
                  {agentInfo.phoneFormatted}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-luxury-gold flex-shrink-0" />
                <Link
                  href={`mailto:${agentInfo.email}`}
                  className="text-white/80 hover:text-luxury-gold transition-colors text-sm"
                >
                  {agentInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Homes at Lone Mountain. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/faq" className="text-white/60 hover:text-luxury-gold transition-colors">
                FAQ
              </Link>
              <Link href="/sitemap.xml" className="text-white/60 hover:text-luxury-gold transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4 text-center">
            {agentInfo.name}, {agentInfo.title} | License {agentInfo.license} | {agentInfo.brokerage}
          </p>
        </div>
      </div>
    </footer>
  )
}
