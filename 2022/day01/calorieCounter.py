# Advent of Code 2022: Day 1: Calorie counting
# https://adventofcode.com/2022/day/1
#
# Part one :
# From a text file, make the sum of the group of numbers separated by a blank line
# and output the largest sum with the number of the group
#
# Part two :
# From a text file, make the sum of the 3 groups of numbers with the largest
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def findLargestGroup(fileName):
  # Read the lines of the input file
  with open(fileName, "r") as f:
    lines = f.readlines()

  sum = 0
  maxSum = 0
  maxGroup = 0
  group = 0

  for line in lines:
    # Create a new group if the line is empty
    if line == "\n":
      if sum > maxSum:
        maxSum = sum
        maxGroup = group
      sum = 0
      group += 1
    else:
      # Remove the newline character and add the number to the sum
      sum += int(line.strip())
  
  return maxSum, maxGroup

@timeit
def sum3LargestGroups(fileName):
  # Read the lines of the input file
  with open(fileName, "r") as f:
    lines = f.readlines()

  sums = []
  sum = 0
  for line in lines:
    # Create a new group if the line is empty
    if line == "\n":
      sums.append(sum)
      sum = 0
    else:
      # Remove the newline character and add the number to the sum
      sum += int(line.strip())
  sums.append(sum)

  sums.sort(reverse=True)

  return sums[0] + sums[1] + sums[2], sums[0], sums[1], sums[2]


if __name__ == "__main__":
  fileName = sys.argv[1]
  maxSum, maxGroup = findLargestGroup(fileName)
  print("The largest sum is {} in group {}".format(maxSum, maxGroup))
  sum3, g1, g2, g3 = sum3LargestGroups(fileName)
  print("The sum of the 3 largest groups is {} ({} + {} + {})".format(sum3, g1, g2, g3))
