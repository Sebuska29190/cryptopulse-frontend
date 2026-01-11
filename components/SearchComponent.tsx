'use client'

import { useState } from 'react'
import { Post } from '@/lib/fetchPosts'

interface SearchComponentProps {
  posts: Post[]
  onSearch: (filteredPosts: Post[]) => void
}

export default function SearchComponent({ posts, onSearch }: SearchComponentProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase()
    setQuery(searchQuery)

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.categories.some(cat => cat.toLowerCase().includes(searchQuery))
    )

    onSearch(filtered)
  }

  return (
    <div className="relative mb-8">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search articles by title or category..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-4 bg-secondary text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-muted"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              onSearch(posts)
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}