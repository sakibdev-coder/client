'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';

type CodeClient = { requestCode: () => void };

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initCodeClient: (config: {
            client_id: string;
            scope: string;
            ux_mode: 'popup';
            callback: (response: {
              code?: string;
              error?: string;
              error_description?: string;
            }) => void;
          }) => CodeClient;
        };
      };
    };
  }
}

export function GoogleSignIn() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [client, setClient] = useState<CodeClient | null>(null);
  const [busy, setBusy] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    const setup = () => {
      if (cancelled || !window.google?.accounts?.oauth2) return;
      setClient(
        window.google.accounts.oauth2.initCodeClient({
          client_id: clientId,
          scope: 'openid email profile',
          ux_mode: 'popup',
          callback: async response => {
            setBusy(false);
            if (response.error || !response.code) {
              const cancelledByUser =
                response.error === 'access_denied' ||
                response.error === 'popup_closed';
              if (!cancelledByUser) {
                toast.error(
                  response.error_description || 'Google sign-in was cancelled.'
                );
              }
              return;
            }
            try {
              await signInWithGoogle(response.code);
              toast.success('Logged in with Google.');
              router.push('/events');
            } catch (error) {
              toast.error(
                error instanceof Error ? error.message : 'Google sign-in failed.'
              );
            }
          },
        })
      );
    };

    if (window.google?.accounts?.oauth2) {
      setup();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-identity]'
    );
    if (existing) {
      existing.addEventListener('load', setup);
      return () => {
        cancelled = true;
        existing.removeEventListener('load', setup);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.dataset.googleIdentity = 'true';
    script.onload = setup;
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [clientId, router, signInWithGoogle]);

  useEffect(() => {
    if (!busy) return;
    const timer = window.setTimeout(() => setBusy(false), 45000);
    const release = () => window.setTimeout(() => setBusy(false), 600);
    window.addEventListener('focus', release);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('focus', release);
    };
  }, [busy]);

  if (!clientId) return null;

  return (
    <div className="google-signin">
      <p className="auth-divider">
        <span>or</span>
      </p>
      <button
        className="google-btn"
        type="button"
        disabled={!client || busy}
        onClick={() => {
          if (!client) return;
          setBusy(true);
          try {
            client.requestCode();
          } catch (error) {
            setBusy(false);
            toast.error(
              error instanceof Error
                ? error.message
                : 'Unable to open Google sign-in.'
            );
          }
        }}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.6 7.1l6.3 5.3C37.4 38.4 44 33 44 24c0-1.2-.1-2.3-.4-3.5z"
          />
        </svg>
        {busy ? 'Connecting...' : 'Continue with Google'}
      </button>
    </div>
  );
}
