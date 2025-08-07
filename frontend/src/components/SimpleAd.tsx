import React from 'react';

interface SimpleAdProps {
  className?: string;
  style?: React.CSSProperties;
}

const SimpleAd: React.FC<SimpleAdProps> = ({ className = '', style }) => {
  return (
    <div className={`w-full ${className}`} style={style}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4811298709706693" 
           crossOrigin="anonymous"></script>
      {/* worldnewdiplayadsquare */}
      <ins className="adsbygoogle" 
           style={{display:'block'}} 
           data-ad-client="ca-pub-4811298709706693" 
           data-ad-slot="8827226056" 
           data-ad-format="auto" 
           data-full-width-responsive="true"></ins>
      <script 
           dangerouslySetInnerHTML={{
             __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
           }}
      />
    </div>
  );
};

export default SimpleAd;