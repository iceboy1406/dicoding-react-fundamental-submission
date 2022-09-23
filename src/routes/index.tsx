import AuthLayout from 'components/templates/AuthLayout'
import MainLayout from 'components/templates/MainLayout'
import HomePage from 'pages'
import PageNotFound from 'pages/404'
import ArchivePage from 'pages/archive'
import NoteDetailPage from 'pages/detail'
import LoginPage from 'pages/login'
import RegisterPage from 'pages/register'
import { Navigate, useRoutes } from 'react-router-dom'

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: 'archive',
          element: <ArchivePage />,
        },
        {
          path: 'notes/:id',
          element: <NoteDetailPage />,
        },
        {
          path: '*',
          element: <Navigate replace to="/404" />,
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: '',
          element: <Navigate replace to="/404" />,
        },
        {
          path: '*',
          element: <Navigate replace to="/404" />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate replace to="404" />,
    },
    {
      path: '404',
      element: <PageNotFound />,
    },
  ])
}
export default Routes
