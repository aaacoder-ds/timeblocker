import { NextResponse } from 'next/server';

export function GET() {
  const base = 'https://timeblocker.aaacoder.xyz';
  const lastmod = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:schema="https://schema.org/">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <schema:WebApplication>
      <schema:name>Timeblocker</schema:name>
      <schema:url>${base}</schema:url>
      <schema:applicationCategory>ProductivityApplication</schema:applicationCategory>
      <schema:operatingSystem>Any</schema:operatingSystem>
      <schema:description>Google Calendar timeboxing tool and time management .ics converter</schema:description>
    </schema:WebApplication>
  </url>
</urlset>`;
  return new NextResponse(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
}

