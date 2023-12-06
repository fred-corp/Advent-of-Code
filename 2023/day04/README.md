# --- Day 4: Scratchcards ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

As these challenges unlock at 6am where I live, my brain has sometimes difficulties to understand the problem correctly on first read; that's why I lost about 20 minutes wondering what the phrase "That means card 1 is worth **```8```** points (1 for the first match, then doubled three times for each of the three matches after the first)." in part one actually meant. Once I figured that out it was pretty straightforward.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0

```zsh
node day04.js puzzleInput.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The sum of scores is 13 points
The function "answerPartOne" took 7ms to run

Part two:
The amount of cards in the pile is 30
The function "answerPartTwo" took 2ms to run
```
