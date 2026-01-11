# Crypto Pulse Now

A professional, polished cryptocurrency news portal built with Next.js (App Router), Tailwind CSS, and Sanity CMS.

## ✨ Features

- **🏠 Homepage Hero Section**: Featured latest article with compelling visuals
- **📰 Latest News Grid**: Clean, responsive article cards with hover effects
- **📱 Sidebar**: Categories, trending articles, and newsletter signup
- **🔍 Advanced Search**: Prominent search bar filtering by title and category
- **📄 Individual Articles**: Beautifully designed article pages with breadcrumbs, author info, and social sharing
- **🌓 Dark/Light Theme**: Seamless theme switching with localStorage persistence
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **🎨 Crypto-Themed Design**: Modern color palette and typography suitable for crypto news
- **⚡ Performance**: ISR with 60-second revalidation for fresh content
- **🔍 SEO Optimized**: Complete meta tags, OpenGraph, Twitter Cards, and structured data
- **🚀 Vercel Ready**: Optimized for deployment with environment variables

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **CMS**: Sanity CMS (headless backend)
- **Deployment**: Vercel with automatic builds
- **Language**: TypeScript with strict type checking
- **Fonts**: Inter + JetBrains Mono for modern typography

## 📁 Project Structure

```
crypto-news-portal/
├── app/
│   ├── layout.tsx           # Root layout with navigation and footer
│   ├── page.tsx            # Homepage with hero and article grid
│   └── post/[slug]/
│       └── page.tsx        # Individual article pages
├── components/
│   ├── ArticleCard.tsx     # Professional article cards with hover effects
│   ├── SearchComponent.tsx # Enhanced search with icons and styling
│   └── ThemeToggle.tsx     # Dark/light theme switcher
├── lib/
│   ├── sanity.ts           # Sanity CMS client configuration
│   ├── fetchPosts.ts       # API functions for fetching articles
│   ├── samplePosts.json    # Example article data
│   └── schema.ts           # Sanity content schema
├── styles/
│   └── globals.css         # Global styles with custom CSS variables
├── public/                 # Static assets
├── .env.local             # Environment variables
├── package.json           # Dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md
```

## Setup Instructions

1. **Clone the repository** (when available) or use the generated files.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Sanity CMS**:
   - Create a new Sanity project at [sanity.io](https://sanity.io)
   - Add the schema from `lib/schema.ts` to your Sanity studio
   - Create some posts using the schema
   - Copy your project ID and dataset name

4. **Configure environment variables**:
   - Update `.env.local` with your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

## Example Posts

The `lib/samplePosts.json` file contains example post data for layout purposes. Replace with real data from Sanity.

## Sanity Schema

The post schema includes:
- Title (string)
- Excerpt (text)
- Featured Image (image)
- Categories (array of strings)
- Author (string)
- Published Date (datetime)
- Slug (slug, auto-generated from title)
- Content (rich text blocks)

## Contributing

This is a generated project. For modifications, edit the relevant files and redeploy.

## License

ISC