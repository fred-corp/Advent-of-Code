// Advent of Code 2023: Day 15:
// https://adventofcode.com/2023/day/15
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
  const parts = text.split(',')
  return parts
}

function hash(str) {
  let value = 0
  str = str.split('')
  str.forEach(char => {
    value += char.charCodeAt(0)
    value *= 17
    value %= 256
  })

  return value
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const parts = parseFile(fileName)
  let sum = 0
  parts.forEach(part => {
    sum += hash(part)
  })
  console.log(sum)
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