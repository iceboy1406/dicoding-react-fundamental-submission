import useLanguage from 'hooks/useLanguage'
import idLocalization from 'data/localization/id'
import enLocalization from 'data/localization/en'

const useLocalization = () => {
  const { language } = useLanguage()
  switch (language) {
    case 'id':
      return idLocalization
    case 'en':
      return enLocalization
    default:
      return enLocalization
  }
}

export default useLocalization
