import React from 'react'
import './App.css'

import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Homepage from './routes/Homepage'
import Main from './routes/Main'
import Leaderboard from './routes/Leaderboard'
import Error from './routes/Error'
import GamePage from './routes/GamePage'

import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase-config'

function App() {
  initializeApp(firebaseConfig)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/main' element={<Main />}>
          <Route path=':id' element={<GamePage />}></Route>
        </Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
