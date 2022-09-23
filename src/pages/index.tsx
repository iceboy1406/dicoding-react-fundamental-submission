import {
  Box,
  Button,
  Input,
  Modal,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import RichTextEditor from '@mantine/rte'
import NoteApi from 'api/services/note'
import BreadCrumbs from 'components/molecules/BreadCrumbs'
import NoteCard from 'components/molecules/NoteCard'
import NoteList from 'components/templates/NoteList'
import useColorScheme from 'hooks/useColorScheme'
import useLocalization from 'hooks/useLocalization'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiCheck, FiSearch } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CreateNotePayload } from 'types/payload'
import getTextContentLength from 'utils/getTextContentLength'
const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const { colorScheme } = useColorScheme()
  const theme = useMantineTheme()
  const queryClient = useQueryClient()
  const {
    pages: { activeNotes: localization },
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
  } = useQuery(['Notes'], NoteApi.getActiveNotes)
  const createNoteMutation = useMutation(NoteApi.createNote, {
    onSuccess: () => {
      reset()
      setCreateModalVisibility(false)
      queryClient.invalidateQueries(['Notes'])
      showNotification({
        title: 'Success',
        message: 'Note created successfully',
        color: 'teal',
        icon: <FiCheck />,
      })
    },
  })

  const [createModalVisibility, setCreateModalVisibility] = useState(false)

  const {
    control,
    setValue,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    reset,
  } = useForm<CreateNotePayload>({
    defaultValues: {
      title: '',
      body: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const onSubmit = (values: CreateNotePayload) => {
    createNoteMutation.mutate(values)
  }
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
      navigate(`/`)
    } else {
      navigate(`/?keyword=${searchValue}`)
    }
  }, [searchValue, navigate])
  useEffect(() => {
    if (searchKeyword) {
      setSearchValue(searchKeyword)
    } else {
      setSearchValue('')
    }
  }, [searchKeyword])
  return (
    <>
      <BreadCrumbs
        items={[
          {
            title: localization.breadCrumbItems.notesApp,
            href: '/',
            active: false,
          },
          {
            title: localization.breadCrumbItems.activeNotes,
            href: '#',
            active: true,
          },
        ]}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '16px',
          marginTop: '16px',
          gap: '8px',
        }}
      >
        <Button onClick={() => setCreateModalVisibility(true)}>
          {localization.createNewNoteButton.text}
        </Button>
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
        archived={false}
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
              archived={false}
            />
          ))}
      </NoteList>
      <Modal
        opened={createModalVisibility}
        onClose={() => {
          reset()
          setCreateModalVisibility(false)
        }}
        title={localization.createNewNoteModal.title}
        fullScreen={isMobile}
        size="lg"
        overflow="inside"
        transition={'pop-top-left'}
        overlayColor={
          colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            rules={{
              required:
                localization.createNewNoteModal.form.title.validation.required,
            }}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label={localization.createNewNoteModal.form.title.label}
                placeholder={
                  localization.createNewNoteModal.form.title.placeholder
                }
                value={value}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .trimStart()
                    .replace(/ +(?= )/g, '')
                  onChange(e)
                }}
                withAsterisk
                sx={{ marginBottom: '8px' }}
                error={errors.title?.message}
              />
            )}
          />
          <Input.Wrapper
            label={localization.createNewNoteModal.form.body.label}
            withAsterisk
            children={<></>}
          />
          <Controller
            name="body"
            rules={{
              required:
                localization.createNewNoteModal.form.body.validation.required,
              validate: {
                required: (value) => {
                  console.log(value, errors)
                  return (
                    getTextContentLength(value) > 0 ||
                    localization.createNewNoteModal.form.body.validation
                      .required
                  )
                },
              },
            }}
            control={control}
            render={({ field: { value } }) => (
              <RichTextEditor
                controls={[
                  ['bold', 'italic', 'underline', 'strike', 'clean'],
                  ['sub', 'sup'],
                  ['alignLeft', 'alignCenter', 'alignRight'],
                  ['unorderedList', 'orderedList'],
                  ['code', 'codeBlock', 'blockquote', 'link'],
                ]}
                value={value}
                placeholder={
                  localization.createNewNoteModal.form.body.placeholder
                }
                onChange={(rteValue, _delta, _sources, editor) => {
                  setValue('body', rteValue, { shouldValidate: true })
                }}
                sticky
                sx={{
                  '& .ql-editor': {
                    minHeight: '300px',
                  },
                }}
              />
            )}
          />
          {errors.body && (
            <Box
              sx={{
                fontSize: '12px',
                color:
                  colorScheme === 'dark'
                    ? theme.colors.red[6]
                    : theme.colors.red[8],
                marginTop: '4px',
              }}
            >
              {errors.body.message}
            </Box>
          )}
          <Box
            sx={{
              position: 'sticky',
              bottom: '0px',
              left: '0px',
              paddingTop: '8px',
              backgroundColor:
                colorScheme === 'dark' ? theme.colors.dark[7] : 'white',
            }}
          >
            <Button
              fullWidth
              disabled={!isDirty || !isValid}
              type={'submit'}
              loading={createNoteMutation.isLoading}
            >
              {localization.createNewNoteModal.form.submitButton.text}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  )
}

export default HomePage
