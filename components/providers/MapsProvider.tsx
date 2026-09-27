'use client'

/**
 * Map pages load the Google Maps script via useLoadScript in Map/PropertyMap.
 * Do not wrap the site in LoadScript here — it SSRs "Loading..." and hides all page content from crawlers.
 */
export function MapsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
