import { Breadcrumbs } from '@mantine/core'
import BreadCrumbsItem from 'components/atoms/BreadCrumbsItem'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import PropTypes from 'prop-types'

interface BreadCrumbsItemType {
  title: string
  href: string
  active: boolean
}

interface Props {
  items: BreadCrumbsItemType[]
}

const BreadCrumbs: React.FC<Props> = ({ items }) => {
  return (
    <Breadcrumbs separator={<FiChevronRight />}>
      {items.map((item, index) => (
        <BreadCrumbsItem
          title={item.title}
          href={item.href}
          active={item.active}
          key={index}
        />
      ))}
    </Breadcrumbs>
  )
}

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
}
export default BreadCrumbs
