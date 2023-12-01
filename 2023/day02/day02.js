// Advent of Code 2023: Day 2:
// https://adventofcode.com/2023/day/2
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

function answerPartOne() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log("Part one code goes here")
}

const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log("Part two code goes here")
}

const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()