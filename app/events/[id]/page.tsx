'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { api, EventItem } from '../../../lib/api';
import { useAuth } from '../../../components/AuthProvider';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [message, setMessage] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    api<EventItem>(`/events/${id}`)
      .then(setEvent)
      .catch(error => {
        const msg = error instanceof Error ? error.message : 'Unable to load event.';
        setMessage(msg);
      });
  }, [id]);

  if (!event) {
    return (
      <section className="page">
        <p>{message || 'Loading event details...'}</p>
      </section>
    );
  }

  const join = async () => {
    if (!user) {
      toast.error('Please log in first to join this event.');
      return router.push('/login');
    }

    if (joining) return;
    setMessage('');
    setJoining(true);

    try {
      const result = await api<{ message: string }>(`/events/${id}/join`, {
        method: 'POST',
      });
      const successMsg = result.message || 'You have successfully joined this event! 🎉';
      setMessage(successMsg);
      toast.success(successMsg);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to join event.';
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setJoining(false);
    }
  };

  return (
    <section className="detailpage">
      <img className="detailimage" src={event.image} alt={event.title} />
      <div className="detailcontent">
        <span className="badge badge-accent">{event.type}</span>
        <h1>{event.title}</h1>
        <p className="lead">{event.description}</p>
        <div className="detailmeta">
          <span>
            ⌖ <strong>Where</strong>
            {event.location}
          </span>
          <span>
            ◷ <strong>When</strong>
            {new Date(event.date).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </span>
          <span>
            ♧ <strong>Organised by</strong>
            {event.creatorName}
          </span>
        </div>
        <button className="btn btn-primary" disabled={joining} onClick={join}>
          {!user
            ? 'Log in to join →'
            : joining
            ? 'Joining...'
            : 'Join this event →'}
        </button>
        {message && (
          <p className="notice" role="status">
            {message}
          </p>
        )}
        <Link className="backlink" href="/events">
          ← Back to events
        </Link>
      </div>
    </section>
  );
}
