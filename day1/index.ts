const path = require('path')
const fs = require('fs')

async function getInput(file: string) {
  return fs.promises.readFile(path.join(__dirname, file), 'utf8')
}

function getNumber(chars: string) {
  if (!isNaN(Number(chars)) return Number(chars)
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

const numStringTrie = {
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

getInput('input.txt')
  .then(res => {
    const answer = res.split('\n')
      .reduce((accum, row) => {
        let first, last
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i]
          if (numStringTrie[char]) {
            for (let
          }


          if (!isNaN(char)) {
            if (first === undefined) {
              first = char
            }
            last = char
          }
        }
        const rowNum = Number(first + last)
        accum += isNaN(rowNum) ? 0 : rowNum
        return accum
      }, 0)
    console.log(answer)
  })
  .catch(err => console.error(err))

