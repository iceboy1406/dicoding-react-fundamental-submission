import { Box, Container, useMantineTheme } from '@mantine/core'
import React, { useEffect } from 'react'
import Header from 'components/organisms/Header'
import useColorScheme from 'hooks/useColorScheme'
import { Outlet, useNavigate } from 'react-router-dom'
import Token from 'api/token'
const AuthLayout: React.FC = () => {
  const theme = useMantineTheme()
  const { colorScheme } = useColorScheme()
  const navigate = useNavigate()
  useEffect(() => {
    const token = Token.getToken()
    if (token) {
      navigate('/', { replace: true })
    }
  }, [])
  return (
    <Box
      sx={{
        backgroundColor:
          colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        minHeight: '100vh',
        width: '100vw',
        padding: '20px',
        '@media (min-width: 640px)': {
          padding: '28px',
        },
        '@media (min-width: 960px)': {
          padding: '32px',
        },
      }}
    >
      <Container
        size={'md'}
        p={0}
        sx={{
          position: 'relative',
        }}
      >
        <Header isAuthenticated={false} />
        <main>
          <Outlet />
        </main>
      </Container>
    </Box>
  )
}

export default AuthLayout
