'use client';

import { Toaster } from 'react-hot-toast';
import { useTheme } from './ThemeProvider';

export function ToastProvider() {
  const { dark } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: dark ? '#17221a' : '#ffffff',
          color: dark ? '#edf5ed' : '#17231d',
          border: `1px solid ${dark ? '#304337' : '#dce4dc'}`,
          borderRadius: '8px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
          fontSize: '14px',
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: '#316b4d',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#bb453b',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}

