# --- Day 10: Pipe Maze ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was easy enough, just go to the direction pointed by the tile you're on, and count the steps.

Part two is not that much complicated; the tricky part was finding an efficient algorithm to check if a tile is inside or outside of the loop. I ended up counting the amount of walls going from left to right, and if that amount was not divisible by 2, then the tile is inside the loop.  
That didn't work at first because I forgot to check for double corners (for example down-right-down or up-right-up) and it took me an embarrassing amount of time to find that out, but after fixing that, it worked like a charm !

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day10.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
Steps to farthest point: 4
The function "answerPartOne" took 0ms to run

Part two:
Amount of enclosed tiles: 8
The function "answerPartTwo" took 1ms to run
```
