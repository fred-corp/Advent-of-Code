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

function expandUniverse(universe, amount=2) {
  // double each rows that contain only '.'s
  let newUniverse = []
  universe.forEach((row) => {
    if (row.every((seat) => seat === '.')) {
      for (let i = 0; i < amount; i++) {
        newUniverse.push(row)
      }
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
      for (let i = 0; i < amount; i++) {
        newNewUniverse.push(col)
      }
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
  console.log(`The sum of the Manhattan distances is ${distanceSums}`)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function findExpandedRowsCols(universe) {
  let expandedRows = []
  let expandedCols = []
  universe.forEach((row, rowIndex) => {
    if (row.every((seat) => seat === '.')) {
      expandedRows.push(rowIndex)
    }
  })
  universe = universe[0].map((col, i) => universe.map(row => row[i]))
  universe.forEach((col, colIndex) => {
    if (col.every((seat) => seat === '.')) {
      expandedCols.push(colIndex)
    }
  })
  return [expandedRows, expandedCols]
}

function calcDistanceWithoutExpanding(galaxyPair, expandedRowsCols, amount) {
  const x1 = Math.min(galaxyPair[0][0], galaxyPair[1][0])
  const y1 = Math.min(galaxyPair[0][1], galaxyPair[1][1])
  const x2 = Math.max(galaxyPair[0][0], galaxyPair[1][0])
  const y2 = Math.max(galaxyPair[0][1], galaxyPair[1][1])
  const verticalDistance = x2 - x1
  const horizontalDistance = y2 - y1
  let distance = verticalDistance + horizontalDistance
  // if any expandedRow is between the two galaxies, add the amount to the distance
  expandedRowsCols[0].forEach(expandedRow => {
    if (x1 < expandedRow && x2 > expandedRow) {
      distance += amount - 1
    }
  })
  // same for expandedCols
  expandedRowsCols[1].forEach(expandedCol => {
    if (y1 < expandedCol && y2 > expandedCol) {
      distance += amount - 1
    }
  })

  return distance
}

function findDistanceSumsWithoutExpanding(galaxyPairs, expandedRowsCols, amount) {
  let distances = []
  galaxyPairs.forEach((pair) => {
    distances.push(calcDistanceWithoutExpanding(pair, expandedRowsCols, amount))
  })
  return distances.reduce((a, b) => a + b, 0)
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  let universe = createUniverse(lines)
  const galaxies = findGalaxies(universe)
  const galaxyPairs = getGalaxyPairs(galaxies)
  const expandedRowsCols = findExpandedRowsCols(universe)
  const distanceSums = findDistanceSumsWithoutExpanding(galaxyPairs, expandedRowsCols, 1000000)
  console.log(`The sum of distances in a super expanded universe is ${distanceSums}`)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()