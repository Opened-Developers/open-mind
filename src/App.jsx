import { useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import FeedListPage from './pages/FeedListPage/FeedListPage'
import IndividualFeedPage from './pages/IndividualFeedPage/IndividualFeedPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import AnswerPageContainer from './pages/AnswerPage/AnswerPageContainer'
import { ToastContextProvider } from './contexts/toastContextProvider'
import MainLayout from './components/layouts/MainLayout'
import getProfileById from './api/getProfileById'

function App() {
  const [profile, setProfile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const loadProfile = useCallback(async (id) => {
    let response
    try {
      response = await getProfileById(id)
      setProfile(response)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    }
    return null
  }, [])

  return (
    <ToastContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="list" element={<FeedListPage />} />
            <Route path="post">
              <Route
                path=":feedId"
                element={
                  <IndividualFeedPage
                    loadProfile={loadProfile}
                    profile={profile}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path=":feedId/answer"
                element={
                  <AnswerPageContainer
                    loadProfile={loadProfile}
                    profile={profile}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                  />
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastContextProvider>
  )
}

export default App
