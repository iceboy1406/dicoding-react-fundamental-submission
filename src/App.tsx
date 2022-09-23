import WithAxios from 'components/templates/WithAxios'
import ColorSchemeProvider from 'providers/ColorSchemeProvider'
import LanguageProvider from 'providers/LanguageProvider'
import MantineProviders from 'providers/MantineProviders'
import ReactQueryClientProvider from 'providers/ReactQueryClientProvider'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'

function App() {
  return (
    <ColorSchemeProvider>
      <LanguageProvider>
        <MantineProviders>
          <ReactQueryClientProvider>
            <BrowserRouter>
              <WithAxios>
                <Routes />
              </WithAxios>
            </BrowserRouter>
          </ReactQueryClientProvider>
        </MantineProviders>
      </LanguageProvider>
    </ColorSchemeProvider>
  )
}

export default App
