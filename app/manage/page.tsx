'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api, EventItem } from '../../lib/api';
import { useAuth } from '../../components/AuthProvider';
import { ConfirmModal } from '../../components/ConfirmModal';

export default function Manage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [targetEvent, setTargetEvent] = useState<EventItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
      return;
    }

    if (user) {
      setLoadingEvents(true);
      api<EventItem[]>('/events?mine=true')
        .then(setEvents)
        .catch(error => {
          const msg =
            error instanceof Error ? error.message : 'Unable to load your events.';
          setMessage(msg);
        })
        .finally(() => setLoadingEvents(false));
    }
  }, [loading, user, router]);

  if (loading || (!user && !message)) {
    return (
      <section className="page">
        <div className="pageintro row">
          <div>
            <span className="eyebrow">YOUR IMPACT</span>
            <h1>Manage events</h1>
            <p>Update or remove the events you created.</p>
          </div>
          <Link className="btn btn-primary" href="/create">
            + New event
          </Link>
        </div>
        <div className="manage-list">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="manage-item skeleton"
              style={{ height: '96px', width: '100%' }}
            />
          ))}
        </div>
      </section>
    );
  }

  const handleDeleteConfirm = async () => {
    if (!targetEvent) return;

    setMessage('');
    setIsDeleting(true);
    try {
      await api(`/events/${targetEvent.id}`, { method: 'DELETE' });
      setEvents(items => items.filter(item => item.id !== targetEvent.id));
      toast.success('Event deleted successfully.');
      setTargetEvent(null);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Unable to delete event.';
      setMessage(msg);
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="page">
      <div className="pageintro row">
        <div>
          <span className="eyebrow">YOUR IMPACT</span>
          <h1>Manage events</h1>
          <p>Update or remove the events you created.</p>
        </div>
        <Link className="btn btn-primary" href="/create">
          + New event
        </Link>
      </div>

      {message && (
        <p className="error" role="alert">
          {message}
        </p>
      )}

      {loadingEvents ? (
        <div className="manage-list">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="manage-item skeleton"
              style={{ height: '96px', width: '100%' }}
            />
          ))}
        </div>
      ) : events.length ? (
        <div className="manage-list">
          {events.map(event => (
            <div className="manage-item" key={event.id}>
              <img src={event.image} alt={event.title} />
              <div>
                <span className="badge badge-accent">{event.type}</span>
                <h3>{event.title}</h3>
                <p className="muted">
                  {event.location} · {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <div className="itemactions">
                <Link className="btn btn-outline btn-sm" href={`/manage/${event.id}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-error btn-outline btn-sm"
                  onClick={() => setTargetEvent(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
          <div style={{ fontSize: '44px', marginBottom: '14px' }}>✨</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            You haven't created any events yet
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
            Have a project or community drive in mind? Start your own initiative
            and invite volunteers to participate.
          </p>
          <Link href="/create" className="btn btn-primary">
            Create an Event ↗
          </Link>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(targetEvent)}
        title="Delete this event?"
        message={`Are you sure you want to delete "${targetEvent?.title || ''}"? This action cannot be undone.`}
        confirmText="Yes, delete it"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTargetEvent(null)}
      />
    </section>
  );
}
