// Advent of Code 2023: Day 13: Point of Incidence
// https://adventofcode.com/2023/day/13
//
// Part one :
// check for horizontal and vertical symmetry in groups of strings
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


function getGroups(lines) {
  const groups = []
  let group = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      groups.push(group)
      group = []
    } else {
      group.push(lines[i])
    }
  }
  groups.push(group)
  return groups
}

function findReflection(group) {
  let symmetry = 0

  for (let depth = 1; depth < group[0].length; depth++) {
    // check if the pattern is the same forwards and backwards
    // for each group
    let same = true
    for (let j = 0; j < group.length; j++) {
      let row = group[j]
      let rowLength = row.length
      let rowStart = row.substring(0, depth).split("").reverse().join("")
      let rowStartLength = rowStart.length
      let rowEnd = row.substring(depth)
      let rowEndLength = rowEnd.length
      let minLen = Math.min(rowStartLength, rowEndLength)

      for (let k = 0; k < minLen; k++) {
        if (rowStart[k] !== rowEnd[k]) {
          same = false
          break
        }
      }
    }
    if (same) {
      symmetry = depth
    }

  }
  return symmetry

}

function checkGroups(groups) {
  let rowNums = []
  let colNums = []
  groups.forEach(group => {
    let symmetryCol = findReflection(group)
    
    let newGroup = []
    for (let i = 0; i < group[0].length; i++) {
      let newRow = []
      for (let j = 0; j < group.length; j++) {
        newRow.push(group[j][i])
      }
      newGroup.push(newRow.join(""))
    }
    let symmetryRow = findReflection(newGroup)
    
    if (symmetryCol > symmetryRow) {
      colNums.push(symmetryCol)
    }
    else {
      rowNums.push(symmetryRow)
    }
  })
  let rowSum = rowNums.reduce((a, b) => a + b, 0)*100
  let colSum = colNums.reduce((a, b) => a + b, 0)

  return rowSum + colSum
}


function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const groups = getGroups(lines)
  console.log(checkGroups(groups))
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