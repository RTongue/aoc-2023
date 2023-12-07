const cardValueMap = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

export class Hand {
  type: number
  handStr: string

  constructor(handStr: string) {
    this.handStr = handStr
    this.type = this.getType(handStr)
  }

  getType(handStr: string) {
    let type = 0
    const cardCounts: number[] = new Array(cardValueMap.length)
      .fill(0)
    
    for (const char of handStr.split('')) {
      const cardValue = cardValueMap.indexOf(char)
      console.log('char', char, 'cardValue', cardValue)
      cardCounts[cardValue]++
    }
    console.log(cardCounts)
    
    const filteredCounts = cardCounts.filter(n => n !== 0)
    switch (filteredCounts.length) {
      case 1:
        return 6
      case 2:
        return filteredCounts.includes(4) ? 5 : 4
      case 3:
        return filteredCounts.includes(3) ? 3 : 2
      case 4:
        return 1
      case 5:
        return 0
      default:
        throw new Error(`Too many or not enough cards: ${filteredCounts.length}`)
    }
  }
}

export function processFirstPuzzle(input: string): number {
  return 0
}

export function processSecondPuzzle(input: string): number {
  return 0
}
