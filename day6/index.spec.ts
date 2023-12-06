import { getInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 6', () => {
  let input = ''
  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getInput('https://adventofcode.com/2023/day/6/input')
    }
    return input
  }
  const exampleInput = ``

  describe('first puzzle', () => {
    it('processes the example input', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })

    it.skip('processes the first puzzle input', async () => {
      const input = await actualInput()
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(0)
    })
  })

  describe('second puzzle', () => {
    it.skip('processes the example input', () => {
      const answer = processSecondPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })

    it.skip('processes the second puzzle input', async () => {
      const input = await actualInput()
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(0)
    })
  })
})