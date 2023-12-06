# --- Day 3: Gear Ratios ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

I didn't really find a pretty and short way to solve this challenge, so I just went with a brute force approach.  
By cycling through the characters in each line, we trigger a subroutine if we find a symbol (that is not a ```.```).  
This subroutine takes the previous, current and next line, plus the index of the symbol in the current line, checks if there are any values around it (and makes sure there aren't any duplicates) and adds them to a list. In case of part one we just add any value that is around any symbol, and in part two we only add values that are around a ```*``` if it has exactly two symbols around it.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day03.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
Sum of all symbols : 4361
The function "answerPartOne" took 8ms to run

Part two:
Sum of all ratios  : 467835
The function "answerPartTwo" took 4ms to run
```
