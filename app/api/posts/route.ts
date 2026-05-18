import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getAllPostsAdmin, createPost } from '@/lib/posts'
import { generateSlug } from '@/lib/slug'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(getAllPostsAdmin())
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const { title, content, category, tags, status, coverUrl } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
  }

  const slug = body.slug || generateSlug(title)
  const post = createPost({ title, slug, content, category: category || 'other', tags: tags || [], status: status || 'draft', coverUrl })
  return NextResponse.json(post, { status: 201 })
}
