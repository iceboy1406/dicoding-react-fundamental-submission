import {
  Box,
  Breadcrumbs,
  Container,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import React from 'react'
import Header from 'components/organisms/Header'
import PropTypes from 'prop-types'
import BreadCrumbsItem from 'components/atoms/BreadCrumbsItem'
import { FiChevronRight } from 'react-icons/fi'
const MainLayout = ({ children, breadCrumbItems, isArchived = false }) => {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
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
        <Header isArchived={isArchived} />
        <main>
          <Breadcrumbs
            separator={<FiChevronRight />}
            sx={{ marginBottom: '16px' }}
          >
            {breadCrumbItems.map((item, index) => (
              <BreadCrumbsItem
                title={item.title}
                href={item.href}
                active={item.active}
                key={index}
              />
            ))}
          </Breadcrumbs>

          {children}
        </main>
      </Container>
    </Box>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node,
  breadCrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
  isArchived: PropTypes.bool,
}

export default MainLayout
