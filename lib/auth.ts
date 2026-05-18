import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'blog_session'
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export function createToken(secret: string): string {
  const expiry = Date.now() + TOKEN_TTL_MS
  const payload = `${expiry}`
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifyToken(token: string, secret: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, sig] = parts
  const expiry = parseInt(payload, 10)
  if (isNaN(expiry) || Date.now() > expiry) return false
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}

export function verifyPassword(input: string, stored: string): boolean {
  if (input.length !== stored.length) return false
  return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(stored))
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  const secret = process.env.SESSION_SECRET || ''
  return verifyToken(token, secret)
}

export function getSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  }
}
