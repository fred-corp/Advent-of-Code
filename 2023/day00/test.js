const timeIt = require('../timeIt')

function add() {
  let sum = 0
  for (let i = 0; i < 100000000; i++) {
    sum += i
  }
  return sum
}

const timedAdd = timeIt(add)

timedAdd()
