import { client } from './sanity'
import samplePosts from './samplePosts.json'

export interface Post {
  _id: string
  title: string
  excerpt: string
  featuredImage: any
  categories: string[]
  author: string
  publishedAt: string
  slug: { current: string }
  content?: any[]
}

const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_sanity_project_id'

export async function getPosts(): Promise<Post[]> {
  if (isSanityConfigured) {
    return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      featuredImage,
      categories,
      author,
      publishedAt,
      slug
    }`)
  }
  return samplePosts as Post[]
}

export async function getPost(slug: string): Promise<Post | null> {
  if (isSanityConfigured) {
    return client.fetch(`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      featuredImage,
      categories,
      author,
      publishedAt,
      slug,
      content
    }`, { slug })
  }
  return (samplePosts as Post[]).find(post => post.slug.current === slug) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  if (isSanityConfigured) {
    return client.fetch(`*[_type == "post" && $category in categories] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      featuredImage,
      categories,
      author,
      publishedAt,
      slug
    }`, { category })
  }
  return (samplePosts as Post[]).filter(post => post.categories.includes(category))
}