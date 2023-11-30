# Advent of Code 2022: Day 6: Tuning Trouble
# https://adventofcode.com/2022/day/6
#
# Part one :
# From a file containing a datastream, find the time marker in the datastream.
# The datastream looks like "mjqjpqmgbljsphdztnvjfqwrcgsmlb". The first time marker is the first character
# after the first 4 characters that are different from each other (in this case it is "g", after 7 characters).
# The goal is to find the place in the datastream where the time marker starts.
#
# Part two :
# Same as part one, but this time we need to find a message marker, 
# which consist of 14 characters that are different from each other.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def findFirstTimeMarker(filename):
  # open the file and read the data
  with open(filename, 'r') as f:
    data = f.read()

  # find the first 4 characters that are different from each other
  # the time marker starts after that
  return findNDifferentCharacters(data, 4)


@timeit
def findFirstMessageMarker(filename):
  # open the file and read the data
  with open(filename, 'r') as f:
    data = f.read()

  # find the first 14 characters that are different from each other
  # the message marker starts after that
  return findNDifferentCharacters(data, 14)

def findNDifferentCharacters(data, n):
  # find the first n characters that are different from each other
  for i in range(len(data)):
    window = data[i:i+n]
    if len(set(window)) == n:
      return i+n

if __name__ == "__main__":
  print("Part one :")
  print(findFirstTimeMarker(sys.argv[1]))
  print()
  print("Part two :")
  print(findFirstMessageMarker(sys.argv[1]))
