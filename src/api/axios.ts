import axios, { AxiosError } from 'axios'

export default axios.create({
  baseURL: 'https://notes-api.dicoding.dev/v1',
})

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error)
}
