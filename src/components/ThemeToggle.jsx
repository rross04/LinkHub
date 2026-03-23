import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const dark = stored !== 'light'
    setIsDark(dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {isDark
        ? <Sun className="theme-toggle-btn__icon" />
        : <Moon className="theme-toggle-btn__icon" />
      }
    </button>
  )
}