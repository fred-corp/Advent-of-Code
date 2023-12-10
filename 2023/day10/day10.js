// Advent of Code 2023: Day 10:Pipe Maze
// https://adventofcode.com/2023/day/10
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

function getTubeMap(lines) {
  let tubeMap = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineArray = line.split('')
    tubeMap.push(lineArray)
  }

  // find the position of 'S'
  let startPosition = []
  for (let i = 0; i < tubeMap.length; i++) {
    const line = tubeMap[i]
    const position = line.indexOf('S')
    if (position > -1) {
      startPosition = [i, position]
      break
    }
  }
  return [tubeMap, startPosition]
}

function findFarthestPoint(tubeMap, startPosition) {
  let currentPosition = startPosition
  // check tubes that face start position directly
  // above can be '|', 'F' or '7'
  // below can be '|', 'L' or 'J'
  // left can be '-', 'F' or 'L'
  // right can be '-', '7' or 'J'

  // TODO : check every direction for start step instead of magically deciding!
  let direction = 'down'
  let nextPosition = []
  let steps = 0

  while (true) {
    const [y, x] = currentPosition
    const currentTube = tubeMap[y][x]
    
    if (currentTube === 'F') {
      if (direction === 'up') {
        direction = 'right'
      } else if (direction === 'left') {
        direction = 'down'
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to F !')
      }
    }
    if (currentTube === '7') {
      if (direction === 'up') {
        direction = 'left'
      } else if (direction === 'right') {
        direction = 'down'
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to 7 !')
      }
    }
    if (currentTube === 'L') {
      if (direction === 'down') {
        direction = 'right'
      } else if (direction === 'left') {
        direction = 'up'
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to L !')
      }
    }
    if (currentTube === 'J') {
      if (direction === 'down') {
        direction = 'left'
      } else if (direction === 'right') {
        direction = 'up'
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to J !')
      }
    }
    if (currentTube === '|') {
      if (direction === 'down' || direction === 'up') {
        // continue
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to | !')
      }
    }
    if (currentTube === '-') {
      if (direction === 'left' || direction === 'right') {
        // continue
      } else {
        console.log(direction)
        throw new Error('can\'t go that way to to - !')
      }
    }
    if (currentTube === 'S' && steps > 0) {
      console.log('found start again')
      return steps/2
    }

    if (direction === 'up') {
      nextPosition = [y - 1, x]
    }
    if (direction === 'down') {
      nextPosition = [y + 1, x]
    }
    if (direction === 'left') {
      nextPosition = [y, x - 1]
    }
    if (direction === 'right') {
      nextPosition = [y, x + 1]
    }


    currentPosition = nextPosition
    steps++
  }

}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const [tubeMap, startPosition] = getTubeMap(lines)
  const steps = findFarthestPoint(tubeMap, startPosition)
  console.log(steps)
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