import React from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, description }) => {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  };
  
  return (
    <div className="flex space-x-4">
      {Object.entries(shareUrls).map(([platform, shareUrl]) => (
        <a key={platform} href={shareUrl} target="_blank" rel="noopener noreferrer">
          {/* Social icons */}
        </a>
      ))}
    </div>
  );
};

export default SocialShare;