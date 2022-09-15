import HomePage from 'pages'
import PageNotFound from 'pages/404'
import ArchivePage from 'pages/archive'
import NoteDetailPage from 'pages/detail'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate replace to="404" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
