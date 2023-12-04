import { getInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 2', () => {
  const exCard1 = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
  const exCard2 = 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'
  const exCard3 = 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'
  const exCard4 = 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'
  const exCard5 = 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
  const exCard6 = 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
  const example = [
    exCard1,
    exCard2,
    exCard3,
    exCard4,
    exCard5,
    exCard6,
  ].join('\n')

  const inputCard2 = 'Card   2: 33 21 96 64  9 38 65 74 16 91 | 14 51 85  1 64 29 74 18 15 38 13 96 16 88 84 21 95 49  9 27 33 63 65 91 90'

  describe('first puzzle', () => {
    it('input card 2', () => {
      const answer = processFirstPuzzle(inputCard2)
      expect(answer).toEqual(512)
    })

    it('can process example card 1', () => {
      const input = exCard1
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(8)
    })

    it('can process example card 2', () => {
      const input = exCard2
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(2)
    })

    it('can process example card 3', () => {
      const input = exCard3
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(2)
    })

    it('can process example card 4', () => {
      const input = exCard4
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(1)
    })

    it('can process example card 5', () => {
      const input = exCard5
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(0)
    })

    it('can process example card 6', () => {
      const input = exCard6
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(0)
    })

    it('can process the whole example', () => {
      const input = example
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(13)
    })

    it('processes the first puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/4/input')
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(17803)
    })
  })

  describe('second puzzle', () => {
    it('can process example', () => {
      const input = example
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(30)
    })

    it.only('processes the second puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/4/input')
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(5554894)
    })
  })
})