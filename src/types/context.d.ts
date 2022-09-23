import React from 'react'

export type ColorScheme = 'dark' | 'light'
export interface ColorSchemeContextType {
  colorScheme: ColorScheme
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>
}

export type Language = 'en' | 'id'
export interface LanguageContextType {
  language: Language
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}
