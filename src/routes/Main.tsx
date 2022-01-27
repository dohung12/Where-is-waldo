import React from 'react'
import { Outlet } from 'react-router'

const Main = () => {
  return (
    <div>
      Hello from main
      <Outlet />
    </div>
  )
}

export default Main
