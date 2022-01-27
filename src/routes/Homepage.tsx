import React from 'react'

import { Link, Outlet } from 'react-router-dom'

import level1 from '../img/level/waldo-level-1.jpeg'
import level2 from '../img/level/waldo-level-2.jpeg'
import level3 from '../img/level/waldo-level-3.jpeg'
import styled from 'styled-components'

const ImgContainer = styled.div`
  img {
    width: 300px;
  }
`

const Homepage = () => {
  const level = [
    { id: 'waldo-level-1', url: level1 },
    { id: 'waldo-level-2', url: level2 },
    { id: 'waldo-level-3', url: level3 },
  ]
  return (
    <div>
      <h1>Hello from Homepage</h1>
      {level.map((level) => {
        const { id, url } = level
        return (
          <Link to={`/main/${id}`} key={id}>
            <ImgContainer>
              <img src={url} alt={id} />
              <h3>{id}</h3>
            </ImgContainer>
          </Link>
        )
      })}
    </div>
  )
}

export default Homepage
