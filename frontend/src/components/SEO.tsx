import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  robots?: string; // default: 'index, follow'
}

const SITE_NAME = 'World News';
const DEFAULT_IMAGE = '/og-image.jpg';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image,
  publishedTime,
  modifiedTime,
  authorName,
  robots = 'index, follow'
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const metaImage = image || DEFAULT_IMAGE;

  const articleJsonLd = publishedTime
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title,
        image: [metaImage],
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
          '@type': 'Person',
          name: authorName || SITE_NAME
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: metaImage
          }
        },
        description: description || ''
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title || SITE_NAME} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={publishedTime ? 'article' : 'website'} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || SITE_NAME} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={metaImage} />

      {articleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
