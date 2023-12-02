import { getInput } from '../utils/getInput'
import { processInput } from './processInput'

describe('Day 2', () => {
  it('processes the input', async () => {
    const input = await getInput('https://adventofcode.com/2023/day/1/input')
    const answer = processInput(input)
    expect(answer).toEqual(input)
  })
})