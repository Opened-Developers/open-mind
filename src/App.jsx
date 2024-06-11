import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnswerPage from './pages/AnswerPage/AnswerPage'
import IndividualFeedPage from './pages/IndividualFeedPage/IndividualFeedPage'
import MainPage from './pages/MainPage/MainPage'
import QuestionListPage from './pages/QuestionListPage/QuestionListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="list" element={<QuestionListPage />} />
        <Route path="post">
          <Route path=":feedId" element={<IndividualFeedPage />}>
            <Route path="answer" element={<AnswerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
