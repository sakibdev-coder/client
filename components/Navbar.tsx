'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';

const guestLinks = [{ href: '/events', label: 'Upcoming' }];
const memberLinks = [
  { href: '/events', label: 'Upcoming' },
  { href: '/create', label: 'Create' },
  { href: '/manage', label: 'Manage' },
  { href: '/joined', label: 'Joined' },
];

function Mark() {
  return (
    <span className="site-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 3.4 20.1 12 12 20.6 3.9 12 12 3.4Z" />
      </svg>
    </span>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.5 14.2A6.4 6.4 0 0 1 9.8 7.5 6.5 6.5 0 1 0 16.5 14.2Z" />
    </svg>
  );
}

export function Navbar() {
  const { user, signOut } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const links = user ? memberLinks : guestLinks;
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);
  const firstName = user?.name.split(' ')[0] ?? '';

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully.');
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="site-nav">
      <div className="site-nav-bar navbar">
        <div className="site-nav-side">
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm site-icon-btn lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <Link className="brand site-brand" href="/">
            <Mark />
            <span className="site-word">
              <strong>kindred</strong>
              <small>community</small>
            </span>
          </Link>
        </div>

        <nav className="site-links" aria-label="Primary navigation">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'is-active' : undefined}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm site-icon-btn"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <ThemeIcon dark={dark} />
          </button>

          {user ? (
            <div className="dropdown dropdown-end site-account">
              <div
                tabIndex={0}
                role="button"
                className="site-avatar"
                aria-label={`Account menu for ${user.name}`}
                title={user.name}
              >
                <span className="site-avatar-photo" title={user.name}>
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </span>
                <span className="site-user-name">{firstName}</span>
                <span className="profile-tooltip" aria-hidden="true">
                  {user.name}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu site-menu bg-base-100 z-50 mt-3 w-64 p-2 shadow"
              >
                <li className="site-menu-id">
                  <span>{user.name}</span>
                  <small>{user.email}</small>
                </li>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <Link href="/create">Create event</Link>
                </li>
                <li>
                  <Link href="/manage">Manage events</Link>
                </li>
                <li>
                  <Link href="/joined">Joined events</Link>
                </li>
                <li>
                  <button type="button" onClick={handleSignOut}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-ghost btn-sm site-login" href="/login">
                Log in
              </Link>
              <Link className="btn btn-primary btn-sm site-join" href="/register">
                Join us
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={menuOpen ? 'site-drawer is-open' : 'site-drawer'} hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'is-active' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
              <button type="button" onClick={handleSignOut}>
                Log out
              </button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
