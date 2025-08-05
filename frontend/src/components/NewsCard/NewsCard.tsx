import React, { useState } from 'react';
import { INews } from '../../services/api';
import { Link } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

interface NewsCardProps {
  news: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(news.image);
  const fallbackImage = 'https://via.placeholder.com/800x400/e5e7eb/6b7280?text=News+Image';
  
  return (
    <div className="border rounded shadow-sm overflow-hidden hover:shadow-lg transition-shadow mb-6">
      {news.image && !imageError && (
        <img 
          src={imageUrl} 
          alt={news.title} 
          className="w-full h-48 sm:h-56 md:h-48 object-cover" 
          onError={() => setImageError(true)}
        />
      )}
      {(!news.image || imageError) && (
        <img 
          src={fallbackImage} 
          alt={news.title} 
          className="w-full h-48 sm:h-56 md:h-48 object-cover opacity-75" 
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{news.title}</h3>
        <p className="text-gray-700 line-clamp-3">{news.description}</p>
        <Link
          to={`/news/${news._id}`}
          className="inline-block mt-3 text-blue-600 hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
