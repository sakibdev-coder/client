'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, EventItem } from '../../lib/api';
import { EventCard } from '../../components/EventCard';
import { useAuth } from '../../components/AuthProvider';

export default function Joined() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
      return;
    }

    if (user) {
      setLoadingEvents(true);
      api<EventItem[]>('/joined')
        .then(items => setEvents([...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())))
        .catch(error => setError(error instanceof Error ? error.message : 'Unable to load joined events.'))
        .finally(() => setLoadingEvents(false));
    }
  }, [loading, user, router]);

  if (loading || (!user && !error)) {
    return (
      <section className="page">
        <div className="pageintro">
          <span className="eyebrow">YOUR CALENDAR</span>
          <h1>Joined events</h1>
          <p>These are the moments you have chosen to show up for, sorted by date.</p>
        </div>
        <div className="skeletongrid">
          {[1, 2, 3].map(i => (
            <div className="skeleton h-80 w-full" key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="pageintro">
        <span className="eyebrow">YOUR CALENDAR</span>
        <h1>Joined events</h1>
        <p>These are the moments you have chosen to show up for, sorted by date.</p>
      </div>
      {error ? (
        <p className="error" role="alert">{error}</p>
      ) : loadingEvents ? (
        <div className="skeletongrid">
          {[1, 2, 3].map(i => (
            <div className="skeleton h-80 w-full" key={i} />
          ))}
        </div>
      ) : events.length ? (
        <div className="grid">
          {events.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
        <div
          className="empty"
          style={{
            textAlign: 'center',
            padding: '50px 20px',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            maxWidth: '560px',
            margin: '20px auto 0',
          }}
        >
          <div style={{ fontSize: '44px', marginBottom: '14px' }}>🗓️</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            No joined events yet
          </h2>
          <p
            className="muted"
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              maxWidth: '420px',
              margin: '0 auto 24px',
            }}
          >
            When you register for cleanup drives, tree plantations, or community programs,
            they will show up here in your personal schedule.
          </p>
          <Link href="/events" className="btn btn-primary">
            Explore Upcoming Events →
          </Link>
        </div>
      )}
    </section>
  );
}
