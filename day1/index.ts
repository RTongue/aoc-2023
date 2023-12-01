const path = require('path')
const fs = require('fs')

async function getInput(file: string) {
  return fs.promises.readFile(path.join(__dirname, file), 'utf8')
}

getInput('input.txt')
  .then(res => {
    const answer = res.split('\n')
      .reduce((accum, row) => {
        let first, last
        
        for (const char of row.split('')) {
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
