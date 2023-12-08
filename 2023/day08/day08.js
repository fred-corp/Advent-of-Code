// Advent of Code 2023: Day 8:
// https://adventofcode.com/2023/day/8
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

function getNodes(lines) {
  let instructions = lines[0].split('')
  // replace 'R' by 1 and 'L' by 0
  instructions = instructions.map(i => i === 'R' ? 1 : 0)
  var nodes = {}
  lines.shift()
  lines.shift()
  lines.forEach(line => {
    line = line.replace(/\s/g, '')
    const keyValue = line.split('=')
    const node = keyValue[0]
    const value = keyValue[1].replace(/\(|\)/g,'').split(",")
    nodes[node] = value
  })
  return [instructions, nodes]
}

function getNavigationSteps(instructions, nodes) {
  let navigationSteps = 0
  let instructionsIndex = 0
  let currentNode = 'AAA'
  while (currentNode !== 'ZZZ') {
    const nextNode = nodes[currentNode][instructions[instructionsIndex]]
    currentNode = nextNode
    instructionsIndex++
    if (instructionsIndex >= instructions.length) {
      instructionsIndex = 0
    }
    navigationSteps++
  }
  return navigationSteps
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const [instructions, nodes] = getNodes(lines)
  const navigationSteps = getNavigationSteps(instructions, nodes)
  console.log(navigationSteps)
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