class Node {
  key: string
  L: string
  R: string

  constructor(key: string, left: string, right: string) {
    if (key.trim().length === 0 ||
      key.trim().length > 3 ||
      left.trim().length === 0 ||
      left.trim().length > 3 ||
      right.trim().length === 0 ||
      right.trim().length > 3) {
      throw new Error(`Invalid node key: ${key}, left: ${left}, right: ${right}`)
    }
    this.key = key
    this.L = left
    this.R = right
  }
}

export class DessertMap {
  nodes: Record<string, Node>

  constructor(mapStr: string) {
    this.parseNodes(mapStr)
  }

  parseNodes = (map: string): void => {
    this.nodes = map.split('\n')
      .reduce((accum, row) => {
        const [key, leftRight] = row.trim().split(' = ')
          .map(s => s.trim())
        const [left, right] = leftRight.slice(1, 9).split(', ')
          .map(s => s.trim())
        accum[key] = new Node(key, left, right)
        return accum
      }, {})
  }
}

export const parseInput = (input: string) => {
  const [directions, mapStr] = input.split('\n\n')
    .map(s => s.trim())
  return {
    directions,
    map: new DessertMap(mapStr),
  }
}

export function processFirstPuzzle(input: string): number {
  const { directions, map } = parseInput(input)
  let startNode = map.nodes['AAA']
  const destination = 'ZZZ'
  let nextNode = startNode
  let numSteps = 0
  let directionIndex = 0
  
  while (nextNode.key !== destination) {
    const directionChar = directions[directionIndex]
    nextNode = map.nodes[nextNode[directionChar]]
    numSteps++
    directionIndex++
    if (directionIndex === directions.length) {
      directionIndex = 0
    }
  }

  return numSteps
}

const greatestCommonDenominator = (a: number, b: number) => 
  a ? greatestCommonDenominator(b % a, a) : b

const leastCommonMultiple = (a: number, b: number) => 
  a * b / greatestCommonDenominator(a, b)

export function processSecondPuzzle(input: string): number {
  const { directions, map } = parseInput(input)
  let startNodes = Object.values(map.nodes).filter(n => {
    return n.key[2] === 'A'
  })
  const destination = 'Z'
  let nextNodes = startNodes
  const numSteps = new Array(startNodes.length).fill(0)

  for (let i = 0; i < startNodes.length; i++) {
    let node = nextNodes[i]
    let steps = 0
    let directionIndex = 0

    while (node.key[2] !== destination) {
      let directionChar = directions[directionIndex]
      node = map.nodes[node[directionChar]]

      steps++
      directionIndex++
      if (directionIndex === directions.length) {
        directionIndex = 0
      }
    }

    numSteps[i] = steps
  }

  return numSteps.reduce(leastCommonMultiple)
}