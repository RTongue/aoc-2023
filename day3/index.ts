import { getInput } from '../utils/getInput'
import { processInputPartOne } from './processInput'

getInput('https://adventofcode.com/2023/day/3/input')
  .then(data => {
    const partOneAnswer = processInputPartOne(data)
    console.log('Part 1', partOneAnswer)

    // const partTwoAnswer = 
  })
  .catch(e => console.error(e))