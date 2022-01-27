import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

import styled from 'styled-components'
import { coord, charType } from '../interface/interface'

const StyledDiv = styled.div`
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

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
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;

  button {
    &:hover {
      background-color: #fef2f2;
    }

    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 16px;
    img {
      width: 25px;
      object-fit: contain;
    }
  }
`

const HeaderImgContainer = styled.div`
  display: flex;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`

const GamePage = () => {
  const param = useParams()
  const id = param.id
  const imgSrc = require(`../img/level/${id}.jpeg`)

  // set state
  const [clickCoord, setClickCoord] = useState<coord | null>(null)
  const [imgCoord, setImgCoord] = useState<coord | null>(null)
  const [dropdownCoord, setDropdownCoord] = useState<coord | null>(null)
  const [charData, setCharData] = useState<charType[]>([])

  const handleImgClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (imgCoord) {
      const x = e.pageX - imgCoord.x
      const y = e.pageY - imgCoord.y
      // coord of mouse click relative to img position
      setClickCoord({ x, y })
      setDropdownCoord({ x: e.pageX, y: e.pageY })
      console.log(x, y)
    }
  }

  const fetchData = async () => {
    // get character data from firestore
    const db = getFirestore()
    if (id) {
      const querySnapshot = await getDocs(collection(db, id))
      const newCharData: charType[] = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        const { x, y, name } = doc.data()
        newCharData.push({ x, y, name, selected: false })
      })

      setCharData(newCharData)
    }
  }

  const closeDropdown = () => {
    setDropdownCoord(null)
  }

  useEffect(() => {
    const data = document.querySelector('#img')?.getBoundingClientRect()
    if (data) {
      setImgCoord({ x: data.x, y: data.y })
    }

    fetchData()
    console.log(charData)
  }, [])

  return (
    <StyledDiv
      onClick={() => {
        closeDropdown()
      }}
    >
      <header>
        <HeaderImgContainer>
          {charData.map((char) => {
            const imgSrc = require(`../img/icons/${char.name}.jpg`)
            return (
              <div key={char.name}>
                <img src={imgSrc} alt={char.name} />
                <h5>{char.name}</h5>
              </div>
            )
          })}
        </HeaderImgContainer>
        <Link to='/'>Back to homepage</Link>
      </header>
      <div>
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
            {charData.map((char) => {
              const imgSrc = require(`../img/icons/${char.name}.jpg`)
              return (
                <button key={char.name} value={char.name}>
                  <img src={imgSrc} alt={char.name} />
                  <p>{char.name}</p>
                </button>
              )
            })}
          </DropdownElement>
        )}
      </div>
    </StyledDiv>
  )
}

export default GamePage
