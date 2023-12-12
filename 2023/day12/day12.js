// Advent of Code 2023: Day 12:
// https://adventofcode.com/2023/day/12
//
// Part one :
// Find the number of arrangements that satisfy the given conditions.
//
// Part two :
// Same but this time expand everything 5 times
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

let cache = {}

function countMatches(pattern, nums) {
  if (cache[[pattern, [nums]]]) {
    return cache[[pattern, [nums]]]
  }

  let size = nums[0]
  let total = 0

  if (nums.length === 0) {
    return pattern.includes("#") ? 0 : 1;
  }
  for(let i = 0; i < pattern.length; i++) {
    if (i + size <= pattern.length 
      && [...pattern.slice(i, i + size)].every(c => c !== '.') 
      && (i === 0 || pattern[i - 1] !== '#') 
      && (i + size === pattern.length || pattern[i + size] !== '#')
      ) {
      total += countMatches(pattern.slice(i+size+1), nums.slice(1))
    }
    if (pattern[i] === '#') {
      break
    }
  }
  cache[[pattern, [nums]]] = total
  return total
}

function getUnfoldedArrangementsSum(lines, folds) {
  let answer = 0

  lines.forEach(line => {
    let [pattern, splits] = line.split(' ')
    splits = splits.split(',').map(spring => parseInt(spring))
    let newSplits = splits
    let newPattern = pattern
    for (let i = 0; i < folds-1; i++) {
      newPattern += '?' + pattern
      newSplits = [].concat(newSplits, splits)
    }
    answer += countMatches(newPattern, newSplits)
  })

  return answer
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const arrangementsSum = getUnfoldedArrangementsSum(lines, 5)
  console.log(arrangementsSum)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()