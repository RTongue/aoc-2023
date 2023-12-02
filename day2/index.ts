import { getInput } from '../utils/getInput'
import { processFirstPuzzle, processSecondPuzzle } from './processInput'

getInput('https://adventofcode.com/2023/day/2/input')
  .then(data => {
    const answerFirstPuzzle = processFirstPuzzle(data)
    console.log('First puzzle:', answerFirstPuzzle)

    const answerSecondPuzzle = processSecondPuzzle(data)
    console.log('Second puzzle:', answerSecondPuzzle)
  })
  .catch(e => console.error(e))