const cardValueMap = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

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
    let numWildCards = 0
    
    for (const char of handStr.split('')) {
      if (char === 'J') numWildCards++
      const cardValue = cardValueMap.indexOf(char)
      if (cardValue === -1) {
        throw new Error(`found invalid card value ${char}`)
      }
      cardCounts[cardValue]++
    }

    if (numWildCards > 0) {
      cardCounts[0] = 0
      let highestCount = 0
      let highestCountIndex = 0
      for (let i = 0; i < cardCounts.length; i++) {
        const count = cardCounts[i]
        if (count > highestCount) {
          highestCount = count
          highestCountIndex = i
        }
      }

      cardCounts[highestCountIndex] += numWildCards
    }
    
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

export function compareHands(firstHand: Hand, secondHand: Hand) {
  if (firstHand.type !== secondHand.type) {
    return firstHand.type - secondHand.type
  }

  for (let i = 0; i < firstHand.handStr.length; i++) {
    const handCardValue = cardValueMap.indexOf(firstHand.handStr[i])
    const otherHandCardValue = cardValueMap.indexOf(secondHand.handStr[i])
    if (handCardValue !== otherHandCardValue) {
      return handCardValue - otherHandCardValue
    }
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
