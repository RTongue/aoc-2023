import { getInput, processInput } from './processInput'

getInput('input.txt')
  .then((res: string) => {
    const answer = processInput(res)
    console.log(answer)
  })
  .catch(err => console.error(err))
