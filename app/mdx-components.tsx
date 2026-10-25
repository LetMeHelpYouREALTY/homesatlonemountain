import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { ComponentProps } from 'react'

type ImgProps = ComponentProps<'img'>

// This type is required for Next.js 13+ with MDX
export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...components,
    img: ({ src, alt, className }: ImgProps) => {
      // React 19 types allow a Blob here; MDX only ever passes a URL string.
      if (!src || typeof src !== 'string') return null
      
      return (
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className={className}
          style={{ height: 'auto', width: '100%' }}
        />
      )
    }
  }
} 