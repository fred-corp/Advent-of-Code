function timeIt(fn) {
  return function() {
    startTime = Date.now()
    const result = fn.apply(this, arguments)
    console.log(`The function "${fn.name}" took ${Date.now() - startTime}ms to run`)
    return result
  };
}

module.exports = timeIt