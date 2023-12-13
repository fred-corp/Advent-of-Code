# --- Day 13: \<name of challenge\> ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was relatively easy, although it was hard for me having only slept 4 hours...  
I checked if the lines for each group were the same to the left and right of a symmetry line, and the same for horizontal lines (*does this sentence even make sense ?*).  
I couldn't however figure out how to do part two in JS, so I looked at the AoC subreddit for some inspiration and found some Python one-liner black magic. I'll maybe revisit this in the future to try in JS and understand it better.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0  
For part two you'll need a python interpreter. I used Python 3.12

```zsh
node day13.js puzzleInputTest.txt
```

```zsh
python3.12 day13.py puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
405
The function "answerPartOne" took 1ms to run
```

```zsh
31108
```
