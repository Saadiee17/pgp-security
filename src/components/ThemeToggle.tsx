import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

interface Props {
  className?: string
  compact?: boolean
}

export default function ThemeToggle({ className = '', compact = false }: Props) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true
  const next = isDark ? 'light' : 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  const size = compact ? 'w-9 h-9' : 'w-10 h-10'

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
      className={`relative ${size} rounded-full border border-gold/30 bg-gold/5 text-gold hover:border-gold/70 hover:bg-gold/15 transition-colors duration-200 flex items-center justify-center overflow-hidden ${className}`}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        }`}
      />
    </button>
  )
}
