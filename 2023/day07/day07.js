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

function getScore(cards) {
  let value = 0
  for (let i = 0; i < cards.length; i++) {
    for(let j = i + 1; j < cards.length; j++) {
      if (cards[i] === cards[j]) {
        value += 1
      }
    }
  }
  return value
}

function getHandType(hand, partTwo = false) {
  const cards = hand[0]
  let value = 0
  let newCards = cards

  value = getScore(newCards)
  
  if (partTwo) {
    const order = "AKQT98765432J"
    for(let i = 0; i < order.length-1; i++) {
      const stub = order[i]
      newCards = cards.replace(/J/g, stub)
      value = Math.max(value, getScore(newCards))
    }
  }
  return [cards, hand[1], value]

}

function sortHands(hands, partTwo = false) {
  const order = (!partTwo) ? "AKQJT98765432" : "AKQT98765432J"
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
  const hands = lines.map(line => createHand(line))
  const handTypes = hands.map(hand => getHandType(hand, true))
  const handsSorted = sortHands(handTypes, true)
  const gains = getGains(handsSorted)
  console.log(gains)
}

console.log("Part two:")
const timedAnswerPartTwo = timeIt(answerPartTwo)
timedAnswerPartTwo()