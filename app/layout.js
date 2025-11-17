import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NewsHub - Stay Informed with Latest News',
  description: 'A modern news aggregator featuring top headlines, category filters, search functionality, and bookmarks. Stay updated with the latest news from around the world.',
  keywords: 'news, headlines, breaking news, technology, business, sports, entertainment',
  authors: [{ name: 'NewsHub Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors`}>
        <ThemeProvider>
          <BookmarkProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
                  </p>
                  <p className="text-sm">
                    Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NewsAPI</a>
                  </p>
                </div>
              </div>
            </footer>
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
