// Advent of Code 2023: Day x:
// https://adventofcode.com/2023/day/x
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

function createHand(line) {
  let hand = line.split(' ')
  return hand
}

function getHandType(hand) {
  const cards = hand[0]

  let value = 0
  for (let i = 0; i < cards.length; i++) {
    for(let j = i + 1; j < cards.length; j++) {
      if (cards[i] === cards[j]) {
        value += 1
      }
    }
  }
  return [cards, hand[1], value]

}

function sortHands(hands) {
  const order = "AKQJT98765432"
  const sortedHands = hands.sort((a, b) => {
    if (a[2] < b[2]) {
      return -1
    }
    if (a[2] > b[2]) {
      return 1
    }
    if (a[2] === b[2]) {
      for (let i = 0; i < a[0].length; i++) {
        if (order.indexOf(a[0][i]) < order.indexOf(b[0][i])) {
          return 1
        }
        if (order.indexOf(a[0][i]) > order.indexOf(b[0][i])) {
          return -1
        }
        if (order.indexOf(a[0][i]) === order.indexOf(b[0][i])) {
          
        }
      }
    }
  })
  return sortedHands
}

function getGains(handsSorted){
  let gains = 0
  for(let i = 0; i < handsSorted.length; i++) {
    gains += (i + 1) * handsSorted[i][1]
  }
  return gains
}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const hands = lines.map(line => createHand(line))
  const handTypes = hands.map(hand => getHandType(hand))
  const handsSorted = sortHands(handTypes)
  const gains = getGains(handsSorted)
  console.log(gains)
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