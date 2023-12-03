import { getInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 2', () => {
  describe('first puzzle', () => {
    it('processes the first puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/1/input')
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(input)
    })
  })

  describe('second puzzle', () => {
    it('processes the second puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/1/input')
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(input)
    })
  })
})