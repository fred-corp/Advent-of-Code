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
// input becomes : 
// Time:      71530
// Distance: 940200
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

// Part one
function getGames(lines) {
  let games = []
  let numbers = []
  lines.forEach(line => {
    numbers.push(line.split(' ')
                      .slice(1)
                      .map(num => parseInt(num))
                      .filter(num => !isNaN(num))
                      .filter(num => num !== undefined)
                      )
  })
  for (let i = 0; i < numbers[0].length; i++) {
    games.push([numbers[0][i], numbers[1][i]])
  }
  return games
}

function getDistance(time, holdTime) {
  return (time - holdTime) * holdTime
}

function getAmountOfWays(game, optimized = false) {
  let ways = 0
  if (!optimized) {
    for (let i = 0; i < game[0]; i++) {
      if (getDistance(game[0], i) > game[1]) {
        ways++
      }
    }
  }
  else {
    //  - holdTime**2 + holdTime*time - distance > 0
    // Use the bazooka ( a joke my math teacher used to say when we used the quadratic formula)
    const rho = game[0] ** 2 - (4 * game[1])
    const holdTime1 = (game[0] + Math.sqrt(rho)) / 2 | 0
    const holdTime2 = (game[0] - Math.sqrt(rho)) / 2 | 0
    ways = Math.max(holdTime1, holdTime2) - Math.min(holdTime1, holdTime2) | 0
  }
  return ways
}

function getAmountOfWaysProduct(games) {
  let product = 1
  games.forEach(game => {
    product *= getAmountOfWays(game, true)
  })
  return product
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const games = getGames(lines)
  console.log(`Product of all ways: ${getAmountOfWaysProduct(games)}`)
}

console.log("Part one:")
const timedAnswerPartOne = timeIt(answerPartOne)
timedAnswerPartOne()

console.log()

// Part two
function getGame(lines){
  let game = []
  lines.forEach(line => {
    game.push(line.split(':')[1]
                  .split(' ')
                  .map(num => parseInt(num))
                  .filter(num => !isNaN(num))
                  .filter(num => num !== undefined)
                  .join('')
                  )
  })
  game = game.map(num => parseInt(num))
  return game
}

function answerPartTwo() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const game = getGame(lines)
  console.log(`Total ways: ${getAmountOfWaysProduct([game])}`)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()