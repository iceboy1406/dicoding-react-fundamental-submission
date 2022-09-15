import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { useState } from 'react'
import Router from 'routes'

function App() {
  const [colorScheme, setColorScheme] = useState('light')
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme,
          fontFamily: 'Nunito, sans-serif',
          headings: {
            fontFamily: 'Nunito, sans-serif',
          },
          primaryColor: 'indigo',
          components: {
            Container: {
              defaultProps: {
                sizes: {
                  xs: 540,
                  sm: 720,
                  md: 960,
                  lg: 1140,
                  xl: 1320,
                },
              },
            },
            h1: {
              marginTop: 0
            },
            h2: {
              marginTop: 0
            },
            h3: {
              marginTop: 0
            },
            h4: {
              marginTop: 0
            },
            h5: {
              marginTop: 0
            },
            h6: {
              marginTop: 0
            },
            blockquote: {
              borderLeft: '4px solid #ced4da'
            }
          },
        }}
      >
        <NotificationsProvider position='bottom-right' color='teal' autoClose={3000}>
          <ModalsProvider> 
            <Router />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
