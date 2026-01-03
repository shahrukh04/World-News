// Utility functions for handling image URLs

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

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
  
  // If path already points to uploads, prefix server base
  if (imagePath.startsWith('/uploads/')) {
    return `${SERVER_BASE_URL}${imagePath}`;
  }
  // For bare filenames, construct the full uploads URL
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

/**
 * Compress an image file using Canvas API
 * @param file - The image file to compress
 * @param quality - Output quality (0 to 1), default 0.6
 * @param maxWidth - Maximum width, default 1920
 * @returns Promise<File> - The compressed file
 */
export const compressImage = async (
  file: File, 
  quality = 0.6, 
  maxWidth = 1920
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if larger than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // Fallback to original if canvas fails
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
