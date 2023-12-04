// Advent of Code 2023: Day 4: Scratchcards
// https://adventofcode.com/2023/day/4
//
// Part one :
// From a file with lines that look like this:
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// extract the first list of numbers and the second list of numbers
// and check if the secont list has numbers that are in the first list.
// THe card is worth 1 for the first match, then doubled three times 
// for each of the three matches after the first
//
// Part two :
//
//
// Solution by Frédéric Druppel
// See repo for license

const { get } = require('http')
const timeIt = require('../timeIt')
const fs = require('fs')
const { match } = require('assert')

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  const lines = text.split('\n')
  return lines
}

function parseLine(line) {
  const card = line.split(':')
  const [card1, card2] = card[1].split('|')
  let card1Numbers = card1.split(' ').map(x => parseInt(x))
  let card2Numbers = card2.split(' ').map(x => parseInt(x))

  // remove NaNs
  card1Numbers = card1Numbers.filter(x => !isNaN(x))
  card2Numbers = card2Numbers.filter(x => !isNaN(x))

  return [card1Numbers, card2Numbers]
}

function checkForMatches(card1, card2) {
  let matches = 0
  let score = 0
  for (let i = 0; i < card1.length; i++) {
    for (let j = 0; j < card2.length; j++) {
      if (card1[i] === card2[j]) {
        matches++
        if (score === 0) { score = 1 } 
        else { score *= 2 }
      }
    }
  }
  return [matches, score]
}

function getMatches(lines){
  let score = 0
  for (let i = 0; i < lines.length; i++) {
    const [card1, card2] = parseLine(lines[i])
    score += checkForMatches(card1, card2)[1]
  }
  return score

}

function answerPartOne() {
  fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  console.log(getMatches(lines))
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