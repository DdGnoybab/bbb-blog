'use client'
import { useState } from 'react'
import type { Post } from '@/lib/types'
import CategoryFilter from '@/components/CategoryFilter'
import PostCard from '@/components/PostCard'

type Category = 'all' | 'tech' | 'life' | 'other'

export default function HomepageFilter({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Category>('all')

  const filtered =
    category === 'all' ? posts : posts.filter((p) => p.category === category)

  return (
    <div className="space-y-6">
      <CategoryFilter onChange={(cat) => setCategory(cat as Category)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-text-muted font-mono text-sm">// 该分类暂无文章</p>
      )}
    </div>
  )
}
