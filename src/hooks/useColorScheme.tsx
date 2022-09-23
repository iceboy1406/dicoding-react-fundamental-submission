import ColorSchemeContext from 'contexts/colorScheme'
import { useContext } from 'react'
import { ColorScheme } from 'types/context'

const useColorScheme = () => {
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)
  const toggleColorScheme = () =>
    setColorScheme((prevState: ColorScheme) => (prevState === 'light' ? 'dark' : 'light'))
  return { colorScheme, setColorScheme, toggleColorScheme }
}

export default useColorScheme
