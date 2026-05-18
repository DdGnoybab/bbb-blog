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
        setContent(post.content)
        setCategory(post.category)
        setTags(post.tags.join(', '))
        setCoverUrl(post.coverUrl || '')
        setStatus(post.status)
      })
      .catch(() => {})
  }, [editId])

  async function handleSave() {
    setSaving(true)
    setError('')
    const body = {
      title,
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

    try {
      if (res.ok) {
        router.push('/admin')
      } else {
        const data = await res.json()
        setError(data.error || '保存失败')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          {editId ? '编辑文章' : '新建文章'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="zzz-btn-outline text-sm"
          >
            {preview ? '编辑' : '预览'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="zzz-btn-primary"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {error && <p className="text-accent-red font-mono text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="标题"
          className="col-span-2 bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-3 font-display text-2xl tracking-wide focus:outline-none focus:border-accent-yellow"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Post['category'])}
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        >
          <option value="tech">技术</option>
          <option value="life">生活</option>
          <option value="other">其他</option>
        </select>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="标签（逗号分隔）"
          className="bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        />
        <input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="封面图片地址（可选）"
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
              <span className="font-mono text-sm text-text-muted">{{ draft: '草稿', published: '发布' }[s]}</span>
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
          placeholder="用 Markdown 写文章..."
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
