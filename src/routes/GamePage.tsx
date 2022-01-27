import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

import styled from 'styled-components'
import { coord, charType } from '../interface/interface'
import { checkClick } from '../GameLogic/checkClick'

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

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  h5 {
    color: #ef4444;
  }

  .inactive {
    img {
      filter: grayscale(10);
    }
    h5 {
      color: grey;
      text-decoration: line-through;
    }
  }
`

const DisplayWin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  h1 {
    padding: 1rem 2rem;
    color: #ef4444;
    font-size: 72px;
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
  const [errorAllowance, setErrorAllowance] = useState(0)

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
    // get data of characters needed to be found
    if (id) {
      const querySnapshot = await getDocs(collection(db, id))
      const newCharData: charType[] = []
      querySnapshot.forEach((doc) => {
        const { x, y, name } = doc.data()
        newCharData.push({ x, y, name, selected: false })
      })

      setCharData(newCharData)
    }
    // get error allowance for finding character
    const docRef = doc(db, 'error-allowance', 'EA')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { errorAllowance } = docSnap.data()
      setErrorAllowance(errorAllowance)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  const closeDropdown = () => {
    setDropdownCoord(null)
  }

  const handleSelectChar = (char: charType) => {
    closeDropdown()
    if (clickCoord) {
      const result = checkClick(
        clickCoord,
        { x: char.x, y: char.y },
        errorAllowance
      )
      if (result) {
        const newCharData = charData.map((character) => {
          if (character.name === char.name) {
            character.selected = !character.selected
          }
          return character
        })
        setCharData(newCharData)
      }
    }
  }

  const checkWin = () => {
    return charData.every((char) => {
      return char.selected === true
    })
  }

  useEffect(() => {
    const data = document.querySelector('#img')?.getBoundingClientRect()
    if (data) {
      setImgCoord({ x: data.x, y: data.y })
    }

    fetchData()
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
            const inactive = char.selected ? 'inactive' : ''
            return (
              <div key={char.name} className={inactive}>
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
        {!checkWin() && dropdownCoord && (
          <DropdownElement
            style={{ left: dropdownCoord.x, top: dropdownCoord.y }}
          >
            {charData.map((char) => {
              const imgSrc = require(`../img/icons/${char.name}.jpg`)
              return (
                <button
                  key={char.name}
                  value={char.name}
                  onClick={() => handleSelectChar(char)}
                >
                  <img src={imgSrc} alt={char.name} />
                  <p>{char.name}</p>
                </button>
              )
            })}
          </DropdownElement>
        )}
      </div>
      {checkWin() && (
        <DisplayWin>
          <h1>You are win</h1>
        </DisplayWin>
      )}
    </StyledDiv>
  )
}

export default GamePage
