# Advent of Code 2022: Day 18: Boiling Boulders
# https://adventofcode.com/2022/day/18
#
# Part One:
# From a file containing 3D coordinates of 1x1x1 cubes, find the total area of the cubes.
# Cubes can be directly adjacent to each other, reducing the number of visible faces.
#
# Part Two:
# Same as part one, but new we must subtract the area of the air pockets between the cubes.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from collections import deque

@timeit
def countCubeFaces(filename):
  with open(filename) as f:
    lines = f.readlines()
  
  # Parse the cubes
  cubes = set()
  for line in lines:
    x, y, z = line.split(",")
    cubes.add((int(x), int(y), int(z)))

  maxArea = 6 * len(cubes)

  # For each cube, check if it's adjacent to another cube
  totalArea = maxArea
  for x, y, z in cubes:
    for dx, dy, dz in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)):
      if (x + dx, y + dy, z + dz) in cubes:
        totalArea -= 1

  return totalArea


@timeit
def countVisibleCubeFaces(filename):
  with open(filename) as f:
    lines = f.readlines()
  
  # Parse the cubes
  cubes = set()
  for line in lines:
    x, y, z = line.split(",")
    cubes.add((int(x), int(y), int(z)))

  # Find the boundary of the cubes
  maxX = max(x for x, y, z in cubes)
  maxY = max(y for x, y, z in cubes)
  maxZ = max(z for x, y, z in cubes)
  minX = min(x for x, y, z in cubes)
  minY = min(y for x, y, z in cubes)
  minZ = min(z for x, y, z in cubes)


  externalCubes = set()
  cubeQueue = deque()

  # Add the cubes adjacent to the boundary
  externalCubes.add((minX-1, minY-1, minZ-1))
  cubeQueue.append((minX-1, minY-1, minZ-1))

  while cubeQueue:
    x, y, z = cubeQueue.popleft()
    for dx, dy, dz in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)):
      # Check if the candidate is outside the boundary
      if x+dx < minX-1 or x+dx > maxX+1 or y+dy < minY-1 or y+dy > maxY+1 or z+dz < minZ-1 or z+dz > maxZ+1:
        continue
      candidate = (x+dx, y+dy, z+dz)
      # Check if the candidate is a cube or has already been validated
      if candidate in cubes or candidate in externalCubes:
        continue
      cubeQueue.append(candidate)
      externalCubes.add(candidate)

  # For each external cube, check the visible faces
  totalArea = 0
  for x, y, z in externalCubes:
    cubeSurfaceArea = 0
    for dx, dy, dz in ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)):
      if (x + dx, y + dy, z + dz) in cubes:
        cubeSurfaceArea += 1
    totalArea += cubeSurfaceArea

  return totalArea


if __name__ == "__main__":
  print("Part One:")
  print(countCubeFaces(sys.argv[1]))
  print()
  print("Part Two:")
  print(countVisibleCubeFaces(sys.argv[1]))
