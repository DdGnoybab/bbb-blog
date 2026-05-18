import { nanoid } from 'nanoid'
import { getDb } from './db'
import type { Goal } from './types'

function rowToGoal(row: Record<string, unknown>): Goal {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) || undefined,
    category: (row.category as string) || undefined,
    progress: row.progress as number,
    tasks: JSON.parse((row.tasks as string) || '[]'),
    createdAt: row.created_at as string,
    status: row.status as Goal['status'],
  }
}

export function getAllGoals(): Goal[] {
  const rows = getDb()
    .prepare(`SELECT * FROM goals ORDER BY created_at DESC`)
    .all() as Record<string, unknown>[]
  return rows.map(rowToGoal)
}

export function getActiveGoals(): Goal[] {
  const rows = getDb()
    .prepare(`SELECT * FROM goals WHERE status = 'active' ORDER BY created_at DESC`)
    .all() as Record<string, unknown>[]
  return rows.map(rowToGoal)
}

export function getGoalById(id: string): Goal | null {
  const row = getDb()
    .prepare(`SELECT * FROM goals WHERE id = ?`)
    .get(id) as Record<string, unknown> | undefined
  return row ? rowToGoal(row) : null
}

interface GoalInput {
  title: string
  description?: string
  category?: string
  progress?: number
  tasks?: { text: string; done: boolean }[]
  status?: Goal['status']
}

export function createGoal(input: GoalInput): Goal {
  const id = nanoid()
  getDb()
    .prepare(`
      INSERT INTO goals (id, title, description, category, progress, tasks, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      id,
      input.title,
      input.description ?? null,
      input.category ?? null,
      input.progress ?? 0,
      JSON.stringify(input.tasks ?? []),
      input.status ?? 'active'
    )
  return getGoalById(id)!
}

export function updateGoal(id: string, input: Partial<GoalInput>): Goal {
  const existing = getGoalById(id)
  if (!existing) throw new Error(`Goal ${id} not found`)
  getDb()
    .prepare(`
      UPDATE goals SET
        title = ?, description = ?, category = ?,
        progress = ?, tasks = ?, status = ?
      WHERE id = ?
    `)
    .run(
      input.title ?? existing.title,
      input.description ?? existing.description ?? null,
      input.category ?? existing.category ?? null,
      input.progress ?? existing.progress,
      JSON.stringify(input.tasks ?? existing.tasks),
      input.status ?? existing.status,
      id
    )
  return getGoalById(id)!
}

export function deleteGoal(id: string): void {
  getDb().prepare(`DELETE FROM goals WHERE id = ?`).run(id)
}
