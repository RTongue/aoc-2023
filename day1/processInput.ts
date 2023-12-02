const path = require('path')
const fs = require('fs')
import { numStringTrie } from './numStringTrie'

export async function getInput(file: string) {
  return fs.promises.readFile(path.join(__dirname, file), 'utf8')
}

function getNumber(chars: string): number {
  if (!isNaN(Number(chars))) return Number(chars)
  const numStrings = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
  const mappedNumber = numStrings.indexOf(chars)
  return mappedNumber === -1 ? NaN : mappedNumber
}

export function processInput(input: string): number {
  return input.trim().split('\n')
    .reduce((accum: number, row: string) => {
      let first: number = NaN, last: number = NaN
      
      for (let i = 0; i < row.length; i++) {
        const char: string = row[i]

        let numStringNode = numStringTrie[char]
        let foundNumString: string = char

        for (let j = i + 1; j < row.length; j++) {
          const nextChar: string = row[j]
          numStringNode = numStringNode?.[nextChar]
          
          if (typeof numStringNode === 'string' &&
              !isNaN(getNumber(numStringNode))) {
            foundNumString = numStringNode
            // Starting the next lookahead at j - 1 because
            // the beginning of the last number string could
            // be the start of a new number string: 
            // 'nineight' would show 'nine' as the last number
            // instead of 'eight' if i were set equal to j
            i = j - 1
            break
          }
        }

        const foundNumber = getNumber(foundNumString)
        if (!isNaN(foundNumber)) {
          if (isNaN(first)) first = foundNumber
          last = foundNumber
        }
      }

      accum += Number(String(first) + String(last))
      return accum
    }, 0)
}
