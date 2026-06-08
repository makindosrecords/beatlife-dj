import React from 'react';

// Custom Inline SVG Icons for stability
export const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export const WeddingWireIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {/* Clean overlapping rings representing weddings / WeddingWire profile */}
    <ellipse cx="8.5" cy="12" rx="5.5" ry="5.5" />
    <ellipse cx="15.5" cy="12" rx="5.5" ry="5.5" />
    <path d="M12 9v6" strokeWidth="1.5" />
  </svg>
);

export const TheKnotIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {/* Stylized premium continuous twist loop representing "The Knot" */}
    <path d="M4 12c0-3.3 2.7-6 6-6 2.5 0 4.7 1.5 5.6 3.8L4.4 14.2C4.1 13.5 4 12.8 4 12zm16 0c0 3.3-2.7 6-6 6-2.5 0-4.7-1.5-5.6-3.8l11.2-4.4c.3.7.4 1.4.4 2.2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);