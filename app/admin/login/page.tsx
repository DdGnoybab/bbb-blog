'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('密码错误')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="zzz-card p-8 w-full max-w-sm">
        <h1 className="font-display text-4xl tracking-widest text-accent-yellow mb-8">
          管理后台
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            className="w-full bg-bg-primary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
            autoFocus
          />
          {error && (
            <p className="text-accent-red font-mono text-xs">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="zzz-btn-primary w-full text-center"
          >
            {loading ? '验证中...' : '进入'}
          </button>
        </form>
      </div>
    </div>
  )
}
