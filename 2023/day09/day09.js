// Advent of Code 2023: Day 9: Mirage Maintenance
// https://adventofcode.com/2023/day/9
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

function getSuites(lines) {
  const suites = []
  let suite = []
  lines.forEach(line => {
    suite = line.split(' ').map(Number)
    suites.push(suite)
  })
  return suites
}

function calcSteps(suite) {
  let steps = []
  let step = 0
  for (let i = 0; i < suite.length-1; i++) {
    step = suite[i+1]-suite[i]
    steps.push(step)
  }
  return steps
}

function getSuiteSteps(suite) {
  let stepsArray = []
  let steps = suite
  stepsArray.push(steps)
  while (steps.some(step => step !== 0)) {
    steps = calcSteps(steps)
    stepsArray.push(steps)
  }
  return stepsArray
}

function iterateSuites(suites) {
  let steps = []
  suites.forEach(suite => {
    steps.push(getSuiteSteps(suite))
  })
  return steps
}

function getNextStep(suiteSteps) {
  let propagatedSteps = suiteSteps
  for (let i = suiteSteps.length-2; i >= 0; i--) {
    propagatedSteps[i].push(propagatedSteps[i][propagatedSteps[i].length-1]+propagatedSteps[i+1][propagatedSteps[i+1].length-1])
  }
  return propagatedSteps[0][propagatedSteps[0].length-1]
}

function getSumOfLastSteps(suitesSteps) {
  let sum = 0
  suitesSteps.forEach(suiteSteps => {
    sum += getNextStep(suiteSteps)
  })
  return sum

}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const suites = getSuites(lines)
  const suitesSteps = iterateSuites(suites)
  const sum = getSumOfLastSteps(suitesSteps)

  console.log(sum)
  console.log("Part one code goes here")
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