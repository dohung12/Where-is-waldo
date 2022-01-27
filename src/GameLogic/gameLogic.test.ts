import { checkClick } from './checkClick'

it('should return true if click at exact point', () => {
  const allowance = 100
  const clickCoord = { x: 0, y: 10 }
  const charCoord = { x: 0, y: 10 }

  const result = checkClick(clickCoord, charCoord, allowance)
  expect(result).toBe(true)
})

it('should return true if distance in allowance range', () => {
  const allowance = 100
  const clickCoord = { x: 0, y: 100 }
  const charCoord = { x: 0, y: 10 }

  const result = checkClick(clickCoord, charCoord, allowance)
  expect(result).toBe(true)
})

it('should return true if distance is equals to allowance range', () => {
  const allowance = 100
  const clickCoord = { x: 0, y: 110 }
  const charCoord = { x: 0, y: 10 }

  const result = checkClick(clickCoord, charCoord, allowance)
  expect(result).toBe(true)
})
