// import axios from 'axios'

async function getInput(url: string) {
  // return axios.get(url)
  return { data: 'Hello' }
}

getInput('https://adventofcode.com/2023/day/1/input')
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.error(err))