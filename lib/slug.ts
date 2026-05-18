import { nanoid } from 'nanoid'

export function generateSlug(title: string): string {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  const suffix = nanoid(6)
  return ascii ? `${ascii}-${suffix}` : suffix
}
