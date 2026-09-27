import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { allProperties } from 'contentlayer/generated'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homesatlonemountain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
  
  // Static pages with priorities
  const staticRoutes = [
    { route: '', priority: 1.0, changeFreq: 'weekly' as const },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/properties', priority: 0.9, changeFreq: 'daily' as const },
    { route: '/neighborhood', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/amenities', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/services', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/faq', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/home-valuation', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/buyers', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/sellers', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/market-report', priority: 0.9, changeFreq: 'weekly' as const },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))

  // Dynamic blog post routes
  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(post.published),
    changeFrequency: 'monthly' as const,
    priority: (post as unknown as { isFeatured?: boolean }).isFeatured ? 0.9 : 0.7,
  }))

  // Dynamic property routes
  const propertyRoutes = allProperties.map((property) => ({
    url: `${baseUrl}${property.url}`,
    lastModified: new Date(property.published),
    changeFrequency: 'weekly' as const,
    priority: property.featured ? 0.9 : 0.8,
  }))
  
  return [...staticRoutes, ...blogRoutes, ...propertyRoutes]
}
