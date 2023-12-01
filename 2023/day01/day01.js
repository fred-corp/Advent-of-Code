// Advent of Code 2023: Day 1: Trebuchet?!
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

const timeIt = require('../timeIt')
const fs = require('fs')

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  const lines = text.split('\n')
  return lines
}

function findNumbers(lines) {
  const numbers = []
  for (let line of lines) {
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
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const numbers = findNumbers(lines)
  const total = sum(numbers)
  console.log(total)
}

const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

function findNumbersPartTwo(lines) {
  const numbers = []
  for (let line of lines) {
    // the issue here is that the spelled out number can be
    // part of another word, like "one" and "eight" in "zoneight234"
    // so I chose the janky solutions of replacing the spelled out
    // digit with their corresponding number, but with their last letter
    // appended to it (if that letter can be the first letter of another digit). 
    // The next trick is to check a second time for
    // the spelled out digits, and then convert them to numbers and take the sum
    const regex = /(?:zero|one|two|three|four|five|six|seven|eight|nine|\d)/g
    var digits = line.replace(regex, function(match) {
      switch (match) {
        case "one":
          return "1e"
        case "two":
          return "2o"
        case "three":
          return "3e"
        case "four":
          return "4"
        case "five":
          return "5e"
        case "six":
          return "6"
        case "seven":
          return "7n"
        case "eight":
          return "8t"
        case "nine":
          return "9e"
        default:
          return match
      }
    }
    )

    // check again
    digits = digits.match(regex)

    // convert the digits to numbers
    for (let i = 0; i < digits.length; i++) {
      switch (digits[i]) {
        case "one":
          digits[i] = "1"
          break
        case "two":
          digits[i] = "2"
          break
        case "three":
          digits[i] = "3"
          break
        case "four":
          digits[i] = "4"
          break
        case "five":
          digits[i] = "5"
          break
        case "six":
          digits[i] = "6"
          break
        case "seven":
          digits[i] = "7"
          break
        case "eight":
          digits[i] = "8"
          break
        case "nine":
          digits[i] = "9"
          break
      }
    }

    // first and last digit
    const number = String(digits[0]) + String(digits[digits.length - 1])
    numbers.push(parseInt(number))
    
  }
  return numbers
}

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest2.txt"
  const lines = parseFile(fileName)
  const numbers = findNumbersPartTwo(lines)
  const total = sum(numbers)
  console.log(total)
}

const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()