'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';
import { useAuth } from '../../components/AuthProvider';

export default function Create() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <section className="page narrow">
        <p>Loading...</p>
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
      const msg = 'Please choose a future date and time for the event.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setSaving(true);
    try {
      await api('/events', { method: 'POST', body: JSON.stringify(data) });
      toast.success('Event created successfully! 🎉');
      router.push('/events');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to create event.';
      setError(msg);
      toast.error(msg);
      setSaving(false);
    }
  };

  return (
    <section className="page narrow">
      <div className="pageintro">
        <span className="eyebrow">MAKE IT HAPPEN</span>
        <h1>Create an event</h1>
        <p>Have an idea that could bring people together? Give it a home here.</p>
      </div>
      <form className="eventform" onSubmit={submit}>
        <label>
          Event title
          <input
            className="input w-full"
            name="title"
            placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
            required
          />
        </label>
        <label>
          Description
          <textarea
            className="textarea w-full"
            name="description"
            rows={5}
            placeholder="What will happen at this event? Share how people can take part."
            required
          />
        </label>
        <div className="twocol">
          <label>
            Event type
            <select className="select w-full" name="type" defaultValue="Donation">
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
              className="input w-full"
              name="date"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </label>
        </div>
        <label>
          Thumbnail image URL
          <input
            className="input w-full"
            name="image"
            type="url"
            placeholder="https://images.unsplash.com/..."
            required
          />
        </label>
        <label>
          Location
          <input
            className="input w-full"
            name="location"
            placeholder="Area, City (e.g. Mirpur 10, Dhaka)"
            required
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Publishing...' : 'Publish event →'}
        </button>
      </form>
    </section>
  );
}
