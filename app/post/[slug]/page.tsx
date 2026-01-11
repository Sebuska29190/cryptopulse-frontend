import { getPost } from '@/lib/fetchPosts'
import { urlFor } from '@/lib/sanity'
import { Metadata } from 'next'
import Link from 'next/link'

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
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).height(600).url() : null

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-muted">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category, index) => (
            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
              {category}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-muted mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-b border-border pb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="text-sm text-muted">Crypto Journalist</p>
            </div>
          </div>

          <div className="text-right">
            <time className="text-muted block" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <p className="text-sm text-muted">
              {Math.ceil(post.content?.reduce((acc: number, block: any) =>
                acc + (block.children?.[0]?.text?.length || 0), 0) / 200) || 5} min read
            </p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-invert max-w-none">
          {post.content && post.content.map((block: any, index: number) => {
            if (block._type === 'block') {
              return (
                <p key={index} className="text-foreground mb-6 leading-relaxed text-lg">
                  {block.children?.map((child: any, childIndex: number) => {
                    if (child.marks?.includes('strong')) {
                      return <strong key={childIndex} className="font-bold">{child.text}</strong>
                    }
                    return child.text
                  })}
                </p>
              )
            }
            return null
          })}
        </div>

        {/* Article Footer */}
        <footer className="border-t border-border mt-16 pt-12">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-muted">Tags:</span>
            {post.categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                className="bg-secondary hover:bg-primary/10 text-muted hover:text-primary px-3 py-1 rounded-full text-sm border border-border hover:border-primary/20 transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-muted">Share:</span>
              <button className="p-2 bg-secondary hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-border">
                <svg className="w-5 h-5 text-muted hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="p-2 bg-secondary hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-border">
                <svg className="w-5 h-5 text-muted hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>

            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}