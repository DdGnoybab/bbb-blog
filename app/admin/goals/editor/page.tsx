'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import type { Goal } from '@/lib/types'

type TaskItem = { text: string; done: boolean }

function GoalEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [progress, setProgress] = useState(0)
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [newTask, setNewTask] = useState('')
  const [status, setStatus] = useState<Goal['status']>('active')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editId) return
    fetch(`/api/goals/${editId}`)
      .then((r) => r.json())
      .then((goal: Goal) => {
        setTitle(goal.title)
        setDescription(goal.description || '')
        setCategory(goal.category || '')
        setProgress(goal.progress)
        setTasks(goal.tasks)
        setStatus(goal.status)
      })
      .catch(() => {})
  }, [editId])

  function addTask() {
    if (!newTask.trim()) return
    setTasks((prev) => [...prev, { text: newTask.trim(), done: false }])
    setNewTask('')
  }

  function toggleTask(i: number) {
    setTasks((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, done: !t.done } : t))
    )
  }

  function removeTask(i: number) {
    setTasks((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    const body = { title, description: description || undefined, category: category || undefined, progress, tasks, status }
    const res = editId
      ? await fetch(`/api/goals/${editId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      : await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

    try {
      if (res.ok) {
        router.push('/admin/goals')
      } else {
        const data = await res.json()
        setError(data.error || 'Save failed')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow">
          {editId ? 'EDIT GOAL' : 'NEW GOAL'}
        </h1>
        <button onClick={handleSave} disabled={saving} className="zzz-btn-primary">
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>

      {error && <p className="text-accent-red font-mono text-sm">{error}</p>}

      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Goal title"
          className="w-full bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-3 font-display text-2xl tracking-wide focus:outline-none focus:border-accent-yellow"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className="w-full bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow resize-none"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional, e.g. TECH, LIFE)"
          className="w-full bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
        />
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between font-mono text-sm text-text-muted mb-2">
          <span>OVERALL PROGRESS</span>
          <span className="text-accent-yellow">{progress}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-accent-yellow"
        />
      </div>

      {/* Status */}
      <div className="flex gap-4">
        {(['active', 'paused', 'done'] as Goal['status'][]).map((s) => (
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

      {/* Sub-tasks */}
      <div>
        <h3 className="font-display tracking-widest text-text-muted mb-3 text-sm">
          SUB-TASKS
        </h3>
        <div className="space-y-2 mb-3">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(i)}
                className={`font-mono text-sm w-6 ${task.done ? 'text-accent-yellow' : 'text-text-muted'}`}
              >
                {task.done ? '✓' : '○'}
              </button>
              <span
                className={`flex-1 font-mono text-sm ${task.done ? 'line-through text-text-muted' : 'text-text-primary'}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(i)}
                className="text-accent-red font-mono text-xs hover:opacity-70"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a sub-task (Enter to add)"
            className="flex-1 bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
          />
          <button onClick={addTask} className="zzz-btn-outline text-sm">
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GoalEditorPage() {
  return (
    <Suspense>
      <GoalEditor />
    </Suspense>
  )
}
