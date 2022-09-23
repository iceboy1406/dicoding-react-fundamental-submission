import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { isAxiosError } from 'api/axios'
import { showNotification } from '@mantine/notifications'
import useLocalization from 'hooks/useLocalization'
interface Props {
  children: React.ReactNode
}
const ReactQueryClientProvider: React.FC<Props> = ({ children }) => {
  const [ready, setReady] = useState(false)
  const { unAuthorizedNotification } = useLocalization()
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
    queryCache: new QueryCache({
      onError: (error) => {
        if (isAxiosError(error)) {
          // Handling notification error here because axios interceptor not rerender/update when language state change
          if (error.response?.status === 401) {
            showNotification({
              title: unAuthorizedNotification.title,
              message: unAuthorizedNotification.message,
              color: 'red'
            })
          }
        }
      },
    }),
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
