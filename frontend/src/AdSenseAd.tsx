import { useEffect, useRef } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid'
  adLayout?: 'in-article' | string
  adLayoutKey?: string
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = true,
  className = '',
  style
}) => {
  const adRef = useRef<HTMLModElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    if (isAdLoaded.current || !adRef.current) return
    
    let retryCount = 0
    const maxRetries = 5
    
    const initializeAd = () => {
      try {
        const adElement = adRef.current
        if (!adElement || adElement.hasAttribute('data-adsbygoogle-status')) return
        
        // Force layout recalculation
        adElement.offsetHeight
        
        // Get container dimensions
        const container = adElement.parentElement
        const containerRect = container?.getBoundingClientRect()
        const adRect = adElement.getBoundingClientRect()
        
        // More strict dimension validation
        const hasValidDimensions = 
          containerRect && containerRect.width >= 300 && containerRect.height >= 150 &&
          adRect && adRect.width >= 300 && adRect.height >= 150
        
        // Check if element is visible in viewport
        const isInViewport = containerRect && 
          containerRect.top < window.innerHeight && 
          containerRect.bottom > 0 &&
          containerRect.left < window.innerWidth &&
          containerRect.right > 0
        
        if (hasValidDimensions && isInViewport) {
          // Wait for DOM to be fully stable
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (!isAdLoaded.current && adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
                // Final dimension check before push
                const finalRect = adRef.current.getBoundingClientRect()
                if (finalRect.width >= 300 && finalRect.height >= 150) {
                  // @ts-ignore
                  (window.adsbygoogle = window.adsbygoogle || []).push({})
                  isAdLoaded.current = true
                }
              }
            }, 200)
          })
        } else if (retryCount < maxRetries) {
          retryCount++
          // Exponential backoff with jitter
          const delay = Math.min(1000 * Math.pow(2, retryCount) + Math.random() * 500, 5000)
          setTimeout(initializeAd, delay)
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
    
    // Use intersection observer with more specific options
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAdLoaded.current && entry.intersectionRatio > 0.1) {
          // Reset retry count for new intersection
          retryCount = 0
          // Wait longer for layout to stabilize
          setTimeout(initializeAd, 1000)
        }
      })
    }, {
      threshold: [0.1, 0.5],
      rootMargin: '100px'
    })
    
    if (adRef.current) {
      observer.observe(adRef.current)
    }
    
    return () => {
      observer.disconnect()
    }
  }, [])

  const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID

  // Don't render ads if client ID is missing or ad slot is a placeholder/invalid
  if (!clientId || !adSlot || adSlot.match(/^(1234567890|9876543210|3456789012|5432109876|your_.*_ad_slot)$/)) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-4 rounded-md text-center ${className}`}>
        <p className="text-gray-500 text-sm">Ad Space - Configure AdSense</p>
        <p className="text-xs text-gray-400 mt-1">Replace placeholder ad slots with real ones</p>
      </div>
    )
  }

  // Determine container and ad styles based on ad format
  const getAdStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      ...style
    }
    
    if (adLayout === 'in-article') {
      return {
        ...baseStyles,
        textAlign: 'center' as const,
        minHeight: '200px',
        minWidth: '300px',
        height: 'auto'
      }
    }
    
    if (adFormat === 'fluid' && adLayoutKey) {
      return {
        ...baseStyles,
        minHeight: '150px',
        minWidth: '300px',
        height: 'auto'
      }
    }
    
    return {
      ...baseStyles,
      minHeight: '250px',
      minWidth: '300px',
      height: '250px'
    }
  }
  
  const getContainerClass = () => {
    if (adLayout === 'in-article') {
      return `w-full min-h-[200px] ${className}`
    }
    if (adFormat === 'fluid' && adLayoutKey) {
      return `w-full min-h-[150px] ${className}`
    }
    return `w-full min-h-[250px] ${className}`
  }
  
  const getContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      minWidth: '300px',
      width: '100%',
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
      boxSizing: 'border-box',
      ...style
    }
    
    if (adLayout === 'in-article') {
      baseStyle.minHeight = '200px'
      baseStyle.height = 'auto'
    } else if (adFormat === 'fluid' && adLayoutKey) {
      baseStyle.minHeight = '150px'
      baseStyle.height = 'auto'
    } else {
      baseStyle.minHeight = '250px'
      baseStyle.height = '250px'
    }
    
    return baseStyle
  }

  return (
    <div className={getContainerClass()} style={getContainerStyle()}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyles()}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout && { 'data-ad-layout': adLayout })}
        {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
        {...(fullWidthResponsive && adFormat !== 'fluid' && { 'data-full-width-responsive': fullWidthResponsive })}
      />
    </div>
  )
}

export default AdSenseAd