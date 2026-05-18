import { createDb } from '@/lib/db'
import type Database from 'better-sqlite3'

describe('createDb', () => {
  let db: Database.Database

  beforeEach(() => {
    db = createDb(':memory:')
  })

  afterEach(() => {
    db.close()
  })

  it('creates the posts table', () => {
    const tables = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
      .all() as { name: string }[]
    const names = tables.map((t) => t.name)
    expect(names).toContain('posts')
  })

  it('creates the goals table', () => {
    const tables = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
      .all() as { name: string }[]
    const names = tables.map((t) => t.name)
    expect(names).toContain('goals')
  })

  it('inserts and retrieves a post row', () => {
    db.prepare(
      `INSERT INTO posts (id, title, slug, content) VALUES (?, ?, ?, ?)`
    ).run('1', 'Hello', 'hello', 'World')

    const row = db.prepare(`SELECT * FROM posts WHERE id = ?`).get('1') as {
      title: string
    }
    expect(row.title).toBe('Hello')
  })
})
