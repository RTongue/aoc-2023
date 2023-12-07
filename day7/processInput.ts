const cardValueMap = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

export class Hand {
  type: number
  handStr: string
  bid: number

  constructor(line: string) {
    const [handStr, bid] = line.split(' ').map(s => s.trim())
    this.handStr = handStr
    this.bid = Number(bid)
    this.type = this.getType(handStr)
  }

  getType(handStr: string): number {
    const cardCounts: number[] = new Array(cardValueMap.length)
      .fill(0)
    
    for (const char of handStr.split('')) {
      const cardValue = cardValueMap.indexOf(char)
      if (cardValue === -1) {
        throw new Error(`found invalid card value ${char}`)
      }
      // console.log('char', char, 'cardValue', cardValue)
      cardCounts[cardValue]++
    }
    // console.log(cardCounts)
    
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

  compare(otherHand: Hand): number {
    if (this.type !== otherHand.type) {
      return this.type - otherHand.type
    }

    for (let i = 0; i < this.handStr.length; i++) {
      const handCardValue = cardValueMap.indexOf(this.handStr[i])
      const otherHandCardValue = cardValueMap.indexOf(otherHand.handStr[i])
      return handCardValue - otherHandCardValue
    }
    return 0
  }
}

export function compareHands(firstHand: Hand, secondHand: Hand) {
  if (firstHand.type !== secondHand.type) {
    return firstHand.type > secondHand.type ? 1 : -1
  }

  for (let i = 0; i < firstHand.handStr.length; i++) {
    const handCardValue = cardValueMap.indexOf(firstHand.handStr[i])
    const otherHandCardValue = cardValueMap.indexOf(secondHand.handStr[i])
    return handCardValue > otherHandCardValue ? 1 : -1
  }
  return 0
}

export function processFirstPuzzle(input: string): number {
  return input.split('\n')
    .filter(s => s.trim(). length > 0)
    .map(s => new Hand(s.trim()))
    .sort(compareHands)
    .reduce((accum, hand, i) => {
      const rank = i + 1
      accum += hand.bid * rank
      return accum
    }, 0)
}

export function processSecondPuzzle(input: string): number {
  return 0
}
