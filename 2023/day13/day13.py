# inspired by https://github.com/oliver-ni/advent-of-code/blob/master/py/2023/day13.py

import sys

rows = 0
cols = 0

f = open(sys.argv[1] if len(sys.argv) > 1 else "puzzleInputTest.txt", "r")

def checkSymmetry(group):
  for symmetryLine in range(1, len(group)):
    differs = sum( leftLine != rightLine for left, right in zip(group[:symmetryLine][::-1], group[symmetryLine:]) for leftLine, rightLine in zip(left, right))
    if differs == 1:
      return symmetryLine

for group in f.read().split("\n\n"):
  group = group.splitlines()
  if rowSymmetry := checkSymmetry([*zip(*group)]):
    rows += rowSymmetry
  if colSymmetry := checkSymmetry(group):
    cols += colSymmetry * 100

print(rows+cols)