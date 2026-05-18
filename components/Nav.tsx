import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b-2 border-border-subtle sticky top-0 z-50 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl text-accent-yellow tracking-widest"
        >
          HOLLOW
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/about"
            className="font-display text-sm tracking-widest text-text-muted hover:text-accent-yellow transition-colors"
          >
            ABOUT
          </Link>
        </div>
      </div>
    </nav>
  )
}
