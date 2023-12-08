# --- Day 8: Haunted Wasteland ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was fairly easy (just navigate and count), but for part two I started by trying to count everything at the same time, but that was taking too much time (maybe an infinite amount if my while function was wrong).  
After some thinking I came to the conclusion I could use the least common multiple of the steps from any node that starts with 'A' to any node that ends with 'Z' to calculate the total amount of steps.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day08.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
Navigation steps: 2
The function "answerPartOne" took 1ms to run

Part two:
Simultaneous navigation steps: 6
The function "answerPartTwo" took 0ms to run
```
