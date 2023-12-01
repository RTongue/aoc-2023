import { addStuff } from '.'

describe('Day 1', () => {
  it('adds two numbers', () => {
    const sum = addStuff(2, 2)
    expect(sum).toEqual(4)
  })
})