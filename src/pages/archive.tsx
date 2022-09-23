import { Box, TextInput } from '@mantine/core'
import NoteApi from 'api/services/note'
import BreadCrumbs from 'components/molecules/BreadCrumbs'
import NoteCard from 'components/molecules/NoteCard'
import NoteList from 'components/templates/NoteList'
import useColorScheme from 'hooks/useColorScheme'
import useLocalization from 'hooks/useLocalization'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
const ArchivePage = () => {
  const { colorScheme } = useColorScheme()
  const {
    pages: { archivedNotes: localization },
    components: {
      searchNote: {
        input: { placeholder: searchNotePlaceholder },
      },
    },
  } = useLocalization()
  const {
    data: noteData,
    isSuccess,
    isFetching,
    isFetchedAfterMount
  } = useQuery(['Notes'], NoteApi.getArchivedNotes)

  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchParams] = useSearchParams()
  const searchKeyword = searchParams.get('keyword')
  const filteredNotes = useMemo(() => {
    if (isSuccess) {
      if (!searchKeyword) return noteData.data
      return noteData.data.filter((note) =>
        note.title.toLowerCase().includes(searchKeyword)
      )
    }
    return []
  }, [searchKeyword, noteData, isSuccess])
  useEffect(() => {
    if (!searchValue) {
      navigate(`/archive`)
    } else {
      navigate(`/archive?keyword=${searchValue}`)
    }
  }, [searchValue])
  useEffect(() => {
    if (searchKeyword) {
      setSearchValue(searchKeyword)
    } else {
      setSearchValue('')
    }
  }, [])
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginBottom: '16px',
          marginTop: '16px',
          gap: '8px',
          flexDirection: 'column',
          '@media (min-width: 576px)': {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          },
        }}
      >
        <BreadCrumbs
          items={[
            {
              title: localization.breadCrumbItems.notesApp,
              href: '/',
              active: false,
            },
            {
              title: localization.breadCrumbItems.archivedNotes,
              href: '#',
              active: true,
            },
          ]}
        />
        <TextInput
          icon={<FiSearch />}
          placeholder={searchNotePlaceholder}
          size="sm"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </Box>
      <NoteList
        loading={isFetching && !isFetchedAfterMount}
        filteredNotesLength={filteredNotes.length}
        allNotesLength={noteData?.data.length ?? 0}
        archived={true}
        keyword={searchValue}
      >
        {isSuccess &&
          filteredNotes?.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              id={note.id}
              archived={true}
            />
          ))}
      </NoteList>
    </>
  )
}

export default ArchivePage
