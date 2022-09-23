export interface RegisterPayload {
  name: string
  email: string
  password: string
  passwordConfirmation?: string
}
export interface LoginPayload {
  email: string
  password: string
}
export interface CreateNotePayload {
  title: string
  body: string
}
export interface IdOnlyPayload {
  id: string
}
