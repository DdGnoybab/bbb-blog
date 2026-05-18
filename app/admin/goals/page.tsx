'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Goal } from '@/lib/types'

const STATUS_LABELS: Record<Goal['status'], string> = {
  active: 'ACTIVE',
  done: 'DONE',
  paused: 'PAUSED',
}

export default function AdminGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    fetch('/api/goals?admin=true').then((r) => r.json()).then(setGoals).catch(() => {})
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this goal?')) return
    const res = await fetch(`/api/goals/${id}`, { method: 'DELETE' })
    if (res.ok) setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          GOALS
        </h1>
        <Link href="/admin/goals/editor" className="zzz-btn-primary">
          + NEW GOAL
        </Link>
      </div>

      <div className="flex gap-4 border-b border-border-subtle pb-4">
        <Link
          href="/admin"
          className="font-display tracking-widest text-text-muted hover:text-accent-yellow transition-colors"
        >
          ARTICLES
        </Link>
        <Link
          href="/admin/goals"
          className="font-display tracking-widest text-accent-yellow border-b-2 border-accent-yellow pb-1"
        >
          GOALS
        </Link>
      </div>

      <div className="space-y-2">
        {goals.length === 0 && (
          <p className="text-text-muted font-mono text-sm">// NO GOALS YET</p>
        )}
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="zzz-card p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <span className="font-display text-lg tracking-wide text-text-primary block">
                {goal.title}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <div className="w-32 zzz-progress-track">
                  <div
                    className="zzz-progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-accent-yellow">{goal.progress}%</span>
                <span className="font-mono text-xs text-text-muted">
                  {goal.tasks.filter((t) => t.done).length}/{goal.tasks.length} tasks
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`zzz-tag ${goal.status === 'active' ? 'bg-accent-yellow text-bg-primary border-accent-yellow' : ''}`}>
                {STATUS_LABELS[goal.status]}
              </span>
              <Link
                href={`/admin/goals/editor?id=${goal.id}`}
                className="zzz-btn-outline text-xs py-1 px-3"
              >
                EDIT
              </Link>
              <button
                onClick={() => handleDelete(goal.id)}
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
