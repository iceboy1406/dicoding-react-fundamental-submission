import axios from 'api/axios'
import Token from 'api/token'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AxiosError } from 'axios'

interface Props {
  children: React.ReactNode
}
const WithAxios: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = Token.getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          navigate('/auth/login', { replace: true })
          Token.removeToken()
          axios.defaults.headers.common['Authorization'] = ''
        }
        return Promise.reject(error)
      }
    )
  }, [])
  return <>{children}</>
}
WithAxios.propTypes = {
  children: PropTypes.node.isRequired,
}
export default WithAxios
