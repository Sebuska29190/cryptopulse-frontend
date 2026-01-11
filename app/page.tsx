'use client'

import { useEffect, useState } from 'react'
import { getPosts, Post } from '@/lib/fetchPosts'
import ArticleCard from '@/components/ArticleCard'
import SearchComponent from '@/components/SearchComponent'
import Link from 'next/link'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    getPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts)
      setFilteredPosts(fetchedPosts)

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(fetchedPosts.flatMap(post => post.categories)))
      setCategories(uniqueCategories.slice(0, 8)) // Limit to 8 categories
    })
  }, [])

  const featuredPost = filteredPosts[0]
  const recentPosts = filteredPosts.slice(1, 7)
  const trendingPosts = filteredPosts.slice(0, 5)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-accent/10 py-20 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Crypto Pulse Now</span>
              </h1>
              <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
                Stay ahead of the curve with the latest cryptocurrency news, market analysis,
                and blockchain insights from industry experts.
              </p>
              <div className="max-w-2xl mx-auto mb-12">
                <SearchComponent posts={posts} onSearch={setFilteredPosts} />
              </div>
            </div>
          </div>

          {/* Featured Article */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="bg-secondary rounded-2xl overflow-hidden shadow-2xl border border-border">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredPost.featuredImage && (
                    <img
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${featuredPost.featuredImage.asset._ref.split('-')[1]}-${featuredPost.featuredImage.asset._ref.split('-')[2]}.jpg?w=800&h=500&fit=crop`}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    <Link href={`/post/${featuredPost.slug.current}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-muted mb-6 text-lg">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">By {featuredPost.author}</span>
                    <time className="text-sm text-muted">
                      {new Date(featuredPost.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-secondary rounded-xl p-6 mb-8 border border-border">
              <h3 className="text-xl font-bold mb-4 text-foreground">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2 rounded-lg bg-background hover:bg-primary/10 text-muted hover:text-primary transition-colors duration-200"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Articles */}
            <div className="bg-secondary rounded-xl p-6 mb-8 border border-border">
              <h3 className="text-xl font-bold mb-4 text-foreground">Trending</h3>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div key={post._id} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <Link
                        href={`/post/${post.slug.current}`}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted mt-1">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-foreground">Stay Updated</h3>
              <p className="text-muted mb-4 text-sm">
                Get the latest crypto news delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted"
                />
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}