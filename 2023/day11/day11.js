// Advent of Code 2023: Day 11: Cosmic Expansion
// https://adventofcode.com/2023/day/11
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
  const lines = text.split('\n')
  return lines
}

function createUniverse(lines) {
  let universe = []
  lines.forEach((line) => {
    universe.push(line.split(''))
  })
  return universe
}

function expandUniverse(universe) {
  // double each rows that contain only '.'s
  let newUniverse = []
  universe.forEach((row) => {
    if (row.every((seat) => seat === '.')) {
      newUniverse.push(row)
      newUniverse.push(row)
    } else {
      newUniverse.push(row)
    }
  })
  // flip rows and columns
  newUniverse = newUniverse[0].map((col, i) => newUniverse.map(row => row[i]))
  // double each columns that contain only '.'s
  let newNewUniverse = []
  newUniverse.forEach((col) => {
    if (col.every((seat) => seat === '.')) {
      newNewUniverse.push(col)
      newNewUniverse.push(col)
    } else {
      newNewUniverse.push(col)
    }
  })
  // flip rows and columns
  newNewUniverse = newNewUniverse[0].map((col, i) => newNewUniverse.map(row => row[i]))
  return newNewUniverse
}

function printUniverse(universe) {
  universe.forEach((row) => {
    console.log(row.join(''))
  })
}

function findGalaxies(universe) {
  let galaxies = []
  universe.forEach((row, rowIndex) => {
    row.forEach((seat, seatIndex) => {
      if (seat === '#') {
        galaxies.push([rowIndex, seatIndex])
      }
    })
  })
  return galaxies
}

function getGalaxyPairs(galaxies) {
  let galaxyPairs = []
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i; j < galaxies.length; j++) {
      if (i !== j) {
        galaxyPairs.push([galaxies[i], galaxies[j]])
      }
    }
  }
  return galaxyPairs
}

function findPairManhattanDistance(pair) {
  const x1 = pair[0][0]
  const y1 = pair[0][1]
  const x2 = pair[1][0]
  const y2 = pair[1][1]
  // find the vertical & horizontal distance
  const verticalDistance = Math.abs(x1 - x2)
  const horizontalDistance = Math.abs(y1 - y2)
  const distance = verticalDistance + horizontalDistance
  return distance
}

function findDistanceSums(galaxyPairs) {
  let distances = []
  galaxyPairs.forEach((pair) => {
    distances.push(findPairManhattanDistance(pair))
  })
  return distances.reduce((a, b) => a + b, 0)
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  let universe = createUniverse(lines)
  universe = expandUniverse(universe)
  const galaxies = findGalaxies(universe)
  const galaxyPairs = getGalaxyPairs(galaxies)
  const distanceSums = findDistanceSums(galaxyPairs)
  console.log(distanceSums)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log("Part two code goes here")
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()