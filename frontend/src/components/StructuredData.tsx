import { Helmet } from 'react-helmet-async';
import { INews } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

interface StructuredDataProps {
  news: INews;
}

const StructuredData: React.FC<StructuredDataProps> = ({ news }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.title,
    "description": news.description,
    "image": getImageUrl(news.image),
    "author": {
      "@type": "Person",
      "name": news.author || "World News Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "World News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://worldnew.in/logo.png"
      }
    },
    "datePublished": news.createdAt,
    "dateModified": news.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://worldnew.in/news/${news._id}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;