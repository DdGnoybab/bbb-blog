export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-10">
        <h1 className="font-display text-6xl tracking-wide text-text-primary mb-4">
          ABOUT
        </h1>
        <div className="h-1 w-24 bg-accent-yellow" />
      </header>

      <div className="prose-zzz space-y-6 text-text-primary leading-relaxed">
        <p>
          这是我记录技术与生活的地方。
        </p>
        <p>
          用来整理思路，留住值得回头看的东西。
        </p>
      </div>
    </div>
  )
}
