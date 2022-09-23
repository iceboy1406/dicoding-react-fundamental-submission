import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import PropTypes from 'prop-types'
import useColorScheme from 'hooks/useColorScheme'
interface Props {
  children: React.ReactNode
}
const MantineProviders: React.FC<Props> = ({ children }) => {
  const { colorScheme } = useColorScheme()

  return (
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
          Modal: {
            styles: () => ({
              body: {
                maxHeight: 'unset',
              },
            }),
          },
          TextInput: {
            styles: (theme) => ({
              input: {
                '&::placeholder': {
                  color: theme.colors.gray[5],
                },
              },
              invalid: {
                color: theme.black,
                '&::placeholder': {
                  color: theme.colors.gray[5],
                },
              },
            }),
          },
          h1: {
            defaultProps: {
              marginTop: 0,
            },
          },
          h2: {
            defaultProps: {
              marginTop: 0,
            },
          },
          h3: {
            defaultProps: {
              marginTop: 0,
            },
          },
          h4: {
            defaultProps: {
              marginTop: 0,
            },
          },
          h5: {
            defaultProps: {
              marginTop: 0,
            },
          },
          h6: {
            defaultProps: {
              marginTop: 0,
            },
          },
          blockquote: {
            defaultProps: {
              borderLeft: '4px solid #ced4da',
            },
          },
        },
      }}
    >
      <NotificationsProvider position="top-right" color="teal" autoClose={3000}>
        <ModalsProvider
          modalProps={{
            overlayColor: colorScheme === 'dark' ? 'dark.9' : 'gray.2',
            overlayOpacity: 0.55,
            overlayBlur: 3,
            transition: 'rotate-left',
          }}
        >
          {children}
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

MantineProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MantineProviders
