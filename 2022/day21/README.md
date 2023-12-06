# --- Day 21: Monkey Math ---

## Solution

The challenge was done in Python, with a timer decorator to measure the execution time.

I used [z3](https://github.com/Z3Prover/z3/wiki) to solve part two. It's a theorem prover, which is a fancy way of saying that it can solve mathematical problems by constraining the possible solutions. In this case, I used it to find the number that satisfies the constraints. **But**, while it worked for the example, my answer was too high for my personal input. It took me 45 minutes to find that I just needed to add a modulo constrain to the solver when a division has to be done to make it work.  
The output changed from `3916491093818` to `3916491093817`, which is [mildly infuriating](https://www.reddit.com/r/mildlyinfuriating/).

To run the solution, you need a working installation of [Python 3](https://www.python.org/downloads/). Then, run the following command from this directory:

```sh
python3 monkeyMath.py puzzleInputTest.txt
```

The output (with the specified dataset) should be:

```sh
Part one:

"partOne" took 22.394 ms to execute
152

Part two:

"partTwo" took 2456.393 ms to execute
301
```
