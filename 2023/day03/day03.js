// Advent of Code 2023: Day 3: Gear Ratios
// https://adventofcode.com/2023/day/3
//
// Part one :
// The engine schematic (your puzzle input) consists of a visual 
// representation of the engine. There are lots of numbers and symbols 
// you don't really understand, but apparently any number adjacent 
// to a symbol, even diagonally, is a "part number" and should be 
// included in your sum. (Periods (.) do not count as a symbol.)
// THe input looks like this : 
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
//
// Part two :
// This time, find all the "*" that are adjacent to exactly two numbers
// and multiply those numbers together. For example, the 1st symbol in
// the above example would have a value of 467*35 = 16345.
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

function getValue(prevLine, currentLine, nextLine, j) {
  let gearsPrevious = findGears(prevLine, j)
  let gearsCurrent = findGears(currentLine, j)
  let gearsNext = findGears(nextLine, j)
  let sum = 0

  // remove 0 values from gears
  gearsPrevious = gearsPrevious.filter(x => x !== 0)
  gearsCurrent = gearsCurrent.filter(x => x !== 0)
  gearsNext = gearsNext.filter(x => x !== 0)

  // find the sum of all gears
  sum = gearsPrevious.reduce((a, b) => a + b, 0) + gearsCurrent.reduce((a, b) => a + b, 0) + gearsNext.reduce((a, b) => a + b, 0)
  return sum
}


function calcSymbol(lines, partTwo = false) {
  let sum = 0
  for (let i = 1; i < lines.length-1; i++) {
    const prevLine = lines[i-1]
    const currentLine = lines[i]
    const nextLine = lines[i+1]

    for (let j = 1; j < currentLine.length-1; j++) {
      const currentChar = currentLine[j]

      let symbolValue = 0

      // Check if currentChar is a number
      if (!currentChar.match(/\d/) && currentChar !== ".") {
        if (partTwo) {
          symbolValue = findRatio(prevLine, currentLine, nextLine, j)
        }
        else {
          symbolValue = getValue(prevLine, currentLine, nextLine, j)
        }
        //console.log(`Symbol: ${currentChar}, value: ${symbolValue}, i: ${i+1}, j: ${j+1}`)
      }
      sum += symbolValue
    }
    
  }
  return sum
  
}

function answerPartOne() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log(calcSymbol(lines))
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function findGears(line, j) {
  let gears = []
  let symbolValue = 0

  let prevPossible = true
  let midPossible = true
  let nextPossible = true

  if (/^\d$/.test(line[j-1]) && prevPossible) {
    midPossible = false
    if (/^\d$/.test(line[j])) {
      nextPossible = false
      if (/^\d$/.test(line[j-2])) {
        symbolValue = parseInt(line[j-2] + line[j-1] + line[j])
        gears.push(symbolValue)
      }
      else {
        if (/^\d$/.test(line[j+1])) {
          symbolValue = parseInt(line[j-1] + line[j] + line[j+1])
          gears.push(symbolValue)
        }
        else {
          symbolValue = parseInt(line[j-1] + line[j])
          gears.push(symbolValue)
        }
      }
    }
    else {
      if (/^\d$/.test(line[j-2])) {
        if (/^\d$/.test(line[j-3])) {
          symbolValue = parseInt(line[j-3] + line[j-2] + line[j-1])
          gears.push(symbolValue)
        }
        else {
          symbolValue = parseInt(line[j-2] + line[j-1])
          gears.push(symbolValue)
        }
      }
      else {
        symbolValue = parseInt(line[j-1])
        gears.push(symbolValue)
      }
    }
  }

  if (/^\d$/.test(line[j]) && midPossible) {
    nextPossible = false
    if (/^\d$/.test(line[j+1])) {
      if (/^\d$/.test(line[j-1])) {
        symbolValue = parseInt(line[j-1] + line[j] + line[j+1])
        gears.push(symbolValue)
      }
      else {
        if (/^\d$/.test(line[j+2])) {
          symbolValue = parseInt(line[j] + line[j+1] + line[j+2])
          gears.push(symbolValue)
        }
        else {
          symbolValue = parseInt(line[j] + line[j+1])
          gears.push(symbolValue)
        }
      }
    }
    else {
      symbolValue = parseInt(line[j])
      gears.push(symbolValue)
    }
  }

  if (/^\d$/.test(line[j+1]) && nextPossible) {
    if (/^\d$/.test(line[j+2])) {
      if (/^\d$/.test(line[j+3])) {
        symbolValue = parseInt(line[j+1] + line[j+2] + line[j+3])
        gears.push(symbolValue)
      }
      else {
        symbolValue = parseInt(line[j+1] + line[j+2])
        gears.push(symbolValue)
      }
    }
    else {
      symbolValue = parseInt(line[j+1])
      gears.push(symbolValue)
    }
  }
  return gears
}

function findRatio(prevLine, currentLine, nextLine, j) {
  if (currentLine[j] !== "*") {
    return 0
  }
  let gearsPrevious = findGears(prevLine, j)
  let gearsCurrent = findGears(currentLine, j)
  let gearsNext = findGears(nextLine, j)
  let ratio = 0

  // remove 0 values from gears
  gearsPrevious = gearsPrevious.filter(x => x !== 0)
  gearsCurrent = gearsCurrent.filter(x => x !== 0)
  gearsNext = gearsNext.filter(x => x !== 0)

  // check if there are exactly two gears in total
  if (gearsPrevious.length + gearsCurrent.length + gearsNext.length === 2) {
    ratio = gearsPrevious.reduce((a, b) => a * b, 1) * gearsCurrent.reduce((a, b) => a * b, 1) * gearsNext.reduce((a, b) => a * b, 1)
  }
  return ratio
}

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log(calcSymbol(lines, true))
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()