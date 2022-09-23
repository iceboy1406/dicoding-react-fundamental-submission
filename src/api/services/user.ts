import axios from 'api/axios'

class UserApi {
  static async getAuthenticatedUser() {
    const response = await axios.get<ApiResponse<User>>('/users/me')
    return response.data
  }
}

export default UserApi