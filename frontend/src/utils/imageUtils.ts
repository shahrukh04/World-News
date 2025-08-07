// Utility functions for handling image URLs

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');

/**
 * Get the full image URL for display
 * Handles both local uploads and external URLs
 * @param imagePath - The image path/filename or full URL
 * @returns Full image URL
 */
export const getImageUrl = (imagePath: string | undefined): string | undefined => {
  if (!imagePath) return undefined;
  
  // If it's already a full URL (starts with http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For local uploads, construct the full URL
  return `${SERVER_BASE_URL}/uploads/${imagePath}`;
};

/**
 * Check if an image URL is accessible
 * @param imageUrl - The image URL to check
 * @returns Promise<boolean> indicating if the image is accessible
 */
export const isImageAccessible = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get image URL with fallback
 * @param imagePath - The image path/filename or full URL
 * @param fallbackUrl - Fallback image URL if main image fails
 * @returns Image URL with fallback
 */
export const getImageUrlWithFallback = (
  imagePath: string | undefined, 
  fallbackUrl?: string
): string => {
  const imageUrl = getImageUrl(imagePath);
  return imageUrl || fallbackUrl || '/placeholder-image.svg';
};

/**
 * Handle image load error by setting a fallback
 * @param event - Image error event
 * @param fallbackUrl - Fallback image URL
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>, 
  fallbackUrl?: string
) => {
  const target = event.target as HTMLImageElement;
  if (fallbackUrl) {
    target.src = fallbackUrl;
  } else {
    // Hide the image if no fallback is provided
    target.style.display = 'none';
  }
};