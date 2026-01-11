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
    <>
      {/* Main Content Layouts */}
      <div className="col-md-8">
        <div className="mg-sec-title">
          <h4>Latest News</h4>
        </div>
        <div className="row">
          {recentPosts.map((post) => (
            <div key={post._id} className="col-lg-4 col-md-6">
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="col-md-4 sidebar-sticky">
        <div className="mg-widget">
          <div className="mg-wid-title">
            <h6>Categories</h6>
          </div>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/category/${category.toLowerCase().replace(' ', '-')}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mg-widget">
          <div className="mg-wid-title">
            <h6>Trending</h6>
          </div>
          <ul>
            {trendingPosts.map((post, index) => (
              <li key={post._id}>
                <Link href={`/post/${post.slug.current}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="mg-widget">
          <div className="mg-wid-title">
            <h6>Stay Updated</h6>
          </div>
          <p>Get the latest crypto news delivered to your inbox.</p>
          <input type="email" placeholder="Enter your email" className="form-control" />
          <button className="btn btn-theme mt-2">Subscribe</button>
        </div>
      </aside>
    </>
  )
}