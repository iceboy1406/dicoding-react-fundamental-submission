import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from 'contexts/language'
import { Language } from 'types/context'
interface Props {
  children: React.ReactNode
}
const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  // set colorScheme value from localStorage if exist
  useEffect(() => {
    const savedLanguageState = localStorage.getItem('language') as Language | null
    if (savedLanguageState) {
      setLanguage(savedLanguageState)
    }
  }, [])

  // Update localStorage data when state changed
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default LanguageProvider
