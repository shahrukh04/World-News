import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Image optimization middleware
export const optimizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const { filename, path: filePath } = req.file;
    const outputPath = path.join('uploads', 'optimized_' + filename);
    
    // Optimize image with sharp
    await sharp(filePath)
      .resize(1200, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toFile(outputPath);
    
    // Remove original file
    fs.unlinkSync(filePath);
    
    // Update req.file with optimized version
    req.file.filename = 'optimized_' + filename;
    req.file.path = outputPath;
    
    next();
  } catch (error) {
    console.error('Image optimization error:', error);
    // Continue without optimization if error occurs
    next();
  }
};

// Generate thumbnail
export const generateThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const { filename, path: filePath } = req.file;
    const thumbnailPath = path.join('uploads', 'thumb_' + filename);
    
    // Generate thumbnail
    await sharp(filePath)
      .resize(400, 300, { 
        fit: 'cover',
        position: 'center' 
      })
      .jpeg({ 
        quality: 80 
      })
      .toFile(thumbnailPath);
    
    // Add thumbnail info to request
    req.thumbnail = {
      filename: 'thumb_' + filename,
      path: thumbnailPath
    };
    
    next();
  } catch (error) {
    console.error('Thumbnail generation error:', error);
    next();
  }
};