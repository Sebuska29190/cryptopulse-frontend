'use client'

import { useEffect, useState } from 'react'
import { getPosts, Post } from '@/lib/fetchPosts'
import ArticleCard from '@/components/ArticleCard'
import SearchComponent from '@/components/SearchComponent'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts)
      setFilteredPosts(fetchedPosts)
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Latest Crypto News</h1>
      <SearchComponent posts={posts} onSearch={setFilteredPosts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}