import { coord } from '../interface/interface'

export function checkClick(
  clickCoord: coord,
  charCoord: coord,
  errorAllowance: number
): boolean {
  return getDistance(clickCoord, charCoord) <= errorAllowance
}

function getDistance(coord1: coord, coord2: coord): number {
  const { x: x0, y: y0 } = coord1
  const { x: x1, y: y1 } = coord2

  const result = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
  return result
}
