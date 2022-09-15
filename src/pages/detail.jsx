import {
  Box,
  Text,
  TypographyStylesProvider,
  useMantineColorScheme,
} from '@mantine/core'
import MainLayout from 'components/templates/MainLayout'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getNote } from 'utils/localData'
import showFormattedDate from 'utils/showFormattedDate'

const NoteDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [noteDetail, setNoteDetail] = useState()
  const { colorScheme } = useMantineColorScheme()
  useEffect(() => {
    if (!getNote(id)) {
      navigate('/404', { replace: true })
    } else {
      setNoteDetail(getNote(id))
    }
  }, [id, navigate])
  return (
    noteDetail && (
      <MainLayout
        isArchived={noteDetail.archived}
        breadCrumbItems={[
          { title: 'Notes App', href: '/', active: false },
          { title: 'Note Detail', href: '#', active: true },
        ]}
      >
        <Box
          component="article"
          sx={{
            backgroundColor: 'white',
            padding: '18px',
            borderRadius: '8px',
          }}
        >
          <Text
            component="h1"
            color={colorScheme === 'dark' ? 'gray.3' : 'gray.7'}
            sx={{
              fontSize: '24px',
              marginTop: 0,
              marginBottom: '4px',
            }}
          >
            {noteDetail.title}
          </Text>
          <Text
            component="p"
            color={colorScheme === 'dark' ? 'gray.5' : 'gray.6'}
            sx={{
              fontSize: '14px',
              marginTop: 0,
              marginBottom: '12px',
            }}
          >
            {showFormattedDate(noteDetail.createdAt)}
          </Text>
          <TypographyStylesProvider
            sx={{
              '& blockquote': {
                borderLeft: '4px solid #ced4da',
              },
            }}
          >
            <Text
              component="p"
              color={colorScheme === 'dark' ? 'gray.4' : 'gray.7'}
              sx={{
                fontSize: '16px',
                marginTop: 0,
                marginBottom: 0,
              }}
              dangerouslySetInnerHTML={{ __html: noteDetail.body }}
            />
          </TypographyStylesProvider>
        </Box>
      </MainLayout>
    )
  )
}

export default NoteDetailPage
