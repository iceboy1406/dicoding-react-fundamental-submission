import { createContext } from 'react'
import type { LanguageContextType } from 'types/context'
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})
export default LanguageContext
