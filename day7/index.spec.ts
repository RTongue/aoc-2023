import fs from 'fs'
import { getInput } from '../utils/getInput'
import { Hand, compareHands, processFirstPuzzle, processSecondPuzzle } from './processInput'

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
      const hand = new Hand('T55J5 684')
      expect(hand.type).toEqual(3)
      expect(hand.bid).toEqual(684)
    })

    it('computes the hand type for two of a kind', () => {
      const hand = new Hand('32T3K 765')
      expect(hand.type).toEqual(1)
      expect(hand.bid).toEqual(765)
    })

    it('computes the hand type for five of a kind', () => {
      const hand = new Hand('AAAAA 150')
      expect(hand.type).toEqual(6)
      expect(hand.bid).toEqual(150)
    })

    it('computes the hand type for four of a kind', () => {
      const hand = new Hand('AA8AA 2')
      expect(hand.type).toEqual(5)
      expect(hand.bid).toEqual(2)
    })

    it('computes the hand type for a full house', () => {
      const hand = new Hand('23332 14')
      expect(hand.type).toEqual(4)
      expect(hand.bid).toEqual(14)
    })

    it('compars two hands', () => {
      const hand = new Hand('23332 278')
      expect(hand.type).toEqual(4)
      expect(hand.bid).toEqual(278)
    })

    it('processes the example input for the first puzzle', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(6440)
    })

    it('processes the actual input for the first puzzle', async () => {
      const actualInputStr = await actualInput()
      const answer = processFirstPuzzle(actualInputStr)
      expect(answer).toEqual(250944226)
    })

    it('check for duplicates in input', async () => {
      const actualInputStr = await actualInput()
      const hands = actualInputStr.split('\n')
        .filter(s => s.trim(). length > 0)
        .map(s => new Hand(s.trim()))

      console.log(hands)
      
      const handsSet = new Set(hands.map(h => h.handStr))
      expect(hands.length).toEqual(handsSet.size)
      expect(hands[0].bid).toEqual(454)
      expect(hands[hands.length - 1].bid).toEqual(615)
      expect(hands.every(h => h.handStr.length === 5)).toBe(true)
    })

    it('sorting', () => {
      const exampleList = `25QT4 1
      2857T 1
      29KT8 1
      257T9 1
      2835A 1`

      const hands = exampleList.split('\n')
        .filter(s => s.trim().length > 0)
        .map(s => new Hand(s.trim()))
        .sort(compareHands)
      expect(hands[0].handStr).toEqual('257T9')
      expect(hands[1].handStr).toEqual('25QT4')
      expect(hands[2].handStr).toEqual('2835A')
      expect(hands[3].handStr).toEqual('2857T')
      expect(hands[4].handStr).toEqual('29KT8')
    })

    it('debug sorting', async () => {
      const actualInputStr = await actualInput()
      const hands = actualInputStr.split('\n')
        .filter(s => s.trim(). length > 0)
        .map(s => new Hand(s.trim()))
        .sort(compareHands)
      const sorted: string[] = []
      for (const hand of hands) {
        sorted.push(hand.handStr)
      }
      await fs.promises.writeFile('sorted.txt', sorted.join('\n'))
    })
  })

  describe('second puzzle', () => {
    it('processes the example input for the second puzzle', () => {
      const answer = processSecondPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })
  })

})
