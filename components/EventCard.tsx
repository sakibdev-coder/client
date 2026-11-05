import Link from 'next/link';
import { EventItem } from '../lib/api';

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card bg-base-100 border border-base-300 shadow-sm eventcard">
      <figure>
        <img src={event.image} alt={event.title} />
      </figure>
      <div className="card-body">
        <span className="badge badge-accent">{event.type}</span>
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
        <div className="card-actions">
          <Link className="btn btn-outline btn-sm" href={`/events/${event.id}`}>
            View event
          </Link>
        </div>
      </div>
    </article>
  );
}
