'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const active = (route: string) =>
    path === route || path.startsWith(`${route}/`) ? 'active' : '';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close menus when pathname changes
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [path]);

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully.');
    closeMenu();
    router.push('/');
  };

  return (
    <header className="nav">
      <Link className="brand" href="/" onClick={closeMenu}>
        <span>✦</span> kindred
      </Link>

      <nav
        className={`navlinks${menuOpen ? ' open' : ''}`}
        aria-label="Primary navigation"
      >
        <Link
          className={active('/events')}
          href="/events"
          onClick={closeMenu}
        >
          Upcoming events
        </Link>
        {user && (
          <>
            <Link
              href="/create"
              className={active('/create')}
              onClick={closeMenu}
            >
              Create event
            </Link>
            <Link
              href="/manage"
              className={active('/manage')}
              onClick={closeMenu}
            >
              Manage events
            </Link>
            <Link
              href="/joined"
              className={active('/joined')}
              onClick={closeMenu}
            >
              Joined events
            </Link>
          </>
        )}
      </nav>

      <div className="navactions">
        <button
          className="iconbtn"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          {dark ? '☼' : '☾'}
        </button>

        {user ? (
          <>
            {/* Profile Picture with Hover Tooltip & Dropdown Menu */}
            <div className="profile-wrapper" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setDropdownOpen(open => !open)}
                aria-label={`User menu for ${user.name}`}
                aria-expanded={dropdownOpen}
                title={user.name}
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="profile-img"
                    onError={e => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector(
                        '.profile-fallback'
                      ) as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="profile-fallback"
                  style={{ display: user.photo ? 'none' : 'flex' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="profile-chevron">{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {/* Hover Tooltip showing user display name */}
              {!dropdownOpen && (
                <div className="profile-tooltip" role="tooltip">
                  {user.name}
                </div>
              )}

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="profile-dropdown" role="menu">
                  <div className="dropdown-header">
                    <span className="dropdown-name">{user.name}</span>
                    <span className="dropdown-email">{user.email}</span>
                  </div>
                  <Link
                    href="/create"
                    className={`dropdown-item ${active('/create')}`}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>＋</span> Create Event
                  </Link>
                  <Link
                    href="/manage"
                    className={`dropdown-item ${active('/manage')}`}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>⚙</span> Manage Events
                  </Link>
                  <Link
                    href="/joined"
                    className={`dropdown-item ${active('/joined')}`}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>✓</span> Joined Events
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item logout-item"
                    role="menuitem"
                    onClick={handleSignOut}
                  >
                    <span>↳</span> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Standalone Logout Button */}
            <button
              className="outline small logout-nav-btn"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="outline small" href="/login">
              Log in
            </Link>
            <Link className="button small" href="/register">
              Join us
            </Link>
          </>
        )}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(open => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>
    </header>
  );
}
