import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../components/AuthProvider';
import { ThemeProvider } from '../components/ThemeProvider';
import { ToastProvider } from '../components/ToastProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Kindred — Social Development Events Platform',
    template: '%s | Kindred',
  },
  description:
    'Kindred is a community-first event management and volunteer mobilization platform for discovering, organizing, and joining local cleanups, tree plantations, donation drives, and civic initiatives.',
  keywords: [
    'Kindred',
    'Community Events',
    'Social Development',
    'Volunteering',
    'Cleanups',
    'Tree Plantation',
    'Charity',
    'Civic Engagement',
    'Dhaka',
  ],
  authors: [{ name: 'Sakib Al Hasan', url: 'https://github.com/sakibdev-coder' }],
  creator: 'Sakib Al Hasan',
  publisher: 'Kindred Community',
  metadataBase: new URL('https://kindred-events.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kindred-events.vercel.app',
    siteName: 'Kindred',
    title: 'Kindred — Social Development Events Platform',
    description:
      'Find meaningful ways to make a difference in your neighbourhood. One event, one helping hand, one shared moment at a time.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kindred Community Volunteers Working Together',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kindred — Social Development Events Platform',
    description:
      'Discover and join meaningful community events, cleanups, and local civic initiatives near you.',
    images: [
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider />
            <Navbar />
            <main className="site-main">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
