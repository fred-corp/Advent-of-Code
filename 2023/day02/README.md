# --- Day 2: Cube Conundrum ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

In part one I chose to divide the little subtasks in their own functions. I can maybe spaghettify the code, but it meant that I could reuse a lot for part two instead of having to rewrite everything.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day02.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The sum of the IDs of possible games is 8
The function "answerPartOne" took 1ms to run

Part two:
The sum of the powers of every game set is 2286
The function "answerPartTwo" took 2ms to run
```
