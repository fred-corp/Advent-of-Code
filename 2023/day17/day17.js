// Advent of Code 2023: Day 17:
// https://adventofcode.com/2023/day/17
//
// Part one :
// From a map with weighed tiles, find the path with the least weight.
// It is no possible to go more than 3 tiles in the same direction.
// You start from the top left corner and must reach the bottom right corner.
//
// Part two :
//
//
// Solution by Frédéric Druppel
// See repo for license

const { get } = require('http')
const timeIt = require('../timeIt')
const fs = require('fs')

function parseFile(textFile) {
  const text = fs.readFileSync(textFile, 'utf8')
  const lines = text.split('\n')
  return lines
}

function getMap(lines) {
  const map = {}
  lines.forEach((line, x) => {
    line.split('').forEach((char, y) => {
      map[[x, y]] = parseInt(char)
    })
  })
  return map
}

function dijkstra(grid, startPosition, endPosition, maxDist) {
  const start = [startPosition, [0, 0]];
  const distance = new Map([[start, 0]]);
  const pathQueue = [[0, start]];

  while (pathQueue.length > 0) {
    const [_, tile] = pathQueue.shift();
    if (!tile[1].every((n) => -maxDist <= n && n <= maxDist)) {
      continue;
    }
    if (tile[0] === endPosition) {
      return distance.get(tile);
    }
    for (const v of getNeighbors(tile)) {
      if (!grid[v[0]]) {
        continue;
      }
      const alt = distance.get(tile) + grid[v[0]];
      if (alt < (distance.get(v) || Infinity)) {
        distance.set(v, alt);
        pathQueue.push([alt, v]);
        pathQueue.sort((a, b) => a[0] - b[0]);
      }
    }
  }
}

function getNeighbors(tile) {
  const [position, direction] = tile;
  const [x, y] = position;
  const [dx, dy] = direction;
  const neighbors = [];
  if (dx === 0) {
    neighbors.push([[x - 1, y], [-1, 0]]);
    neighbors.push([[x + 1, y], [1, 0]]);
  }
  if (dy === 0) {
    neighbors.push([[x, y - 1], [0, -1]]);
    neighbors.push([[x, y + 1], [0, 1]]);
  }
  if (dx > 0) {
    neighbors.push([[x + 1, y], [1, 0]]);
  }
  if (dx < 0) {
    neighbors.push([[x - 1, y], [-1, 0]]);
  }
  if (dy > 0) {
    neighbors.push([[x, y + 1], [0, 1]]);
  }
  if (dy < 0) {
    neighbors.push([[x, y - 1], [0, -1]]);
  }
  return neighbors;

}

function answerPartOne() {
  const fileName = process.argv[2] ? process.argv[2] : "puzzleInputTest.txt"
  const lines = parseFile(fileName)
  const map = getMap(lines)
  const start = [0, 0]
  const end = [lines.length - 1, lines[0].length - 1]
  const visited = dijkstra(map, start, end, 3)
  console.log(visited)
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