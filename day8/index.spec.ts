import { getInput } from '../utils/getInput'
import { DessertMap, parseInput, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 8', () => {
  let input = ''
  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getInput('https://adventofcode.com/2023/day/8/input')
    }
    return input
  }
  const exampleInput = `RL

  AAA = (BBB, CCC)
  BBB = (DDD, EEE)
  CCC = (ZZZ, GGG)
  DDD = (DDD, DDD)
  EEE = (EEE, EEE)
  GGG = (GGG, GGG)
  ZZZ = (ZZZ, ZZZ)`

  const exampleInputTwo = `LLR

  AAA = (BBB, BBB)
  BBB = (AAA, ZZZ)
  ZZZ = (ZZZ, ZZZ)
  `

  describe('first puzzle', () => {
    it('parses the example two input', () => {
      const parsed = parseInput(exampleInputTwo)
      expect(parsed.directions).toEqual('LLR')
      expect(parsed.map.nodes['AAA'].L).toEqual('BBB')
      expect(parsed.map.nodes['AAA'].R).toEqual('BBB')
      expect(parsed.map.nodes['BBB'].L).toEqual('AAA')
      expect(parsed.map.nodes['BBB'].R).toEqual('ZZZ')
      expect(parsed.map.nodes['ZZZ'].L).toEqual('ZZZ')
      expect(parsed.map.nodes['ZZZ'].R).toEqual('ZZZ')
    })

    it('processes the example input', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(2)
    })

    it('processes the second example input', () => {
      const answer = processFirstPuzzle(exampleInputTwo)
      expect(answer).toEqual(6)
    })

    it('processes the first puzzle input', async () => {
      const input = await actualInput()
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(19199)
    })
  })

  describe('second puzzle', () => {
    const secondPuzzleExample = `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`

    it('processes the example input', () => {
      const answer = processSecondPuzzle(secondPuzzleExample)
      expect(answer).toEqual(6)
    })

    it('processes the second puzzle input', async () => {
      const input = await actualInput()
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(13663968099527)
    })
  })
})