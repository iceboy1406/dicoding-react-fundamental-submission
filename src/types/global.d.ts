declare interface ApiResponse<Data = undefined> {
  status: string
  message: string
  data: Data
}

declare interface Note {
  id: string
  title: string
  body: string
  createdAt: string
  archived: boolean
}

declare interface User {
  id: string
  name: string
  email: string
}

declare type AccessToken = string