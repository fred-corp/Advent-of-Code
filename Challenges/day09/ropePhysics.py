# Advent of Code 2022: Day 9: Rope Bridge
# https://adventofcode.com/2022/day/9
#
# Part one :
# From a file containing a list of movements, calculate the different positions the tail of the rope has been at least once.
# The movements in the file correspond to the movement of the head of the rope.
# The tail of the rope is at least one position away from the head (diagonally, vertically or horizontally).
# A movement can look like "L 7", which means that the head of the rope moved 7 positions to the left.
# The size of the grid on which the rope is moving is not given in advance.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def countTailPositions(filename):
  positions = set()
  with open(filename, 'r') as file:
    posHead = [0, 0]
    posHeadPrev = [0, 0]
    posTail = [0, 0]
    for line in file:
      line = line.strip()
      commands = line.split(' ')
      direction = commands[0]
      distance = int(commands[1])
      posHeadPrev = posHead.copy()
      if direction == 'L':
        for i in range(distance):
          posHead[1] -= 1
          if calcDistance(posHead, posTail) > 1:
            posTail = posHeadPrev.copy()
          positions.add(tuple(posTail))
          posHeadPrev = posHead.copy()
      elif direction == 'R':
        for i in range(distance):
          posHead[1] += 1
          if calcDistance(posHead, posTail) > 1:
            posTail = posHeadPrev.copy()
          positions.add(tuple(posTail))
          posHeadPrev = posHead.copy()
      elif direction == 'U':
        for i in range(distance):
          posHead[0] -= 1
          if calcDistance(posHead, posTail) > 1:
            posTail = posHeadPrev.copy()
          positions.add(tuple(posTail))
          posHeadPrev = posHead.copy()
      elif direction == 'D':
        for i in range(distance):
          posHead[0] += 1
          if calcDistance(posHead, posTail) > 1:
            posTail = posHeadPrev.copy()
          positions.add(tuple(posTail))
          posHeadPrev = posHead.copy()

  return len(positions)

def calcDistance(pos1, pos2):
  if pos1[0] == pos2[0]:
    return abs(pos1[1] - pos2[1])
  elif pos1[1] == pos2[1]:
    return abs(pos1[0] - pos2[0])
  else:
    return max(abs(pos1[0] - pos2[0]), abs(pos1[1] - pos2[1]))

if __name__ == '__main__':
  print("Part one :")
  print(countTailPositions(sys.argv[1]))
