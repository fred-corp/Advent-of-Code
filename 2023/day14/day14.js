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
  let mapCopy = rotateMap(map)
  let weight = 0
  for (let y = 0; y < mapCopy.length; y++) {
    const line = mapCopy[y].join('')
    const countO = line.split('').filter(elem => elem === 'O').length
    weight += countO * (y + 1)
  }
  return weight
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const map = rotateMap(getMap(lines))
  const newMap = tiltRight(map)
  const weight = calculateWeight(newMap)
  console.log(weight)
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