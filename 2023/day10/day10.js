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

  let direction = ''
  let nextPosition = []
  let steps = 0
  let startTube = {hasUp: false, hasDown: false, hasLeft: false, hasRight: false, isLetter: ''}

  if (tubeMap[currentPosition[0] - 1][currentPosition[1]] === '|' || tubeMap[currentPosition[0] - 1][currentPosition[1]] === 'F' || tubeMap[currentPosition[0] - 1][currentPosition[1]] === '7') {
    direction = 'up'
    nextPosition = [currentPosition[0] - 1, currentPosition[1]]
    startTube.hasUp = true
  }
  if (tubeMap[currentPosition[0] + 1][currentPosition[1]] === '|' || tubeMap[currentPosition[0] + 1][currentPosition[1]] === 'L' || tubeMap[currentPosition[0] + 1][currentPosition[1]] === 'J') {
    direction = 'down'
    nextPosition = [currentPosition[0] + 1, currentPosition[1]]
    startTube.hasDown = true
  }
  if (tubeMap[currentPosition[0]][currentPosition[1] - 1] === '-' || tubeMap[currentPosition[0]][currentPosition[1] - 1] === 'F' || tubeMap[currentPosition[0]][currentPosition[1] - 1] === 'L') {
    direction = 'left'
    nextPosition = [currentPosition[0], currentPosition[1] - 1]
    startTube.hasLeft = true
  }
  if (tubeMap[currentPosition[0]][currentPosition[1] + 1] === '-' || tubeMap[currentPosition[0]][currentPosition[1] + 1] === '7' || tubeMap[currentPosition[0]][currentPosition[1] + 1] === 'J') {
    direction = 'right'
    nextPosition = [currentPosition[0], currentPosition[1] + 1]
    startTube.hasRight = true
  }

  if (startTube.hasUp && startTube.hasDown) {
    startTube.isLetter = '|'
  }
  if (startTube.hasLeft && startTube.hasRight) {
    startTube.isLetter = '-'
  }
  if (startTube.hasUp && startTube.hasRight) {
    startTube.isLetter = 'L'
  }
  if (startTube.hasUp && startTube.hasLeft) {
    startTube.isLetter = 'J'
  }
  if (startTube.hasDown && startTube.hasRight) {
    startTube.isLetter = 'F'
  }
  if (startTube.hasDown && startTube.hasLeft) {
    startTube.isLetter = '7'
  }


  let tubes = {}

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
      return [steps, tubes, startTube.isLetter]
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

    tubes[currentPosition] = currentTube
    currentPosition = nextPosition
    steps++
  }

}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const [tubeMap, startPosition] = getTubeMap(lines)
  const [steps, tubes, startLetter] = findFarthestPoint(tubeMap, startPosition)
  console.log(`Steps to farthest point: ${steps/2|0}`)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function findEnclosedTiles(tubeMap, tubes, startLetter) {
  let enclosedTiles = []
  for(y = 0; y < tubeMap.length; y++) {
    let inside = false
    let tubeCount = 0
    let previousTube = ''
    for(x = 0; x < tubeMap[y].length; x++) {
      // check if we are within % 2 of a tube in tubes
      let tube = tubes[[y, x]]
      if (tube !== undefined && tube !== '-') {
        if (tube === 'S') {
          tube = startLetter
        }
        tubeCount++
        if ((tube === 'J' && previousTube === 'F') || (tube === '7' && previousTube === 'L')) {
          tubeCount--
        }
        previousTube = tube
        if (tubeCount % 2 === 1) {
          inside = true
        } else {
          inside = false
        }
      }
      if (inside && tube === undefined) {
        enclosedTiles.push([y, x])
      }
    }
  }

  return enclosedTiles.length
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest2.txt"
  const lines = parseFile(fileName)
  const [tubeMap, startPosition] = getTubeMap(lines)
  const [steps, tubes, startLetter] = findFarthestPoint(tubeMap, startPosition)
  const enclosedTiles = findEnclosedTiles(tubeMap, tubes, startLetter)
  console.log(`Amount of enclosed tiles: ${enclosedTiles}`)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()