import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, useMantineTheme } from '@mantine/core'
const BreadCrumbsItem = ({ title, href, active }) => {
  const theme = useMantineTheme()
  return (
    <Box
      component={Link}
      to={href}
      sx={{
        display: 'block',
        color: active ? theme.colors.indigo : theme.colors.dark[3],
        textDecoration: 'none'
      }}
    >
      {title}
    </Box>
  )
}
BreadCrumbsItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

export default BreadCrumbsItem
