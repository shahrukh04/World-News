import React from 'react';
import { INews } from '../../services/api';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

// Modern, editorial-style news card used in lists. Designed for readable headlines,
// subtle hover, and better metadata presentation (date/category).

interface NewsCardProps {
  news: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <article className="group mb-6 overflow-hidden rounded-lg bg-white border border-transparent hover:border-gray-200 transition-all duration-200">
      <div className="relative">
        <LazyImage
          src={news.image}
          alt={news.title}
          className="w-full h-56 md:h-48 object-cover"
          fallbackSrc="/placeholder-image.svg"
        />
        <div className="absolute left-4 bottom-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {news.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <time>{new Date(news.createdAt).toLocaleDateString()}</time>
          <span className="hidden sm:inline">
            {(() => {
              if (typeof news.author === 'string') return news.author;
              const a: any = news.author;
              return (a && (a.username || a.firstName || a.name)) || 'World News';
            })()}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
          <Link to={`/news/${news._id}`} className="inline-block">{news.title}</Link>
        </h3>

        <p className="text-gray-700 text-sm line-clamp-3 mb-3">{news.description}</p>

        <div className="flex items-center justify-between">
          <Link to={`/news/${news._id}`} className="text-red-600 font-medium hover:underline text-sm">
            Read full article
          </Link>
          <span className="text-xs text-gray-400">· {Math.max(1, Math.ceil((news.description || '').split(/\s+/).length / 225))} min read</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
