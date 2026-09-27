// Site Configuration - Homes at Lone Mountain
// Hyper-focused on Lone Mountain, Northwest Las Vegas
// Berkshire Hathaway HomeServices Nevada Properties

export const siteConfig = {
  name: 'Homes at Lone Mountain',
  fullName: 'Homes at Lone Mountain | Lone Mountain Real Estate',
  url: 'https://www.homesatlonemountain.com',
  description:
    'Expert Lone Mountain real estate. Buy or sell homes in Lone Mountain, Northwest Las Vegas. Dr. Jan Duffy, 30+ years experience. Lone Mountain homes for sale, market insights, neighborhood guide.',
  primaryKeyword: 'Lone Mountain',
  secondaryKeywords: ['Lone Mountain homes for sale', 'Lone Mountain Las Vegas', 'Northwest Las Vegas real estate', 'Lone Mountain real estate agent'],
};

export const agentInfo = {
  name: 'Dr. Jan Duffy',
  title: 'REALTOR®',
  license: 'S.0197614.LLC',
  phone: '(702) 222-1964',
  phoneFormatted: '(702) 222-1964',
  phoneTel: 'tel:+17022221964',
  email: 'info@homesatlonemountain.com',
  brokerage: 'Berkshire Hathaway HomeServices Nevada Properties',
};

export const officeInfo = {
  address: {
    street: '9406 W Lake Mead Blvd, Suite 100',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89134',
    full: '9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134',
  },
  googleMapsUrl: 'https://maps.google.com/?q=9406+W+Lake+Mead+Blvd+Suite+100+Las+Vegas+NV+89134',
};

export const loneMountainStats = {
  medianPrice: 550000,
  medianPriceFormatted: '$550,000',
  priceRange: '$400,000 - $2,000,000',
  daysOnMarket: 35,
  yearOverYearChange: '+4.5%',
  lastUpdated: 'January 2026',
};

export const agentStats = {
  servingSince: 1994,
  yearsExperience: 30,
  transactionsClosed: 500,
  volumeClosed: '$127M+',
  averageRating: 4.9,
  reviewCount: 200,
};

// Asset paths - match filenames in public folder (spaces OK for same-origin, encoded for URLs)
const siteUrl = 'https://www.homesatlonemountain.com';
export const assetPaths = {
  agentPhoto: '/images/agent/design 0001_new 2.jpg',
  logo: '/icons/White Logo Berkshire Hathaway HomeServices Nevada.jpg',
  buyerGuide: '/documents/Things to Consider When Buying a Home Winter 2026.pdf',
  buyerGuideSpanish: '/documents/Things to Consider When Buying a Home Winter 2026 Spanish Version.pdf',
  // Full URLs for Open Graph, schema (encoded for external consumers)
  agentPhotoUrl: `${siteUrl}/images/agent/design%200001_new%202.jpg`,
  logoUrl: `${siteUrl}/icons/White%20Logo%20Berkshire%20Hathaway%20HomeServices%20Nevada.jpg`,
};

export const loneMountainHighlights = [
  'Mountain views',
  'Spacious homes',
  'Top-rated schools',
  'Family-friendly',
  'Northwest Las Vegas',
  'Easy access to Summerlin',
];

// Lone Mountain–focused services
export const services = [
  { name: 'Lone Mountain Homes for Sale', slug: 'properties', description: 'Browse current Lone Mountain listings' },
  { name: 'Buy a Home in Lone Mountain', slug: 'buyers', description: 'Expert buyer representation' },
  { name: 'Sell Your Lone Mountain Home', slug: 'sellers', description: 'Maximize your sale price' },
  { name: 'Lone Mountain Home Valuation', slug: 'home-valuation', description: 'Free property valuation' },
  { name: 'Lone Mountain Neighborhood Guide', slug: 'neighborhood', description: 'Schools, amenities, lifestyle' },
  { name: 'Nearby Amenities', slug: 'amenities', description: 'Interactive map of local dining, parks, and services' },
  { name: 'Market Updates', slug: 'blog', description: 'Lone Mountain market insights' },
];
