# Advent of Code 2022: Day 4: Camp Cleanup
# https://adventofcode.com/2022/day/4
#
# Part one :
# From a list of pair of ranges, find the amount of pairs where a range is fully contained in the other range.
# For example, pair "2-23, 5-8" is valid because the range 5-8 is fully contained in the range 2-23.
#
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def calculateValidPairs(fileName):
  with open(fileName, "r") as f:
    lines = f.readlines()

  validPairs = 0
  for line in lines:
    line = line.strip()
    # split the line at the comma
    ranges = line.split(",")

    # split the ranges into start and end
    range1 = ranges[0].split("-")
    range2 = ranges[1].split("-")

    # convert the ranges to integers
    range1 = (int(range1[0]), int(range1[1]))
    range2 = (int(range2[0]), int(range2[1]))

    # check if range1 is fully contained in range2
    if range1[0] >= range2[0] and range1[1] <= range2[1]:
      validPairs += 1
      continue

    # check if range2 is fully contained in range1
    if range2[0] >= range1[0] and range2[1] <= range1[1]:
      validPairs += 1
      continue

  return validPairs


if __name__ == '__main__':
  print("Part one :")
  print(calculateValidPairs(sys.argv[1]))
