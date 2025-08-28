import express from 'express';
import News from '../models/newsModel.js';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const news = await News.find()
      .select('_id title slug createdAt updatedAt category')
      .sort({ createdAt: -1 })
      .limit(1000); // Limit to prevent huge sitemaps
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
    
    // Homepage - highest priority
    sitemap += `
  <url>
    <loc>https://worldnew.in/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
    <changefreq>hourly</changefreq>
  </url>`;
    
    // Category pages - high priority
    const categories = [
      { url: '/india-news', name: 'India News' },
      { url: '/world-news', name: 'World News' },
      { url: '/sports-news', name: 'Sports News' },
      { url: '/technology-news', name: 'Technology News' },
      { url: '/health-news', name: 'Health News' },
      { url: '/jobs-news', name: 'Jobs News' },
      { url: '/ipo-news', name: 'IPO News' },
      { url: '/business-news', name: 'Business News' },
      { url: '/entertainment-news', name: 'Entertainment News' }
    ];
    
    categories.forEach(category => {
      sitemap += `
  <url>
    <loc>https://worldnew.in${category.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>`;
    });
    
    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/india-news', priority: '0.9', changefreq: 'daily' },
      { url: '/world-news', priority: '0.9', changefreq: 'daily' },
      { url: '/sports-news', priority: '0.8', changefreq: 'daily' },
      { url: '/technology-news', priority: '0.8', changefreq: 'daily' },
      { url: '/health-news', priority: '0.8', changefreq: 'daily' },
      { url: '/jobs-news', priority: '0.8', changefreq: 'daily' },
      { url: '/ipo-news', priority: '0.8', changefreq: 'daily' },
      { url: '/about', priority: '0.5', changefreq: 'monthly' },
      { url: '/contact', priority: '0.5', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      sitemap += `
  <url>
    <loc>https://worldnew.in${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`;
    });
    
    // News articles with Google News tags
    news.forEach(article => {
      const lastmod = article.updatedAt || article.createdAt;
      const isRecent = new Date() - new Date(article.createdAt) < 2 * 24 * 60 * 60 * 1000; // 2 days
      
      sitemap += `
  <url>
    <loc>https://worldnew.in/news/${article.slug || article._id}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <priority>${isRecent ? '0.9' : '0.7'}</priority>
    <changefreq>${isRecent ? 'daily' : 'weekly'}</changefreq>`;
    
    // Add Google News tags for recent articles
    if (isRecent) {
      sitemap += `
    <news:news>
      <news:publication>
        <news:name>World News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.createdAt).toISOString()}</news:publication_date>
      <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>`;
    }
    
    sitemap += `
  </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    res.set({
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });
    res.send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Sitemap index for large sites
router.get('/sitemap-index.xml', async (req, res) => {
  try {
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://worldnew.in/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemapIndex);
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    res.status(500).send('Error generating sitemap index');
  }
});

export default router;