import React from 'react'

import { Link } from 'react-router-dom'

import level1 from '../img/level/waldo-level-1.jpeg'
import level2 from '../img/level/waldo-level-2.jpeg'
import level3 from '../img/level/waldo-level-3.jpeg'
import styled from 'styled-components'

import WALDO_IMG from '../img/icons/WALDO.jpg'

const ImgContainer = styled.div`
  background-color: #fef2f2;
  padding: 1rem;
  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  img {
    width: 600px;
    height: 400px;
    object-fit: none;
  }
  h3 {
    color: #ef4444;
  }
`
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  h1 {
    color: #ef4444;
    text-transform: uppercase;
  }
  img {
    width: 40px;
  }
`

const LevelContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  background-color: #fee2e2;
`

const Homepage = () => {
  const level = [
    { id: 'waldo-level-1', url: level1, name: 'level 1' },
    { id: 'waldo-level-2', url: level2, name: 'level 2' },
    { id: 'waldo-level-3', url: level3, name: 'level 3' },
  ]
  return (
    <section>
      <StyledHeader>
        <h1>Where's waldo</h1>
        <img src={WALDO_IMG} alt='waldo' />
      </StyledHeader>
      <LevelContainer>
        {level.map((level) => {
          const { id, url, name } = level
          return (
            <Link to={`/main/${id}`} key={id}>
              <ImgContainer>
                <img src={url} alt={id} />
                <h3>{name}</h3>
              </ImgContainer>
            </Link>
          )
        })}
      </LevelContainer>
    </section>
  )
}

export default Homepage
