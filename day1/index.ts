const path = require('path')
const fs = require('fs')
import { processInput } from './processInput'

export async function getInput(file: string) {
  return fs.promises.readFile(path.join(__dirname, file), 'utf8')
}

getInput('input.txt')
  .then((res: string) => {
    const answer = processInput(res)
    console.log(answer)
  })
  .catch(err => console.error(err))

