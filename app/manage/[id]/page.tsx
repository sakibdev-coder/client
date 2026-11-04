'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api, EventItem } from '../../../lib/api';
import { useAuth } from '../../../components/AuthProvider';

const dateTimeLocalValue = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (part: number) => String(part).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
      return;
    }
    if (user) {
      api<EventItem>(`/events/${id}`)
        .then(setEvent)
        .catch(err => {
          const msg = err instanceof Error ? err.message : 'Unable to load event.';
          setError(msg);
          toast.error(msg);
        });
    }
  }, [id, loading, user, router]);

  if (loading || (!user && !error)) {
    return (
      <section className="page narrow">
        <p>Loading...</p>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="page narrow">
        <p>{error || 'Loading event details...'}</p>
      </section>
    );
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    setError('');

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const eventDate = new Date(String(data.date));

    if (Number.isNaN(eventDate.getTime()) || eventDate <= new Date()) {
      const msg = 'Event date must be in the future.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setSaving(true);
    try {
      await api(`/events/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      toast.success('Event updated successfully! 🎉');
      router.push('/manage');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to update event.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page narrow">
      <div className="pageintro">
        <span className="eyebrow">KEEP IT FRESH</span>
        <h1>Edit event</h1>
        <p>Clear, current details help more people show up.</p>
      </div>
      <form className="eventform" onSubmit={submit}>
        <label>
          Event title
          <input name="title" defaultValue={event.title} required />
        </label>
        <label>
          Description
          <textarea
            name="description"
            rows={5}
            defaultValue={event.description}
            required
          />
        </label>
        <div className="twocol">
          <label>
            Event type
            <select name="type" defaultValue={event.type}>
              <option>Cleanup</option>
              <option>Plantation</option>
              <option>Donation</option>
              <option>Education</option>
              <option>Community care</option>
            </select>
          </label>
          <label>
            Event date
            <input
              name="date"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              defaultValue={dateTimeLocalValue(event.date)}
              required
            />
          </label>
        </div>
        <label>
          Thumbnail image URL
          <input name="image" type="url" defaultValue={event.image} required />
        </label>
        <label>
          Location
          <input name="location" defaultValue={event.location} required />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="button" disabled={saving}>
          {saving ? 'Saving...' : 'Save changes →'}
        </button>
      </form>
    </section>
  );
}
