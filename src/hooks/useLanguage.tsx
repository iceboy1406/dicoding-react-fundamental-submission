import LanguageContext from 'contexts/language'
import { useContext } from 'react'

const useLanguage = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const toggleEnAndId = () =>
    setLanguage((prevState) => (prevState === 'id' ? 'en' : 'id'))
  return { language, setLanguage, toggleEnAndId }
}

export default useLanguage
