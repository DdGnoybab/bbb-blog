import Link from 'next/link'
import type { Post } from '@/lib/types'

const CATEGORY_LABEL: Record<Post['category'], string> = {
  tech: '技术', life: '生活', other: '其他',
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block zzz-card group overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="zzz-tag">{CATEGORY_LABEL[post.category]}</span>
          <span className="text-text-muted text-xs font-mono">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN') : ''}
          </span>
        </div>
        <h2 className="font-display text-2xl tracking-wide text-text-primary group-hover:text-accent-yellow transition-colors leading-tight">
          {post.title}
        </h2>
      </div>

      {post.tags.length > 0 && (
        <div className="border-t border-border-subtle bg-black px-5 py-2 flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.65rem] text-text-muted tracking-wider group-hover:text-accent-yellow transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
