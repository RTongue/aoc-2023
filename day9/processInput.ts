function getNextSequencePuzzleOne(numDiffs: number[][]): number {
  let nextSeqNum = 0
  for (let i = numDiffs.length - 2; i !== -1; i--) {
    const lastDiffLine = numDiffs[i]
    const lastDiff = lastDiffLine[lastDiffLine.length - 1]
    nextSeqNum = lastDiff + nextSeqNum
  }

  return nextSeqNum
}

export function processFirstPuzzle(inputStr: string): number {
  const lines = inputStr.trim()
    .split('\n')
    .map(l => l.trim()
      .split(' ')
      .map(Number)
    )
  
  const nextNums: number[][][] = []
  for (const line of lines) {
    const differences: number[][] = [line]
    let count = 0

    while (!differences[differences.length - 1].every(n => n === 0)) {
      const nextDiffs: number[] = []
      let nextLine = differences[differences.length - 1]
      for (let i = 0, j = 1; j < nextLine.length; i++, j++) {
        const left = nextLine[i]
        const right = nextLine[j]
        nextDiffs.push(right - left)
      }
      differences.push(nextDiffs)
      count++
    }
    nextNums.push(differences)
  }

  return nextNums.reduce((accum, numDiffs) => {
    accum += getNextSequencePuzzleOne(numDiffs)
    return accum
  }, 0)
}

function getNextSequencePuzzleTwo(numDiffs: number[][]): number {
  let nextSeqNum = 0
  for (let i = numDiffs.length - 2; i !== -1; i--) {
    const lastDiffLine = numDiffs[i]
    const lastDiff = lastDiffLine[0]
    nextSeqNum = lastDiff - nextSeqNum
  }

  return nextSeqNum
}

export function processSecondPuzzle(inputStr: string): number {
  const lines = inputStr.trim()
    .split('\n')
    .map(l => l.trim()
      .split(' ')
      .map(Number)
    )
  
  const nextNums: number[][][] = []
  for (const line of lines) {
    const differences: number[][] = [line]
    let count = 0

    while (!differences[differences.length - 1].every(n => n === 0)) {
      const nextDiffs: number[] = []
      let nextLine = differences[differences.length - 1]
      for (let i = 0, j = 1; j < nextLine.length; i++, j++) {
        const left = nextLine[i]
        const right = nextLine[j]
        nextDiffs.push(right - left)
      }
      differences.push(nextDiffs)
      count++
    }
    nextNums.push(differences)
  }

  return nextNums.reduce((accum, numDiffs) => {
    accum += getNextSequencePuzzleTwo(numDiffs)
    return accum
  }, 0)
}
