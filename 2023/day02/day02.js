// Advent of Code 2023: Day 2: Cube Conundrum
// https://adventofcode.com/2023/day/2
//
// Part one :
// There's a game with a certain amount of red, green and blue cubes; a round looks like this :
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
// Determine which games would've been impossible depending on the max amount of cubes
//
// Part two :
//
//
// Solution by Frédéric Druppel
// See repo for license

const timeIt = require('../timeIt')
const fs = require('fs')

const maxRed = 12
const maxGreen = 13
const maxBlue = 14

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  const games = text.split('\n')
  return games
}

function parseGame(game) {
  const gameParts = game.split(':')
  const gameNumber = gameParts[0].split(' ')[1]
  const rounds = gameParts[1].split(';')
  return [rounds, gameNumber]
}

function parseRound(round) {
  const roundParts = round.split(',')
  const cubes = [0, 0, 0]
  for (let i = 0; i < roundParts.length; i++) {
    const cube = roundParts[i].split(' ')
    const color = cube[2]
    const amount = parseInt(cube[1])
    if (color === 'red') {
      cubes[0] = amount
    } else if (color === 'green') {
      cubes[1] = amount
    } else if (color === 'blue') {
      cubes[2] = amount
    }
  }

  return cubes
}

function checkRound(round) {
  const cubes = parseRound(round)
  const red = cubes[0]
  const green = cubes[1]
  const blue = cubes[2]
  if (red > maxRed || green > maxGreen || blue > maxBlue) {
    return false
  }
  return true
}

function checkGames(games) {
  const possibleGames = []
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const [rounds, gameNumber] = parseGame(game)
    let possible = true
    for (let j = 0; j < rounds.length; j++) {
      const round = rounds[j]
      if (!checkRound(round)) {
        possible = false
        break
      }
    }
    if (possible) {
      possibleGames.push(gameNumber)
    }
  }
  for (let i = 0; i < possibleGames.length; i++) {
    possibleGames[i] = parseInt(possibleGames[i])
  }
  const sum = possibleGames.reduce((a, b) => a + b, 0)
  return sum
}


function answerPartOne() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const games = parseFile(fileName)
  const possibleGames = checkGames(games)
  console.log(possibleGames)
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