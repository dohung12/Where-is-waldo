import React from 'react'
import { useParams } from 'react-router-dom'

const GamePage = () => {
  const param = useParams()
  console.log(param)
  return <div>Hello form gamepage </div>
}

export default GamePage
