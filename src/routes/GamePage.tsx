import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'

const GamePage = () => {
  const param = useParams()

  const imgSrc = require(`../img/level/${param.id}.jpeg`)

  return (
    <div>
      Hello form gamepage {param.id}
      <img src={imgSrc} alt='' />
    </div>
  )
}

export default GamePage
