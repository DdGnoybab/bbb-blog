'use client'
import { useState } from 'react'

type Category = 'all' | 'tech' | 'life' | 'other'

interface Props {
  onChange: (category: Category) => void
}

export default function CategoryFilter({ onChange }: Props) {
  const [active, setActive] = useState<Category>('all')
  const categories: Category[] = ['all', 'tech', 'life', 'other']

  function handleClick(cat: Category) {
    setActive(cat)
    onChange(cat)
  }

  return (
    <div className="flex gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`zzz-tag cursor-pointer transition-colors ${
            active === cat
              ? 'bg-accent-yellow text-bg-primary border-accent-yellow'
              : 'hover:border-accent-yellow'
          }`}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
