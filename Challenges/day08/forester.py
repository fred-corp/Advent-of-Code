# Advent of Code 2022: Day 8: Treetop Tree House
# https://adventofcode.com/2022/day/8
#
# Part one :
# From a file containing trees represented by a number from 0 to 9, find the number of trees
# that are visible from the edges (meaning that between them and the edge no other tree should be taller).
#
#
# Part two :
# Find the tree with the highest scenic score. This score is calculated by multiplying
# the viewing distance in each direction (up, down, left, right).
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
  count += len(positions)

  return count

@timeit
def getHighestScenicScore(filename):
  treeMatrix = convertFileToMatrix(filename)
  treeMatrixInv = [[treeMatrix[j][i] for j in range(len(treeMatrix))] for i in range(len(treeMatrix[0]))]
  scenicScores = []
  
  for i in range(len(treeMatrix)):
    for j in range(len(treeMatrix[i])):
      tree = treeMatrix[i][j]
      score = 0
      multiplierUp = 0
      multiplierDown = 0
      multiplierLeft = 0
      multiplierRight = 0
      # check up for next tallest tree 
      for u in range(i-1, -1, -1):
        multiplierUp += 1
        if treeMatrixInv[j][u] >= tree:
          break

      # check down for next tallest tree 
      for d in range(i+1, len(treeMatrix)):
        multiplierDown += 1
        if treeMatrixInv[j][d] >= tree:
          break

      # check left for next tallest tree
      for l in range(j-1, -1, -1):
        multiplierLeft += 1
        if treeMatrix[i][l] >= tree:
          break

      # check right for next tallest tree 
      for r in range(j+1, len(treeMatrix[i])):
        multiplierRight += 1
        if treeMatrix[i][r] >= tree:
          break

      score = multiplierUp * multiplierDown * multiplierLeft * multiplierRight

      scenicScores.append((score, tree, (i, j), (multiplierUp, multiplierLeft, multiplierDown, multiplierRight)))

  return max(scenicScores)[0]



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
  print()
  print("Part two : ")
  print(getHighestScenicScore(sys.argv[1]))