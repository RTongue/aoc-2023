import { getInput } from '../utils/getInput'
import { processInputPartOne, processInputPartTwo } from './processInput'

getInput('https://adventofcode.com/2023/day/3/input')
  .then(data => {
    const partOneAnswer = processInputPartOne(data)
    console.log('Part 1', partOneAnswer)

    const partTwoAnswer = processInputPartTwo(data)
    console.log('Part 2', partTwoAnswer)
  })
  .catch(e => console.error(e))