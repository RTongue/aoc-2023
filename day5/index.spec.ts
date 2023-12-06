import { getInput } from '../utils/getInput'
import { Almanac, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 5', () => {
  let input = ''
  const actualInput = async (): Promise<string> => {
    if (input === '') {
      input = await getInput('https://adventofcode.com/2023/day/5/input')
    }
    return input
  }
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
      const input = await actualInput()
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

    it('gets the list of seeds for the example input', () => {
      const almanac = new Almanac(exampleInput)
      expect(almanac.seeds).toStrictEqual(new Set([
        79, 14, 55, 13
      ]))
    })

    it('parses the source destination map', () => {
      const almanac = new Almanac(exampleInput)
      expect(almanac.conversionMap.seed).toBeTruthy()
      expect(almanac.conversionMap.seed.convert(79)).toEqual(81)
      expect(almanac.conversionMap.seed.convert(14)).toEqual(14)
      expect(almanac.conversionMap.seed.convert(55)).toEqual(57)
      expect(almanac.conversionMap.seed.convert(13)).toEqual(13)
    })

    it.only('processes the exmple puzzle input', () => {
      const answer = processFirstPuzzle(exampleInput)
      expect(answer).toEqual(35)
    })

    it('processes the first puzzle input', async () => {
      const input = await actualInput()
      const answer = processFirstPuzzle(input)
      expect(answer).toEqual(251346198)
    })
  })

  describe('second puzzle', () => {
    it('gets the seed ranges', () => {
      const almanac = new Almanac(exampleInput)
      expect(almanac.seedRanges.length).toBe(2)
      expect(almanac.seedRanges[0].start).toBe(79)
      expect(almanac.seedRanges[0].range).toBe(14)
      expect(almanac.seedRanges[1].start).toBe(55)
      expect(almanac.seedRanges[1].range).toBe(13)
    })

    it('processes the second puzzle example', () => {
      const answer = processSecondPuzzle(exampleInput)
      expect(answer).toEqual(46)
    })

    it('gets the correct seed ranges for the actual input', async () => {
      const input = await actualInput()
      const almanac = new Almanac(input)
      expect(almanac.seedRanges.length).toBe(10)
      expect(almanac.seedRanges.length).toBe(almanac.seeds.size / 2)
      expect(almanac.seedRanges[0].start).toBe(41218238)
      expect(almanac.seedRanges[0].range).toBe(421491713)
      expect(almanac.seedRanges[1].start).toBe(1255413673)
      expect(almanac.seedRanges[1].range).toBe(350530906)
      expect(almanac.seedRanges[2].start).toBe(944138913)
      expect(almanac.seedRanges[2].range).toBe(251104806)

      expect(almanac.seedRanges[3].start).toBe(481818804)
      expect(almanac.seedRanges[3].range).toBe(233571979)

      expect(almanac.seedRanges[4].start).toBe(2906248740)
      expect(almanac.seedRanges[4].range).toBe(266447632)

      expect(almanac.seedRanges[5].start).toBe(3454130719)
      expect(almanac.seedRanges[5].range).toBe(50644329)

      expect(almanac.seedRanges[6].start).toBe(1920342932)
      expect(almanac.seedRanges[6].range).toBe(127779721)

      expect(almanac.seedRanges[7].start).toBe(2109326496)
      expect(almanac.seedRanges[7].range).toBe(538709762)

      expect(almanac.seedRanges[8].start).toBe(3579244700)
      expect(almanac.seedRanges[8].range).toBe(267233350)

      expect(almanac.seedRanges[9].start).toBe(4173137165)
      expect(almanac.seedRanges[9].range).toBe(60179884)
    })

    it('check for overlap in ranges', async () => {
      const input = await actualInput()
      const almanac = new Almanac(input)
      const sortedRanges = almanac.seedRanges.sort((a, b) => {
        return a.start - b.start
      })
      console.log(sortedRanges)

      const endSortedRanges = almanac.seedRanges.sort((a, b) => {
        return a.end - b.end
      })
      console.log(endSortedRanges)
    })

    it('calculate total seeds', () => {
      
    })

    it.skip('processes the second puzzle input', async () => {
      const input = await actualInput()
      const answer = processSecondPuzzle(input)
      expect(answer).toEqual(72263011)
    })
  })
})
