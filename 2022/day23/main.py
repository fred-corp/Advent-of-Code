# Advent of Code 2022: Day 23: Unstable Diffusion
# https://adventofcode.com/2022/day/23
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from collections import deque

@timeit
def partOne(filename):
  with open(filename, 'r') as f:
    lines = f.readlines()

  grid = []
  for line in lines:
    grid.append(list(line.strip()))
  
  moves = deque()
  moves.append((0, -1))
  moves.append((0, 1))
  moves.append((1, 0))
  moves.append((-1, 0))

  for i in range(10):
    if not all([col == "." for col in grid[0]]):
      grid.insert(0, ["." for _ in range(len(grid[0]))])
    if not all([col == "." for col in grid[-1]]):
      grid.append(["." for _ in range(len(grid[0]))])
    if not all([row[0] == "." for row in grid]):
      for i in range(len(grid)):
        grid[i] = ["."] + grid[i]
    if not all([row[-1] == "." for row in grid]):
      for i in range(len(grid)):
        grid[i] = grid[i] + ["."]
    

    newGrid = []
    for row in grid:
      newRow = []
      for col in row:
        newRow.append('.')
      newGrid.append(newRow)
    
    potentialMoves = set()
    newPositions = set()
    discardMoves = set()
    alreadyMoves = set()
    movesDict = {}

    for y in range(len(grid)):
      for x in range(len(grid[0])):
        if grid[y][x] == "#":
          for move in moves:
            dx, dy = move
            # if we move down, we need to down, down left and down right
            # that the new position is not a "#"
            if move == (0, 1):
              if grid[y+1][x] == "#" or grid[y+1][x-1] == "#" or grid[y+1][x+1] == "#":
                continue
            # if we move up, we need to up, up left and up right
            # that the new position is not a "#"
            if move == (0, -1):
              if grid[y-1][x] == "#" or grid[y-1][x-1] == "#" or grid[y-1][x+1] == "#":
                continue
            # if we move left, we need to left, up left and down left
            # that the new position is not a "#"
            if move == (-1, 0):
              if grid[y][x-1] == "#" or grid[y-1][x-1] == "#" or grid[y+1][x-1] == "#":
                continue
            # if we move right, we need to right, up right and down right
            # that the new position is not a "#"
            if move == (1, 0):
              if grid[y][x+1] == "#" or grid[y-1][x+1] == "#" or grid[y+1][x+1] == "#":
                continue

            if (x, y) in alreadyMoves:
              continue

            if (x + dx, y + dy) not in potentialMoves:
              potentialMoves.add((x + dx, y + dy))
              movesDict[(x + dx, y + dy)] = (x, y)
              alreadyMoves.add((x, y))
              continue
            else:
              discardMoves.add((x + dx, y + dy))
              newPositions.add(movesDict[(x + dx, y + dy)])

          if (x, y) not in alreadyMoves:
            alreadyMoves.add((x, y))
            newPositions.add((x, y))

    # rotate moves
    lastMove = moves.popleft()
    moves.append(lastMove)

    # remove potentialMoves that are in discardMoves
    potentialMoves -= discardMoves
    # add potentialMoves to newPositions
    newPositions |= potentialMoves


    for x, y in newPositions:
      newGrid[y][x] = "#"

    grid = newGrid



  # Remove edges of "." if they are all "."
  while all([col == "." for col in grid[0]]):
    grid = grid[1:]
  while all([col == "." for col in grid[-1]]):
    grid = grid[:-1]
  while all([row[0] == "." for row in grid]):
    for i in range(len(grid)):
      grid[i] = grid[i][1:]
  while all([row[-1] == "." for row in grid]):
    for i in range(len(grid)):
      grid[i] = grid[i][:-1]

  for row in grid:
    print("".join(row))

  return sum([row.count(".") for row in grid])



@timeit
def partTwo(filename):
  pass

if __name__ == "__main__":
  print("Part One:")
  print(partOne(sys.argv[1]))
  print()
  print("Part Two:")
  print(partTwo(sys.argv[1]))