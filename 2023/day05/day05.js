// Advent of Code 2023: Day 5:
// https://adventofcode.com/2023/day/5
//
// Part one :
//
//
// Part two :
//
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

function mapSeedsToLocations(groups) {
  let seeds = getSeeds(groups[0])
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
  const locations = mapSeedsToLocations(groups)
  const min = Math.min(...locations)
  console.log(min)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log("Part two code goes here")
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()