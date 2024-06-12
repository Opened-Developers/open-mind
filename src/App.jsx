import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import FeedListPage from './pages/FeedListPage/FeedListPage'
import QuestionFeedPage from './pages/QuestionFeedPage/QuestionFeedPage'
import AnswerFeedPage from './pages/AnswerFeedPage/AnswerFeedPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="list" element={<FeedListPage />} />
        <Route path="post">
          <Route path=":feedId" element={<QuestionFeedPage />}>
            <Route path="answer" element={<AnswerFeedPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
