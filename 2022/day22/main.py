# Advent of Code 2022: Day 22: Monkey Map
# https://adventofcode.com/2022/day/22
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

  instructions = lines[-1]
  pathLines = lines[:-2]

  # Find the longest line in path
  longest = max(len(line) for line in pathLines)
  # Add spaces to the end of the lines to make them all the same length
  for i in range(len(pathLines)):
    pathLines[i] = pathLines[i].rstrip() + " " * (longest - len(pathLines[i]))

  path = [list(line) for line in pathLines]

  # Add a row of spaces to the top, left and right of the path
  path.insert(0, [" "] * (longest-1))
  for line in path:
    line.append(" ")
    line.insert(0, " ")
    print(line)

  x=0
  y=1
  # Find the starting position
  for i in range(len(path[1])):
    if path[1][i] == ".":
      x = i
      break

  
  # starting direction is to the right (right = 0, down = 1, left = 2, up = 3)
  direction = 0

  for instruction in instructions:
    if instruction == "L":
      direction = (direction - 1) % 4
    elif instruction == "R":
      direction = (direction + 1) % 4
    # elif the instruction is a number
    elif instruction.isdigit():
      for i in range(int(instruction)):
        # right
        if direction == 0:
          x += 1
          if path[y][x] == "#":
            x += 1
            break
          elif path[y][x] == " ":
            for j in range(x, -1, -1):
              if path[y][j] == " ":
                if path[y][j+1] == "#":
                  break
                x = j+1
                break

        # down
        elif direction == 1:
          y += 1
          if path[y][x] == "#":
            y += 1
            break
          elif path[y][x] == " ":
            for j in range(y, -1, -1):
              if path[j][x] == " ":
                if path[j+1][x] == "#":
                  break
                y = j+1
                break

        # left
        elif direction == 2:
          x -= 1
          if path[y][x] == "#":
            x -= 1
            break
          elif path[y][x] == " ": 
            for j in range(x, len(path[y]), 1):
              if path[y][j] == " ":
                if path[y][j-1] == "#":
                  break
                x = j-1
                break

        # up
        elif direction == 3:
          y -= 1
          if path[y][x] == "#":
            y -= 1
            break
          elif path[y][x] == " ":
            for j in range(y, len(path), 1):
              if path[j][x] == " ":
                if path[j-1][x] == "#":
                  break
                y = j-1
                break


  print(x, y, direction)
  return x * 1000 + y * 4 + direction





@timeit
def partTwo(filename):
  pass

if __name__ == "__main__":
  print("Part one:")
  print(partOne(sys.argv[1]))
  print()
  print("Part two:")
  print(partTwo(sys.argv[1]))