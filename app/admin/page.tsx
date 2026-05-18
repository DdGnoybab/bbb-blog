'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/types'

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/posts').then((r) => r.json()).then(setPosts)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  async function toggleStatus(post: Post) {
    const status = post.status === 'published' ? 'draft' : 'published'
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const updated = await res.json()
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          ARTICLES
        </h1>
        <div className="flex gap-3">
          <Link href="/admin/editor" className="zzz-btn-primary">
            + NEW
          </Link>
          <button onClick={handleLogout} className="zzz-btn-outline text-sm">
            LOGOUT
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border-subtle pb-4">
        <Link
          href="/admin"
          className="font-display tracking-widest text-accent-yellow border-b-2 border-accent-yellow pb-1"
        >
          ARTICLES
        </Link>
        <Link
          href="/admin/goals"
          className="font-display tracking-widest text-text-muted hover:text-accent-yellow transition-colors"
        >
          GOALS
        </Link>
      </div>

      <div className="space-y-2">
        {posts.length === 0 && (
          <p className="text-text-muted font-mono text-sm">// NO ARTICLES YET</p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="zzz-card p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <span className="font-display text-lg tracking-wide text-text-primary truncate block">
                {post.title}
              </span>
              <span className="font-mono text-xs text-text-muted">
                {post.slug} · {post.createdAt.slice(0, 10)}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`zzz-tag ${
                  post.status === 'published'
                    ? 'bg-accent-yellow text-bg-primary border-accent-yellow'
                    : ''
                }`}
              >
                {post.status}
              </span>
              <button
                onClick={() => toggleStatus(post)}
                className="zzz-btn-outline text-xs py-1 px-3"
              >
                {post.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
              </button>
              <Link
                href={`/admin/editor?id=${post.id}`}
                className="zzz-btn-outline text-xs py-1 px-3"
              >
                EDIT
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="font-mono text-xs text-accent-red hover:opacity-70 transition-opacity"
              >
                DEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
