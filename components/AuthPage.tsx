import type { ReactNode } from 'react';

const points = [
  'Find service events close to home',
  'Join once, and keep the date on your list',
  'Create an event and invite your neighbours',
];

export function AuthPage({
  title,
  subtitle,
  asideTitle,
  asideText,
  image,
  imageAlt,
  children,
}: {
  title: string;
  subtitle: string;
  asideTitle: ReactNode;
  asideText: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
}) {
  return (
    <section className="auth-shell">
      <aside className="auth-aside">
        <img src={image} alt={imageAlt} />
        <div className="auth-aside-shade" />
        <div className="auth-aside-copy">
          <span className="eyebrow">COMMUNITY FIRST</span>
          <h2>{asideTitle}</h2>
          <p>{asideText}</p>
          <ul className="auth-points">
            {points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="auth-panel">
        <div className="authbox">
          <span className="eyebrow">✦ KINDRED</span>
          <h1>{title}</h1>
          <p className="auth-lead">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
