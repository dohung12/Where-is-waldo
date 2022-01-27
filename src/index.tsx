import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './routes/Homepage'
import Main from './routes/Main'
import Leaderboard from './routes/Leaderboard'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
