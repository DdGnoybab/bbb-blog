import { NextResponse } from 'next/server'
import { getSessionCookieOptions } from '@/lib/auth'

export async function POST() {
  const opts = getSessionCookieOptions()
  const response = NextResponse.json({ ok: true })
  response.cookies.set({ ...opts, value: '', maxAge: 0 })
  return response
}
