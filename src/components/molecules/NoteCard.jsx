import React from 'react'
import PropTypes from 'prop-types'
import {
  ActionIcon,
  Box,
  Card,
  Text,
  Tooltip,
  TypographyStylesProvider,
  useMantineColorScheme,
} from '@mantine/core'
import showFormattedDate from 'utils/showFormattedDate'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi'
import { MdArchive, MdUnarchive } from 'react-icons/md'
import { Link } from 'react-router-dom'
const NoteCard = ({
  title,
  body,
  createdAt,
  isArchive,
  onDelete,
  onEdit,
  onArchive,
  onUnarchive,
  previewHref,
}) => {
  const { colorScheme } = useMantineColorScheme()
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
          {showFormattedDate(createdAt)}
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
        {!isArchive && (
          <Tooltip label="Edit Note" withArrow position="top-start">
            <ActionIcon
              variant="light"
              size="lg"
              color={'indigo'}
              onClick={onEdit}
            >
              <FiEdit />
            </ActionIcon>
          </Tooltip>
        )}

        <Tooltip
          label="Delete Note"
          withArrow
          position={isArchive ? 'top-start' : undefined}
        >
          <ActionIcon
            variant="light"
            size="lg"
            color={'red'}
            onClick={onDelete}
          >
            <FiTrash2 />
          </ActionIcon>
        </Tooltip>
        {isArchive ? (
          <Tooltip label="Unarchive Note" withArrow>
            <ActionIcon
              variant="light"
              size="lg"
              color={'teal'}
              onClick={onUnarchive}
            >
              <MdUnarchive />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Archive Note" withArrow>
            <ActionIcon
              variant="light"
              size="lg"
              color={'teal'}
              onClick={onArchive}
            >
              <MdArchive />
            </ActionIcon>
          </Tooltip>
        )}
        <Tooltip label="Go to Note Detail" withArrow>
          <Link to={previewHref}>
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
  isArchive: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onArchive: PropTypes.func,
  onUnArchive: PropTypes.func,
  previewHref: PropTypes.string.isRequired,
}

export default NoteCard
