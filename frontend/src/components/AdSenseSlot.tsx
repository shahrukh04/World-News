import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  client: string;
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  adFormat?: string; // e.g., 'fluid'
  adLayoutKey?: string; // e.g., '-gu-1e+1q-60+es'
  forceShow?: boolean;
  /** reserved height in px while ad loads (defaults to 140 for fluid) */
  reserveHeight?: number;
}

const ensureScript = (client: string) => {
  const id = 'adsbygoogle-js';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  s.crossOrigin = 'anonymous';
  s.id = id;
  document.head.appendChild(s);
};

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  client,
  slot,
  style,
  className = '',
  adFormat = 'fluid',
  adLayoutKey,
  forceShow = false,
  reserveHeight
}) => {
  const insRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Ensure the adsbygoogle script is present
    ensureScript(client);

    // Wait a tick for the script to load and then push
    const tryPush = () => {
      try {
        // Create ins element
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', client);
        ins.setAttribute('data-ad-slot', slot);
        ins.setAttribute('data-ad-format', adFormat);
        if (adLayoutKey) ins.setAttribute('data-ad-layout-key', adLayoutKey);

        // Append to our container
        if (insRef.current) {
          // Clear previous
          insRef.current.innerHTML = '';
          insRef.current.appendChild(ins);

          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        // Silent catch - ad may not load in dev or blocked environments
        // console.warn('AdSense push failed', e);
      }
    };

    // Try immediately and also after a short delay to allow script to load
    tryPush();
    const t = setTimeout(tryPush, 1500);

    // If the ad network doesn't render an iframe within a few seconds, hide the container
    const checkRendered = () => {
      try {
        if (!insRef.current || !wrapperRef.current) return true;
        // Look for an iframe (AdSense inserts an iframe) or non-empty content
        const hasIframe = !!insRef.current.querySelector('iframe');
        const hasContent = insRef.current.innerHTML.trim().length > 0;
        if (hasIframe || hasContent) {
          // Ad rendered (or some content present) - remove reserved height and keep visible
          wrapperRef.current.style.display = '';
          wrapperRef.current.style.minHeight = '';
          return true;
        }
        // No ad - hide wrapper to avoid blank whitespace
        wrapperRef.current.style.display = 'none';
        return false;
      } catch (e) {
        return false;
      }
    };

    const checkTimer = setTimeout(checkRendered, 7000);

    return () => {
      clearTimeout(t);
      clearTimeout(checkTimer);
    };
  }, [client, slot, adFormat, adLayoutKey, forceShow]);

  // Reserve reasonable vertical space for fluid ads while loading to avoid layout shift
  const reserve = reserveHeight ?? (adFormat === 'fluid' ? 140 : 0);
  const defaultStyle: React.CSSProperties = {
    minHeight: reserve,
    ...style
  };

  return (
    <div ref={wrapperRef} className={`w-full ${className}`} style={defaultStyle}>
      <div ref={insRef} />
    </div>
  );
};

export default AdSenseSlot;
