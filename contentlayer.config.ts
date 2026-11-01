import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const Property = defineDocumentType(() => ({
  name: 'Property',
  filePathPattern: 'properties/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    address: { type: 'string', required: true },
    price: { type: 'number', required: true },
    bedrooms: { type: 'number', required: true },
    bathrooms: { type: 'number', required: true },
    squareFeet: { type: 'number', required: true },
    description: { type: 'string', required: true },
    features: { type: 'list', of: { type: 'string' }, required: true },
    images: { type: 'list', of: { type: 'string' }, required: true },
    published: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    status: { type: 'string', required: true },
    coordinates: { type: 'string', required: true }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (property) => {
        const path = property._raw.flattenedPath
        const slug = path.startsWith('properties/') ? path.slice(11) : path
        return `/properties/${slug}`
      },
    },
    latitude: {
      type: 'number',
      resolve: (doc) => {
        const c = String((doc as { coordinates?: string }).coordinates ?? '').replace(/\r/g, '').trim()
        const [lat] = c.split(',')
        return parseFloat(lat || '0') || 0
      }
    },
    longitude: {
      type: 'number',
      resolve: (doc) => {
        const c = String((doc as { coordinates?: string }).coordinates ?? '').replace(/\r/g, '').trim()
        const [, lng] = c.split(',')
        return parseFloat(lng || '0') || 0
      }
    }
  },
}))

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: false },
    publishedAt: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    category: { type: 'string', required: true },
    published: { type: 'string', required: true },
    author: { type: 'string', required: true },
    featured: { type: 'string', default: 'false' }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    isFeatured: {
      type: 'boolean',
      resolve: (doc) => String((doc as { featured?: string }).featured || '').replace(/\r/g, '').trim().toLowerCase() === 'true'
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Property, Page, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
}) 