import { MLSDisclaimer } from '@/components/properties/MLSDisclaimer'

// Type declaration for RealScout custom element (shared with RealScoutWidget)
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

import React from 'react';

interface FeatureSectionProps {
  variant?: 'default' | 'alt1' | 'alt2';
  ctaText?: string;
  ctaButtonText?: string;
  ctaIconUrl?: string;
}

export function FeatureSection({
  variant = 'default',
  ctaText = 'See the Latest Lone Mountain Listings!',
  ctaButtonText = 'Browse Listings',
  ctaIconUrl = '/icons/house.svg',
}: FeatureSectionProps) {
  // Choose a unique style for each variant
  let containerClass = 'rounded-xl shadow-2xl p-10 my-12 bg-gradient-to-br from-[#F7F9FC] to-[#E6F2FB] border-l-8 border-[#3A8DDE]';
  let arrowColor = '#3A8DDE';
  if (variant === 'alt1') {
    containerClass = 'rounded-2xl shadow-xl p-12 my-16 bg-gradient-to-br from-[#F7F9FC] to-[#16B286] border-t-8 border-[#16B286]';
    arrowColor = '#16B286';
  } else if (variant === 'alt2') {
    containerClass = 'rounded-lg shadow-lg p-8 my-8 bg-gradient-to-br from-[#E6F2FB] to-[#F7F9FC] border-b-8 border-[#0A2540]';
    arrowColor = '#0A2540';
  }

  return (
    <section className={`${containerClass} flex flex-col items-center relative overflow-hidden`}>  
      <div className="flex items-center gap-4 mb-4">
        <img src={ctaIconUrl} alt="icon" className="w-10 h-10" />
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] text-center drop-shadow-lg animate-fade-in">{ctaText}</h2>
      </div>
      <button className="mb-2 px-8 py-3 bg-[#3A8DDE] hover:bg-[#16B286] text-white font-semibold rounded-full shadow-lg transition-colors duration-300 animate-bounce">
        {ctaButtonText}
      </button>
      {/* Animated arrow */}
      <svg className="w-8 h-8 mb-2 animate-bounce" fill="none" stroke={arrowColor} strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
      </svg>
      {/* RealScout Widget Embed */}
      <div className="w-full max-w-2xl rounded-lg shadow-md bg-white p-4">
        <realscout-office-listings 
          agent-encoded-id="QWdlbnQtMjI1MDUw" 
          sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
          listing-status="For Sale" 
          property-types="SFR,MF"
        ></realscout-office-listings>
        <MLSDisclaimer className="text-center" />
      </div>
      <p className="mt-4 text-[#3A8DDE] text-center font-medium">Browse the best homes in Lone Mountain, handpicked for you by Dr. Jan Duffy.</p>
    </section>
  );
} 