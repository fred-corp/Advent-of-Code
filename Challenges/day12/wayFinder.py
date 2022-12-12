# Advent of Code 2022: Day 12: Hill Climbing Algorithm
# https://adventofcode.com/2022/day/12
#
# Part one :
# The input file is a grid corresponding to a heightmap.
# Each height on the grid is given by a lowercase letter, a is the lowest, z is the highest.
# Also contained in the file is a starting position "S", with height a, and ending position "E", with height z.
# You'd like to reach E, but to save energy, you should do it in as few steps as
# possible. During each step, you can move exactly one square up, down, left, or right. The elevation
# of the destination square can be at most one higher than the elevation of your current square.
# Find the shortest path and count the steps.
#
#
# Part two :
# Now we need to find a better starting point. We'll use the same algorithm as in part one, but
# we'll try all the possible starting points ("a"), and keep the shortest path.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from collections import deque # We'll use a deque to store some values, easier to pop from the left

@timeit
def partOne(filename):
  with open(filename, 'r') as file:
    lines = file.readlines()
  
  grid = []
  for line in lines:
    grid.append(list(line.strip()))
  
  heightmap, positions = parseGrid(grid)
  
  return fewestSteps(positions, heightmap)

@timeit
def partTwo(filename):
  with open(filename, 'r') as file:
    lines = file.readlines()

  grid = []
  for line in lines:
    grid.append(list(line.strip()))

  heightmap, positions = parseGrid(grid)

  return fewestSteps(positions, heightmap, part=2)


def parseGrid(grid):
  heightmap = [[0 for _ in range(len(grid[0]))] for _ in range(len(grid))]
  positions = {}
  for y in range(len(grid)):
    for x in range(len(grid[y])):
      if grid[y][x] == 'S':
        positions['start'] = (x, y)
        heightmap[y][x] = 0
      elif grid[y][x] == 'E':
        positions['end'] = (x, y)
        heightmap[y][x] = 26
      else:
        heightmap[y][x] = letterToHeight(grid[y][x])
  return heightmap, positions

def letterToHeight(letter):
  return ord(letter) - ord('a') + 1

def fewestSteps(positions, heightmap, part=1):
  possiblePositions = deque()
  visited = set()
  if part == 1:
    # Only add the starting position
    possiblePositions.append((positions['start'], 0))

  elif part == 2:
    # Add all the possible starting positions ("a")
    for x in range(len(heightmap[0])):
      for y in range(len(heightmap)):
        if heightmap[y][x] == 1:
          possiblePositions.append(([x, y], 0))

  while possiblePositions:
    (x, y), step = possiblePositions.popleft()
    if (x, y) in visited:
      continue

    visited.add((x, y))

    if (x, y) == positions['end']:
      return step

    for deltaX, deltaY in [(-1, 0), (0, 1), (1, 0), (0, -1)]:
      newX = x + deltaX
      newY = y + deltaY
      if 0 <= newX < len(heightmap[0]) and 0 <= newY < len(heightmap) and heightmap[newY][newX] - heightmap[y][x] <= 1:
        possiblePositions.append(([newX, newY], step + 1))

  return -1



if __name__ == '__main__':
  print("Part one :")
  print(partOne(sys.argv[1]))
  print()
  print("Part two :")
  print(partTwo(sys.argv[1]))