import { getInput } from '../utils/getInput'
import { Game, processFirstPuzzle, processSecondPuzzle } from './processInput'

describe('Day 2', () => {
  const game1Str = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  const game2Str = 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
  const game3Str = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
  const game4Str = 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
  const game5Str = 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'

  it('game 1 valid', () => {
    const answer = processFirstPuzzle(game1Str)
    expect(answer).toEqual(1)
  })

  it('game 2 valid', () => {
    const answer = processFirstPuzzle(game2Str)
    expect(answer).toEqual(2)
  })

  it('game 3 invalid', () => {
    const answer = processFirstPuzzle(game3Str)
    expect(answer).toEqual(0)
  })

  it('game 4 invalid', () => {
    const answer = processFirstPuzzle(game4Str)
    expect(answer).toEqual(0)
  })

  it('game 5 valid', () => {
    const answer = processFirstPuzzle(game5Str)
    expect(answer).toEqual(5)
  })

  it('calculates rows of games', () => {
    const input = [
      game1Str,
      game2Str,
      game3Str,
      game4Str,
      game5Str
    ].join('\n')
    const answer = processFirstPuzzle(input)
    expect(answer).toEqual(8)
  })

  it('processes the input for the first puzzle', async () => {
    const input = await getInput('https://adventofcode.com/2023/day/2/input')
    const answer = processFirstPuzzle(input)
    expect(answer).toEqual(2156)
  })

  it('sets the minimum cubes of each color for game 1', () => {
    const game = new Game(game1Str)
    expect(game.red).toEqual(4)
    expect(game.green).toEqual(2)
    expect(game.blue).toEqual(6)
  })

  it('computes the power for game 1', () => {
    const game = new Game(game1Str)
    expect(game.power()).toEqual(48)
  })

  it('sets the minimum cubes of each color for game 2', () => {
    const game = new Game(game2Str)
    expect(game.red).toEqual(1)
    expect(game.green).toEqual(3)
    expect(game.blue).toEqual(4)
  })

  it('computes the power for game 2', () => {
    const game = new Game(game2Str)
    expect(game.power()).toEqual(12)
  })

  it('sets the minimum cubes of each color for game 3', () => {
    const game = new Game(game3Str)
    expect(game.red).toEqual(20)
    expect(game.green).toEqual(13)
    expect(game.blue).toEqual(6)
  })

  it('computes the power for game 3', () => {
    const game = new Game(game3Str)
    expect(game.power()).toEqual(1560)
  })

  it('sets the minimum cubes of each color for game 4', () => {
    const game = new Game(game4Str)
    expect(game.red).toEqual(14)
    expect(game.green).toEqual(3)
    expect(game.blue).toEqual(15)
  })

  it('computes the power for game 4', () => {
    const game = new Game(game4Str)
    expect(game.power()).toEqual(630)
  })

  it('sets the minimum cubes of each color for game 5', () => {
    const game = new Game(game5Str)
    expect(game.red).toEqual(6)
    expect(game.green).toEqual(3)
    expect(game.blue).toEqual(2)
  })

  it('computes the power for game 5', () => {
    const game = new Game(game5Str)
    expect(game.power()).toEqual(36)
  })

  it('calculates rows of games for the second puzzle', () => {
    const input = [
      game1Str,
      game2Str,
      game3Str,
      game4Str,
      game5Str,
      ''
    ].join('\n')
    const answer = processSecondPuzzle(input)
    expect(answer).toEqual(2286)
  })

  it('processes the input for the second puzzle', async () => {
    const input = await getInput('https://adventofcode.com/2023/day/2/input')
    const answer = processSecondPuzzle(input)
    expect(answer).toEqual(66909)
  })
})