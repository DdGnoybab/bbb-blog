import path from 'path'
import { createDb } from '@/lib/db'
import {
  getAllPublishedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '@/lib/posts'
import type Database from 'better-sqlite3'

// Override getDb to use in-memory DB for tests
jest.mock('@/lib/db', () => {
  const actual = jest.requireActual('@/lib/db')
  const db = actual.createDb(':memory:')
  return {
    ...actual,
    getDb: () => db,
  }
})

// Override content directory to a test fixture
jest.mock('path', () => {
  const actual = jest.requireActual('path')
  return {
    ...actual,
    join: (...args: string[]) => {
      if (args.some((a) => a.includes('content/posts'))) {
        return actual.join(__dirname, '../fixtures/posts')
      }
      return actual.join(...args)
    },
  }
})

describe('posts library', () => {
  beforeEach(() => {
    const { getDb } = require('@/lib/db')
    getDb().prepare('DELETE FROM posts').run()
  })

  describe('createPost', () => {
    it('saves a post to the database', () => {
      const post = createPost({
        title: 'Test Post',
        slug: 'test-post',
        content: '# Hello',
        category: 'tech',
        tags: ['react'],
        status: 'published',
      })
      expect(post.id).toBeDefined()
      expect(post.title).toBe('Test Post')
      expect(post.source).toBe('editor')
    })
  })

  describe('getAllPublishedPosts', () => {
    it('returns published db posts sorted by date', () => {
      createPost({ title: 'Old', slug: 'old', content: '', category: 'tech', tags: [], status: 'published', publishedAt: '2026-01-01' })
      createPost({ title: 'New', slug: 'new', content: '', category: 'tech', tags: [], status: 'published', publishedAt: '2026-05-01' })
      const posts = getAllPublishedPosts()
      expect(posts[0].title).toBe('New')
    })

    it('excludes draft posts', () => {
      createPost({ title: 'Draft', slug: 'draft', content: '', category: 'tech', tags: [], status: 'draft' })
      const posts = getAllPublishedPosts()
      expect(posts.find((p) => p.slug === 'draft')).toBeUndefined()
    })
  })

  describe('getPostBySlug', () => {
    it('returns a post by slug', () => {
      createPost({ title: 'Find Me', slug: 'find-me', content: 'body', category: 'life', tags: [], status: 'published' })
      const post = getPostBySlug('find-me')
      expect(post?.title).toBe('Find Me')
    })

    it('returns null for unknown slug', () => {
      expect(getPostBySlug('nonexistent')).toBeNull()
    })
  })
})
