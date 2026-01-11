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
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search articles by title or category..."
        value={query}
        onChange={handleSearch}
        className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}