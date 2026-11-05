import Link from 'next/link';
import { EventItem } from '../lib/api';

export function EventCard({ event }: { event: EventItem }) {
  const count = event.joinedBy?.length || 0;

  return (
    <article className="card bg-base-100 border border-base-300 shadow-sm eventcard">
      <figure>
        <img src={event.image} alt={event.title} />
      </figure>
      <div className="card-body">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <span className="badge badge-accent">{event.type}</span>
          <span
            className="badge badge-neutral"
            style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title={`${count} community member${count === 1 ? '' : 's'} joined`}
          >
            👥 {count} {count === 1 ? 'joined' : 'joined'}
          </span>
        </div>
        <h3 className="card-title">{event.title}</h3>
        <p className="muted">⌖ {event.location}</p>
        <p className="date">
          ◷{' '}
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <div
          className="card-actions"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <span className="muted" style={{ fontSize: '12px' }}>
            By {event.creatorName?.split(' ')[0] || 'Member'}
          </span>
          <Link className="btn btn-outline btn-sm" href={`/events/${event.id}`}>
            View event →
          </Link>
        </div>
      </div>
    </article>
  );
}
