export interface Post {
  id: string
  title: string
  slug: string
  content: string
  category: 'tech' | 'life' | 'other'
  tags: string[]
  coverUrl?: string
  status: 'draft' | 'published'
  source: 'editor' | 'md'
  publishedAt: string | null
  createdAt: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  category?: string
  progress: number
  tasks: { text: string; done: boolean }[]
  status: 'active' | 'done' | 'paused'
  createdAt: string
}
