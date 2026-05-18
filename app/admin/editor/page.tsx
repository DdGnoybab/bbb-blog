'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Post } from '@/lib/types'

function Editor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Post['category']>('other')
  const [tags, setTags] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [status, setStatus] = useState<Post['status']>('draft')
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editId) return
    fetch(`/api/posts/${editId}`)
      .then((r) => r.json())
      .then((post: Post) => {
        setTitle(post.title)
        setSlug(post.slug)
        setContent(post.content)
        setCategory(post.category)
        setTags(post.tags.join(', '))
        setCoverUrl(post.coverUrl || '')
        setStatus(post.status)
      })
  }, [editId])

  async function handleSave() {
    setSaving(true)
    setError('')
    const body = {
      title,
      slug: slug || undefined,
      content,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      coverUrl: coverUrl || undefined,
      status,
    }
    const res = editId
      ? await fetch(`/api/posts/${editId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      : await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          {editId ? 'EDIT ARTICLE' : 'NEW ARTICLE'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="zzz-btn-outline text-sm"
          >
            {preview ? 'EDIT' : 'PREVIEW'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="zzz-btn-primary"
          >
            {saving ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>

      {error && <p className="text-accent-red font-mono text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="col-span-2 bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-3 font-display text-2xl tracking-wide focus:outline-none focus:border-accent-yellow"
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="slug (auto-generated if empty)"
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Post['category'])}
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        >
          <option value="tech">TECH</option>
          <option value="life">LIFE</option>
          <option value="other">OTHER</option>
        </select>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tags (comma-separated)"
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        />
        <input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="Cover image URL (optional)"
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        />
        <div className="col-span-2 flex gap-4">
          {(['draft', 'published'] as Post['status'][]).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="accent-accent-yellow"
              />
              <span className="font-mono text-sm text-text-muted uppercase">{s}</span>
            </label>
          ))}
        </div>
      </div>

      {preview ? (
        <div className="zzz-card p-6 min-h-[400px] prose-zzz">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article in Markdown..."
          rows={24}
          className="w-full bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent-yellow resize-none leading-relaxed"
        />
      )}
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense>
      <Editor />
    </Suspense>
  )
}
