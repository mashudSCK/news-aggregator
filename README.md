# 📰 NewsHub - Modern News Aggregator

A beautiful, responsive news aggregator built with **Next.js 14**, **Tailwind CSS**, and the **NewsAPI**. Stay informed with the latest headlines, search functionality, category filters, and bookmark your favorite articles.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 🎯 Core Functionality
- **📱 Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **🌙 Dark Mode** - Toggle between light and dark themes with persistence
- **🔍 Smart Search** - Keyword-based search with quick suggestions
- **📑 Bookmarks** - Save articles to read later (stored in localStorage)
- **♾️ Infinite Scroll** - Load more articles with pagination
- **⚡ Fast Performance** - Optimized with Next.js 14 App Router

### 📂 News Categories
- 🌟 Top Headlines
- 💻 Technology
- 💼 Business
- ⚽ Sports
- 🎬 Entertainment
- 🔬 Science
- 🏥 Health

### 🎨 UI/UX
- Clean, minimalistic design inspired by Google News
- Smooth animations and transitions
- Skeleton loaders for better UX
- Responsive navigation with mobile menu
- Beautiful gradient effects
- Hover animations on cards

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- GNews API key (get it free at [gnews.io](https://gnews.io))

### Installation

1. **Clone or navigate to the project**
   ```powershell
   cd c:\xampp\htdocs\NewsAggregator
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   ```powershell
   Copy-Item .env.example .env.local
   ```
   - Open `.env.local` and add your GNews API key:
   ```env
   NEXT_PUBLIC_GNEWS_API_KEY=your_api_key_here
   NEXT_PUBLIC_DEFAULT_COUNTRY=us
   NEXT_PUBLIC_DEFAULT_LANGUAGE=en
   ```

4. **Run the development server**
   ```powershell
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
NewsAggregator/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Homepage (Top Headlines)
│   ├── globals.css               # Global styles
│   ├── category/
│   │   └── [category]/
│   │       └── page.js           # Dynamic category pages
│   ├── search/
│   │   └── page.js               # Search results page
│   └── bookmarks/
│       └── page.js               # Saved bookmarks page
│
├── components/                   # Reusable React components
│   ├── Navbar.jsx                # Navigation bar with dark mode toggle
│   ├── NewsCard.jsx              # Article card with bookmark button
│   ├── CategoryTabs.jsx          # Category filter tabs
│   ├── SearchBar.jsx             # Search input with suggestions
│   ├── LoadingSpinner.jsx        # Loading indicator
│   ├── ErrorMessage.jsx          # Error display component
│   └── NewsCardSkeleton.jsx      # Loading skeleton
│
├── context/                      # React Context providers
│   ├── BookmarkContext.js        # Bookmark state management
│   └── ThemeContext.js           # Dark/light mode management
│
├── utils/                        # Utility functions
│   └── fetchNews.js              # API calls and helpers
│
├── package.json                  # Dependencies and scripts
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── jsconfig.json                 # Path aliases
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

---

## 🔧 Configuration

### API Configuration
The app uses **GNews API** for fetching news. You can customize:

- **Country**: Change `NEXT_PUBLIC_DEFAULT_COUNTRY` (e.g., `us`, `ph`, `gb`)
- **Language**: Change `NEXT_PUBLIC_DEFAULT_LANGUAGE` (e.g., `en`, `es`, `fr`)
- **Categories**: Modify in `utils/fetchNews.js`

### Tailwind Customization
Edit `tailwind.config.js` to customize:
- Colors and themes
- Fonts
- Animations
- Breakpoints

---

## 🎨 Key Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI component library |
| **Tailwind CSS** | Utility-first CSS framework |
| **Lucide React** | Beautiful icon library |
| **GNews API** | News data source |
| **Context API** | State management |
| **localStorage** | Client-side data persistence |

---

## 📱 Pages Overview

### 1. Homepage (`/`)
- Displays top headlines from around the world
- Infinite scroll pagination
- Quick access to categories

### 2. Category Pages (`/category/[category]`)
- Technology, Business, Sports, Entertainment, Science, Health
- Category-specific news articles
- Same infinite scroll functionality

### 3. Search Page (`/search`)
- Keyword-based search
- Quick search suggestions
- Real-time results

### 4. Bookmarks Page (`/bookmarks`)
- View all saved articles
- Remove individual or all bookmarks
- Persists across sessions

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```powershell
   npm i -g vercel
   ```

2. **Deploy via Git**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Deploy via CLI**
   ```powershell
   vercel
   ```

### Environment Variables on Vercel
Add these in your Vercel project settings:
- `NEXT_PUBLIC_GNEWS_API_KEY`
- `NEXT_PUBLIC_DEFAULT_COUNTRY`
- `NEXT_PUBLIC_DEFAULT_LANGUAGE`

---

## 🎯 Optional Enhancements

### 🔮 Future Features You Can Add:

1. **AI Summaries**
   - Integrate OpenAI API for article summaries
   - Add a "Summarize" button to NewsCard

2. **Voice Search**
   - Implement Web Speech API
   - Add microphone button to search bar

3. **User Authentication**
   - Add Firebase Authentication
   - Sync bookmarks across devices

4. **Region Filter**
   - Add country selector dropdown
   - Allow users to select news region

5. **Share Functionality**
   - Add social media share buttons
   - Copy link to clipboard

6. **Reading List**
   - Track reading progress
   - Mark articles as read

7. **Email Digest**
   - Send daily/weekly email summaries
   - Customize topics of interest

8. **RSS Feed Support**
   - Add custom RSS feed sources
   - Aggregate multiple sources

---

## 🔍 SEO Optimization

The app includes several SEO best practices:

- **Meta Tags**: Configured in `app/layout.js`
- **Semantic HTML**: Proper heading hierarchy
- **Image Optimization**: Next.js Image component
- **Fast Loading**: SSR and caching strategies
- **Mobile-First**: Responsive design

### Additional SEO Tips:
1. Add `robots.txt` file
2. Generate `sitemap.xml`
3. Add Open Graph meta tags
4. Implement structured data (JSON-LD)
5. Optimize Core Web Vitals

---

## 🐛 Troubleshooting

### Common Issues:

**1. API Rate Limit**
- GNews free tier: 100 requests/day
- Use caching to reduce API calls
- Consider upgrading for production

**2. Images Not Loading**
- Check if `urlToImage` is valid
- Fallback images are configured
- Some sources block external access

**3. Dark Mode Flickering**
- Due to hydration mismatch
- Current implementation prevents this
- Theme loads from localStorage on mount

**4. Build Errors**
- Clear `.next` folder: `Remove-Item -Recurse -Force .next`
- Delete `node_modules` and reinstall
- Check Node.js version compatibility

---

## 📝 Scripts

```powershell
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **GNews API** - For providing the news data
- **Unsplash** - For fallback images
- **Lucide** - For beautiful icons
- **Vercel** - For hosting and deployment
- **Next.js Team** - For the amazing framework

---

## 📧 Support

Having issues? Need help?

- Check the [Issues](../../issues) page
- Review the documentation
- Contact: your-email@example.com

---

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Next.js and Tailwind CSS**

*Last updated: November 2025*

---

## 🔄 Infinite Scroll Implementation

This project uses a reusable IntersectionObserver-based hook to provide automatic infinite scrolling across the site (homepage, category pages and search results). The implementation is lightweight, prevents duplicate requests while loading, and shows a small loading indicator while fetching additional articles.

Files involved:
- `hooks/useInfiniteScroll.js` — custom hook using IntersectionObserver
- `app/page.js` — Homepage: attaches sentinel ref and shows loader
- `app/category/[category]/page.js` — Category pages: same pattern
- `app/search/page.js` — Search results: same pattern

How it works (summary):
- A small "sentinel" `<div ref={sentinelRef}>` is rendered after the list of articles.
- `useInfiniteScroll(callback, hasMore, isLoading)` observes the sentinel and calls `callback()` when it becomes visible (configured to trigger slightly before it is fully in view).
- The page components guard against repeated triggers by checking `isLoading` and `hasMore` before requesting more data.

Key configuration (in `hooks/useInfiniteScroll.js`):
- `threshold: 0.1` — trigger when ~10% of the sentinel is visible
- `rootMargin: '200px'` — start loading 200px before the sentinel fully appears (smooth UX)

Quick usage example:

```jsx
// in a page component
const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

return (
   <>
      {/* article grid */}
      {articles.map(a => <NewsCard key={a.url} article={a} />)}

      {hasMore && (
         <div ref={sentinelRef} className="py-8 flex justify-center">
            {loadingMore && <span className="animate-spin">Loading more...</span>}
         </div>
      )}
   </>
)
```

Testing checklist:
- Start the dev server: `npm run dev` and open `http://localhost:3000`
- Scroll near the bottom of any listing page — new articles should load automatically
- Confirm the spinner appears while loading and that no duplicate requests occur

Notes & next steps:
- Adjust `rootMargin` if you want earlier/later fetch behavior
- Consider adding small skeleton placeholders for the next page for smoother visual loading
- For very long lists, consider virtualization (`react-window`) to improve rendering performance

