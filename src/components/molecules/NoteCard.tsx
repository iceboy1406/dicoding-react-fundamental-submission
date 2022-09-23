import React from 'react'
import PropTypes from 'prop-types'
import {
  ActionIcon,
  Box,
  Card,
  Text,
  Tooltip,
  TypographyStylesProvider,
} from '@mantine/core'
import showFormattedDate from 'utils/showFormattedDate'
import { FiCheck, FiEye, FiTrash2 } from 'react-icons/fi'
import { MdArchive, MdUnarchive } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useColorScheme from 'hooks/useColorScheme'
import useLocalization from 'hooks/useLocalization'
import useLanguage from 'hooks/useLanguage'
import { openConfirmModal } from '@mantine/modals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NoteApi from 'api/services/note'
import { showNotification } from '@mantine/notifications'

interface Props extends Note {}

const NoteCard: React.FC<Props> = ({
  title,
  body,
  createdAt,
  id,
  archived,
}) => {
  const { colorScheme } = useColorScheme()
  const {
    components: { noteCard: localization },
  } = useLocalization()
  const { language } = useLanguage()
  const queryClient = useQueryClient()
  const deleteNoteMutation = useMutation(NoteApi.deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Notes'])
      showNotification({
        title: localization.deleteButton.notification.success.title,
        message: localization.deleteButton.notification.success.message,
        color: 'teal',
        icon: <FiCheck />,
      })
    },
    onError: (error) => {
      showNotification({
        title: localization.deleteButton.notification.failed.title,
        message: localization.deleteButton.notification.failed.message,
        color: 'red',
      })
      console.log(error)
    },
  })
  const archiveNoteMutation = useMutation(NoteApi.archiveNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Notes'])
      showNotification({
        title: localization.archiveButton.notification.success.title,
        message: localization.archiveButton.notification.success.message,
        color: 'teal',
        icon: <FiCheck />,
      })
    },
    onError: (error) => {
      showNotification({
        title: localization.archiveButton.notification.failed.title,
        message: localization.archiveButton.notification.failed.message,
        color: 'red',
      })
      console.log(error)
    },
  })
  const unarchiveNoteMutation = useMutation(NoteApi.unarchiveNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Notes'])
      showNotification({
        title: localization.unarchiveButton.notification.success.title,
        message: localization.unarchiveButton.notification.success.message,
        color: 'teal',
        icon: <FiCheck />,
      })
    },
    onError: (error) => {
      showNotification({
        title: localization.unarchiveButton.notification.failed.title,
        message: localization.unarchiveButton.notification.failed.message,
        color: 'red',
      })
      console.log(error)
    },
  })
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box component="article">
        <Text
          component="h1"
          color={colorScheme === 'dark' ? 'gray.3' : 'gray.7'}
          sx={{
            fontSize: '24px',
            marginTop: 0,
            marginBottom: '4px',
          }}
        >
          {title}
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
          {showFormattedDate(createdAt, language === 'id' ? 'id-ID' : 'en-EN')}
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
              WebkitLineClamp: 6,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </TypographyStylesProvider>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Tooltip
          label={localization.deleteButton.tooltip}
          withArrow
          position={'top-start'}
        >
          <ActionIcon
            variant="light"
            size="lg"
            color={'red'}
            onClick={() => {
              openConfirmModal({
                title: localization.deleteButton.confirmModal.title,
                centered: true,
                children: (
                  <Text size="sm">
                    {localization.deleteButton.confirmModal.message.firstPart}{' '}
                    <b>{title}</b>{' '}
                    {localization.deleteButton.confirmModal.message.lastPart}
                  </Text>
                ),
                labels: {
                  confirm:
                    localization.deleteButton.confirmModal.button.confirm.text,
                  cancel:
                    localization.deleteButton.confirmModal.button.cancel.text,
                },
                confirmProps: { color: 'red' },
                onConfirm: () => deleteNoteMutation.mutate({ id }),
              })
            }}
          >
            <FiTrash2 />
          </ActionIcon>
        </Tooltip>
        {archived ? (
          <Tooltip
            label={localization.unarchiveButton.tooltip}
            withArrow
            position={language === 'id' ? 'top-start' : undefined}
          >
            <ActionIcon
              variant="light"
              size="lg"
              color={'teal'}
              onClick={() => {
                openConfirmModal({
                  title: localization.unarchiveButton.confirmModal.title,
                  centered: true,
                  children: (
                    <Text size="sm">
                      {localization.unarchiveButton.confirmModal.message.firstPart}{' '}
                      <b>{title}</b>{' '}
                      {localization.unarchiveButton.confirmModal.message.lastPart}
                    </Text>
                  ),
                  labels: {
                    confirm:
                      localization.unarchiveButton.confirmModal.button.confirm.text,
                    cancel:
                      localization.unarchiveButton.confirmModal.button.cancel.text,
                  },
                  confirmProps: { color: 'indigo' },
                  onConfirm: () => unarchiveNoteMutation.mutate({ id }),
                })
              }}
            >
              <MdUnarchive />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label={localization.archiveButton.tooltip} withArrow>
            <ActionIcon
              variant="light"
              size="lg"
              color={'teal'}
              onClick={() => {
                openConfirmModal({
                  title: localization.archiveButton.confirmModal.title,
                  centered: true,
                  children: (
                    <Text size="sm">
                      {localization.archiveButton.confirmModal.message.firstPart}{' '}
                      <b>{title}</b>{' '}
                      {localization.archiveButton.confirmModal.message.lastPart}
                    </Text>
                  ),
                  labels: {
                    confirm:
                      localization.archiveButton.confirmModal.button.confirm.text,
                    cancel:
                      localization.archiveButton.confirmModal.button.cancel.text,
                  },
                  confirmProps: { color: 'indigo' },
                  onConfirm: () => archiveNoteMutation.mutate({ id }),
                })
              }}
            >
              <MdArchive />
            </ActionIcon>
          </Tooltip>
        )}
        <Tooltip label={localization.previewButton.tooltip} withArrow>
          <Link to={`/notes/${id}`}>
            <ActionIcon variant="light" size="lg" color={'cyan'}>
              <FiEye />
            </ActionIcon>
          </Link>
        </Tooltip>
      </Box>
    </Card>
  )
}

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
}

export default NoteCard
