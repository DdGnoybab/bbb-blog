import PostCard from '@/components/PostCard'
import GoalCard from '@/components/GoalCard'
import HomepageFilter from './HomepageFilter'
import { getAllPublishedPosts } from '@/lib/posts'
import { getActiveGoals } from '@/lib/goals'

export default async function HomePage() {
  const posts = getAllPublishedPosts()
  const goals = getActiveGoals()
  const [featured, ...rest] = posts

  return (
    <div className="space-y-16">

      {/* Goals widget */}
      {goals.length > 0 && (
        <section>
          <h2 className="font-display text-3xl tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">
            「 在做的事 」
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      )}

      {/* Featured post */}
      {featured && (
        <section>
          <a
            href={`/posts/${featured.slug}`}
            className="zzz-card flex gap-6 p-6 group block"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="zzz-tag">{{ tech: '技术', life: '生活', other: '其他' }[featured.category]}</span>
                <span className="text-text-muted text-xs font-mono">最新</span>
              </div>
              <h1 className="font-display text-5xl tracking-wide text-text-primary group-hover:text-accent-yellow transition-colors leading-tight mb-3">
                {featured.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-text-muted text-sm font-mono">
                  {featured.publishedAt
                    ? new Date(featured.publishedAt).toLocaleDateString('zh-CN')
                    : ''}
                </p>
                {featured.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="zzz-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Post list with filter */}
      {rest.length > 0 && (
        <section>
          <HomepageFilter posts={rest} />
        </section>
      )}
    </div>
  )
}
