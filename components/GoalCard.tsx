import type { Goal } from '@/lib/types'

export default function GoalCard({ goal }: { goal: Goal }) {
  const doneTasks = goal.tasks.filter((t) => t.done).length
  return (
    <div className="zzz-card p-5 min-w-[220px]">
      {goal.category && <div className="zzz-tag mb-3">{goal.category}</div>}
      <h3 className="font-display text-xl tracking-wide text-text-primary mb-1">
        {goal.title}
      </h3>
      {goal.description && (
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{goal.description}</p>
      )}
      <div className="mb-3">
        <div className="flex justify-between text-xs font-mono text-text-muted mb-1">
          <span>PROGRESS</span>
          <span className="text-accent-yellow">{goal.progress}%</span>
        </div>
        <div className="zzz-progress-track">
          <div
            className="zzz-progress-fill"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
      {goal.tasks.length > 0 && (
        <ul className="space-y-1">
          {goal.tasks.map((task, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span
                className={`font-mono text-xs ${task.done ? 'text-accent-yellow' : 'text-border-subtle'}`}
              >
                {task.done ? '✓' : '○'}
              </span>
              <span className={task.done ? 'text-text-muted line-through' : 'text-text-primary'}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 text-right">
        <span className="text-xs font-mono text-text-muted">
          {doneTasks}/{goal.tasks.length} TASKS
        </span>
      </div>
    </div>
  )
}
