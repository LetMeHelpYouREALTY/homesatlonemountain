/**
 * Application Constants
 * Centralized configuration values
 */

// Site URLs
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homesatlonemountain.com'
export const CALENDLY_URL = 'https://calendly.com/drjanduffy/showing'

// Contact Information
export const PHONE_NUMBER = '702-500-1955'
export const PHONE_TEL = 'tel:+17025001955'
export const EMAIL = 'info@homesatlonemountain.com'

// RealScout Configuration
export const REALSCOUT_AGENT_ID = 'UA-1136617'
export const REALSCOUT_SCRIPT_URL = 'https://em.realscout.com/widgets/realscout-web-components.umd.js'

// Google Maps
export const DEFAULT_MAP_CENTER = { lat: 36.2455, lng: -115.2541 }
export const DEFAULT_MAP_ZOOM = 13

// Social Media
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/drjanduffy',
  instagram: 'https://www.instagram.com/drjanduffy',
  linkedin: 'https://www.linkedin.com/in/drjanduffy',
  youtube: 'https://www.youtube.com/@drjanduffy',
} as const

// SEO
export const DEFAULT_TITLE = 'Lone Mountain Homes for Sale | Las Vegas Real Estate | Dr. Jan Duffy'
export const DEFAULT_DESCRIPTION = 'Search Lone Mountain homes for sale in Las Vegas. Get expert guidance from Dr. Jan Duffy, 30+ years local experience.'

// Theme Colors (matching Tailwind config)
export const COLORS = {
  luxuryNavy: '#1a365d',
  luxuryGold: '#d69e2e',
  luxuryCream: '#faf5ef',
  luxuryCharcoal: '#2d3748',
  luxuryStone: '#e2e8f0',
} as const

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
