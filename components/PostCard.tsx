import Link from 'next/link'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block zzz-card p-5 group">
      <div className="flex items-center gap-2 mb-3">
        <span className="zzz-tag">{{ tech: '技术', life: '生活', other: '其他' }[post.category]}</span>
        <span className="text-text-muted text-xs font-mono">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN') : ''}
        </span>
      </div>
      <h2 className="font-display text-2xl tracking-wide text-text-primary group-hover:text-accent-yellow transition-colors leading-tight mb-2">
        {post.title}
      </h2>
      {post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-text-muted text-xs font-mono">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
