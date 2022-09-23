import { createContext } from 'react'
import type { ColorSchemeContextType } from 'types/context'

const ColorSchemeContext = createContext<ColorSchemeContextType>({
  colorScheme: 'dark',
  setColorScheme: () => {},
})
export default ColorSchemeContext
