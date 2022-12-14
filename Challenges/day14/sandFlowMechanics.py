# Advent of Code 2022: Day 14: Regolith Reservoir
# https://adventofcode.com/2022/day/14
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
import os

@timeit
def calcStaticSandParticles(filename, void = True):
  with open(filename) as f:
    lines = f.readlines()
  lines = [line.strip() for line in lines]

  # Each line consists of coordinates, and each pair of coordinates
  # is separated by a " -> ". the x and y coordinates are separated
  # by a comma. The coordinates are all integers.
  # Store the coordinates in a list of tuples per line.
  coords = [line.split(" -> ") for line in lines]
  coords = [[tuple(map(int, coord.split(","))) for coord in line] for line in coords]
  
  # Find the min and max x and y coordinates
  minX = min([min([coord[0] for coord in line]) for line in coords])
  maxX = max([max([coord[0] for coord in line]) for line in coords])
  minY = 0
  maxY = max([max([coord[1] for coord in line]) for line in coords])

  # Create a grid of the same size as the bounding box
  grid = [['.' for x in range(minX, maxX+1)] for y in range(minY, maxY+1)]
  grid[0][500-minX] = '+'

  # Fill the grid with the coordinates
  for line in coords:
    # Fill the grid with "#" between two coordinates
    for i in range(len(line)-1):
      startPoint = line[i]
      endPoint = line[i+1]
      if startPoint[1] > endPoint[1]:
        startPoint, endPoint = endPoint, startPoint
      if startPoint[0] > endPoint[0]:
        startPoint, endPoint = endPoint, startPoint

      if startPoint[0] == endPoint[0]:
        # Vertical line
        for y in range(startPoint[1], endPoint[1]+1):
          grid[y-minY][startPoint[0]-minX] = '#'
      else:
        # Horizontal line
        for x in range(startPoint[0], endPoint[0]+1):
          grid[startPoint[1]-minY][x-minX] = '#'

  
  if void:
    # Add an empty column on the left and right
    for row in grid:
      row.insert(0, '.')
      row.append('.')
    minX -= 1
    maxX += 1
  else:
    # Add 10 columns on the left and right
    stop = maxY
    for _ in range(stop):
      for row in grid:
        row.insert(0, '.')
        row.append('.')
    minX -= stop
    maxX += stop
    # add a floor 2 levels below the bottom of the grid
    grid.append(['.' for x in range(minX, maxX+1)])
    grid.append(['#' for x in range(minX, maxX+1)])
    maxY += 2


  printGrid(grid)


  # Fill the grid with sand from the source (500,0)
  # The sand will flow down until it hits a wall. If it hits a wall
  # it stays there. If it hits another sand particle, it will flow
  # to the left until it hits a wall. If it flows to the bottom of the grid,
  # we're done.

  # Start at the source
  x = 500-minX
  y = 0
  particles = 0
  while True :
    while y < maxY:
      # Check if there is a wall below
      if grid[y+1][x] == '#':
        # Check if there is space to the bottom left
        if grid[y][x-1] == '.':
          # Move down and left if there is nothing to the left
          if grid[y+1][x-1] == '.':
            x -= 1
            y += 1
          else:
            break
        # Check if there is space to the bottom right
        elif grid[y][x+1] == '.':
          # Move down and right if there is nothing to the right
          if grid[y+1][x+1] == '.':
            x += 1
            y += 1
          else:
            break
        else:
          break
        

      # Check if there is sand below
      elif grid[y+1][x] == 'o':
        # Check if there is space to the bottom left
        if grid[y+1][x-1] == '.':
          x -= 1
          y += 1
        # Check if there is space to the bottom right
        elif grid[y+1][x+1] == '.':
          x += 1
          y += 1
        else:
          break
      else:
        # Move down
        y += 1
    if y == maxY:
      grid[y][x] = '~'
      break
    elif grid[y][x] == '+':
      particles += 1
      break
    # printGrid(grid)
    grid[y][x] = 'o'
    particles += 1
    x = 500-minX
    y = 0
  

  printGrid(grid)
  return particles



def printGrid(grid):
  if len(grid[0]) <= 100 and len(grid) <= 50:
    for row in grid:
      print(''.join(row))
  # Save grid to file named as the input file
  filename = sys.argv[1].split('.')[0] + '_grids.txt'
  # If the file exists, append to the file
  if os.path.isfile(filename):
    with open(filename, 'a') as f:
      f.write('\n\n')
      for row in grid:
        f.write(''.join(row) + '\n')
  # If the file does not exist, create it
  else:
    with open(filename, 'w') as f:
      for row in grid:
        f.write(''.join(row) + '\n')





if __name__ == '__main__':
  print("Part one:")
  print(calcStaticSandParticles(sys.argv[1]))
  print()
  print("Part two:")
  print(calcStaticSandParticles(sys.argv[1], False))