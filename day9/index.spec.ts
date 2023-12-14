import { getFileInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 9', () => {
  let input = ''
  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getFileInput('../day9/input.txt')
    }
    return input
  }
  const exampleInput = `0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45`

  describe('first puzzle', () => {
    it('processes the example input', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(114)
    })

    it('processes the first puzzle input', async () => {
      const input = await actualInput()
      // console.log(input)
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(1861775706)
    })
  })

  describe('second puzzle', () => {
    it('processes the example input', () => {
      const answer = processSecondPuzzle(exampleInput)
      expect(answer).toEqual(2)
    })

    it('processes the second puzzle input', async () => {
      const input = await actualInput()
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(1082)
    })
  })
})