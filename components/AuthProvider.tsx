'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

type User = { id: string; name: string; email: string; photo?: string; photoURL?: string };

type AuthContext = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (code: string) => Promise<void>;
  register: (name: string, email: string, password: string, photo?: string) => Promise<void>;
  updateProfile: (name: string, photo?: string) => Promise<void>;
  signOut: () => void;
};

const Context = createContext<AuthContext>({
  user: null,
  loading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  register: async () => {},
  updateProfile: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('kindred-token')) {
      api<{ user: User }>('/auth/me')
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('kindred-token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const save = useCallback((data: { user: User; token: string }) => {
    localStorage.setItem('kindred-token', data.token);
    setUser(data.user);
  }, []);

  const signInWithGoogle = useCallback(async (code: string) => {
    const data = await api<{ user: User; token: string }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    save(data);
  }, [save]);

  const signIn = async (email: string, password: string) => {
    const data = await api<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim(), password }),
    });
    save(data);
  };

  const register = async (name: string, email: string, password: string, photo?: string) => {
    const photoValue = (photo || '').trim();
    const data = await api<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
        photo: photoValue,
        photoURL: photoValue,
      }),
    });
    save(data);
  };

  const updateProfile = async (name: string, photo?: string) => {
    const photoValue = (photo || '').trim();
    const data = await api<{ user: User; token: string }>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name.trim(),
        photo: photoValue,
        photoURL: photoValue,
      }),
    });
    save(data);
  };

  const signOut = () => {
    localStorage.removeItem('kindred-token');
    setUser(null);
  };

  return (
    <Context.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        register,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => useContext(Context);
