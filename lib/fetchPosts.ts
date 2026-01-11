import { client } from './sanity'

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

export async function getPosts(): Promise<Post[]> {
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

export async function getPost(slug: string): Promise<Post | null> {
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

export async function getPostsByCategory(category: string): Promise<Post[]> {
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