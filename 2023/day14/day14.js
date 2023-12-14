// Advent of Code 2023: Day 14:
// https://adventofcode.com/2023/day/14
//
// Part one :
// From an input that looks like this : 
// O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....
// Shift all the 'O's to some direction, until they collide with a '#', another 'O' or the edge of the map.
// Shifting up would look like : 
// OOOO.#.O..
// OO..#....#
// OO..O##..O
// O..#.OO...
// ........#.
// ..#....#.#
// ..O..#.O.O
// ..O.......
// #....###..
// #....#....
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

function getMap(lines) {
  const map = []
  for (let i = 0; i < lines.length; i++) {
    map.push(lines[i].split(''))
  }
  return map
}

function rotateMap(map) {
  let newMap = []
  for (let x = 0; x < map[0].length; x++) {
    let column = []
    for (let y = 0; y < map.length; y++) {
      column.push(map[y][x])
    }
    newMap.push(column)
  }
  newMap.reverse()
  return newMap
}

function rotateMapBack(map) {
  let newMap = []
  for (let y = 0; y < map.length; y++) {
    let column = []
    for (let x = 0; x < map[y].length; x++) {
      column.push(map[x][y])
    }
    newMap.push(column.reverse())
  }
  return newMap
}

function tiltRight(map) {
  let newMap = []
  map.forEach(line => {
    const splittedLine = line.join('').split('#')
    let newLine = []
    splittedLine.forEach(elem => {
      const countO = elem.split('').filter(elem => elem === 'O').length
      const countDot = elem.split('').filter(elem => elem === '.').length
      const newElem = 'O'.repeat(countO) + '.'.repeat(countDot) + ''
      newLine.push(newElem)
    })
    newLine = newLine.join('#').split('')
    newMap.push(newLine)

  })
  return newMap
}

function calculateWeight(map) {
  let weight = 0
  for (let y = 0; y < map.length; y++) {
    const line = map[y].join('')
    const countO = line.split('').filter(elem => elem === 'O').length
    weight += countO * (map.length - y)
  }
  return weight
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const map = rotateMap(getMap(lines))
  const newMap = rotateMapBack(tiltRight(map))
  const weight = calculateWeight(newMap)
  console.log(weight)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

function tiltCycle(map) {
  let newMap = map
  newMap = rotateMapBack(newMap)
  newMap = tiltRight(newMap)
  newMap = rotateMapBack(newMap)
  newMap = tiltRight(newMap)
  newMap = rotateMapBack(newMap)
  newMap = tiltRight(newMap)
  newMap = rotateMapBack(newMap)
  newMap = tiltRight(newMap)
  
  return newMap
}

function calcCycles (map, cycles) {
  let newMap = rotateMap(rotateMap(map))
  let i = 0
  let states = {}
  while (i < cycles) {
    // just a bit of memoization to speed things up
    const joined = newMap.join('')
    if (states[joined]) {
      const cycleLength = i - states[joined]
      const cyclesLeft = cycles - i
      const cyclesToSkip = cyclesLeft % (cycleLength ** 2)
      i += cyclesToSkip
      if (i === cycles) {
        break
      }
    }
    states[joined] = i
    newMap = tiltCycle(newMap)
    i++
  }
  newMap = rotateMap(rotateMap(newMap))
  return calculateWeight(newMap)
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const map = getMap(lines)
  const weight = calcCycles(map, 1000000000)
  console.log(weight)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()