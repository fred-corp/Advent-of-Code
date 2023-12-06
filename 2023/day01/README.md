# --- Day 1: Trebuchet?! ---

## Solution

The challenge was done in JavaScript, with a timer decorator to measure the execution time.

Part one was not that difficult, just replaced the characters that were not numbers with an empty string, and then added the first and last characters of the string.

Part two was more difficult to do in js without using jankyness (for me anyway). Ì tried using regeses, but string pieces like ```oneight``` should be matched as ```one``` and ```eight```, but it was matching only ```one```.  
I ended up by checking a first time, replacing the spelled out digits with their string equivalent plus their last letter (if it could be the first letter of another spelled out digit), and then checking again.  
For example, ```zoneight23five``` would become ```1eight235e```, and then that would become ```[1, eight, 2, 3, 5]```. Then that list is checked for the strings to be replaced with their number equivalent, and the sum of the first and last is made.

To run the solution, you'll need a javascript interpreter. I used Node.js v21.2.0  
Just run the following command in the folder of the day:

```zsh
node day01.js puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The sum of the calibration data is 142.
The function "answerPartOne" took 2ms to run

Part two:
The sum of the calibration data is 142.
The function "answerPartTwo" took 6ms to run
```

```zsh
node day01.js puzzleInputTest2.txt
```

The output (with the specified dataset) should be:

```zsh
Part one:
The sum of the calibration data is NaN.
The function "answerPartOne" took 2ms to run

Part two:
The sum of the calibration data is 281.
The function "answerPartTwo" took 6ms to run
```
