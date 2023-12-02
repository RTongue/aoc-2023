import { getInput } from '../utils/getInput'
import { processInput } from './processInput'

getInput('https://adventofcode.com/2023/day/1/input')
  .then(data => {
    const answer = processInput(data)
    console.log(answer)
  })
  .catch(e => console.error(e))