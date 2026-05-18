import { createToken, verifyToken } from '@/lib/auth'

describe('auth tokens', () => {
  const secret = 'test-secret-32-chars-long-padding'

  it('creates and verifies a valid token', () => {
    const token = createToken(secret)
    expect(verifyToken(token, secret)).toBe(true)
  })

  it('rejects a tampered token', () => {
    const token = createToken(secret)
    const tampered = token.slice(0, -4) + 'xxxx'
    expect(verifyToken(tampered, secret)).toBe(false)
  })

  it('rejects a token with a different secret', () => {
    const token = createToken(secret)
    expect(verifyToken(token, 'different-secret')).toBe(false)
  })

  it('rejects an expired token', () => {
    const expiry = Date.now() - 1000
    const payload = `${expiry}`
    const crypto = require('crypto')
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    const expired = `${payload}.${sig}`
    expect(verifyToken(expired, secret)).toBe(false)
  })
})
