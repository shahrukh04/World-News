import React from 'react';
import SimpleAd from '../SimpleAd';

interface AdGridProps {
  adSlots: string[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

/**
 * AdGrid component for displaying multiple ads in a responsive grid layout
 * 
 * @param adSlots Array of AdSense ad slot IDs
 * @param columns Number of columns in the grid (1-4, defaults to 3)
 * @param className Additional CSS classes
 * @param adFormat Format of the ads (defaults to 'auto')
 */
const AdGrid: React.FC<AdGridProps> = ({
  adSlots,
  columns = 3,
  className = '',
  adFormat = 'auto'
}) => {
  if (!adSlots.length) return null;

  // Determine grid columns based on prop
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`w-full ${className}`}>
      <div className={`grid ${gridClass} gap-4`}>
        {adSlots.map((slot, index) => (
          <div key={`ad-${slot}-${index}`} className="w-full">
            <SimpleAd 
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdGrid;