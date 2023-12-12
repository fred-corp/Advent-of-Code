// Advent of Code 2023: Day 12:
// https://adventofcode.com/2023/day/12
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

function checkArrangement(arrangement, springsKnown) {
  // convert a string of '#'s and '.' to an array of numbers
  // counting the groups of contiguous '#'s
  // and compare it to the array of known springs
  let springsFound = []
  let currentSpring = 0
  arrangement += '.'
  for (let i = 0; i < arrangement.length; i++) {
    if (arrangement[i] === '#') {
      currentSpring++
    } else {
      if (currentSpring > 0) {
        springsFound.push(currentSpring)
        currentSpring = 0
      }
    }
  }
  return springsFound.join(',') === springsKnown.join(',')
}

function findArrangements(line) {
  let [springsUnknown, springsKnown] = line.split(' ')
  springsKnown = springsKnown.split(',').map(spring => parseInt(spring))

  let arrangements = 0
  // replace each '?' with '.' or '#', and count the amount of '#'s separated by '.'s;
  // these amounts are the possible arrangements and should be equal to springsKnown

  let unknownAmount = springsUnknown.split('').filter(char => char === '?').length
  for (let i = 0; i < Math.pow(2, unknownAmount); i++) {
    let arrangement = springsUnknown
    for (let j = 0; j < springsUnknown.length; j++) {
      if (i & (1 << j)) {
        arrangement = arrangement.replace('?', '#')
      } else {
        arrangement = arrangement.replace('?', '.')
      }
    }
    if (checkArrangement(arrangement, springsKnown)) {
      arrangements++
    }
  }
  return arrangements

}

function getArrangementsSum(lines) {
  let arrangementsSum = 0
  for (let line of lines) {
    arrangementsSum += findArrangements(line)
  }
  return arrangementsSum
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const arrangementsSum = getArrangementsSum(lines)
  console.log(arrangementsSum)
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