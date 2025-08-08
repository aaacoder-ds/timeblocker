import Link from 'next/link';
import TimeboxForm from '@/components/TimeboxForm';

export default function HomePage() {
  return (
    <div className="container">
      <header className="hero">
        <h1>Timeblocker</h1>
        <p>
          Plan your day with timeboxing and export an <strong>.ics</strong> file for Google Calendar.
        </p>
        <p className="promo">
          Looking for more tools? Visit{' '}
          <Link href="https://aaacoder.xyz/" target="_blank" rel="noopener noreferrer">
            aaacoder.xyz
          </Link>
          .
        </p>
      </header>
      <TimeboxForm />
    </div>
  );
}

