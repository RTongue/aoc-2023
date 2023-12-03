import chalk from 'chalk'
import { NumberObj, isSymbol } from './processInput'

export function highlightChosenNums(
  schematicGrid: string[][], 
  chosenNumbers: NumberObj[],
  notChosenNumbers: NumberObj[]
) {
  let debugOutput: string[] = []
  let chosenNum = chosenNumbers.shift()
  let notChosenNum = notChosenNumbers.shift()

  for (let x = 0; x < schematicGrid.length; x++) {
    const row = schematicGrid[x]
    let rowString = ''
    
    for (let y = 0; y < row.length; y++) {
      const char = row[y]
      if (isSymbol(char)) {
        rowString += chalk.yellow(char)
      } else if (chosenNum?.rowIndex === x && chosenNum?.startIndex === y) {
        rowString += chalk.green(row.slice(chosenNum.startIndex, chosenNum.endIndex + 1).join(''))
        y = chosenNum.endIndex
        chosenNum = chosenNumbers.shift()
      } else if (notChosenNum?.rowIndex === x && notChosenNum?.startIndex === y) {
        rowString += chalk.red(row.slice(notChosenNum.startIndex, notChosenNum.endIndex + 1).join(''))
        y = notChosenNum.endIndex
        notChosenNum = notChosenNumbers.shift()
      } else {
        rowString += char
      }
    }

    debugOutput.push(rowString)
  }

  console.log(debugOutput.join('\n'))
}
