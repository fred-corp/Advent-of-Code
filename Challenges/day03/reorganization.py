# Advent of Code 2022: Day 3: Rucksack Reorganization
# https://adventofcode.com/2022/day/3
# 
# Part one :
# 
# From a text file containing lines that represent the items in a rucksack,
# calculate the priority of the items that are in both halves of the rucksack.
# Each line has to be split in half to get the content of each half of the rucksack.
# Lowercase item types a through z have priorities 1 through 26, uppercase item 
# types A through Z have priorities 27 through 52.
#
#
# Part two :
#
# Elves are now divided in groups of 3; each group has a badge that corresponds
# to the only item carried by the group, and it has to be determined from the content of
# the rucksacks.
# Every set of 3 lines in the input file represents a group of 3 elves.
# The priority of a group corresponds to the value of the badge of the group.
# The objective if to calculate the sum of the priorities of all the groups.
# 
# 
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def calculatePrioritySum(fileName):
  with open(fileName, "r") as f:
    lines = f.readlines()

  priority = 0
  for line in lines:
    line = line.strip()
    # Split line in half
    half = len(line) // 2
    halves = (line[:half], line[half:])

    # Find common items in both halves
    commonItems = set(halves[0]).intersection(set(halves[1]))

    # Calculate priority
    for item in commonItems:
      if item.islower():
        priority += ord(item) - 96
      else:
        priority += ord(item) - 38
      
  return priority

@timeit
def calculateGroupPrioritySum(fileName):
  with open(fileName, "r") as f:
    lines = f.readlines()
  
  priority = 0
  for i in range(0, len(lines), 3):
    line1 = lines[i].strip()
    line2 = lines[i+1].strip()
    line3 = lines[i+2].strip()

    # Find common items in all 3 lines
    commonItems = set(line1).intersection(set(line2)).intersection(set(line3))

    # Calculate priority
    for item in commonItems:
      if item.islower():
        priority += ord(item) - 96
      else:
        priority += ord(item) - 38

  return priority




if __name__ == '__main__':
  print("Part one :")
  print("Sum of priorities is : {}".format(calculatePrioritySum(sys.argv[1])))
  print()
  print("Part two :")
  print("Sum of group priorities is : {}".format(calculateGroupPrioritySum(sys.argv[1])))