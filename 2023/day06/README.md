# --- Day 6: Wait For It ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

I solved this challenge fairly easily (in around 20min), and I was able to reuse the code from part one to solve part two.  
Part two could be a bit better as it's not very efficient and takes time to solve (around 17 seconds), but it's good enough for the challenge.  

Edit : I couldn't resist and I optimized the code a bit. Instead of iterating every possible hold time, I used the quadratic formula to find the amount of ways yielding a greater distance than the record, and it now takes less than 1ms to solve part two.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day06.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
Product of all ways: 288
The function "answerPartOne" took 1ms to run

Part two:
Total ways: 71503
The function "answerPartTwo" took 0ms to run
```
