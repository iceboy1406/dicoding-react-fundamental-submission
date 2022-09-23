import {
  ActionIcon,
  Box,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import NavLink from 'components/atoms/NavLink'
import useColorScheme from 'hooks/useColorScheme'
import useLanguage from 'hooks/useLanguage'
import useLocalization from 'hooks/useLocalization'
import React from 'react'
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Token from 'api/token'
import axios from 'api/axios'
interface Props {
  isAuthenticated: boolean
  username?: string
}
const Header: React.FC<Props> = ({ isAuthenticated, username }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const theme = useMantineTheme()
  const { language, toggleEnAndId } = useLanguage()
  const {
    components: { header: localization },
  } = useLocalization()

  const navigate = useNavigate()
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
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        rowGap: '16px',
        boxShadow: '0px 0px 100px 10px rgba(0,0,0,.1)',
        '@media (min-width: 768px)': {
          flexWrap: 'nowrap',
          padding: '18px 24px',
          gap: '12px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <Image src="/assets/images/notes-icon.webp" width={35} height={35} />
          <Text
            component="h1"
            color={colorScheme === 'dark' ? 'white' : 'dark'}
            size={24}
            sx={{
              textDecoration: 'none',
              margin: 0,
            }}
          >
            {localization.appName}
          </Text>
        </Box>
      </Box>
      {isAuthenticated && (
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
          }}
        >
          <NavLink tooltip={localization.homeLink.tooltip} href="/">
            {localization.homeLink.text}
          </NavLink>
          <NavLink tooltip={localization.archiveLink.tooltip} href="/archive">
            {localization.archiveLink.text}
          </NavLink>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          flexBasis: isAuthenticated ? '100%' : 'unset',
          justifyContent: 'space-between',
          '@media (min-width: 768px)': {
            flexBasis: 'unset',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <Tooltip label={localization.colorSchemeSwitch.tooltip} withArrow>
            <ActionIcon
              variant="light"
              onClick={toggleColorScheme}
              size="lg"
              color={colorScheme === 'dark' ? 'violet' : 'yellow'}
            >
              {colorScheme === 'dark' ? <FiMoon /> : <FiSun />}
            </ActionIcon>
          </Tooltip>
          <Tooltip label={localization.languageSwitch.tooltip} withArrow>
            <ActionIcon
              variant="light"
              onClick={toggleEnAndId}
              size="lg"
              color={'default'}
            >
              <Image
                src={`/assets/images/${
                  language === 'en' ? 'uk-flag' : 'id-flag'
                }.png`}
                width={20}
                height={20}
              />
            </ActionIcon>
          </Tooltip>
        </Box>
        {isAuthenticated && (
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              paddingLeft: '12px',
            }}
          >
            <Text
              component="p"
              color={colorScheme === 'dark' ? 'white' : 'dark'}
              size={18}
              sx={{
                textDecoration: 'none',
                margin: 0,
              }}
            >
              {username}
            </Text>
            <Tooltip label={localization.logoutButton.tooltip} withArrow>
              <ActionIcon
                variant="light"
                onClick={() => {
                  navigate('/auth/login', { replace: true })
                  Token.removeToken()
                  axios.defaults.headers.common['Authorization'] = ''
                }}
                size="lg"
                color={'default'}
              >
                <FiLogOut />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  )
}
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
}
export default Header
