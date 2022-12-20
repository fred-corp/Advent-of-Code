# Advent of Code 2022: Day 15: Beacon Exclusion Zone
# https://adventofcode.com/2022/day/15
#
# Part one :
# Find the amount of places where a beacon cannot be present.
#
# Part two :
# Find the coordinates of the beacon that is not in the detection zones of the sensors
# at the specified line.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from z3 import *

@timeit
def findImpossibleBeacons(filename, lineNumber = 10, maxX = 4000000, maxY = 4000000):
  with open(filename) as f:
    lines = f.readlines()
  
  coords = findCoords(lines)
  return solveForBeacons(coords, lineNumber)[0]


@timeit
def calcBeaconFrequency(filename, lineNumber = 10, maxX = 4000000, maxY = 4000000):
  with open(filename) as f:
    lines = f.readlines()
  
  coords = findCoords(lines)
  s = solveForBeacons(coords, lineNumber, maxX, maxY)[1]

  # Check if the solver is satisfiable
  assert s.check() == sat, "unsat"
  m = s.model()
  return m[Int("x")].as_long() * 4000000 + m[Int("y")].as_long()


def findCoords(lines):
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
  return coords


def solveForBeacons(coords, lineNumber = 10, maxX = 4000000, maxY = 4000000):
  # Create a set for the X coordinates of the beacons at the given line
  beaconsInLine = set()
  # Create a set of all the X coordinates that are impossible
  # to be the beacon
  impossibleCoords = set()

  # Create a solver for part 2
  x = Int('x')
  y = Int('y')
  s = Solver()

  # constrain range of solver for part 2
  s.add(x >= 0)
  s.add(x <= maxX)
  s.add(y >= 0)
  s.add(y <= maxY)

  for coordPair in coords:
    sensorX = coordPair[0][0]
    sensorY = coordPair[0][1]
    beaconX = coordPair[1][0]
    beaconY = coordPair[1][1]
    # Calc Manhattan distance 
    distance = abs(sensorX - beaconX) + abs(sensorY - beaconY)

    # Calculate the extent of the area around the sensor at the given line
    extent = distance - abs(sensorY - lineNumber)
    # Add the X coordinates of the area at the given line to the set
    for xValue in range(sensorX - extent, sensorX + extent + 1):
      impossibleCoords.add(xValue)
    # Add the X coordinates of beacon to the list
    # if the Y coordinate corresponds to lineNumber
    if beaconY == lineNumber:
      beaconsInLine.add(beaconX)

    # Add constraints to the solver for part 2
    s.add(z3Abs(x - sensorX) + z3Abs(y - sensorY) > distance)
  
  return len(impossibleCoords - beaconsInLine), s, x, y


def z3Abs(x):
  return If(x >= 0, x, -x)


if __name__ == "__main__":
  print("Part one :")
  print(findImpossibleBeacons(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 2000000, int(sys.argv[3]) if len(sys.argv) > 3 else 4000000, int(sys.argv[3]) if len(sys.argv) > 3 else 4000000))
  print("")
  print("Part two :")
  print(calcBeaconFrequency(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 2000000, int(sys.argv[3]) if len(sys.argv) > 3 else 4000000, int(sys.argv[3]) if len(sys.argv) > 3 else 4000000))
