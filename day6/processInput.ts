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

    let leftLowerSearchNum = lowerBound
    let rightLowerSearchNum = start
    let midLowerSeaerchNum = 0
    
    const cachedResults: boolean[] = []
    // let i = 0
    while (true) {
      midLowerSeaerchNum = Math.floor((leftLowerSearchNum + rightLowerSearchNum) / 2)
      // console.log('leftLowerSearchNum', leftLowerSearchNum, 'midLowerSeaerchNum', midLowerSeaerchNum, 'rightLowerSearchNum', rightLowerSearchNum)
      
      const willWin = this.getWillWin(midLowerSeaerchNum)
      cachedResults[midLowerSeaerchNum] = willWin
      // console.log('willWin', willWin)
      
      if (willWin && cachedResults[midLowerSeaerchNum - 1] === undefined) {
        // continue search
        rightLowerSearchNum = midLowerSeaerchNum
      } else if (!willWin && cachedResults[midLowerSeaerchNum + 1] === undefined) {
        // continue search
        leftLowerSearchNum = midLowerSeaerchNum
      } else if (willWin && cachedResults[midLowerSeaerchNum - 1] === false) {
        break
      } else if (!willWin && cachedResults[midLowerSeaerchNum + 1] === true) {
        midLowerSeaerchNum = midLowerSeaerchNum + 1
        break
      }
      // i++
    }

    let rightUpperSearchNum = upperBound
    let leftUpperSearchNum = start
    let midUpperSeaerchNum = Math.floor((rightUpperSearchNum + leftUpperSearchNum) / 2)

    while (true) {
      midUpperSeaerchNum = Math.floor((rightUpperSearchNum + leftUpperSearchNum) / 2)
      // console.log('leftUpperSearchNum', leftUpperSearchNum, 'midUpperSeaerchNum', midUpperSeaerchNum, 'rightUpperSearchNum', rightUpperSearchNum)
      const willWin = this.getWillWin(midUpperSeaerchNum)
      // console.log('willWin', willWin)
      cachedResults[midUpperSeaerchNum] = willWin

      if (willWin && cachedResults[midUpperSeaerchNum + 1] === undefined) {
        // continue search
        leftUpperSearchNum = midUpperSeaerchNum
      } else if (!willWin && cachedResults[midUpperSeaerchNum - 1] === undefined) {
        rightUpperSearchNum = midUpperSeaerchNum
      } else if (willWin && cachedResults[midUpperSeaerchNum + 1] === false) {
        break
      } else if (!willWin && cachedResults[midUpperSeaerchNum - 1] === true) {
        midUpperSeaerchNum = midUpperSeaerchNum - 1
        break
      }
      // i++
    }

    // console.log(midLowerSeaerchNum, midUpperSeaerchNum)
    return midUpperSeaerchNum - midLowerSeaerchNum + 1
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

  return races.reduce((accum, race) => {
    accum *= race.numWaysToBeatRecord()
    return accum
  }, 1)
}

export function processSecondPuzzle(input: string): number {
  return 0
}