export const isNum = (char: string) => !isNaN(Number(char))

export const isSymbol = (char: string) => !isNum(char) && char !== '.'

export function isSymbolAdjacent(schematicGrid: string[][], rowIndex: number, colIndex: number) {
  let startRow = rowIndex - 1
  let startCol = colIndex - 1
  
  for (let i = startRow; i < rowIndex + 2; i++) {
    const row = schematicGrid[i]
    if (row === undefined) continue

    for (let j = startCol; j < colIndex + 2; j++) {
      const cell = row[j]
      if (isSymbol(cell)) return true
    }
  }

  return false
}

type NumberObj = {
  startIndex: number
  endIndex: number
  num: number
}

export function findNum(row: string[], colIndex: number): NumberObj {
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
    startIndex,
    endIndex,
    num
  }
}

export function processInput(input: string): number {
  const schematicGrid: string[][] = input.trim().split('\n')
    .map(row => row.trim().split(''))
  
  let total = 0

  for (let i = 0; i < schematicGrid.length; i++) {
    const row = schematicGrid[i]

    for (let j = 0; j < schematicGrid.length; j++) {
      const cell = row[j]

      if (isNum(cell) && isSymbolAdjacent(schematicGrid, i, j)) {
        const numberObj: NumberObj = findNum(row, j)
        total += numberObj.num
        j = numberObj.endIndex
      }
    }
  }

  return total
}