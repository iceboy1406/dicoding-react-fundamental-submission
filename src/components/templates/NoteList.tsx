import { Box, Card, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core'
import React from 'react'
import PropTypes from 'prop-types'
import useColorScheme from 'hooks/useColorScheme'
import useLocalization from 'hooks/useLocalization'
interface Props {
  children: React.ReactNode
  loading: boolean
  filteredNotesLength: number
  allNotesLength: number
  keyword: string
  archived: boolean
}
const NoteList: React.FC<Props> = ({
  children,
  loading,
  filteredNotesLength,
  allNotesLength,
  keyword,
  archived,
}) => {
  const { colorScheme } = useColorScheme()
  const theme = useMantineTheme()
  const {
    components: { searchNote: localization },
  } = useLocalization()
  if (filteredNotesLength > 0 || loading) {
    return (
      <SimpleGrid
        cols={1}
        spacing={16}
        breakpoints={[
          { minWidth: 640, cols: 2 },
          { minWidth: 960, cols: 3 },
        ]}
      >
        {loading ? (
          Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
            <Card key={value}>
              <Skeleton width={'100%'} height={20} />
              <Skeleton width="35%" height={20} mt={8} />
              <Skeleton width="65%" height={12} mt={16} />
              <Skeleton width="100%" height={16} mt={28} />
              <Skeleton width="90%" height={16} mt={8} />
              <Skeleton width="30%" height={16} mt={8} />
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '24px',
                }}
              >
                <Skeleton width={35} height={35} />
                <Skeleton width={35} height={35} />
                <Skeleton width={35} height={35} />
              </Box>
            </Card>
          ))
        ) : (
          <>{children}</>
        )}
      </SimpleGrid>
    )
  }
  return (
    <SimpleGrid
      cols={1}
      sx={{
        placeContent: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor:
          colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
        borderRadius: '8px',
      }}
    >
      {keyword && allNotesLength > 0 ? (
        <p>
          {localization.noNoteMessage.searchNotFound.pre} <b>{keyword}</b>
        </p>
      ) : (
        <p>
          {archived
            ? localization.noNoteMessage.noData.archive
            : localization.noNoteMessage.noData.active}
        </p>
      )}
    </SimpleGrid>
  )
}

NoteList.propTypes = {
  allNotesLength: PropTypes.number.isRequired,
  filteredNotesLength: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
}
export default NoteList
