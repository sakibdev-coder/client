'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext({ dark: false, toggle: () => {} });
export function ThemeProvider({ children }: { children: React.ReactNode }) { const [dark, setDark] = useState(false); useEffect(() => { const saved = localStorage.getItem('kindred-theme') === 'dark'; setDark(saved); document.documentElement.dataset.theme = saved ? 'dark' : 'light'; }, []); const toggle = () => { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? 'dark' : 'light'; localStorage.setItem('kindred-theme', next ? 'dark' : 'light'); }; return <Context.Provider value={{ dark, toggle }}>{children}</Context.Provider>; }
export const useTheme = () => useContext(Context);
