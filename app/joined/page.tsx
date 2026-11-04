'use client';

import { useEffect, useState } from 'react';
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
    return <section className="page"><p>Loading your joined events...</p></section>;
  }

  return (
    <section className="page">
      <div className="pageintro">
        <span className="eyebrow">YOUR CALENDAR</span>
        <h1>Joined events</h1>
        <p>These are the moments you have chosen to show up for, sorted by date.</p>
      </div>
      {error ? <p className="error" role="alert">{error}</p> : loadingEvents ? <p className="empty">Loading your joined events...</p> : events.length ? (
        <div className="grid">
          {events.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      ) : <p className="empty">Events you join will appear here.</p>}
    </section>
  );
}
