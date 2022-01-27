export interface coord {
  x: number
  y: number
}

export type validCharName = 'ODLAW' | 'WALDO' | 'WENDA' | 'WIZARD'

export interface charType {
  name: validCharName
  x: number
  y: number
  selected: boolean
}
