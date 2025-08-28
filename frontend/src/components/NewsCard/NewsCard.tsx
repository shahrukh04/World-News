import React from 'react';
import { INews } from '../../services/api';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

interface NewsCardProps {
  news: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="border rounded shadow-sm overflow-hidden hover:shadow-lg transition-shadow mb-6">
      <LazyImage
        src={news.image}
        alt={news.title}
        className="w-full h-48 sm:h-56 md:h-48"
        fallbackSrc="/placeholder-image.svg"
      />
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
