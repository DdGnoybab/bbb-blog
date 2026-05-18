import Database from 'better-sqlite3'

export function createDb(path: string): Database.Database {
  const db = new Database(path)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      slug         TEXT UNIQUE NOT NULL,
      content      TEXT NOT NULL,
      category     TEXT DEFAULT 'other' CHECK(category IN ('tech', 'life', 'other')),
      tags         TEXT DEFAULT '[]',
      cover_url    TEXT,
      status       TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
      source       TEXT DEFAULT 'editor',
      published_at TEXT,
      created_at   TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS goals (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      category    TEXT,
      progress    INTEGER DEFAULT 0 CHECK(progress BETWEEN 0 AND 100),
      tasks       TEXT DEFAULT '[]',
      status      TEXT DEFAULT 'active' CHECK(status IN ('active', 'done', 'paused')),
      created_at  TEXT DEFAULT (datetime('now'))
    );
  `)
  return db
}

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!_db) {
    const dbPath = process.env.DB_PATH || './data/blog.db'
    _db = createDb(dbPath)
  }
  return _db
}
