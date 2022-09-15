import {
  ActionIcon,
  Box,
  Button,
  Image,
  Input,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ({ isArchived }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(
    searchParams.get('keyword') ?? ''
  )
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (!searchParams.get('keyword')) {
      setSearchValue('')
    }
  }, [search, pathname, searchParams])
  useEffect(() => {
    if (searchValue === '') {
      if (pathname.includes('archive')) {
        navigate(`/archive`)
      } else if (pathname === '/') {
        navigate(`/`)
      }
    } else {
      if (isArchived) {
        navigate(`/archive?keyword=${searchValue}`)
      } else {
        navigate(`/?keyword=${searchValue}`)
      }
    }
  }, [searchValue, isArchived, navigate, pathname])
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: '20px',
        left: '0px',
        zIndex: 10,
        padding: '16px',
        backgroundColor:
          colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        marginBottom: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        rowGap: '16px',
        boxShadow: '0px 0px 100px 10px rgba(0,0,0,.1)',
        '@media (min-width: 640px)': {
          flexWrap: 'nowrap',
          padding: '18px 24px',
          gap: '12px',
        },
      }}
    >
      <Box
        sx={{
          flexGrow: '1',
        }}
      >
        <Link to="/" style={{ width: 'fit-content', display: 'block' }}>
          {colorScheme === 'dark' ? (
            <Image src="/assets/images/brand-dark.svg" width={150} />
          ) : (
            <Image src="/assets/images/brand.svg" width={150} />
          )}
        </Link>
      </Box>
      <Tooltip label="Go to Archive" withArrow>
        <Link to="/archive">
          <Button variant="light">Archive</Button>
        </Link>
      </Tooltip>
      <Tooltip label="Toggle Theme" withArrow>
        <ActionIcon
          variant="light"
          onClick={() => toggleColorScheme()}
          size="lg"
          color={colorScheme === 'dark' ? 'violet' : 'yellow'}
          sx={{
            '@media (min-width: 640px)': {
              order: 1,
              WebkitOrder: 1,
            },
          }}
        >
          {colorScheme === 'dark' ? <FiMoon /> : <FiSun />}
        </ActionIcon>
      </Tooltip>
      <Input
        icon={<FiSearch />}
        autoFocus
        sx={{
          width: '100%',
          '@media (min-width: 640px)': {
            width: 'fit-content',
          },
        }}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by title"
        value={searchValue}
      />
    </Box>
  )
}
Header.propTypes = {
  isArchived: PropTypes.bool.isRequired
}
export default Header
