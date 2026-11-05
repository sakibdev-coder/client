'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, EventItem } from '../../lib/api';
import { EventCard } from '../../components/EventCard';

const categories = ['All', 'Cleanup', 'Plantation', 'Donation', 'Education', 'Community care'];

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState<'soonest' | 'latest' | 'title'>('soonest');

  useEffect(() => {
    const flash = sessionStorage.getItem('kindred-event-success');
    if (flash) {
      setSuccess(flash);
      toast.success(flash);
      sessionStorage.removeItem('kindred-event-success');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (selectedType && selectedType !== 'All') params.set('type', selectedType);

    const query = params.toString() ? `?${params.toString()}` : '';
    const timer = setTimeout(() => {
      api<EventItem[]>(`/events${query}`)
        .then(setEvents)
        .catch(err => {
          const msg = err instanceof Error ? err.message : 'Unable to load events.';
          setError(msg);
        })
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [search, selectedType]);

  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === 'soonest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

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

      {/* Search, Sort, and Category Filter Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '540px' }}>
            <input
              type="text"
              className="input w-full"
              style={{ paddingLeft: '40px', paddingRight: search ? '36px' : '14px' }}
              placeholder="Search by title or location (e.g. Mirpur, Dhaka)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--muted)',
                pointerEvents: 'none',
                fontSize: '15px',
              }}
            >
              🔍
            </span>
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  fontSize: '15px',
                  padding: '4px',
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label
              htmlFor="sort-select"
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
              }}
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              className="select select-bordered select-sm"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'soonest' | 'latest' | 'title')}
              style={{ minWidth: '160px' }}
            >
              <option value="soonest">📅 Nearest First (Asc)</option>
              <option value="latest">⏳ Latest First (Desc)</option>
              <option value="title">🔤 Title (A to Z)</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--muted)',
              marginRight: '4px',
            }}
          >
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${
                selectedType === cat ? 'btn-primary' : 'btn-outline'
              }`}
              onClick={() => setSelectedType(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="skeletongrid">
          {[1, 2, 3].map(i => (
            <div className="skeleton h-80 w-full" key={i} />
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
      ) : sortedEvents.length ? (
        <>
          <p
            className="muted"
            style={{
              fontSize: '13px',
              marginTop: '-16px',
              marginBottom: '20px',
              fontWeight: 500,
            }}
          >
            Showing {sortedEvents.length} upcoming {sortedEvents.length === 1 ? 'event' : 'events'}
          </p>
          <div className="grid">
            {sortedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            No upcoming events found matching your filters.
          </p>
          <p className="muted" style={{ marginBottom: '16px' }}>
            Try searching for something else or choosing another category.
          </p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              setSearch('');
              setSelectedType('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
