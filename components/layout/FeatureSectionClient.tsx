'use client'

import dynamic from 'next/dynamic'

// Next 15 only allows `ssr: false` inside Client Components, so the
// client-only FeatureSection is loaded from here instead of from each page.
export const FeatureSection = dynamic(
  () => import('@/components/layout/FeatureSection').then(mod => mod.FeatureSection),
  { ssr: false }
)
