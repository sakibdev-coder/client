'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '../../components/AuthProvider';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
      return;
    }
    if (user) {
      setName(user.name || '');
      setPhoto(user.photo || user.photoURL || '');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <section className="page narrow">
        <div className="pageintro">
          <span className="eyebrow">ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Loading your profile details...</p>
        </div>
        <div className="skeleton h-80 w-full" style={{ borderRadius: '8px' }} />
      </section>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    setError('');

    if (!name.trim()) {
      const msg = 'Name cannot be empty.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setSaving(true);
    try {
      await updateProfile(name.trim(), photo.trim());
      toast.success('Profile updated successfully! 🎉');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to update profile.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const initial = (name.trim() || user.name || 'U').charAt(0).toUpperCase();

  return (
    <section className="page narrow">
      <div className="pageintro">
        <span className="eyebrow">ACCOUNT SETTINGS</span>
        <h1>My Profile</h1>
        <p>Manage your personal information and how you appear to others on Kindred.</p>
      </div>

      <div
        className="card bg-base-100 border border-base-300 p-6 mb-8"
        style={{
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--soft)',
            border: '2px solid var(--line)',
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--green)',
            flexShrink: 0,
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => {
                // fallback if image fails to load
              }}
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        <div>
          <span className="badge badge-accent mb-2">Community Member</span>
          <h2 style={{ fontSize: '26px', margin: '4px 0', letterSpacing: '-0.5px' }}>
            {user.name}
          </h2>
          <p className="muted" style={{ margin: 0 }}>
            {user.email}
          </p>
        </div>
      </div>

      <form className="eventform" onSubmit={handleSubmit}>
        <label>
          Display Name
          <input
            className="input w-full"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email address
          <input
            className="input w-full"
            type="email"
            value={user.email}
            disabled
            style={{ opacity: 0.7, cursor: 'not-allowed' }}
          />
          <small className="muted">Email cannot be changed.</small>
        </label>

        <label>
          Profile Photo URL
          <input
            className="input w-full"
            type="url"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
          <small className="muted">Paste a publicly reachable image URL for your avatar.</small>
        </label>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Saving changes...' : 'Save Changes →'}
          </button>
          <Link className="btn btn-outline" href="/events">
            Cancel
          </Link>
        </div>
      </form>

      <div
        style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid var(--line)',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Link className="textlink" href="/manage">
          Manage your events →
        </Link>
        <Link className="textlink" href="/joined">
          View joined events →
        </Link>
      </div>
    </section>
  );
}

