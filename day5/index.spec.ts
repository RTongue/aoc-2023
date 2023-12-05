import { getInput } from '../utils/getInput'
import { Almanac, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 2', () => {
  const exampleInput = `seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48
  
  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15
  
  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4
  
  water-to-light map:
  88 18 7
  18 25 70
  
  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13
  
  temperature-to-humidity map:
  0 69 1
  1 0 69
  
  humidity-to-location map:
  60 56 37
  56 93 4`

  describe('first puzzle', () => {
    it('gets the list of seeds for the actual input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/5/input')
      const almanac = new Almanac(input)
      expect(almanac.seeds).toStrictEqual(new Set([
        41218238, 
        421491713, 
        1255413673, 
        350530906, 
        944138913, 
        251104806, 
        481818804, 
        233571979, 
        2906248740, 
        266447632, 
        3454130719, 
        50644329, 
        1920342932,
        127779721, 
        2109326496, 
        538709762,
        3579244700, 
        267233350, 
        4173137165, 
        60179884
      ]))
    })

    it.only('gets the list of seeds for the example input', async () => {
      const almanac = new Almanac(exampleInput)
      expect(almanac.seeds).toStrictEqual(new Set([
        79, 14, 55, 13
      ]))
    })

    it.skip('processes the first puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/5/input')
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(input)
    })
  })

  describe('second puzzle', () => {
    it.skip('processes the second puzzle input', async () => {
      const input = await getInput('https://adventofcode.com/2023/day/5/input')
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(input)
    })
  })
})
