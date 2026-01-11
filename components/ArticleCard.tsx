import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/fetchPosts'
import { urlFor } from '@/lib/sanity'

interface ArticleCardProps {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(400).height(250).url() : null

  return (
    <article className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map((category, index) => (
            <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
              {category}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2 text-white">
          <Link href={`/post/${post.slug.current}`} className="hover:text-blue-400">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>By {post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  )
}