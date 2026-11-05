import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page narrow" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <span className="eyebrow">404 ERROR</span>
      <h1 style={{ fontSize: '48px', margin: '16px 0' }}>Page Not Found</h1>
      <p className="muted" style={{ maxWidth: '440px', margin: '0 auto 28px' }}>
        The page you are looking for might have been moved or does not exist.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to Home →
      </Link>
    </section>
  );
}
