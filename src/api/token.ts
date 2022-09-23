class Token {
  static getToken() {
    return localStorage.getItem('accessToken')
  }
  static setToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
  }
  static removeToken() {
    localStorage.removeItem('accessToken')
  }
}
export default Token
