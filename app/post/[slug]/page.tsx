import { getPost } from '@/lib/fetchPosts'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [urlFor(post.featuredImage).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div className="text-white">Post not found</div>
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(800).height(400).url() : null

  return (
    <article className="max-w-4xl mx-auto">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((category, index) => (
          <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {category}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
      <div className="text-gray-400 mb-8">
        By {post.author} | {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="prose prose-invert max-w-none">
        {post.content && post.content.map((block, index) => (
          <p key={index} className="text-white mb-4">{block.children?.[0]?.text || ''}</p>
        ))}
      </div>
    </article>
  )
}