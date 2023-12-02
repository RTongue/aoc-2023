import { getInput, processInput } from './processInput.ts'

describe('Day 1', () => {
  it('twothree', () => {
    const input = 'twothree'
    const answer = processInput(input)
    expect(answer).toEqual(23)
  })

  it('37', () => {
    const input = '37'
    const answer = processInput(input)
    expect(answer).toEqual(37)
  })

  it('two1nine', () => {
    const input = 'two1nine'
    const answer = processInput(input)
    expect(answer).toEqual(29)
  })

  it('eightwothree', () => {
    const input = 'eightwothree'
    const answer = processInput(input)
    expect(answer).toEqual(83)
  })

  it('xtwone3four', () => {
    const input = 'xtwone3four'
    const answer = processInput(input)
    expect(answer).toEqual(24)
  })

  it('4nineeightseven2', () => {
    const input = '4nineeightseven2'
    const answer = processInput(input)
    expect(answer).toEqual(42)
  })

  it('zoneight234', () => {
    const input = 'zoneight234'
    const answer = processInput(input)
    expect(answer).toEqual(14)
  })

  it('7pqrstsixteen', () => {
    const input = '7pqrstsixteen'
    const answer = processInput(input)
    expect(answer).toEqual(76)
  })

  it('processes the input file', async () => {
    const input = await getInput('input.txt')
    const answer = processInput(input)
    expect(answer).toEqual(54875)
  })
})