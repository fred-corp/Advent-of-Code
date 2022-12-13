# Advent of Code 2022: Day 13: Distress Signal
# https://adventofcode.com/2022/day/13
#
# Part one :
# From a file containing pairs of inputs separated by a blank line,
# compare the first input with the second input. Inputs are arrays containing
# integers or arrays. Check if the input pairs are in the right order.
#
# Part two :
# Now sort all the inputs ignoring the blank lines. Use the compare function to see
# if two adjacent inputs are in the right order.
# Next, find the index of the first divider, and the index of the second divider, and multiply them.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def sumSortedGroupIndexes(filename):
  inputs = parseFile(filename)

  index = 1
  indexSum = 0
  for input in inputs:
    isInOrder = compare(input[0], input[1]) > 0
    if isInOrder:
      indexSum += index
    index += 1

  return indexSum


@timeit
def findDividerIndexProduct(filename, divider0, divider1):
  inputs = parseFile(filename, 2)
  
  if divider0 not in inputs:
    inputs.append(divider0)
  if divider1 not in inputs:
    inputs.append(divider1)

  quickSort(inputs, 0, len(inputs)-1)

  index0 = inputs.index(divider0) + 1
  index1 = inputs.index(divider1) + 1

  return index0 * index1


def parseFile(filename, part=1):
  with open(filename, 'r') as file:
    lines = file.readlines()

  inputs = []
  if part == 1:
    for i in range(0, len(lines), 3):
      inputs.append((eval(lines[i].strip()), eval(lines[i+1].strip())))
    
    return inputs
  
  for line in lines:
    line = line.strip()
    if line != '':
      inputs.append(eval(line))
  return inputs

def compare(input1, input2):
  if type(input1) == int and type(input2) == int:
    return input2 - input1
  elif type(input1) == list and type(input2) == list:
    for new1, new2 in zip(input1, input2):
      comparison = compare(new1, new2)
      if comparison:
        return comparison
    return len(input2) - len(input1)
  else:
    if type(input1) == int:
      return compare([input1], input2)
    elif type(input2) == int:
      return compare(input1, [input2])

# Suggested by Copilot
def quickSort(array, start, end):
  if start < end:
    pivot = partition(array, start, end)
    quickSort(array, start, pivot-1)
    quickSort(array, pivot+1, end)

# Suggested by Copilot, adapted to use compare function
def partition(array, start, end):
  pivot = array[end]
  i = start - 1
  for j in range(start, end):
    if compare(array[j], pivot) > 0:
      i += 1
      array[i], array[j] = array[j], array[i]
  array[i+1], array[end] = array[end], array[i+1]
  return i+1




if __name__ == '__main__':
  print("Part One :")
  print(sumSortedGroupIndexes(sys.argv[1]))
  print()
  print("Part Two :")
  print(findDividerIndexProduct(sys.argv[1], [[2]], [[6]]))