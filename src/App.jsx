import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import FeedListPage from './pages/FeedListPage/FeedListPage'
import IndividualFeedPage from './pages/IndividualFeedPage/IndividualFeedPage'
import IndividualFeedAnswerPage from './pages/IndividualFeedAnswerPage/IndividualFeedAnswerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="list" element={<FeedListPage />} />
        <Route path="post">
          <Route path=":feedId" element={<IndividualFeedPage />}>
            <Route path="answer" element={<IndividualFeedAnswerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
