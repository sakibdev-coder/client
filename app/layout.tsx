import './globals.css';
import { AuthProvider } from '../components/AuthProvider';
import { ThemeProvider } from '../components/ThemeProvider';
import { ToastProvider } from '../components/ToastProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'Kindred | Small acts, shared impact',
  description: 'Discover and join meaningful community events near you.',
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
