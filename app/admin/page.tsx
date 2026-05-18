'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/types'

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/posts').then((r) => r.json()).then(setPosts).catch(() => {})
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('确认删除这篇文章？')) return
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  async function toggleStatus(post: Post) {
    const status = post.status === 'published' ? 'draft' : 'published'
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          文章管理
        </h1>
        <div className="flex gap-3">
          <Link href="/admin/editor" className="zzz-btn-primary">
            + 新建
          </Link>
          <button onClick={handleLogout} className="zzz-btn-outline text-sm">
            退出
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border-subtle pb-4">
        <Link
          href="/admin"
          className="font-display tracking-widest text-accent-yellow border-b-2 border-accent-yellow pb-1"
        >
          文章
        </Link>
        <Link
          href="/admin/goals"
          className="font-display tracking-widest text-text-muted hover:text-accent-yellow transition-colors"
        >
          目标
        </Link>
      </div>

      <div className="space-y-2">
        {posts.length === 0 && (
          <p className="text-text-muted font-mono text-sm">// 暂无文章</p>
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
                {post.status === 'published' ? '已发布' : '草稿'}
              </span>
              <button
                onClick={() => toggleStatus(post)}
                className="zzz-btn-outline text-xs py-1 px-3"
              >
                {post.status === 'published' ? '取消发布' : '发布'}
              </button>
              <Link
                href={`/admin/editor?id=${post.id}`}
                className="zzz-btn-outline text-xs py-1 px-3"
              >
                编辑
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="font-mono text-xs text-accent-red hover:opacity-70 transition-opacity"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
