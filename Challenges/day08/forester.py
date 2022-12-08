# Advent of Code 2022: Day 8: Treetop Tree House
# https://adventofcode.com/2022/day/8
#
# Part one :
# From a file containing trees represented by a number from 0 to 9, find the number of trees
# that are visible from the edges (meaning that between them and the edge no other tree should be taller).
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def countVisibleTrees(filename):
  treeMatrix = convertFileToMatrix(filename)
  treeMatrixInv = [[treeMatrix[j][i] for j in range(len(treeMatrix))] for i in range(len(treeMatrix[0]))]
  # Count the trees on the edges, as they are always visible
  count = 0
  count += len(treeMatrix[0])
  count += len(treeMatrix[-1])
  count += len([x[0] for x in treeMatrix])
  count += len([x[-1] for x in treeMatrix])
  count -= 4 # Remove the corners, as they are counted twice

  positions = []
  for i in range(1, len(treeMatrix) - 1):
    for j in range(1, len(treeMatrix[i])-1):
      tree = treeMatrix[i][j]
      if tree > max(treeMatrix[i][:j]) or tree > max(treeMatrix[i][j+1:]) or tree > max(treeMatrixInv[j][:i]) or tree > max(treeMatrixInv[j][i+1:]) :
        positions.append((i, j))

  positions = list(set(positions))
  print(positions)
  count += len(positions)

  return count



def convertFileToMatrix(filename):
  with open(filename, 'r') as f:
    lines = f.readlines()
  matrix = []
  for line in lines:
    line = line.strip()
    matrix.append([int(x) for x in line])
  return matrix


if __name__ == "__main__":
  print("Part one : ")
  print(countVisibleTrees(sys.argv[1]))