import { SimpleGrid, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import React from 'react'
import PropTypes from 'prop-types'
const NoteList = ({
  allNotesLength,
  filteredNotesLength,
  keyword,
  isArchive,
  children,
}) => {
  const {colorScheme} = useMantineColorScheme()
  const theme = useMantineTheme()
  return filteredNotesLength > 0 ? (
    <SimpleGrid
      cols="1"
      spacing={16}
      breakpoints={[
        { minWidth: 640, cols: 2 },
        { minWidth: 960, cols: 3 },
      ]}
    >
      {children}
    </SimpleGrid>
  ) : (
    <SimpleGrid
      cols={1}
      sx={{
        placeContent: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
        borderRadius: '8px',
      }}
    >
      {keyword && allNotesLength > 0 ? (
        <p>
          Sorry we couldn't find any matches for search: <b>{keyword}</b>
        </p>
      ) : (
        <p>There's no {isArchive ? 'archived' : 'active'} note</p>
      )}
    </SimpleGrid>
  )
}
NoteList.propTypes = {
  allNotesLength: PropTypes.number.isRequired,
  filteredNotesLength: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  isArchive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}
export default NoteList
