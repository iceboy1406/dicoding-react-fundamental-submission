import { Button, Input, Modal, Text, TextInput } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import RichTextEditor from '@mantine/rte'
import NoteCard from 'components/molecules/NoteCard'
import MainLayout from 'components/templates/MainLayout'
import NoteList from 'components/templates/NoteList'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import {
  addNote,
  archiveNote,
  deleteNote,
  editNote,
  getActiveNotes,
  getSearchedNotes,
} from 'utils/localData'
const HomePage = () => {
  const [filteredNotes, setFilteredNotes] = useState(getActiveNotes())
  const { search, pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')

  const updateFilteredNotes = useCallback(() => {
    if (keyword) {
      setFilteredNotes(getSearchedNotes(getActiveNotes(), keyword))
    } else {
      setFilteredNotes(getActiveNotes())
    }
  }, [keyword])
  useEffect(
    () => updateFilteredNotes(),
    [pathname, search, updateFilteredNotes]
  )

  const isMobile = useMediaQuery('(max-width: 640px)')

  const [createOrEditNoteModalOpened, setCreateOrEditModalOpened] =
    useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isFormValid, setIsFormValid] = useState({
    title: false,
    body: false,
  })
  const [selectedNoteId, setSelectedNoteId] = useState()

  return (
    <MainLayout
      isArchived={false}
      breadCrumbItems={[
        { title: 'Notes App', href: '/', active: false },
        { title: 'Active Notes', href: '#', active: true },
      ]}
    >
      <Button
        sx={{
          marginBottom: '16px',
        }}
        onClick={() => setCreateOrEditModalOpened(true)}
      >
        New Note
      </Button>
      <NoteList
        allNotesLength={getActiveNotes().length}
        filteredNotesLength={filteredNotes.length}
        isArchive={false}
        keyword={keyword ?? ''}
      >
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            isArchive={false}
            onArchive={() => {
              openConfirmModal({
                title: 'Archive your note',
                centered: true,
                children: (
                  <Text size="sm">
                    Are you sure you want to archive <b>{note.title}</b> note ?
                  </Text>
                ),
                labels: {
                  confirm: 'Archive note',
                  cancel: "No don't archive it",
                },
                confirmProps: { color: 'indigo' },
                onConfirm: () => {
                  archiveNote(note.id)
                  showNotification({
                    title: 'Success Archive Note',
                    message: 'Your note successfully archived',
                    color: 'teal',
                  })
                  updateFilteredNotes()
                },
              })
            }}
            onDelete={() => {
              openConfirmModal({
                title: 'Delete your note',
                centered: true,
                children: (
                  <Text size="sm">
                    Are you sure you want to delete <b>{note.title}</b> note ?
                    This action will permanently delete your note!
                  </Text>
                ),
                labels: {
                  confirm: 'Delete note',
                  cancel: "No don't delete it",
                },
                confirmProps: { color: 'red' },
                onConfirm: () => {
                  deleteNote(note.id)
                  showNotification({
                    title: 'Success Delete Note',
                    message: 'Your note successfully deleted',
                    color: 'teal',
                  })
                  updateFilteredNotes()
                },
              })
            }}
            onEdit={() => {
              setSelectedNoteId(note.id)
              setTitle(note.title)
              setBody(note.body)
              setIsFormValid({ title: true, body: true })
              setCreateOrEditModalOpened(true)
            }}
            previewHref={`/notes/${note.id}`}
          />
        ))}
      </NoteList>
      <Modal
        opened={createOrEditNoteModalOpened}
        onClose={() => {
          setCreateOrEditModalOpened(false)
          setTitle('')
          setBody('')
          setSelectedNoteId(undefined)
          setIsFormValid({ body: false, title: false })
        }}
        title={selectedNoteId ? 'Edit Note' : 'Create New Note'}
        fullScreen={isMobile}
        size="lg"
      >
        <TextInput
          label="Title"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => {
            const currentValue = e.currentTarget.value
              .trimStart()
              .replace(/ +(?= )/g, '')
            setTitle(currentValue)
            if (currentValue.length >= 3) {
              setIsFormValid((prevState) => ({ ...prevState, title: true }))
            } else {
              setIsFormValid((prevState) => ({ ...prevState, title: false }))
            }
          }}
          withAsterisk
          sx={{ marginBottom: '8px' }}
        />
        <Input.Wrapper label="Body" withAsterisk sx={{ marginBottom: '8px' }}>
          <RichTextEditor
            controls={[
              ['bold', 'italic', 'underline', 'strike', 'clean'],
              ['sub', 'sup'],
              ['alignLeft', 'alignCenter', 'alignRight'],
              ['unorderedList', 'orderedList'],
              ['code', 'codeBlock', 'blockquote', 'link'],
            ]}
            value={body}
            placeholder="Enter note body here"
            onChange={(value, _delta, _sources, editor) => {
              setBody(value)
              const editorTextLength = editor
                .getText()
                .replaceAll(' ', '')
                .trim().length
              if (editorTextLength >= 5) {
                setIsFormValid((prevState) => ({ ...prevState, body: true }))
              } else {
                setIsFormValid((prevState) => ({ ...prevState, body: false }))
              }
            }}
            sticky
            sx={{
              '& .ql-editor': {
                minHeight: '300px',
              },
            }}
          />
        </Input.Wrapper>
        <Button
          fullWidth
          disabled={!(isFormValid.body && isFormValid.title)}
          onClick={() => {
            if (selectedNoteId) {
              editNote({ id: selectedNoteId, title, body })
              showNotification({
                title: 'Success Edit Note',
                message: 'Note edited successfully',
                color: 'teal',
              })
            } else {
              addNote({
                body,
                title,
              })
              showNotification({
                title: 'Success Create Note',
                message: 'Note created successfully',
                color: 'teal',
              })
            }

            updateFilteredNotes()
            setCreateOrEditModalOpened(false)
          }}
        >
          Submit
        </Button>
      </Modal>
    </MainLayout>
  )
}

export default HomePage
