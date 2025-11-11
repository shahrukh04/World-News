import fs from 'fs/promises';
import path from 'path';

const OUT = path.resolve(process.cwd(), 'dist', 'sitemap.xml');
const STATIC_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://worldnew.in/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/world-news</loc>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/india-news</loc>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/health-news</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/jobs-news</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/sports-news</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/technology-news</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/ipo-news</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/about</loc>
    <priority>0.5</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/contact</loc>
    <priority>0.5</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/privacy-policy</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/terms-of-service</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://worldnew.in/disclaimer</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>`;

async function fetchSitemap() {
  const source = process.env.SITEMAP_SOURCE || 'http://localhost:5000/sitemap.xml';
  console.log(`Attempting to fetch sitemap from ${source}`);
  try {
    const res = await fetch(source, { method: 'GET' });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, text, 'utf8');
    console.log(`Wrote sitemap to ${OUT} (fetched from backend)`);
    return true;
  } catch (err) {
    console.warn(`Could not fetch sitemap from ${source}: ${err.message}`);
    return false;
  }
}

async function writeStatic() {
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, STATIC_TEMPLATE, 'utf8');
  console.log(`Wrote static sitemap to ${OUT}`);
}

(async function main() {
  const ok = await fetchSitemap();
  if (!ok) {
    // fallback to static sitemap template
    await writeStatic();
  }
})();
