import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import PostBody from '@/components/PostBody'
import { getAllPublishedPosts, getPostBySlug } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title }
}

export async function generateStaticParams() {
  return getAllPublishedPosts().map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-text-muted font-mono text-sm hover:text-accent-yellow transition-colors"
        >
          ← BACK
        </Link>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="zzz-tag">{post!.category}</span>
          <span className="text-text-muted font-mono text-xs">
            {post!.publishedAt
              ? new Date(post!.publishedAt).toLocaleDateString('zh-CN')
              : ''}
          </span>
        </div>
        <h1 className="font-display text-6xl tracking-wide leading-tight text-text-primary mb-4">
          {post!.title}
        </h1>
        {post!.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {post!.tags.map((tag) => (
              <span key={tag} className="text-text-muted font-mono text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="border-t border-border-subtle pt-8">
        <PostBody content={post!.content} />
      </div>
    </article>
  )
}
