import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/fetchPosts'
import { urlFor } from '@/lib/sanity'

interface ArticleCardProps {
  post: Post
  featured?: boolean
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(600).height(featured ? 400 : 250).url() : null

  return (
    <article className={`group bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-border ${featured ? 'md:col-span-2' : ''}`}>
      {imageUrl && (
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            width={featured ? 600 : 400}
            height={featured ? 400 : 250}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.slice(0, 3).map((category, index) => (
            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
              {category}
            </span>
          ))}
        </div>
        <h2 className={`font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          <Link href={`/post/${post.slug.current}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className={`text-muted mb-4 line-clamp-3 ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-muted">
          <span className="font-medium">By {post.author}</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
    </article>
  )
}