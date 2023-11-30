# Advent of Code 2022: Day 17: Pyroclastic Flow
# https://adventofcode.com/2022/day/17
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from collections import deque

@timeit
def partOne(filename, rockFile, rockAmount=2022):
  with open(filename) as f:
    movements = f.read()
  
  with open(rockFile) as f:
    rockLines = f.read()

  # Parse the rocks
  rocks = parseRocks(rockLines)
  print(rocks)

  caveWidth = 7
  dropHeight = 3

  cave = deque()
  for i in range(dropHeight):
    cave.append(["."] * caveWidth)
  cave.append(["-"] * caveWidth)

  # the file contains a single line that looks like :
  # ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"
  step = 0
  for i in range(rockAmount):
    # drop a rock
    rock = rocks[i % len(rocks)]
    rockWidth = len(rock[0])
    rockHeight = len(rock)
    rockX = 2
    rockY = 0
    rockBottom = rock[-1]

    dropped = False
    while not dropped : 
      movement = movements[step % len(movements)]
      if movement == ">" and rockX + rockWidth < caveWidth:
        rockX += 1
      elif movement == "<" and rockX > 0:
        rockX -= 1
      

      # check if the rock is dropped (if there's something below)
      if rockY < len(cave) :
        caveBottom = cave[rockY]
        for x in range(rockWidth):
          if rockBottom[x] == "#" and caveBottom[rockX + x] != ".":
            rockY -= rockHeight+1
            dropped = True
            break
      
      rockY += 1
      step += 1

    # add the rock to the cave
    for y in range(rockHeight):
      # add a line to the beginning of the cave
      if len(cave) < rockY + y + 1:
        cave.appendleft(["."] * caveWidth)
      for x in range(rockWidth):
        if rock[y][x] == "#":
          cave[rockY + y][rockX + x] = "#"
    # add blank lines above the rock
    for i in range(rockHeight):
      cave.appendleft(["."] * caveWidth)
  
  # print the cave
  for line in cave:
    print(line)




def parseRocks(rockLines):
  rocks = []
  # each rock is separated by a blank line
  for rock in rockLines.split("\n\n"):
    rock = rock.split("\n")
    for i in range(len(rock)):
      rock[i] = list(rock[i])
    rocks.append(rock)
  return rocks


if __name__ == "__main__":
  print("Part One")
  print(partOne(sys.argv[1], sys.argv[2], 1))