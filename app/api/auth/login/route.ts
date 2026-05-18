import { NextRequest, NextResponse } from 'next/server'
import { createToken, verifyPassword, getSessionCookieOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const stored = process.env.ADMIN_PASSWORD || ''

  if (!verifyPassword(password, stored)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const secret = process.env.SESSION_SECRET || ''
  const token = createToken(secret)
  const opts = getSessionCookieOptions()

  const response = NextResponse.json({ ok: true })
  response.cookies.set({ ...opts, value: token })
  return response
}
