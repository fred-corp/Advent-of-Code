# --- Day 15: Beacon Exclusion Zone ---

## Solution

The challenge was done in Python, with a timer decorator to measure the execution time.

You probably saw there's a file called `failedAttempt.py` in this directory. I tried to solve this challenge the same way I did [Day 14](https://github.com/fred-corp/Advent-of-Code-2022/tree/main/Challenges/day14), but it didn't work because of the size of the dataset. I had to find another way to solve this challenge.  
So I went on the [r/adventofcode](https://www.reddit.com/r/adventofcode/) subreddit to find some inspiration for this challenge.  
For part one I calculated the chord of the covered area by each sensor at the specified line, and then counted the number of points that were not covered by any sensor.  
For part two I used a module called [z3-solver](https://pypi.org/project/z3-solver/), which is used to solve part two by constraint programming.

To run the solution, you need a working installation of [Python 3](https://www.python.org/downloads/). Then, run the following command from this directory:

```sh
python3 findBeacon.py puzzleInput.txt
```

The output (with the specified dataset) should be:

```sh
Part one :

"findImpossibleBeacons" took 343.665 ms to execute
26

Part two :

"calcBeaconFrequency" took 318.806 ms to execute
56000011
```
