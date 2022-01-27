import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import level1 from '../img/level/level1.png'
import level2 from '../img/level/level2.jpeg'
import level3 from '../img/level/level3.jpeg'

import styled from 'styled-components'

const ImgContainer = styled.div`
  img {
    width: 300px;
  }
`

const Main = () => {
  const level = [
    { id: 'level1', url: level1 },
    { id: 'level2', url: level2 },
    { id: 'level3', url: level3 },
  ]
  return (
    <div>
      <h1>Hello from main</h1>
      {level.map((level) => {
        const { id, url } = level
        return (
          <Link to={`/main/${id}`} key={id}>
            <ImgContainer>
              <img src={url} alt={id} />
            </ImgContainer>
          </Link>
        )
      })}
    </div>
  )
}

export default Main
