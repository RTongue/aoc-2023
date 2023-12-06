class SeedRange {
  start: number
  end: number
  range: number

  constructor(start: number, range: number) {
    this.start = start
    this.end = start + range - 1
    this.range = range
  }

  overlap(seedRange: SeedRange) {
    return (this.start >= seedRange.start && this.start <= seedRange.end) ||
      (this.end >= seedRange.start && this.end <= seedRange.end)
  }
}

class Range {
  destStart: number
  sourceStart: number
  range: number
  difference: number

  constructor(
    destStart: number,
    sourceStart: number,
    range: number
  ) {
    this.destStart = destStart
    this.sourceStart = sourceStart
    this.range = range
    this.difference = sourceStart - destStart
  }

  numInRange(num: number): boolean {
    return num >= this.sourceStart && num <= this.sourceStart + this.range
  }

  getDest(num: number): number {
    if (this.numInRange(num)) {
      return num - this.difference
    } else {
      return num
    }
  }
}

export class Conversion {
  source: string
  destination: string
  rangeList: Range[]

  constructor(source: string, destination: string) {
    this.source = source
    this.destination = destination
    this.rangeList = []
  }

  convert(num: number): number {
    for (const range of this.rangeList) {
      if (range.numInRange(num)) {
        return range.getDest(num)
      }
    }
    return num
  }
}

export class Almanac {
  seeds: Set<number>
  seedRanges: SeedRange[]
  // Conversions indexed by source, i.e. { seed: { source: 'seed', destination: 'soil', rangeList: [Range] } }
  conversionMap: Record<string, Conversion>

  constructor(almanacString: string) {
    this.parse(almanacString)
  }

  parse(almanacString: string): void {
    const lines: string[] = almanacString.split('\n').map(l => l.trim())
    const firstLine = lines.shift()
    if (firstLine === undefined) throw new Error('No seeds in almanac')
    const [, seedNumString] = firstLine.split(':').map(s => s.trim())
    const seedNums = seedNumString.split(' ').map(Number)
    this.seeds = new Set(seedNums)
    this.seedRanges = seedNums.reduce((accum, n, i, arr) => {
      if (i % 2 === 0) {
        const seedRange = new SeedRange(n, arr[i + 1])
        accum.push(seedRange)
      }
      return accum
    }, [] as SeedRange[])
    this.conversionMap = {}

    let line = lines.shift()
    let currentConversionMap

    while (line !== undefined) {
      line = line.trim()
      if (line !== '') {
        if (line.includes('-to-')) {
          const [sourceDestStr] = line.split(' ')
            .map(s => s.trim())
          const [source, destination] = sourceDestStr.split('-to-')
            .map(s => s.trim())
          this.conversionMap[source] = new Conversion(source, destination)
          currentConversionMap = this.conversionMap[source]
        } else {
          let [destNum, sourceNum, range] = line.split(' ')
            .map(s => Number(s.trim()))
          currentConversionMap.rangeList
            .push(new Range(destNum, sourceNum, range))
        }
      }

      line = lines.shift()
    }
  }

  convert(num: number, source: string, dest: string): number {
    const sourceConversion = this.conversionMap[source]

    if (sourceConversion.source === source &&
      sourceConversion.destination === dest) {
      return sourceConversion.convert(num)
    }

    const mappedNum = sourceConversion.convert(num)

    return this.convert(
      mappedNum, 
      sourceConversion.destination, 
      dest
    )
  }
}

export function processFirstPuzzle(input: string): number {
  const almanac: Almanac = new Almanac(input)
  for (const conversion of Object.values(almanac.conversionMap)) {
    console.log(conversion)
  }
  let lowestLocation = Infinity

  for (const seed of almanac.seeds) {
    const location = almanac.convert(seed, 'seed', 'location')
    if (location < lowestLocation) lowestLocation = location
  }

  return lowestLocation
}

export function processSecondPuzzle(input: string): number {
  const almanac: Almanac = new Almanac(input)
  let lowestLocation = Infinity

  for (const seedRange of almanac.seedRanges) {
    for (let seed = seedRange.start; seed < seedRange.start + seedRange.range; seed++) {
      const location = almanac.convert(seed, 'seed', 'location')
      if (location < lowestLocation) lowestLocation = location
    }
  }

  return lowestLocation
}
