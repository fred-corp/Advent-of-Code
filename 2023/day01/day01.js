// Advent of Code 2023: Day 1:
// https://adventofcode.com/2023/day/1
//
// Part one :
// From a text file containing lines that look like "1abc2" or "pqr3stu8vwx", find the sum of all numbers in the file.
// The numbers are made of two digits.
//
// Part two :
// From a text file containing lines that look like "two1nine" or "zoneight234", find the sum of all numbers in the file.
// The numbers are made of two digits, the first and the last digit in the line,
// and they can be numbers (0-9), ore spelled out (one, two, three, four, five, six, seven, eight, nine).
//
// Solution by Frédéric Druppel
// See repo for license

const { on } = require('events')
const timeIt = require('../timeIt')
const fs = require('fs')

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  const lines = text.split('\n')
  return lines
}

// extract the numbers from a line that looks like "pqr3stu8vwx"
function findNumbers(lines) {
  const numbers = []
  for (let line of lines) {
    // replace all non-digits with ''
    const digits = line.replace(/\D/g, '')
    // first and last digit
    const number = digits[0] + digits[digits.length - 1]
    numbers.push(parseInt(number))
    
  }
  return numbers
}
function sum(numbers) {
  return numbers.reduce((a, b) => a + b)
}


function answerPartOne() {
  const lines = parseFile('puzzleInput.txt')
  const numbers = findNumbers(lines)
  const total = sum(numbers)
  console.log(total)
}

const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

function answerPartTwo() {
  const testArray = parseFile("puzzleInputTest.txt")
  console.log("Part two code goes here")
}

const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()