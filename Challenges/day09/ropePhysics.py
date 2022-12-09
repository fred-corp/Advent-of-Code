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
# Part two :
# Same thing, but this time the tail is 10 pieces long. Each piece of the tail is at most one position away from the previous
# piece, and pieces can overlap. Also, each piece has to move as little as possible.
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


@timeit
def countArbitraryTailPositions(filename, pieces):
  with open(filename, 'r') as file:
    lines = file.readlines()

  # create a list of positions for each piece of the tail
  posTail = []
  for i in range(pieces):
    posTail.append([[0, 0]])
  
  for line in lines:
    line.strip()
    commands = line.split(' ')
    direction = commands[0]
    distance = int(commands[1])
    for i in range(distance):
      for j in range(pieces):
        if j == 0:
          if direction == 'L':
            posTail[j].append([posTail[j][-1][0], posTail[j][-1][1] - 1])
          elif direction == 'R':
            posTail[j].append([posTail[j][-1][0], posTail[j][-1][1] + 1])
          elif direction == 'U':
            posTail[j].append([posTail[j][-1][0] - 1, posTail[j][-1][1]])
          elif direction == 'D':
            posTail[j].append([posTail[j][-1][0] + 1, posTail[j][-1][1]])
        else:
          X0 = posTail[j-1][-1][0]
          Y0 = posTail[j-1][-1][1]
          X1 = posTail[j][-1][0]
          Y1 = posTail[j][-1][1]

          distX = abs(X0-X1)
          distY = abs(Y0-Y1)

          if distX <= 1 and distY <= 1:
            posTail[j].append([X1, Y1])
          elif distX > 1 and distY > 1:
            posTail[j].append([X0-1 if X1<X0 else X0+1, Y0-1 if Y1<Y0 else Y0+1])
          elif distX > 1:
            posTail[j].append([X0-1 if X1<X0 else X0+1, Y0])
          elif distY > 1:
            posTail[j].append([X0, Y0-1 if Y1<Y0 else Y0+1])


  # create a set of positions from the list of positions of the pieces of the tail
  uniquePositions = []
  for i in range(pieces):
    positions = set()
    for pos in posTail[i]:
      positions.add(tuple(pos))
    uniquePositions.append(positions)

  return uniquePositions


def calcDistance(pos1, pos2):
  return max(abs(pos1[0] - pos2[0]), abs(pos1[1] - pos2[1]))

if __name__ == '__main__':
  print("Part one :")
  print(countTailPositions(sys.argv[1]))
  print()
  print("Part two :")
  print(len(countArbitraryTailPositions(sys.argv[1], 10)[-1]))
