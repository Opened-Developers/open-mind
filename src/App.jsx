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
import getFeedQuestions from './api/getFeedQuestions'

function App() {
  const [profile, setProfile] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)
  const LIMIT = 10
  const [offset, setOffset] = useState(0)
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [next, setNext] = useState(null)

  const loadProfile = useCallback(async (id) => {
    let response
    try {
      response = await getProfileById(id)
      setProfile(response)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error)
    }
    return null
  }, [])

  const handleLoadNewQuestions = useCallback(async (feedId) => {
    let response
    try {
      response = await getFeedQuestions({
        feedId,
        offset: 0,
        limit: LIMIT,
      })
      setQuestions(response.results)
      setQuestionCount(response.count)
      setOffset(response.results.length)
      setNext(response.next)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error)
    }
    return null
  }, [])

  const handleLoadMoreQuestions = useCallback(
    async (feedId) => {
      let response
      try {
        response = await getFeedQuestions({
          feedId,
          offset,
          limit: LIMIT,
        })
        if (offset === 0) {
          setQuestions(response.results)
        } else {
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            ...response.results,
          ])
        }
        setQuestionCount(response.count)
        setOffset((prevOffset) => prevOffset + response.results.length)
        setNext(response.next)
        setErrorInfo(null)
      } catch (error) {
        setErrorInfo(error)
      }
    },
    [offset]
  )

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
                    onLoadMore={handleLoadMoreQuestions}
                    onLoadNew={handleLoadNewQuestions}
                    offset={offset}
                    next={next}
                    questions={questions}
                    questionCount={questionCount}
                    errorInfo={errorInfo}
                    setErrorInfo={setErrorInfo}
                  />
                }
              />
              <Route
                path=":feedId/answer"
                element={
                  <AnswerPageContainer
                    loadProfile={loadProfile}
                    profile={profile}
                    onLoadMore={handleLoadMoreQuestions}
                    onLoadNew={handleLoadNewQuestions}
                    offset={offset}
                    next={next}
                    questions={questions}
                    questionCount={questionCount}
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
