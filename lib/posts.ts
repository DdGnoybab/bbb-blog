import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { nanoid } from 'nanoid'
import { getDb } from './db'
import type { Post } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content/posts')

function rowToPost(row: Record<string, unknown>): Post {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    category: (row.category as Post['category']) || 'other',
    tags: JSON.parse((row.tags as string) || '[]'),
    coverUrl: (row.cover_url as string) || undefined,
    status: row.status as Post['status'],
    source: 'editor',
    publishedAt: (row.published_at as string) || null,
    createdAt: row.created_at as string,
  }
}

function mdFileToPost(filePath: string): Post | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    if (!data.title || !data.publishedAt) return null
    const filename = path.basename(filePath, '.md')
    return {
      id: data.slug || filename,
      title: data.title,
      slug: data.slug || filename,
      content,
      category: (data.category as Post['category']) || 'other',
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverUrl: data.coverUrl,
      status: 'published',
      source: 'md',
      publishedAt: String(data.publishedAt),
      createdAt: String(data.publishedAt),
    }
  } catch {
    return null
  }
}

function getMdPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => mdFileToPost(path.join(CONTENT_DIR, f)))
    .filter((p): p is Post => p !== null)
}

export function getAllPublishedPosts(): Post[] {
  const db = getDb()
  const rows = db
    .prepare(`SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC`)
    .all() as Record<string, unknown>[]
  const all = [...rows.map(rowToPost), ...getMdPosts()]
  all.sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return bTime - aTime
  })
  return all
}

export function getPostBySlug(slug: string): Post | null {
  const db = getDb()
  // Try both raw and URL-decoded slug to handle encoding variations in Next.js params
  const decoded = (() => { try { return decodeURIComponent(slug) } catch { return slug } })()
  const candidates = Array.from(new Set([slug, decoded]))
  for (const s of candidates) {
    const row = db
      .prepare(`SELECT * FROM posts WHERE slug = ? AND status = 'published'`)
      .get(s) as Record<string, unknown> | undefined
    if (row) return rowToPost(row)
  }
  return getMdPosts().find((p) => p.slug === slug || p.slug === decoded) ?? null
}

export function getAllPostsAdmin(): Post[] {
  const db = getDb()
  const rows = db
    .prepare(`SELECT * FROM posts WHERE source = 'editor' ORDER BY created_at DESC`)
    .all() as Record<string, unknown>[]
  return rows.map(rowToPost)
}

export function getPostById(id: string): Post | null {
  const db = getDb()
  const row = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(id) as Record<string, unknown> | undefined
  return row ? rowToPost(row) : null
}

interface CreatePostInput {
  title: string
  slug: string
  content: string
  category: Post['category']
  tags: string[]
  status: Post['status']
  coverUrl?: string
  publishedAt?: string
}

export function createPost(input: CreatePostInput): Post {
  const db = getDb()
  const id = nanoid()
  const publishedAt =
    input.status === 'published' ? (input.publishedAt ?? new Date().toISOString()) : null
  db.prepare(`
    INSERT INTO posts (id, title, slug, content, category, tags, cover_url, status, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    input.title,
    input.slug,
    input.content,
    input.category,
    JSON.stringify(input.tags),
    input.coverUrl ?? null,
    input.status,
    publishedAt
  )
  return getPostById(id)!
}

interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string
}

export function updatePost(input: UpdatePostInput): Post {
  const db = getDb()
  const existing = getPostById(input.id)
  if (!existing) throw new Error(`Post ${input.id} not found`)

  const updated = {
    title: input.title ?? existing.title,
    slug: input.slug ?? existing.slug,
    content: input.content ?? existing.content,
    category: input.category ?? existing.category,
    tags: input.tags ?? existing.tags,
    coverUrl: input.coverUrl ?? existing.coverUrl,
    status: input.status ?? existing.status,
  }

  const publishedAt =
    updated.status === 'published'
      ? (input.publishedAt ?? existing.publishedAt ?? new Date().toISOString())
      : null

  db.prepare(`
    UPDATE posts SET
      title = ?, slug = ?, content = ?, category = ?, tags = ?,
      cover_url = ?, status = ?, published_at = ?
    WHERE id = ?
  `).run(
    updated.title,
    updated.slug,
    updated.content,
    updated.category,
    JSON.stringify(updated.tags),
    updated.coverUrl ?? null,
    updated.status,
    publishedAt,
    input.id
  )
  return getPostById(input.id)!
}

export function deletePost(id: string): void {
  getDb().prepare(`DELETE FROM posts WHERE id = ?`).run(id)
}
