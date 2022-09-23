import { Box, Container, useMantineTheme } from '@mantine/core'
import React from 'react'
import Header from 'components/organisms/Header'
import useColorScheme from 'hooks/useColorScheme'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import UserApi from 'api/services/user'
const MainLayout: React.FC = () => {
  const theme = useMantineTheme()
  const { colorScheme } = useColorScheme()
  const { isSuccess, data } = useQuery(['User'], UserApi.getAuthenticatedUser)
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
        {isSuccess && (
          <>
            <Header isAuthenticated={true} username={data.data.name} />
            <main>
              <Outlet />
            </main>
          </>
        )}
      </Container>
    </Box>
  )
}

export default MainLayout
