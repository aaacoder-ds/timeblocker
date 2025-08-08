import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://timeblocker.aaacoder.xyz';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 10
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}

