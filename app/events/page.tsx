'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, EventItem } from '../../lib/api';
import { EventCard } from '../../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const flash = sessionStorage.getItem('kindred-event-success');
    if (flash) {
      setSuccess(flash);
      toast.success(flash);
      sessionStorage.removeItem('kindred-event-success');
    }
    api<EventItem[]>('/events')
      .then(setEvents)
      .catch(err => {
        const msg = err instanceof Error ? err.message : 'Unable to load events.';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page">
      <div className="pageintro">
        <span className="eyebrow">EXPLORE</span>
        <h1>Upcoming events</h1>
        <p>
          Choose an opportunity, bring your energy, and make your corner of the
          world a little brighter.
        </p>
      </div>
      {success && (
        <p className="notice" role="status">
          {success}
        </p>
      )}
      {loading ? (
        <div className="skeletongrid">
          {[1, 2, 3].map(i => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="empty">
          <p className="error">{error}</p>
          <p>
            Make sure the Express API is running and your environment URL is
            correct.
          </p>
        </div>
      ) : (
        <div className="grid">
          {events.length ? (
            events.map(event => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="empty">There are no upcoming events yet.</p>
          )}
        </div>
      )}
    </section>
  );
}
