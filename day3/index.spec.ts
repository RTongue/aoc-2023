import { getInput } from '../utils/getInput'
import { findNum, isNum, isSymbol, isSymbolAdjacent, processInput } from './processInput'

describe('Day 3', () => {
  it('checks if a character is a number', () => {
    const numChar = '3'
    const numResult = isNum(numChar)
    expect(numResult).toBe(true)

    const periodChar = '.'
    const periodResult = isNum(periodChar)
    expect(periodResult).toBe(false)

    const symbolChar = '*'
    const symbolResult = isNum(symbolChar)
    expect(symbolResult).toBe(false)
  })

  it('checks if a character is a symbol', () => {
    const numChar = '3'
    const numResult = isSymbol(numChar)
    expect(numResult).toBe(false)

    const periodChar = '.'
    const periodResult = isSymbol(periodChar)
    expect(periodResult).toBe(false)

    const symbolChar = '*'
    const symbolResult = isSymbol(symbolChar)
    expect(symbolResult).toBe(true)
  })

  it('determines if a given cell is adjacent to a symbol', () => {
    const input = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'
    const schematicGrid: string[][] = input.split('\n')
      .map(row => row.split(''))
    
    const answerA = isSymbolAdjacent(schematicGrid, 2, 2)
    expect(answerA).toBe(true)

    const answerB = isSymbolAdjacent(schematicGrid, 0, 2)
    expect(answerB).toBe(true)

    const answerC = isSymbolAdjacent(schematicGrid, 5, 8)
    expect(answerC).toBe(false)

    const answerD = isSymbolAdjacent(schematicGrid, 4, 2)
    expect(answerD).toBe(true)
  })

  it('finds the number in the first row', () => {
    const row = '467..114..'.split('')
    const numberObj = findNum(row, 2)
    expect(numberObj).toEqual({
      startIndex: 0,
      endIndex: 2,
      num: 467
    })
  })

  it('finds the numbers in the third row', () => {
    const row = '..35..633.'.split('')
    const firstNumberObj = findNum(row, 3)
    expect(firstNumberObj).toEqual({
      startIndex: 2,
      endIndex: 3,
      num: 35
    })

    const secondNumberObj = findNum(row, 6)
    expect(secondNumberObj).toEqual({
      startIndex: 6,
      endIndex: 8,
      num: 633
    })
  })

  it ('processes the example input', () => {
    const input = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'
    const answer = processInput(input)
    expect(answer).toEqual(4361)
  })

  it('processes the input', async () => {
    const input = await getInput('https://adventofcode.com/2023/day/3/input')
    const answer = processInput(input)
    expect(answer).toEqual(531677)
  })
})