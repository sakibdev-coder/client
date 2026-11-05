'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, EventItem } from '../lib/api';
import { EventCard } from '../components/EventCard';

const gallery = [
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
];

const stats = [
  {
    icon: '🌱',
    value: '24+',
    label: 'Active Community Drives',
    description: 'Cleanups, tree planting drives, food banks, and educational sessions.',
  },
  {
    icon: '👥',
    value: '1,200+',
    label: 'Volunteers Joined',
    description: 'Passionate change-makers showing up selflessly for their neighbors.',
  },
  {
    icon: '🤝',
    value: '100%',
    label: 'Free Community Service',
    description: 'Zero participation fees. Community-first initiatives open to everyone.',
  },
  {
    icon: '📍',
    value: '8+',
    label: 'Cities & Neighborhoods',
    description: 'Spreading civic impact across Dhaka, Chattogram, and regional communities.',
  },
];

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<EventItem[]>('/events/recent')
      .then(items => setEvents(items.slice(0, 6)))
      .catch(error =>
        setError(error instanceof Error ? error.message : 'Unable to load upcoming events.')
      )
      .finally(() => setLoadingEvents(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div>
          <span className="eyebrow">COMMUNITY STARTS HERE</span>
          <h1>
            Good things happen when we <em>show up</em> for each other.
          </h1>
          <p>
            Find meaningful ways to make a difference in your neighbourhood. One
            event, one helping hand, one shared moment at a time.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/events">
              Find an event <span>→</span>
            </Link>
            <Link className="btn btn-link" href="/create">
              Start an event ↗
            </Link>
          </div>
        </div>
        <div className="heroimage">
          <img src={gallery[0]} alt="Volunteers working together" />
          <div className="home-stat">
            <strong>2,400+</strong>
            <span>people making a difference</span>
          </div>
        </div>
      </section>

      {/* Community Impact Statistics Section */}
      <section id="impact" className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '48px 36px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <span className="eyebrow">OUR IMPACT IN NUMBERS</span>
            <h2 style={{ fontSize: '32px', margin: '10px 0 12px' }}>
              Real action. Tangible community change.
            </h2>
            <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
              Together with our incredible volunteer network, we turn everyday kindness
              into measurable neighborhood improvements.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {stats.map(item => (
              <div
                key={item.label}
                style={{
                  background: 'var(--soft)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '28px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: '34px',
                    fontWeight: '800',
                    color: 'var(--ink)',
                    letterSpacing: '-1px',
                  }}
                >
                  {item.value}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '8px 0 6px' }}>
                  {item.label}
                </h3>
                <p className="muted" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="sectionhead">
          <div>
            <span className="eyebrow">MAKE AN IMPACT</span>
            <h2>There is a place for everyone.</h2>
          </div>
          <p>
            Whether you have an hour or a whole weekend, your time and energy can
            change a life.
          </p>
        </div>
        <div className="features">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <span className="featureicon">◎</span>
              <h3 className="card-title">Discover locally</h3>
              <p>
                Find service events close to home, from cleanups to community
                kitchens.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <span className="featureicon">↗</span>
              <h3 className="card-title">Show up together</h3>
              <p>
                Meet kind-hearted people and turn a good intention into real
                action.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <span className="featureicon">✦</span>
              <h3 className="card-title">Leave a mark</h3>
              <p>
                Create your own event and build the change you want to see.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Up Next Events Section */}
      <section className="section tinted">
        <div className="sectionhead">
          <div>
            <span className="eyebrow">UP NEXT</span>
            <h2>Opportunities to do good.</h2>
          </div>
          <Link className="textlink" href="/events">
            See all events →
          </Link>
        </div>
        <div className="grid">
          {error ? (
            <div className="empty">
              <p className="error">{error}</p>
              <p>
                Make sure the Express API is running and your environment URL is
                correct.
              </p>
            </div>
          ) : loadingEvents ? (
            <div className="skeletongrid">
              {[1, 2, 3].map(item => (
                <div className="skeleton h-80 w-full" key={item} />
              ))}
            </div>
          ) : events.length ? (
            events.map(event => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="empty">
              New opportunities are arriving soon. Be the first to create one.
            </p>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery">
        <div className="sectionhead">
          <div>
            <span className="eyebrow">THE KINDRED COMMUNITY</span>
            <h2>Small moments. Big meaning.</h2>
          </div>
          <p>
            Every contribution adds up to something bigger than ourselves.
          </p>
        </div>
        <div className="gallerygrid">
          {gallery.map((image, i) => (
            <img
              key={image}
              src={image}
              alt={`Community service moment ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <span className="eyebrow">KEEP IN TOUCH</span>
        <h2>Good news for good people.</h2>
        <p>
          Get a monthly note with new events, community stories, and ways to
          help.
        </p>
        <form
          className="subscribe join"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="input join-item"
            aria-label="Email address"
            placeholder="Your email address"
            type="email"
          />
          <button className="btn btn-neutral join-item" type="submit">
            Subscribe →
          </button>
        </form>
      </section>
    </>
  );
}
