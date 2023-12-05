export class ConversionMap {
  source: string
  destination: string
  sourceRange: number[]
  destinationRange: number[]
}

export class Almanac {
  seeds: Set<number>
  // Conversion Maps indexed by source, i.e. { seed: { source: 'seed', destination: 'soi' } }
  conversionMaps: Record<string, ConversionMap>

  constructor(almanacString: string) {
    this.parse(almanacString)
  }

  parse(almanacString: string) {
    const lines: string[] = almanacString.split('\n').map(l => l.trim())
    const firstLine = lines.shift()
    if (firstLine === undefined) throw new Error('No seeds in almanac')
    const [, seedNumString] = firstLine.split(':').map(s => s.trim())
    this.seeds = new Set(seedNumString.split(' ').map(Number))

    let line = lines.shift()

    while (line) {
      line = line.trim()
      if (line !== '') {
        if (line.includes('to')) {
         const [sourceDestStr] = line.split(' ').map(s = s.trim()) 
        }
      }

      line = lines.shift()
    }
  }
}

export function processFirstPuzzle(input: string): string {
  return input
}

export function processSecondPuzzle(input: string): string {
  return input
}
