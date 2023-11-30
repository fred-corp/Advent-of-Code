// Test of day 1 of 2022 in js

// From a text file, make the sum of the group of numbers separated by a blank line
// and output the largest sum with the number of the group

// parse a text file and return an array of array of numbers

const timeIt = require('../timeIt')


function parseFile(textFile) {
  const fs = require('fs')
  const text = fs.readFileSync(textFile, 'utf8')
  const lines = text.split('\n')
  let groups = []
  let group = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      groups.push(group)
      group = []
    } else {
      group.push(Number(lines[i]))
    }
  }
  groups.push(group)
  return groups
}

// sum the numbers in an array
function sumArray(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum
}

// find the largest sum in an array of arrays
function largestSum(array) {
  let largest = 0
  let largestIndex = 0
  for (let i = 0; i < array.length; i++) {
    let sum = sumArray(array[i])
    if (sum > largest) {
      largest = sum
      largestIndex = i
    }
  }
  return [largest, largestIndex]
}

function answerPartOne() {
  const testArray = parseFile('puzzleInput.txt')
  const testSum = largestSum(testArray)
  console.log(testSum)
}

const timedAnswerPartOne = timeIt(answerPartOne)

timedAnswerPartOne()

function threeLargestSum(arrayOfArrays) {
  let sums = []
  for (let i = 0; i < arrayOfArrays.length; i++) {
    sums.push(sumArray(arrayOfArrays[i]))
  }
  // sort the sums from largest to smallest
  sums.sort((a, b) => b - a)
  // return the sum of the three largest
  return [sums[0] + sums[1] + sums[2], sums[0], sums[1], sums[2]]
}

function answerPartTwo() {
  const testArray = parseFile('puzzleInput.txt')
  const testSum = threeLargestSum(testArray)
  console.log(testSum)
}

const timedAnswerPartTwo = timeIt(answerPartTwo)

timedAnswerPartTwo()