import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
interface Props {
  children: React.ReactNode
}
const ReactQueryClientProvider: React.FC<Props> = ({ children }) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: ready,
        retry: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

ReactQueryClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ReactQueryClientProvider
