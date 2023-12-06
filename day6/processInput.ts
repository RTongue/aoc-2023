export class Race {
  time: number = 0
  distance: number = 0

  constructor(time: number, distance: number) {
    this.time = time
    this.distance = distance
  }

  numWaysToBeatRecord() {
    const start = Math.floor(this.time / 2)
    let lowerBound = 0
    let upperBound = this.time

    let lowerSearchNum = start
    let lastLowerSearchNum = lowerBound
    const cachedResults: boolean[] = []
    let i = 10
    while (i < 5) {
      // console.log('lowerSearchNum', lowerSearchNum, 'lastLowerSearchNum', lastLowerSearchNum)
      const willWin = this.getWillWin(lowerSearchNum )
      cachedResults[lowerSearchNum] = willWin
      if (willWin && cachedResults[lowerSearchNum - 1] === undefined) {
        // continue search
        lastLowerSearchNum = lowerSearchNum
        lowerSearchNum = Math.floor(lowerSearchNum / 2)
      } else if (!willWin && cachedResults[lowerSearchNum + 1] === undefined) {
        lowerSearchNum = Math.floor((lastLowerSearchNum - lowerSearchNum) / 2) + lowerSearchNum
      } else if (willWin && cachedResults[lowerSearchNum - 1] === false) {
        break
      } else if (!willWin && cachedResults[lowerSearchNum + 1] === true) {
        lowerSearchNum = lowerSearchNum + 1
        break
      }
      i++
    }

    let upperSearchNum = start
    let lastUpperSearchNum = upperBound
    while (i < 10) {
      // console.log('upperSearchNum', upperSearchNum, 'lastUpperSearchNum', lastUpperSearchNum)
      const willWin = this.getWillWin(upperSearchNum)
      // console.log('willWin', willWin)
      cachedResults[upperSearchNum] = willWin
      // console.log('cachedResults', cachedResults)
      if (willWin && cachedResults[upperSearchNum + 1] === undefined) {
        // continue search
        upperSearchNum = Math.floor((lastUpperSearchNum - upperSearchNum) / 2) + upperSearchNum
      } else if (!willWin && cachedResults[upperSearchNum - 1] === undefined) {
        lastUpperSearchNum = upperSearchNum
        upperSearchNum = Math.floor((upperSearchNum - lastUpperSearchNum) / 2) - upperSearchNum
      } else if (willWin && cachedResults[upperSearchNum + 1] === false) {
        break
      } else if (!willWin && cachedResults[upperSearchNum - 1] === true) {
        upperSearchNum = upperSearchNum - 1
        break
      }
      i++
    }

    console.log(upperSearchNum, lowerSearchNum)
    return upperSearchNum - lowerSearchNum + 1
  }

  getWillWin(milliSecondsPressed: number): boolean {
    const millimeterPerMilliSecond = milliSecondsPressed
    return (this.time - milliSecondsPressed) * millimeterPerMilliSecond > this.distance
  }
}

export function processFirstPuzzle(input: string): number {
  const [timesStr, distancesStr] = input.split('\n')
  const times = timesStr.split('Time:')[1].split(' ')
    .filter(s => s !== '').map(Number)
  const distances = distancesStr.split('Distance:')[1].split(' ')
    .filter(s => s !== '').map(Number)
  const races: Race[] = []

  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const distance = distances[i]
    races.push(new Race(time, distance))
  }

  

  return 0
}

export function processSecondPuzzle(input: string): number {
  return 0
}