import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import QuestionListPage from './pages/QuestionListPage/QuestionListPage'
import IndividualFeedPage from './pages/IndividualFeedPage/IndividualFeedPage'
import AnswerPage from './pages/AnswerPage/AnswerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="list" element={<QuestionListPage />} />
        <Route path="post">
          <Route path=":feedId" element={<IndividualFeedPage />} />
          <Route path=":feedId/answer" element={<AnswerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
