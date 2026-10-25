'use client'

import { MLSDisclaimer } from './MLSDisclaimer'

// RealScout Office Listings Widget Component
// @ts-ignore
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        'price-min'?: string;
        'price-max'?: string;
      };
    }
  }
}

interface RealScoutWidgetProps {
  className?: string;
  showDisclaimer?: boolean;
}

export function RealScoutWidget({ className = '', showDisclaimer = true }: RealScoutWidgetProps) {
  return (
    <div className={className}>
      <realscout-office-listings
        agent-encoded-id="QWdlbnQtMjI1MDUw"
        sort-order="NEWEST"
        listing-status="For Sale"
        property-types="SFR"
        price-min="400000"
        price-max="700000"
      ></realscout-office-listings>
      {showDisclaimer && <MLSDisclaimer />}
    </div>
  );
}
