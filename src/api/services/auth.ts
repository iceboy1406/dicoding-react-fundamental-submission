import axios from 'api/axios'
import type { RegisterPayload, LoginPayload } from 'types/payload'
class AuthApi {
  static async register(payload: RegisterPayload) {
    const response = await axios.post<ApiResponse>('/register', payload)
    return response.data
  }

  static async login(payload: LoginPayload) {
    const response = await axios.post<
      ApiResponse<{ accessToken: AccessToken }>
    >('/login', payload)
    return response.data
  }
}

export default AuthApi
