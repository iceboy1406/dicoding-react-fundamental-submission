import { Button, Tooltip } from '@mantine/core'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

interface Props {
  tooltip: string
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<Props> = ({ tooltip, href, children }) => {
  const { pathname } = useLocation()
  return (
    <Tooltip label={tooltip} withArrow>
      <Link to={href}>
        <Button variant={pathname === href ? 'light' : 'subtle'}>
          {children}
        </Button>
      </Link>
    </Tooltip>
  )
}
NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
}
export default NavLink
