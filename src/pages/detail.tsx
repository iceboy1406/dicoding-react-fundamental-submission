import {
  Box,
  Card,
  Skeleton,
  Text,
  TypographyStylesProvider,
  useMantineTheme,
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import NoteApi from 'api/services/note'
import BreadCrumbs from 'components/molecules/BreadCrumbs'
import useColorScheme from 'hooks/useColorScheme'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import showFormattedDate from 'utils/showFormattedDate'

const NoteDetailPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { colorScheme } = useColorScheme()
  const theme = useMantineTheme()
  useEffect(() => {
    if (!id) {
      navigate('/404', { replace: true })
    }
  }, [id])
  const { data: noteDetail, isFetching } = useQuery(
    ['NoteDetail'],
    () => NoteApi.getNoteById({ id: `${id}` }),
    {
      enabled: Boolean(id),
      onError: () => {
        navigate('/404', { replace: true })
      },
    }
  )
  return noteDetail && !isFetching ? (
    <>
      <BreadCrumbs
        items={[
          { title: 'Notes App', href: '/', active: false },
          { title: 'Note Detail', href: '#', active: true },
        ]}
      />
      <Box
        component="article"
        sx={{
          backgroundColor:
            colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
          padding: '18px',
          borderRadius: '8px',
          marginTop: '16px',
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
          {noteDetail.data.title}
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
          {showFormattedDate(noteDetail.data.createdAt)}
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
            dangerouslySetInnerHTML={{ __html: noteDetail.data.body }}
          />
        </TypographyStylesProvider>
      </Box>
    </>
  ) : (
    <>
      <Card>
        <Skeleton width={'75%'} height={50} />
        <Skeleton width={'45%'} height={20} mt={12} />
        <Skeleton width={'80%'} height={35} mt={20} />
        <Skeleton width={'100%'} height={250} mt={12} />
        <Skeleton width={'40%'} height={35} mt={20} />
        <Skeleton width={'100%'} height={150} mt={12} />
      </Card>
    </>
  )
}

export default NoteDetailPage
