import Link from 'next/link';

const explore = [
  { href: '/events', label: 'Upcoming events' },
  { href: '/create', label: 'Create an event' },
  { href: '/joined', label: 'Joined events' },
];

const account = [
  { href: '/login', label: 'Log in' },
  { href: '/register', label: 'Create an account' },
  { href: '/manage', label: 'Manage events' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-invite">
        <div>
          <span className="eyebrow">SHOW UP</span>
          <h2>
            Small acts, <em>shared impact.</em>
          </h2>
          <p>
            Winter clothes in Mirpur, blankets in Mohammadpur, a cleanup on
            your own street. Kindred is where those plans find people.
          </p>
        </div>
        <Link className="button" href="/events">
          Find an event <span>→</span>
        </Link>
      </div>

      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span>✦</span> kindred
            </Link>
            <p>
              A community desk for local service. One event, one helping hand,
              one shared afternoon at a time.
            </p>
          </div>

          <nav className="footer-links" aria-label="Explore">
            <strong>Explore</strong>
            {explore.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-links" aria-label="Account">
            <strong>Account</strong>
            {account.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-links">
            <strong>Visit</strong>
            <p>Dhaka, Bangladesh</p>
            <a href="mailto:hello@kindred.community">hello@kindred.community</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Kindred. Neighbourhoods that look after their own.</p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z"
                />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M14.7 10.3 21.4 3h-1.6l-5.8 6.4L9.3 3H3.2l7 9.9L3.2 21h1.6l6.2-6.8L14.8 21h6.1l-6.2-10.7zm-2.2 2.4-.7-1-5.6-7.7h2.4l4.5 6.3.7 1 6 8.2h-2.4l-4.9-6.8z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.5 9H4V20h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6a2.1 2.1 0 0 0-2 1.4 2.5 2.5 0 0 0-.1.9V20H11V9h2.4v1.5a3.4 3.4 0 0 1 3-1.7c2.2 0 3.6 1.4 3.6 4.4V20z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
