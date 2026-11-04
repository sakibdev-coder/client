'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../../components/AuthProvider';
import { AuthPage } from '../../components/AuthPage';
import { GoogleSignIn } from '../../components/GoogleSignIn';
import { PasswordField, PasswordRules } from '../../components/PasswordField';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError('');

    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const photoURL = String(form.get('photoURL') || '').trim();

    if (!name || !email || !password) {
      const msg = 'Please fill out all required fields.';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      let msg =
        'Password must have at least 6 characters, including at least one uppercase letter and one lowercase letter.';
      if (password.length < 6) {
        msg = 'Password must be at least 6 characters long.';
      } else if (!/[A-Z]/.test(password)) {
        msg = 'Password must contain at least one uppercase letter.';
      } else if (!/[a-z]/.test(password)) {
        msg = 'Password must contain at least one lowercase letter.';
      }
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirm) {
      const msg = 'Passwords do not match.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password, photoURL);
      toast.success('Account created successfully! Welcome to Kindred.');
      router.push('/events');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to create account.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmNote =
    confirm.length === 0
      ? ''
      : confirm === password
        ? 'Passwords match.'
        : 'Passwords do not match yet.';

  return (
    <AuthPage
      title="Create your place."
      subtitle="A name, an email, and a password. Then you can join or host a local event."
      asideTitle={
        <>
          A kinder city starts with <em>your name</em> on the list.
        </>
      }
      asideText="Sign up once. After that, creating a cleanup, a donation drive, or a plantation day takes only a few details."
      image="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1400&q=80"
      imageAlt="People packing food parcels for a community drive"
    >
      <form onSubmit={submit}>
        <div className="auth-split">
          <label className="field">
            Your name
            <input
              name="name"
              id="name"
              placeholder="Jane Doe"
              autoComplete="name"
              required
            />
          </label>
          <label className="field">
            Email address
            <input
              name="email"
              id="email"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
              inputMode="email"
              required
            />
          </label>
        </div>
        <label className="field">
          Profile photo URL
          <input
            name="photoURL"
            id="photoURL"
            type="url"
            placeholder="https://images.unsplash.com/..."
            inputMode="url"
          />
          <span className="field-note">Optional. Paste a link to a photo you already have.</span>
        </label>
        <PasswordField
          label="Password"
          name="password"
          id="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={setPassword}
        />
        <PasswordRules password={password} />
        <PasswordField
          label="Confirm password"
          name="confirm"
          id="confirm"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirm}
          onChange={setConfirm}
        />
        {confirmNote && (
          <p className={`match-note${confirm === password ? ' met' : ''}`} role="status">
            {confirmNote}
          </p>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="button full" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Create account →'}
        </button>
        <p className="formfoot">
          Already a member? <Link href="/login">Log in</Link>
        </p>
      </form>
      <GoogleSignIn />
    </AuthPage>
  );
}
