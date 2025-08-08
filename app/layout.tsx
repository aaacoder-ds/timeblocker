import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://timeblocker.aaacoder.xyz'),
  title: 'Timeblocker – Google Calendar Timeboxing Tool',
  description: 'A productivity calendar tool to generate timeboxed schedules and export .ics files for Google Calendar.',
  alternates: {
    canonical: 'https://timeblocker.aaacoder.xyz'
  },
  openGraph: {
    title: 'Timeblocker – Timeboxing & .ics Converter',
    description: 'Plan your day with timeboxing and export to Google Calendar.',
    url: 'https://timeblocker.aaacoder.xyz',
    siteName: 'Timeblocker',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timeblocker – Timeboxing & .ics Converter',
    description: 'Plan your day with timeboxing and export to Google Calendar.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Timeblocker',
    url: 'https://timeblocker.aaacoder.xyz',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Any',
    description: 'Google Calendar timeboxing tool and time management .ics converter',
    keywords: 'productivity calendar tool, timeboxing, time management, ics converter, Google Calendar',
    creator: {
      '@type': 'Organization',
      name: 'AAACoder'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="timeblocker.aaacoder.xyz"
          src="https://data.timeblocker.aaacoder.xyz/js/script.js"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

