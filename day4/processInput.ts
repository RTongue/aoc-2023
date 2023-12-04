import chalk from 'chalk'

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
    // this.debug()
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
    const [, numString] = cardNumString.split(' ')
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

  debug = () => {
    if (Array.from(this.winningNumbers).some(n => typeof n !== 'number')) {
      console.log('Anomoly in winning numbers', this.cardNumber)
    }

    if (Array.from(this.ownersNumbers).some(n => typeof n !== 'number')) {
      console.log('Anomoly in owners numbers', this.cardNumber)
    }

    let matches = 0

    for (const num of this.ownersNumbers) {
      if (this.hasMatch(num)) {
        matches++
        this.line = this.line.replaceAll(String(num), chalk.yellow(String(num)))
      }
    }
    console.log(this.line, 'matches', matches)
    // console.log('card', this)
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

export function processSecondPuzzle(input: string): number {
  return 0
}


