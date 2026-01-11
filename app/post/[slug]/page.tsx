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
    <main id="content" className="single-class content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9 col-md-8">
            <div className="mg-blog-post-box">
              <div className="mg-header">
                <div className="mg-blog-category">
                  {post.categories.map((category, index) => (
                    <a key={index} href="#">{category}</a>
                  ))}
                </div>
                <h1 className="title single">{post.title}</h1>
                <div className="media mg-info-author-block">
                  <a className="mg-author-pic" href="#">
                    <span className="text-primary font-bold text-lg">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </a>
                  <div className="media-body">
                    <h4 className="media-heading">
                      By <a href="#">{post.author}</a>
                    </h4>
                    <span className="mg-blog-date">
                      <i className="fas fa-clock"></i>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {imageUrl && (
                <img src={imageUrl} alt={post.title} className="img-fluid single-featured-image" />
              )}

              <article className="page-content-single small single">
                {post.content && post.content.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={index}>
                        {block.children?.map((child: any, childIndex: number) => {
                          if (child.marks?.includes('strong')) {
                            return <strong key={childIndex}>{child.text}</strong>
                          }
                          return child.text
                        })}
                      </p>
                    )
                  }
                  return null
                })}
              </article>

              {/* Author Box, Related Posts, Comments can be added here */}
            </div>
          </div>

          <aside className="col-lg-3 col-md-4 sidebar-sticky">
            {/* Sidebar widgets */}
            <div className="mg-widget">
              <div className="mg-wid-title">
                <h6>Categories</h6>
              </div>
              <ul>
                {post.categories.map((category, index) => (
                  <li key={index}>
                    <Link href={`/category/${category.toLowerCase().replace(' ', '-')}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}