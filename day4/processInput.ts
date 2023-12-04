interface ICard {
  cardNumber: number
  winningNumbers: Set<number>
  ownersNumbers: Set<number>
  parseCard: (line: string) => ICard
  line: string
  hasMatch: (num: number) => boolean
}

class Card implements ICard {
  line = ''
  cardNumber = 0
  winningNumbers = new Set<number>()
  ownersNumbers = new Set<number>()

  constructor(line: string) {
    this.parseCard(line)
  }

  private mapNums = (numStr: string) => {
    return numStr.split(' ')
      .map(n => {
        if (n.trim() !== '' && typeof n === 'string') {
          return Number(n)
        }
        return -1
      })
      .filter(n => n > 0)
  }

  parseCard = (line: string): ICard => {
    this.line = line
    const [cardNumString, rest] = line.split(':')
    const numString = cardNumString.match(/\d+/)
    const cardNumber = Number(numString)
    this.cardNumber = cardNumber

    const [winningNumString, ownersNumString] = rest.split('|').map(s => s.trim())
    const winningNumbers: Set<number> = new Set(this.mapNums(winningNumString))
    this.winningNumbers = winningNumbers
    const ownersNumbers: Set<number> = new Set(this.mapNums(ownersNumString))
    this.ownersNumbers = ownersNumbers

    return this
  }

  hasMatch = (num: number) => {
    if (typeof num !== 'number') return false
    return this.winningNumbers.has(num)
  }
}

function parseCards(rows: string[]): Card[] {
  return rows.map(line => new Card(line))
}

export function processFirstPuzzle(input: string): number {
  const rows = input.trim().split('\n')
  const cards: Card[] = parseCards(rows)
  return cards.reduce((accum, card) => {
    let matches = 0
    for (const num of card.ownersNumbers) {
      if (card.hasMatch(num)) {
        matches++
      }
    }
    accum += matches > 0 ? Math.pow(2, matches - 1) : 0
    return accum
  }, 0)
}

function processCards(cards: Card[]): number[] {
  const newCardsCounts: number[] = [0]

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    if (newCardsCounts[card.cardNumber] === undefined) {
      newCardsCounts[card.cardNumber] = 1
    }
    const count = newCardsCounts[card.cardNumber]
    
    for (let times = 0; times < count; times++) {
      let matches = 0
      for (const num of card.ownersNumbers) {
        if (card.hasMatch(num)) {
          matches++
        }
      }

      const nextCardNumber = card.cardNumber + 1
      for (
        let j = nextCardNumber;
        j < nextCardNumber + matches;
        j++
      ) {
        if (newCardsCounts[j] === undefined) {
          newCardsCounts[j] = 1
        }
        newCardsCounts[j] += 1
      }
    }
  }

  return newCardsCounts
}

export function processSecondPuzzle(input: string): number {
  const rows = input.trim().split('\n')
  const cards: Card[] = parseCards(rows)
  return processCards(cards).reduce((accum, numCards) => {
    accum += numCards
    return accum
  }, 0)
}
