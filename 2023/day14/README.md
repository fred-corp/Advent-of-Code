# --- Day 14: \<name of challenge\> ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Day 14's challenge was fun to do. Part 1 was quite self-explanatory, and part 2 was just a cycle of part 1 with memoization to speed up the process.  
I tried part 2 directly on my input which gave me the correct answer, but for some reason it doesn't work on the example input (it should give 64 but gives 65), and I'm not sure why...

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day14.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
136
The function "answerPartOne" took 2ms to run

Part two:
65
The function "answerPartTwo" took 5ms to run
```
