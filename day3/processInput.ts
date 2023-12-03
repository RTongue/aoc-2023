import { highlightChosenNums } from './debug'

export const isNum = (char: string) => !isNaN(Number(char))

export const isSymbol = (char: string) => !isNum(char) &&
  char !== '.' && 
  char !== ' ' && 
  char !== undefined && 
  char !== null

export const isGear = (char: string) => char === '*'

export function isSymbolAdjacent(schematicGrid: string[][], rowIndex: number, colIndex: number) {
  let startRow = rowIndex - 1
  let startCol = colIndex - 1
  
  for (let i = startRow; i < rowIndex + 2; i++) {
    if (i < 0 || i > schematicGrid.length) continue
    const row = schematicGrid[i]
    if (row === undefined) continue

    for (let j = startCol; j < colIndex + 2; j++) {
      if (j < 0 || j > row.length) continue
      const cell = row[j]
      if (isSymbol(cell)) {
        return true
      }
    }
  }

  return false
}

function getAdjacentNums(
  schematicGrid: string[][], 
  rowIndex: number, 
  colIndex: number
): NumberObj[] {
  const numberObjList: NumberObj[] = []

  let startRow = rowIndex - 1
  let startCol = colIndex - 1
  
  for (let i = startRow; i < rowIndex + 2; i++) {
    if (i < 0 || i > schematicGrid.length) continue
    const row = schematicGrid[i]
    if (row === undefined) continue

    for (let j = startCol; j < colIndex + 2; j++) {
      if (j < 0 || j > row.length) continue
      const cell = row[j]
      if (isNum(cell)) {
        const numObj = findNum(row, i, j)

        if (
          numberObjList.find(n => n.rowIndex === numObj.rowIndex &&
            n.startIndex === numObj.startIndex &&
            n.endIndex === numObj.endIndex &&
            n.num === numObj.num) === undefined
        ) {
          numberObjList.push(numObj)
        }
      }
    }
  }

  return numberObjList
}

export type NumberObj = {
  rowIndex: number
  startIndex: number
  endIndex: number
  num: number
}

export function findNum(
  row: string[], 
  rowIndex: number, 
  colIndex: number
): NumberObj {
  let startIndex = colIndex
  let endIndex = colIndex
  // look backwards from start index
  for (let i = colIndex; i > -1; i--) {
    if (isNum(row[i])) {
      startIndex = i
    } else {
      break
    }
  }
  
  // look forwards from end index
  for (let i = colIndex; i < row.length; i++) {
    if (isNum(row[i])) {
      endIndex = i
    } else {
      break
    }
  }

  // get number
  const num = Number(row.join('').slice(startIndex, endIndex + 1))

  return {
    rowIndex,
    startIndex,
    endIndex,
    num
  }
}

export function processInputPartOne(input: string): number {
  const schematicGrid: string[][] = input.trim().split('\n')
    .map(row => row.trim().split(''))
  const chosenNumbers: NumberObj[] = []
  let total = 0

  for (let i = 0; i < schematicGrid.length; i++) {
    const row = schematicGrid[i]

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]

      if (isNum(cell) && isSymbolAdjacent(schematicGrid, i, j)) {
        const numberObj: NumberObj = findNum(row, i, j)
        chosenNumbers.push(numberObj)
        total += numberObj.num
        j = numberObj.endIndex
      }
    }
  }

  // DEBUG
  // highlightChosenNums(schematicGrid, chosenNumbers, [])

  return total
}

export function processInputPartTwo(input: string): number {
  const schematicGrid: string[][] = input.trim().split('\n')
    .map(row => row.trim().split(''))
  const gearAdjacentNums: NumberObj[][] = []
  
  for (let i = 0; i < schematicGrid.length; i++) {
    const row = schematicGrid[i]

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]

      if (isGear(cell)) {
        const numberObjList: NumberObj[] = getAdjacentNums(schematicGrid, i, j)
        gearAdjacentNums.push(numberObjList)
      }
    }
  }  

  return gearAdjacentNums.reduce((accum, nums) => {
    if (nums.length === 2) {
      accum += nums[0].num * nums[1].num
    }
    return accum
  }, 0)
}
