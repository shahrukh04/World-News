import React, { useState, useEffect } from 'react';
import SimpleAd from '../SimpleAd';

interface AdCarouselProps {
  adSlots: string[];
  interval?: number; // Time in milliseconds between transitions
  className?: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

/**
 * AdCarousel component for rotating through multiple ads
 * This can be useful for showing multiple ads in a limited space
 * 
 * @param adSlots Array of AdSense ad slot IDs to rotate through
 * @param interval Time in milliseconds between transitions (default: 8000ms)
 * @param className Additional CSS classes
 * @param adFormat Format of the ads (defaults to 'rectangle')
 */
const AdCarousel: React.FC<AdCarouselProps> = ({
  adSlots,
  interval = 8000,
  className = '',
  adFormat = 'rectangle'
}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Skip if no ad slots provided
  if (!adSlots.length) return null;
  
  // If only one ad slot, just show it without rotation
  if (adSlots.length === 1) {
    return (
      <div className={className}>
        <SimpleAd 
          className="w-full"
        />
      </div>
    );
  }

  // Set up rotation for multiple ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => 
        prevIndex === adSlots.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [adSlots.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="transition-opacity duration-500">
        <SimpleAd 
          className="w-full"
        />
      </div>
      
      {/* Optional: Add navigation dots */}
      <div className="flex justify-center mt-2 space-x-1">
        {adSlots.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`w-2 h-2 rounded-full ${index === currentAdIndex ? 'bg-primary' : 'bg-gray-300'}`}
            onClick={() => setCurrentAdIndex(index)}
            aria-label={`Show ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;