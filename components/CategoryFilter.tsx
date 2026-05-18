'use client'
import { useState } from 'react'

type Category = 'all' | 'tech' | 'life' | 'other'

interface Props {
  onChange: (category: Category) => void
}

export default function CategoryFilter({ onChange }: Props) {
  const [active, setActive] = useState<Category>('all')
  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'tech', label: '技术' },
    { value: 'life', label: '生活' },
    { value: 'other', label: '其他' },
  ]

  function handleClick(cat: Category) {
    setActive(cat)
    onChange(cat)
  }

  return (
    <div className="flex gap-3">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={`zzz-tag cursor-pointer transition-colors ${
            active === value
              ? 'bg-accent-yellow text-bg-primary border-accent-yellow'
              : 'hover:border-accent-yellow'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
