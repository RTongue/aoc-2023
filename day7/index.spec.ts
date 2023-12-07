import { getInput } from '../utils/getInput'
import { Hand, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 7', () => {
  let input = ''

  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getInput('https://adventofcode.com/2023/day/7/input')
    }
    return input
  }

  const exampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

  describe('first puzzle', () => {
    it('computes the hand type for three of a kind', () => {
      const hand = new Hand('T55J5')
      expect(hand.type).toEqual(3)
    })

    it('computes the hand type for two of a kind', () => {
      const hand = new Hand('32T3K')
      expect(hand.type).toEqual(1)
    })

    it('computes the hand type for five of a kind', () => {
      const hand = new Hand('AAAAA')
      expect(hand.type).toEqual(6)
    })

    it('computes the hand type for four of a kind', () => {
      const hand = new Hand('AA8AA')
      expect(hand.type).toEqual(5)
    })

    it('computes the hand type for a full house', () => {
      const hand = new Hand('23332')
      expect(hand.type).toEqual(4)
    })

    it('processes the example input for the first puzzle', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })
  })

  describe('second puzzle', () => {
    it('processes the example input for the second puzzle', () => {
      const answer = processSecondPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })
  })

})
