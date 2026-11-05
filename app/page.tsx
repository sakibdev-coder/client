'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api, EventItem } from '../lib/api';
import { EventCard } from '../components/EventCard';

const gallery = [
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
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

const features = [
  {
    step: '01',
    icon: '🔍',
    title: 'Discover Locally',
    description:
      'Explore verified community drives happening right in your neighborhood — from park cleanups to food banks and skill sharing.',
  },
  {
    step: '02',
    icon: '🤝',
    title: 'Show Up Together',
    description:
      'Join events with a single click, connect with kind-hearted volunteers, and export event schedules directly to your personal calendar.',
  },
  {
    step: '03',
    icon: '🌱',
    title: 'Leave a Lasting Mark',
    description:
      'Host your own grassroots social initiatives, coordinate attendees effortlessly, and build the positive community change you envision.',
  },
];

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    api<EventItem[]>('/events/recent')
      .then(items => setEvents(items.slice(0, 6)))
      .catch(error =>
        setError(error instanceof Error ? error.message : 'Unable to load upcoming events.')
      )
      .finally(() => setLoadingEvents(false));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to Kindred community updates!');
    setEmail('');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--green)',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--green)',
                display: 'inline-block',
              }}
            />
            <span>COMMUNITY STARTS HERE</span>
            <span
              style={{
                background: 'var(--lime)',
                color: '#17231d',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '999px',
                marginLeft: '4px',
              }}
            >
              2026 ACTIVE
            </span>
          </div>

          <h1>
            Good things happen when we <em>show up</em> for each other.
          </h1>

          <p>
            Find meaningful ways to make a tangible difference in your neighbourhood.
            One event, one helping hand, one shared moment at a time.
          </p>

          <div className="actions">
            <Link
              className="btn btn-primary"
              href="/events"
              style={{
                borderRadius: '999px',
                paddingInline: '26px',
                boxShadow: '0 4px 16px rgba(23, 35, 29, 0.15)',
              }}
            >
              Find an event <span style={{ marginLeft: '4px' }}>→</span>
            </Link>
            <Link
              className="btn btn-outline"
              href="/create"
              style={{
                borderRadius: '999px',
                paddingInline: '24px',
              }}
            >
              Start an initiative ↗
            </Link>
          </div>

          {/* Social Proof Trust Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex' }}>
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
              ].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Volunteer ${i + 1}`}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid var(--paper)',
                    marginLeft: i === 0 ? 0 : '-10px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#eab308',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                ★★★★★
                <span style={{ color: 'var(--ink)', marginLeft: '4px' }}>4.9 / 5</span>
              </div>
              <p className="muted" style={{ fontSize: '12px', margin: 0 }}>
                Trusted by 2,400+ active changemakers
              </p>
            </div>
          </div>
        </div>

        <div className="heroimage">
          <img src={gallery[0]} alt="Volunteers working together" />

          {/* Floating Top Badge */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '-16px',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '10px 16px',
              boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '20px' }}>🌿</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                100% Free
              </div>
              <div className="muted" style={{ fontSize: '11px' }}>
                Grassroots community drives
              </div>
            </div>
          </div>

          {/* Floating Bottom Badge */}
          <div className="home-stat">
            <strong>2,400+</strong>
            <span>people making a difference</span>
          </div>
        </div>
      </section>

      {/* Community Impact Statistics Section */}
      <section
        id="impact"
        className="section"
        style={{ paddingTop: '20px', paddingBottom: '70px' }}
      >
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '48px 36px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <span className="eyebrow">OUR IMPACT IN NUMBERS</span>
            <h2 style={{ margin: '10px 0 12px' }}>
              Real action. Tangible community change.
            </h2>
            <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
              Together with our volunteer network across Bangladesh, we turn everyday kindness
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
                  borderRadius: '16px',
                  padding: '30px 22px',
                  textAlign: 'center',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: '36px',
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

      {/* Features / How It Works Section */}
      <section id="features" className="section">
        <div className="sectionhead">
          <div>
            <span className="eyebrow">HOW KINDRED WORKS</span>
            <h2>There is a place for everyone.</h2>
          </div>
          <p>
            Whether you have an hour or a whole weekend, your time and energy can
            change a life.
          </p>
        </div>
        <div className="features">
          {features.map(f => (
            <div
              key={f.step}
              className="card"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '34px' }}>{f.icon}</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    color: 'var(--muted)',
                    background: 'var(--soft)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                  }}
                >
                  STEP {f.step}
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px' }}>
                {f.title}
              </h3>
              <p className="muted" style={{ lineHeight: 1.6, fontSize: '14px' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Up Next Events Section */}
      <section id="upcoming" className="section tinted">
        <div className="sectionhead">
          <div>
            <span className="eyebrow">UP NEXT</span>
            <h2>Opportunities to do good.</h2>
          </div>
          <Link className="textlink" href="/events" style={{ fontSize: '15px' }}>
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
            <div
              className="empty"
              style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}
            >
              <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                New opportunities are arriving soon.
              </p>
              <p className="muted" style={{ marginBottom: '18px' }}>
                Be the first to create one for your neighborhood!
              </p>
              <Link href="/create" className="btn btn-primary btn-sm">
                Create an Event ↗
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="community" className="section gallery">
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
            <div
              key={image}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <img
                src={image}
                alt={`Community service moment ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <span className="eyebrow">KEEP IN TOUCH</span>
        <h2>Good news for good people.</h2>
        <p>
          Get a monthly digest with new community events, volunteer stories, and local
          ways to help make an impact.
        </p>

        {subscribed ? (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              padding: '16px 24px',
              maxWidth: '460px',
              margin: '28px auto 0',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ fontSize: '20px', marginRight: '8px' }}>🎉</span>
            <strong>You are on the list!</strong> Thanks for joining Kindred.
          </div>
        ) : (
          <form className="subscribe" onSubmit={handleSubscribe}>
            <input
              aria-label="Email address"
              placeholder="Enter your email address..."
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button className="button" type="submit">
              Subscribe →
            </button>
          </form>
        )}

        <p
          style={{
            fontSize: '12px',
            opacity: 0.75,
            marginTop: '16px',
          }}
        >
          🔒 No spam, ever. Unsubscribe at any time with one click.
        </p>
      </section>
    </>
  );
}
