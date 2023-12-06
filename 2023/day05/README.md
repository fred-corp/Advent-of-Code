# --- Day 5: If You Give A Seed A Fertilizer ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was relatively easyand fast on first try, but the first way I did part two was absolutely not optimised as I tried every possible value in the ranges (which took more that 25 minutes to run). With some inspiration of other solutions (notably [this one](https://github.com/Noble-Mushtak/Advent-of-Code/blob/main/2023/day05/solution2.py)), I managed to find a way to calculate the answer in a few milliseconds by checking if a value is before, indide or after a source-destination change thing.  
This made the solution way more efficient, and it now runs in less than 10ms !

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day05.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The lowest location value is 35
The function "answerPartOne" took 2ms to run

Part two:
The lowest location value is 46
The function "answerPartTwo" took 6ms to run
```
