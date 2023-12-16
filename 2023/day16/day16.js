// Advent of Code 2023: Day 16:
// https://adventofcode.com/2023/day/16
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

function getMap(lines){
  let map = {}
  lines.forEach((line, x) => {
    line.split('').forEach((tile, y) => {
      map[[x, y]] = tile
    })
  })
  return map
}



function propagateLight(map, lightPosition, startDirection){
  let tileQueue = [[lightPosition, startDirection]]
  let litPositions = {}

  const UP = [-1, 0]
  const DOWN = [1, 0]
  const LEFT = [0, -1]
  const RIGHT = [0, 1]

  while(tileQueue.length > 0){
    let [tile, direction] = tileQueue.shift()
    if(!(tile in map) || [tile, direction] in litPositions){
      continue
    }

    litPositions[[tile, direction]] = tile
    let newTile = []
    switch(map[tile]){
      case '\\' : 
        direction = [direction[1], direction[0]]
        newTile = [tile[0] + direction[0], tile[1] + direction[1]]
        tileQueue.push([newTile, direction])
        break
      case "/" :
        direction = [-direction[1], -direction[0]]
        newTile = [tile[0] + direction[0], tile[1] + direction[1]]
        tileQueue.push([newTile, direction])
        break
      case "-" :
        if (direction[1] === 0 ) {
          newTile = [tile[0] + LEFT[0], tile[1] + LEFT[1]]
          tileQueue.push([newTile, LEFT])
          newTile = [tile[0] + RIGHT[0], tile[1] + RIGHT[1]]
          tileQueue.push([newTile, RIGHT])
        }
        else {
          newTile = [tile[0] + direction[0], tile[1] + direction[1]]
          tileQueue.push([newTile, direction])
        }
        break
      case "|" :
        if (direction[0] === 0 ) {
          newTile = [tile[0] + UP[0], tile[1] + UP[1]]
          tileQueue.push([newTile, UP])
          newTile = [tile[0] + DOWN[0], tile[1] + DOWN[1]]
          tileQueue.push([newTile, DOWN])
        }
        else {
          newTile = [tile[0] + direction[0], tile[1] + direction[1]]
          tileQueue.push([newTile, direction])
        }
        break
      default :
        newTile = [tile[0] + direction[0], tile[1] + direction[1]]
        tileQueue.push([newTile, direction])
        break
    }
  }
  let litPositionSet = {}
  Object.keys(litPositions).forEach((key) => {
    litPositionSet[litPositions[key]] = true
  })
  return Object.keys(litPositionSet).length
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const map = getMap(lines)
  const lightPosition = [0, 0]
  const startDirection = [0, 1]
  const litPositions = propagateLight(map, lightPosition, startDirection)
  console.log(litPositions)
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