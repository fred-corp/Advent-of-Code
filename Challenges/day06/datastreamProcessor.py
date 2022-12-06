# Advent of Code 2022: Day 6: Tuning Trouble
# https://adventofcode.com/2022/day/6
#
# Part one :
# From a file containing a datastream, find the time marker in the datastream.
# The datastream looks like "mjqjpqmgbljsphdztnvjfqwrcgsmlb". The first time marker is the first character
# after the first 4 characters that are different from each other (in this case it is "g", after 7 characters).
# The goal is to find the place in the datastream where the time marker starts.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def findTimeMarker(filename):
  # open the file and read the data
  with open(filename, 'r') as f:
    data = f.read()

  # find the first 4 characters that are different from each other
  # the time marker starts after that
  for i in range(len(data)):
    window = [data[0+i], data[1+i], data[2+i], data[3+i]]
    if len(set(window)) == 4:
      return i+4


if __name__ == "__main__":
  print("Part one :")
  print(findTimeMarker(sys.argv[1]))
