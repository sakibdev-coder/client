'use client';

import { useState } from 'react';

export function PasswordField({
  label,
  name,
  id,
  autoComplete,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  id?: string;
  autoComplete: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const controlled = value !== undefined;

  return (
    <label className="field">
      {label}
      <span className="field-control">
        <input
          className="input w-full"
          name={name}
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          {...(controlled
            ? {
                value,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  onChange?.(event.target.value),
              }
            : {})}
        />
        <button
          className="field-toggle"
          type="button"
          onClick={() => setVisible(open => !open)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </span>
    </label>
  );
}

export function PasswordRules({ password }: { password: string }) {
  const rules = [
    { label: 'At least 6 characters', ok: password.length >= 6 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', ok: /[a-z]/.test(password) },
  ];

  return (
    <div className="password-guide">
      <p className="password-hint">
        Use at least 6 characters, with one uppercase letter and one lowercase letter.
      </p>
      <ul className="password-rules" aria-live="polite">
        {rules.map(rule => (
          <li key={rule.label} className={rule.ok ? 'met' : undefined}>
            <span aria-hidden="true">{rule.ok ? '✓' : '○'}</span>
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
