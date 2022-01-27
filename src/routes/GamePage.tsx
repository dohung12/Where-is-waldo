import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from './Loading'

import styled from 'styled-components'
import { coord } from '../interface/interface'

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 90vw;
  }
`

const DropdownElement = styled.div`
  position: absolute;
  width: 200px;
  background-color: white;
  button {
    background-color: transparent;
    border: 0;
  }
`

const GamePage = () => {
  const param = useParams()
  const imgSrc = require(`../img/level/${param.id}.jpeg`)
  const [clickCoord, setClickCoord] = useState<coord | null>(null)
  const [imgCoord, setImgCoord] = useState<coord | null>(null)
  const [dropdownCoord, setDropdownCoord] = useState<coord | null>(null)

  const handleImgClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (imgCoord) {
      const x = e.pageX - imgCoord.x
      const y = e.pageY - imgCoord.y
      // coord of mouse click relative to img position
      setClickCoord({ x, y })
      setDropdownCoord({ x: e.pageX, y: e.pageY })
      console.log(x, y)
    }
  }

  useEffect(() => {
    const data = document.querySelector('#img')?.getBoundingClientRect()
    if (data) {
      setImgCoord({ x: data.x, y: data.y })
    }
  }, [])

  return (
    <StyledDiv>
      <header>
        <Link to='/'>Back to homepage</Link>
      </header>
      <div className='img-container'>
        <img
          id='img'
          src={imgSrc}
          alt=''
          onClick={(e) => {
            handleImgClick(e)
          }}
        />
        {dropdownCoord && (
          <DropdownElement
            style={{ left: dropdownCoord.x, top: dropdownCoord.y }}
          >
            <button>Hello</button>
          </DropdownElement>
        )}
      </div>
    </StyledDiv>
  )
}

export default GamePage
