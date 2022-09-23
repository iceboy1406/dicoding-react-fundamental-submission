import ColorSchemeContext from 'contexts/colorScheme'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import type { ColorScheme } from 'types/context'
interface Props {
  children: React.ReactNode
}
const ColorSchemeProvider: React.FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  // set colorScheme value from localStorage if exist
  useEffect(() => {
    const savedColorSchemeState = localStorage.getItem(
      'colorScheme'
    ) as ColorScheme | null
    if (savedColorSchemeState) {
      setColorScheme(savedColorSchemeState)
    }
  }, [])

  // Update localStorage data when state changed
  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme)
  }, [colorScheme])

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

ColorSchemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ColorSchemeProvider
