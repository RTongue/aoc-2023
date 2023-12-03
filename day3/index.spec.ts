import chalk from 'chalk'
import { getInput } from '../utils/getInput'
import { findNum, isNum, isSymbol, isSymbolAdjacent, processInputPartOne, processInputPartTwo } from './processInput'
import { highlightChosenNums } from './debug'

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

  it('checks if + is a symbol', () => {
    const char = '+'
    const result = isSymbol(char)
    expect(result).toBe(true)
  })

  it('checks if space is a symbol', () => {
    const char = ' '
    const result = isSymbol(char)
    expect(result).toBe(false)
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
    const numberObj = findNum(row, 0, 2)
    expect(numberObj).toEqual({
      rowIndex: 0,
      startIndex: 0,
      endIndex: 2,
      num: 467
    })
  })

  it('finds the numbers in the third row', () => {
    const row = '..35..633.'.split('')
    const firstNumberObj = findNum(row, 0, 3)
    expect(firstNumberObj).toEqual({
      rowIndex: 0,
      startIndex: 2,
      endIndex: 3,
      num: 35
    })

    const secondNumberObj = findNum(row, 0, 6)
    expect(secondNumberObj).toEqual({
      rowIndex: 0,
      startIndex: 6,
      endIndex: 8,
      num: 633
    })
  })

  it('processes the example input', () => {
    const input = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'
    const answer = processInputPartOne(input)
    expect(answer).toEqual(4361)
  })

  it('processes the input', async () => {
    const input = await getInput('https://adventofcode.com/2023/day/3/input')
    const answer = processInputPartOne(input)
    expect(answer).toEqual(528799)
  })

  it('process beginning example row', () => {
    const row = '181......218.707....*....273....*..130.$273.980.........656..............517..712..578.......&.524.....@....*.....996..............*....#709'
    const answer = processInputPartOne(row)
    expect(answer).toEqual(982)
  })

  it('does not pick numbers on the beginning that are not symbol adjacent', () => {
    const input = '...........+.................421............*..........+.......661..103...............................922..752..................431.........\n181......218.707....*....273....*..130.$273.980.........656..............517..712..578.......&.524.....@....*.....996..............*....#709\n.................442.432..*....64.*......................................../..*....#.......534....*........498.............727.....434......'
    const answer = processInputPartOne(input)
  })

  it('processes end row example', () => {
    const input = '........352.......231...................340.....177..584.....922.....*....57...........................*.........*349...222...212&...433.520'
    const answer = processInputPartOne(input)
    expect(answer).toEqual(561)
  })

  describe('debug', () => {
    it.skip('logs the example input', () => {
      const input = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'
      const schematicGrid: string[][] = input.split('\n')
      .map(row => row.split(''))
      highlightChosenNums(schematicGrid, [{ 
        rowIndex: 0, 
        startIndex: 0, 
        endIndex: 2, 
        num: 467 
      }], [{ 
        rowIndex: 0, 
        startIndex: 5, 
        endIndex: 7, 
        num: 114 
      }])
    })
  })

  describe('day 2', () => {
    it('gets the gear ratio for the example input', () => {
      const input = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n'
      const answer = processInputPartTwo(input)
      expect(answer).toEqual(467835)
    })

    it('gets the gear ratio for the actual input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/3/input')
      const answer = processInputPartTwo(input)
      expect(answer).toEqual(84907174)
    })
  })
})