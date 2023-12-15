// Advent of Code 2023: Day 15: Lens Library
// https://adventofcode.com/2023/day/15
//
// Part one :
// Calculate the sum of all hashes of all parts of the input file with a specified hash algorithm.
//
// Part two :
// Get the focusing power of the lens assembly (See AoC website for info)
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

function getFocusingPower(data) {
  lensMap = {}
  data.forEach((part, index) => {
    if (part.includes('=')) {
      const [label, value] = part.split('=')
      let val = parseInt(value)
      if(!lensMap[hash(label)]) {
        lensMap[hash(label)] = {}
      }
      lensMap[hash(label)][label] = val
    }
    else if (part.includes('-')) {
      label = part.slice(0, part.length - 1)
      if (lensMap[parseInt(hash(label))]) {
        delete lensMap[parseInt(hash(label))][label]
      }
    }
  })

  let focusingPower = 0
  Object.keys(lensMap).forEach(box => {
    boxNumber = Number(box)
    slotNumber = 0
    Object.keys(lensMap[box]).forEach(lens => {
      focusingPower += (boxNumber + 1) * (slotNumber + 1) * lensMap[box][lens]
      slotNumber++
    })
  })
  
  return focusingPower
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const parts = parseFile(fileName)
  console.log(getFocusingPower(parts))
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()