# Crypto Pulse Now

A fully functional cryptocurrency news portal built with Next.js (App Router), Tailwind CSS, and Sanity CMS.

## Features

- **Homepage**: Displays a list of articles with title, excerpt, featured image, categories, author, and published date
- **Article Pages**: Individual pages at `/post/[slug]` showing full content, featured image, author, categories, and SEO metadata
- **Dynamic Fetching**: Articles fetched from Sanity CMS via API
- **Responsive Design**: Mobile, tablet, and desktop friendly
- **SEO Optimized**: Meta titles, descriptions, OpenGraph tags, canonical URLs
- **ISR**: Incremental Static Regeneration with revalidate: 60 for automatic updates
- **Search**: Functional search component filtering articles by title or category
- **Dark Theme**: Sleek crypto portal styling with dark mode

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **CMS**: Sanity CMS (headless backend)
- **Deployment**: Vercel ready
- **Language**: TypeScript

## Project Structure

```
crypto-news-portal/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── post/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── ArticleCard.tsx
│   └── SearchComponent.tsx
├── lib/
│   ├── sanity.ts
│   ├── fetchPosts.ts
│   ├── samplePosts.json
│   └── schema.ts
├── styles/
│   └── globals.css
├── public/
├── .env.local
├── package.json
├── next.config.ts
├── tailwind.config.js
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