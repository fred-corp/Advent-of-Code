// Advent of Code 2023: Day 18: Lavaduct Lagoon
// https://adventofcode.com/2023/day/18
//
// Part one :
// Get the area inside an arbitrary perimeter
// defined by a series of instructions
//
// Part two :
// Same, but this time the instructions are
// encrypted in a hexadecimal color code
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

const UP = [-1, 0]
const DOWN = [1, 0]
const LEFT = [0, -1]
const RIGHT = [0, 1]

const DIRECTIONS = { "U": UP, "D": DOWN, "L": LEFT, "R": RIGHT }

function getInstructions(lines) {
  const instructions = []
  lines.forEach(line => {
    let instruction = line.split(' ')
    instruction[instruction.length - 1] = instruction[instruction.length - 1].slice(1, -1)
    instructions.push(instruction)
  })
  return instructions
}


function getPerimeter(instructions, partTwo = false) {
  let currentPos = [0, 0]
  let perimeter = [currentPos]
  let length = 0
  instructions.forEach(instruction => {
    let [direction, amount, color] = instruction
    if (partTwo) {
      direction = "RDLU"[parseInt(color[color.length - 1])]
      amount = parseInt(color.slice(1, color.length-1), 16)
    }
    amount = parseInt(amount)
    perimeter.push([perimeter[perimeter.length - 1][0] + DIRECTIONS[direction][0] * amount, perimeter[perimeter.length - 1][1] + DIRECTIONS[direction][1] * amount])
    length += amount
  })
  // Get the area inside the arbitrary perimeter's vertices
  let area = 0
  let left = 0
  let right = 0
  for (let i = 0; i < perimeter.length - 1; i++) {
    left += perimeter[i][0] * perimeter[i+1][1]
    right += perimeter[i+1][0] * perimeter[i][1]
  }
  area = length / 2 + 1 + Math.abs(left-right) / 2
  return area
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const instructions = getInstructions(lines)
  console.log(getPerimeter(instructions))
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const instructions = getInstructions(lines)
  console.log(getPerimeter(instructions, true))
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()