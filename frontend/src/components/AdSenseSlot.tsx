import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  client: string;
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  adFormat?: string; // e.g., 'fluid'
  adLayoutKey?: string; // e.g., '-gu-1e+1q-60+es'
  forceShow?: boolean;
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
  forceShow = false
}) => {
  const insRef = useRef<HTMLDivElement | null>(null);

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
    return () => clearTimeout(t);
  }, [client, slot, adFormat, adLayoutKey, forceShow]);

  return (
    <div className={`w-full ${className}`} style={style}>
      <div ref={insRef} />
    </div>
  );
};

export default AdSenseSlot;
