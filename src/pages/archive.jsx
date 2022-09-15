import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import NoteCard from 'components/molecules/NoteCard'
import MainLayout from 'components/templates/MainLayout'
import NoteList from 'components/templates/NoteList'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import {
  deleteNote,
  getArchivedNotes,
  getSearchedNotes,
  unarchiveNote,
} from 'utils/localData'
const ArchivePage = () => {
  const [filteredNotes, setFilteredNotes] = useState(getArchivedNotes())
  const { search, pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')


  const updateFilteredNotes = useCallback(() => {
    if (keyword) {
      setFilteredNotes(getSearchedNotes(getArchivedNotes(), keyword))
    } else {
      setFilteredNotes(getArchivedNotes())
    }
  }, [keyword])
  useEffect(() => updateFilteredNotes(), [pathname, search, updateFilteredNotes])


  return (
    <MainLayout
      isArchived
      breadCrumbItems={[
        { title: 'Notes App', href: '/', active: false },
        { title: 'Archived Notes', href: '#', active: true },
      ]}
    >
      <NoteList
        allNotesLength={getArchivedNotes().length}
        filteredNotesLength={filteredNotes.length}
        isArchive={true}
        keyword={keyword ?? ''}
      >
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            isArchive={true}
            onUnarchive={() => {
              openConfirmModal({
                title: 'Unarchive your note',
                centered: true,
                children: (
                  <Text size="sm">
                    Are you sure you want to unarchive <b>{note.title}</b> note
                    ?
                  </Text>
                ),
                labels: {
                  confirm: 'Unarchive note',
                  cancel: "No don't unarchive it",
                },
                confirmProps: { color: 'indigo' },
                onConfirm: () => {
                  unarchiveNote(note.id)
                  showNotification({
                    title: 'Success Unarchive Note',
                    message: 'Your note successfully Unarchive',
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
            previewHref={`/notes/${note.id}`}
          />
        ))}
      </NoteList>
    </MainLayout>
  )
}

export default ArchivePage
