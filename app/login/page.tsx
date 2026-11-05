'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../components/AuthProvider';
import { AuthPage } from '../../components/AuthPage';
import { GoogleSignIn } from '../../components/GoogleSignIn';
import { PasswordField } from '../../components/PasswordField';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError('');

    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');

    if (!email || !password) {
      const msg = 'Please enter both email and password.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email, password);
      toast.success('Logged in successfully! Welcome back.');
      router.push('/events');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to sign in.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPage
      title="Welcome back."
      subtitle="Log in to find the next neighbourhood effort worth your time."
      asideTitle={
        <>
          Good things happen when neighbours <em>show up.</em>
        </>
      }
      asideText="Winter clothes in Mirpur, blankets in Mohammadpur, a cleanup on your own street. Kindred is where those plans find people."
      image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80"
      imageAlt="Volunteers sorting donations together"
    >
      <form onSubmit={submit}>
        <label className="field">
          Email address
          <input
            className="input w-full"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            required
          />
        </label>
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
        />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log in →'}
        </button>
        <p className="formfoot">
          New to kindred? <Link href="/register">Create an account</Link>
        </p>
      </form>
      <GoogleSignIn />
    </AuthPage>
  );
}
