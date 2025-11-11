import React, { useEffect, useState } from 'react';

interface SimpleAdProps {
  className?: string;
  style?: React.CSSProperties;
  /** If true, render the ad even if the content check fails (use carefully) */
  forceShow?: boolean;
  /** Minimum text length to consider a page as having publisher content */
  minTextLength?: number;
}

/**
 * SimpleAd renders an AdSense ad, but only when the page appears to contain
 * meaningful publisher content. This helps avoid showing Google-served ads
 * on empty/placeholder pages and reduces the risk of AdSense policy violations.
 */
const SimpleAd: React.FC<SimpleAdProps> = ({
  className = '',
  style,
  forceShow = false,
  minTextLength = 200
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (forceShow) {
      setShouldRender(true);
      return;
    }

    const selectors = ['article', '.post-content', '.news-article', '.news-list', '#main', '.home-hero'];

    const checkForContent = (): boolean => {
      try {
        for (const sel of selectors) {
          const el = document.querySelector(sel);
          if (!el) continue;
          const text = (el.textContent || '').trim();
          const images = el.querySelectorAll('img').length;
          if (text.length >= minTextLength || images > 0) return true;
        }

        // As a fallback, check the body text length
        const bodyText = (document.body?.textContent || '').trim();
        if (bodyText.length >= minTextLength) return true;
      } catch (e) {
        // Defensive: if DOM access fails, default to not rendering
      }
      return false;
    };

    // Initial check
    if (checkForContent()) {
      setShouldRender(true);
      return;
    }

    // If content may arrive asynchronously, observe DOM mutations for a short period
    const observer = new MutationObserver(() => {
      if (checkForContent()) {
        setShouldRender(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Stop observing after 10s (avoid long-running observers)
    const timeout = setTimeout(() => {
      try { observer.disconnect(); } catch (e) {}
    }, 10000);

    return () => {
      clearTimeout(timeout);
      try { observer.disconnect(); } catch (e) {}
    };
  }, [forceShow, minTextLength]);

  if (!shouldRender) return null;

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