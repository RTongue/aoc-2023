import { getInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

getInput('https://adventofcode.com/2023/day/8/input')
  .then(data => {
    const answerFirstPuzzle = processFirstPuzzle(data)
    console.log('Part 1:', answerFirstPuzzle)

    const answerSecondPuzzle = processSecondPuzzle(data)
    console.log('Part 2:', answerSecondPuzzle)
  })
  .catch(e => console.error(e))