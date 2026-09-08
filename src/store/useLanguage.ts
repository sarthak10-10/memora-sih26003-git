import { useState, useEffect } from 'react'
import type { Language } from './translations'
import { translations } from './translations'

const STORAGE_KEY = 'memora-language'

function loadLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'hi' || stored === 'bn') return stored
  return 'en'
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const t = translations[language]

  return { language, setLanguage, t }
}