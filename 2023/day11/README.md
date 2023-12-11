# --- Day 11: Cosmic Expansion ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was just finding the manhattan distance between each pair of galaxies after expanding the universe by 2 for each empty row and column; part two was the same, but this time the universe was expanded by 1000000 for each empty row and column so the method I was using of expanding the universe discretely wasn't working anymore. I chose to skip the expansion altogether and just calculate the manhattan distance between each pair of galaxies, and add the expansion amount minus one for each empty row and column, which made of a much faster solution and an expandable code that can work for any amount of expansion.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day11.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The sum of the Manhattan distances is 374
The function "answerPartOne" took 1ms to run

Part two:
The sum of distances in a super expanded universe is 82000210
The function "answerPartTwo" took 0ms to run
```
