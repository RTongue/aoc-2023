const numStringTrie: Record<string, any> = {
  o: {
    n: {
      e: 'one',
    },
  },
  t: {
    h: {
      r: {
        e: {
          e: 'three',
        },
      },
    },
    w: {
      o: 'two',
    },
  },
  f: {
    i: {
      v: {
        e: 'five',
      },
    },
    o: {
      u: {
        r: 'four',
      },
    },
  },
  s: {
    e: {
      v: {
        e: {
          n: 'seven',
        },
      },
    },
    i: {
      x: 'six',
    },
  },
  e: {
    i: {
      g: {
        h: {
          t: 'eight',
        },
      },
    },
  },
  n: {
    i: {
      n: {
        e: 'nine',
      },
    },
  },
}

function getNumber(chars: string) {
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
  return numStrings.indexOf(chars)
}

export function processInput(input: string) {
  return input.split('\n')
    .reduce((accum: number, row: string) => {
      let first: number = NaN, last: number = NaN
      
      for (let i = 0; i < row.length; i++) {
        const char: string = row[i]

        if (!isNaN(Number(char))) {
          if (isNaN(first)) first = Number(char)
          last = Number(char)
        } else if (numStringTrie[char]) {
          let numStringNode = numStringTrie[char]

          for (let j = i + 1; j < row.length; j++) {
            const nextChar: string = row[j]

            if (!numStringNode[nextChar]) {
              break
            } else {
              numStringNode = numStringNode[nextChar]
              if (typeof numStringNode === 'string' &&
                  typeof getNumber(numStringNode) === 'number') {
                if (isNaN(first)) first = getNumber(numStringNode)
                last = getNumber(numStringNode)
                // Starting the next lookahead at j - 1 because
                // the beginning of the last number string could
                // be the start of at new number string: 
                // nineight would show 'nine' as the last number
                // instead of 'eight' if i were set equal to j
                i = j - 1
                break
              }
            }
          }
        }
      }

      const rowNum = Number(String(first) + String(last))
      accum += isNaN(rowNum) ? 0 : rowNum
      return accum
    }, 0)
}
