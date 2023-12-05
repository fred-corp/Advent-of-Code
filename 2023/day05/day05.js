// Advent of Code 2023: Day 5:
// https://adventofcode.com/2023/day/5
//
// Part one :
// Check Advent of code website or README; couldn't find a 
// way to shortly describe the problem
//
// Part two :
// Idem
//
// Solution by Frédéric Druppel
// See repo for license

const timeIt = require('../timeIt')
const fs = require('fs')

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  // parse the file at blank lines into groups of lines
  const lines = text.split(/\r?\n/)
  // create a group of elements splitted at each '' in the lines array
  const groups = lines.reduce((groups, line) => {
    if (line.length === 0) {
      groups.push([])
    } else {
      groups[groups.length - 1].push(line)
    }
    return groups
  }, [[]])
  return groups
}

function getSeeds(seedsLine) {
  let seeds = []
  seeds = seedsLine[0].split(' ').slice(1)
  seeds = seeds.map(Number)
  return seeds
}

function getSourceToDestMap(group) {
  let sourceDest = []
  group.slice(1).forEach(element => {
    let numbers = element.split(' ')
    numbers = numbers.map(Number)
    sourceDest.push(numbers)
  });
  return sourceDest
}

function convertToDest(seeds, sourceDestArrays) {
  let dests = []
  seeds.forEach(seed => {
    let val = seed
    let newVal = val
    sourceDestArrays.forEach(sourceDestArray => {
      newVal = val
      let stop = false
      sourceDestArray.forEach(sourceDest => {
        let dest = sourceDest[0]
        let source = sourceDest[1]
        let range = sourceDest[2]
        if (source <= val && val <= source + range && !stop) {
          newVal = val - source + dest
          stop = true
        }
      })
      val = newVal
    })
    dests.push(newVal)
  })
  return dests
}

function convertRangeToDest(range, sourceDestArray) {
  let innerVals = []
  let testRange = range
  sourceDestArray.forEach(sourceDest => {
    let newRange = []
    let dest = sourceDest[0]
    let source = sourceDest[1]
    let sourceEnd = source + sourceDest[2]
    while(testRange.length > 0){
      const rnge = testRange.pop()
      let start = rnge[0]
      let end = rnge[1]
      let before = [start, Math.min(end, source)]
      let inter = [Math.max(start, source), Math.min(end, sourceEnd)]
      let after = [Math.max(start, sourceEnd), end]
      if (before[1] > before[0]) {
        newRange.push(before)
      }
      if (inter[1] > inter[0]) {
        innerVals.push([inter[0]-source+dest, inter[1]-source+dest])
      }
      if (after[1] > after[0]) {
        newRange.push(after)
      }
    }
    testRange = newRange


  })
  // add elements of testRange to innerVals
  innerVals = innerVals.concat(testRange)

  return innerVals
}

function mapSeedsToLocations(seeds, groups) {
  let sourceDestArrays = []
  groups.slice(1).forEach(group => {
    sourceDestArrays.push(getSourceToDestMap(group))
  })
  let dests = convertToDest(seeds, sourceDestArrays)
  return dests
}

function answerPartOne() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const groups = parseFile(fileName)
  const seeds = getSeeds(groups[0])
  const locations = mapSeedsToLocations(seeds, groups)
  const min = Math.min(...locations)
  console.log(`The lowest location value is ${min}`)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function calcMinSeedsIfSeedsIsRange(seeds, groups) {
  let sourceDestArrays = []
  groups.slice(1).forEach(group => {
    sourceDestArrays.push(getSourceToDestMap(group))
  })
  let pairs = []
  for (let i = 0; i < seeds.length; i+=2) {
    pairs.push([seeds[i], seeds[i + 1]])
  }
  answer = 1000000000000000
  pairs.forEach(pair => {
    let range = [[pair[0], pair[0]+pair[1]-1]]
    sourceDestArrays.forEach(sourceDestArray => {
      range = convertRangeToDest(range, sourceDestArray)
    })
    range.forEach(rnge => {
      answer = Math.min(answer, ...rnge)
    })
  })
  return answer
}

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const groups = parseFile(fileName)
  const seeds = getSeeds(groups[0])
  console.log(`The lowest location value is ${calcMinSeedsIfSeedsIsRange(seeds, groups)}`)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()