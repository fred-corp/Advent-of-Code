// Advent of Code 2023: Day 3:
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

function findValue(line, j) {
  let symbolValue = 0

  let prevPossible = true
  let midPossible = true
  let nextPossible = true

  if (/^\d$/.test(line[j-1]) && prevPossible) {
    if (/^\d$/.test(line[j])) {
      midPossible = false
      if (/^\d$/.test(line[j-2])) {
        symbolValue += parseInt(line[j-2] + line[j-1] + line[j])
        
      }
      else {
        if (/^\d$/.test(line[j+1])) {
          nextPossible = false
          symbolValue += parseInt(line[j-1] + line[j] + line[j+1])
        }
        else {
          symbolValue += parseInt(line[j-1] + line[j])
        }
      }
    }
    else {
      if (/^\d$/.test(line[j-2])) {
        if (/^\d$/.test(line[j-3])) {
          symbolValue += parseInt(line[j-3] + line[j-2] + line[j-1])
        }
        else {
          symbolValue += parseInt(line[j-2] + line[j-1])
        }
      }
      else {
        symbolValue += parseInt(line[j-1])
      }
    }
  }

  if (/^\d$/.test(line[j]) && midPossible) {
    nextPossible = false
    if (/^\d$/.test(line[j+1])) {
      if (/^\d$/.test(line[j-1])) {
        symbolValue += parseInt(line[j-1] + line[j] + line[j+1])
      }
      else {
        if (/^\d$/.test(line[j+2])) {
          symbolValue += parseInt(line[j] + line[j+1] + line[j+2])
        }
        else {
          symbolValue += parseInt(line[j] + line[j+1])
        }
      }
    }
    else {
      symbolValue += parseInt(line[j])
    }
  }

  if (/^\d$/.test(line[j+1]) && nextPossible) {
    if (/^\d$/.test(line[j+2])) {
      if (/^\d$/.test(line[j+3])) {
        symbolValue += parseInt(line[j+1] + line[j+2] + line[j+3])
      }
      else {
        symbolValue += parseInt(line[j+1] + line[j+2])
      }
    }
    else {
      symbolValue += parseInt(line[j+1])
    }
  }
  return symbolValue
}


function getValue(prevLine, currentLine, nextLine, j) {
  return findValue(prevLine, j) + findValue(currentLine, j) + findValue(nextLine, j)
}


function calcSymbol(lines) {
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
        symbolValue = getValue(prevLine, currentLine, nextLine, j)
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

function answerPartTwo() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log("Part two code goes here")
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()