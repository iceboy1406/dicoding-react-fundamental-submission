import axios from 'api/axios'
import type { CreateNotePayload, IdOnlyPayload } from 'types/payload'

class NoteApi {
  static async getActiveNotes() {
    const response = await axios.get<ApiResponse<Note[]>>('/notes')
    return response.data
  }

  static async getArchivedNotes() {
    const response = await axios.get<ApiResponse<Note[]>>('/notes/archived')
    return response.data
  }

  static async getNoteById({ id }: IdOnlyPayload) {
    const response = await axios.get<ApiResponse<Note>>(`/notes/${id}`)
    return response.data
  }

  static async createNote({ title, body }: CreateNotePayload) {
    const response = await axios.post<ApiResponse<Note>>('/notes', { title, body })
    return response.data
  }

  static async archiveNote({ id }: IdOnlyPayload) {
    const response = await axios.post<ApiResponse>(`/notes/${id}/archive`)
    return response.data
  }

  static async unarchiveNote({ id }: IdOnlyPayload) {
    const response = await axios.post<ApiResponse>(`/notes/${id}/unarchive`)
    return response.data
  }

  static async deleteNote({ id }: IdOnlyPayload) {
    const response = await axios.delete<ApiResponse>(`/notes/${id}`)
    return response.data
  }
}

export default NoteApi
