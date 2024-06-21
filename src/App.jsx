import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import FeedListPage from './pages/FeedListPage/FeedListPage'
import IndividualFeedPage from './pages/IndividualFeedPage/IndividualFeedPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import AnswerPageContainer from './pages/AnswerPage/AnswerPageContainer'
import { ToastContextProvider } from './contexts/toastContextProvider'
import MainLayout from './components/layouts/MainLayout'

function App() {
  return (
    <ToastContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="list" element={<FeedListPage />} />
            <Route path="post">
              <Route path=":feedId" element={<IndividualFeedPage />} />
              <Route path=":feedId/answer" element={<AnswerPageContainer />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastContextProvider>
  )
}

export default App
