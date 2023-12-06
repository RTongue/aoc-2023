import { getInput } from '../utils/getInput'
import { Race, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 6', () => {
  let input = `Time:        56     71     79     99
  Distance:   334   1135   1350   2430`
  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getInput('https://adventofcode.com/2023/day/6/input')
    }
    return input
  }
  const exampleInput = `Time:      7  15   30
  Distance:  9  40  200`

  describe('first puzzle', () => {
    it('processes the example input', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(0)
    })

    it('processes the first puzzle input', async () => {
      const input = await actualInput()
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(0)
    })

    it('gets if pressing the button for given seconds will beat the record', () => {
      const race = new Race(7, 9)
      expect(race.getWillWin(0)).toBe(false)
      expect(race.getWillWin(1)).toBe(false)
      expect(race.getWillWin(2)).toBe(true)
      expect(race.getWillWin(3)).toBe(true)
      expect(race.getWillWin(4)).toBe(true)
      expect(race.getWillWin(5)).toBe(true)
      expect(race.getWillWin(6)).toBe(false)
      expect(race.getWillWin(7)).toBe(false)
    })

    it('gets the number of ways to win for race 1', () => {
      const race = new Race(7, 9)
      expect(race.numWaysToBeatRecord()).toBe(4)
    })

    it.only('gets the number of ways to win for race 2', () => {
      const race = new Race(15, 40)
      expect(race.numWaysToBeatRecord()).toBe(8)
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