import React, { useState, useRef, useEffect } from 'react';
import { getImageUrl } from '../../utils/imageUtils';

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-image.svg',
  placeholder = '/placeholder-image.svg',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Create intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.unobserve(img);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isInView && src && !hasError) {
      const imageUrl = getImageUrl(src);
      if (imageUrl) {
        // Preload the image
        const img = new Image();
        img.onload = () => {
          setCurrentSrc(imageUrl);
          setIsLoaded(true);
          onLoad?.();
        };
        img.onerror = () => {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
          onError?.();
        };
        img.src = imageUrl;
      }
    }
  }, [isInView, src, fallbackSrc, hasError, onLoad, onError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-75'
        }`}
        loading="lazy"
      />
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;