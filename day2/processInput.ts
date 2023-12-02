interface IGame {
  id: number
  invalid: boolean
  red: number
  green: number
  blue: number
  readonly redMax: number
  readonly greenMax: number
  readonly blueMax: number
  power: () => number
  validate: (num: number, color: string) => void
}

export class Game implements IGame {
  id = 0
  invalid = false
  red = 0
  green = 0
  blue = 0
  readonly redMax = 12
  readonly greenMax = 13
  readonly blueMax = 14

  constructor(gameStr: string) {
    this.parseGame(gameStr)
  }

  validate(num: number, color: string): void {
    if (this[color] < num) {
      this[color] = num
    }
    if (!this.invalid) this.invalid = num > this[`${color}Max`]
  }

  power(): number {
    return this.red * this.green * this.blue
  }

  parseGame(gameStr: string): IGame {
    const [gameIdStr, roundsStr] = gameStr.split(':')
    const [, idStr] = gameIdStr.split(' ')
    const id = Number(idStr)
    this.id = id
  
    const rounds = roundsStr.split(';')
  
    for (const round of rounds) {
      const cubeCounts = round.split(',')
      for (const count of cubeCounts) {
        const [numStr, color] = count.trim().split(' ')
        const num = Number(numStr)
  
        this.validate(num, color)
      }
    }
  
    return this
  }

}

export function processFirstPuzzle(input: string): number {
  return input.trim().split('\n')
    .reduce((accum: number, gameStr: string) => {
      const game: IGame = new Game(gameStr)
      accum += game.invalid ? 0 : game.id
      return accum
    }, 0)
}

export function processSecondPuzzle(input: string): number {
  return input.trim().split('\n')
    .reduce((accum: number, gameStr: string) => {
      const game: IGame = new Game(gameStr)
      accum += game.power()
      return accum
    }, 0)
}