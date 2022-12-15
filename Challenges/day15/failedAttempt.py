# Advent of Code 2022: Day 15: Beacon Exclusion Zone
# https://adventofcode.com/2022/day/15
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def partOne(filename, lineNumber = 10):
  with open(filename) as f:
    lines = f.readlines()
  
  # Each line contains the coordinate of a sensor, and the coordinate of
  # the nearest beacon like "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"
  # Store the coordinates in a list of tuples per line.
  coords = []
  for line in lines:
    line = line.strip()
    line = line.split(":")
    line0 = line[0].split("at")
    line1 = line[1].split("is at")
    line0 = line0[1:]
    line1 = line1[1:]
    for coord in line0:
      coord = coord.strip()
      coord = coord.split(",")
      x = coord[0].split("=")[1]
      y = coord[1].split("=")[1]
    coord0 = (int(x), int(y))
    for coord in line1:
      coord = coord.strip()
      coord = coord.split(",")
      x = coord[0].split("=")[1]
      y = coord[1].split("=")[1]
    coord1 = (int(x), int(y))

    line = [coord0, coord1]
    coords.append(line)

  # Find the min and max x and y coordinates
  minX = min([min([coord[0] for coord in line]) for line in coords])
  maxX = max([max([coord[0] for coord in line]) for line in coords])
  minY = min([min([coord[1] for coord in line]) for line in coords])
  maxY = max([max([coord[1] for coord in line]) for line in coords])
  # Create a grid of the same size as the bounding box
  grid = [['.' for x in range(minX, maxX+1)] for y in range(minY, maxY+1)]

  # Fill the grid with the coordinates
  for coordPair in coords:
    # put an "S" at the sensor coordinates
    grid[coordPair[0][1]-minY][coordPair[0][0]-minX] = ['S', coordPair]
    # put a "B" at the beacon coordinates
    grid[coordPair[1][1]-minY][coordPair[1][0]-minX] = ['B', coordPair]
  
  # Using the Manhattan distance, fill the area around a sensor with "#"
  # until it finds a beacon
  for y in range(len(grid)):
    for x in range(len(grid[0])):
      if grid[y][x][0] == 'S':
        # Find the closest beacon
        closestBeacon = None
        closestDistance = None
        for coordPair in coords:
          distance = abs(grid[y][x][1][0][0]-grid[y][x][1][1][0]) + abs(grid[y][x][1][0][1]-grid[y][x][1][1][1])
          if closestBeacon is None or distance < closestDistance:
            closestBeacon = coordPair[1]
            closestDistance = distance
        # Fill the area around the sensor with "#"
        print(distance)
        for i in range(len(grid)):
          for j in range(len(grid[0])):
            if abs(x-j) + abs(y-i) <= distance:
              if grid[i][j] == '.':
                grid[i][j] = '#'
  
  printGrid(grid)
  # Count the number of "#" in the grid at the specified line
  return grid[lineNumber-1-minX].count("#")



def printGrid(grid):
  
  for row in grid:
    line = ""
    for elem in row:
      char = elem[0]
      line += char
    print(line)


if __name__ == "__main__":
  print("Part one :")
  print(partOne(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 10))