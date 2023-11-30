// Advent of Code 2023: Day 1:
// https://adventofcode.com/2023/day/1
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
  const testArray = parseFile('puzzleInputTest.txt')
  console.log("Part one code goes here")
}

const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

function answerPartTwo() {
  const testArray = parseFile("puzzleInputTest.txt")
  console.log("Part two code goes here")
}

const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()