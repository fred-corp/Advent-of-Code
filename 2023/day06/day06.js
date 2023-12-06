// Advent of Code 2023: Day 6: Wait For It
// https://adventofcode.com/2023/day/6
//
// Input :
// Time:      7  15   30
// Distance:  9  40  200

// Part one :
// Distance = (Time - holdTime)*holdTime
// Calculate the amount of ways to get to farther than the record distance
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

function getGames(lines) {
  let games = []
  let times = []
  lines.forEach(line => {
    times.push(line.split(' ')
                      .slice(1)
                      .map(time => parseInt(time))
                      .filter(time => !isNaN(time))
                      .filter(time => time !== undefined)
                      )
  })
  for (let i = 0; i < times[0].length; i++) {
    games.push([times[0][i], times[1][i]])
  }
  return games
}

function getDistance(time, holdTime) {
  return (time - holdTime) * holdTime
}

function getAmountOfWays(game) {
  let ways = 0
  for (let i = 0; i < game[0]; i++) {
    if (getDistance(game[0], i) > game[1]) {
      ways++
    }
  }
  return ways
}

function getAmountOfWaysProduct(games) {
  let product = 1
  games.forEach(game => {
    product *= getAmountOfWays(game)
  })
  return product
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const games = getGames(lines)
  console.log(getAmountOfWaysProduct(games))
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