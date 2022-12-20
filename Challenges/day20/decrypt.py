# Advent of Code 2022: Day 20: Grove Positioning System
# https://adventofcode.com/2022/day/20
#
# Part one:
# Consider the encrypted list [1, 2, -3, 3, -2, 0, 4], move the items to the left or 
# right by the value of the current item.
# If the value is negative, move to the left, otherwise move to the right
# Wrap around the list if the index is out of range.
# then, find the value at the 1000th, 2000th and 3000th position
# after the position of item 0 (wrap around if necessary), and take the sum of those values
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def partOne(filename):
  with open(filename) as f:
    lines = f.readlines()

  # Parse input
  input = [(value, index) for (index, value) in enumerate([int(line) for line in lines])]

  input = mixList(input)
  length = len(input)

  # Find the index of the value 0
  for zeroIndex in range(length):
    if input[zeroIndex][0] == 0:
      break

  # Get the values at the indices 1000, 2000 and 3000
  coord1 = input[(zeroIndex + 1000) % length][0]
  coord2 = input[(zeroIndex + 2000) % length][0]
  coord3 = input[(zeroIndex + 3000) % length][0]
  return coord1 + coord2 + coord3


def mixList(input):
  # Get the length of the input
  length = len(input)
  
  # Loop through the input
  for i in range(length):
    # Find the index of the current value
    for j in range(length):
      if input[j][1] == i:
        break
    # Get the value
    value = input[j][0]
    # Remove the value from the list
    input.pop(j)
    # Calculate the new index
    j = (j + value) % (length - 1)
    # Insert the value at the new index
    input.insert(j, (value, i))
  return input




if __name__ == "__main__":
  print("Part one:")
  print(partOne(sys.argv[1]))