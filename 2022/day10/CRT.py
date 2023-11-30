# Advent of Code 2022: Day 10: Cathode-Ray Tube
# https://adventofcode.com/2022/day/10
#
# Part one :
# From a file containing instructions, calculate a signal strength.
# The "addx X" instructions take 2 cycles, "noop" take 1 cycle
# Signal strength is equal to the cycle number times the sum of all the X values of the "addx X" instructions up to that point
# find the signal strength at cycle 20, 60, 100, 140, 180 and 220 and take their sum.
#
#
# Part two :
# The signal strength seem to correspond to the position of a sprite on a screen that is 40 pixels wide and 6 pixels high.
# If the sprite is positioned such that one of its three pixels is the pixel currently being drawn,
# the screen produces a lit pixel (#); otherwise, the screen leaves the pixel dark (.).
# Print the lit and dark pixels, and see what 8 capital letters you see.
#
#
# Solution by Frédéric Druppel
# See repo for license


import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def findSignalStrengths(filename):
  with open(filename, 'r') as file:
    lines = file.readlines()
  xRegister = 1
  values = []

  for line in lines:
    line = line.strip()
    commands = line.split(' ')
    command = commands[0]

    if line == 'noop':
      values.append(xRegister)
    
    if command == 'addx':
      values.append(xRegister)
      values.append(xRegister)
      xRegister += int(commands[1])

  signalStrengths = [(cycleNumber+1) * value for cycleNumber, value in enumerate(values)]
  return signalStrengths


@timeit
def drawCRT(fileName):
  with open(fileName, 'r') as file:
    lines = file.readlines()
  xRegister = 1
  CRTScreen = [['.' for i in range(40)] for j in range(6)]
  xPos = 0
  yPos = 0

  for line in lines:
    line = line.strip()
    commands = line.split(' ')
    command = commands[0]

    if xRegister-1 == xPos or xRegister == xPos or xRegister+1 == xPos:
      CRTScreen[yPos][xPos] = '#'

    xPos += 1
    if xPos >= 40:
      xPos = 0
      yPos += 1

    if command == 'addx':
      if xRegister-1 == xPos or xRegister == xPos or xRegister+1 == xPos:
        CRTScreen[yPos][xPos] = '#'
  
      xPos += 1
      if xPos >= 40:
        xPos = 0
        yPos += 1
      xRegister += int(commands[1])
    

  for line in CRTScreen:
    print(''.join(line))



if __name__ == '__main__':
  filename = sys.argv[1]
  print("Part One:")
  signalStrengths = findSignalStrengths(filename)
  print(sum([signalStrengths[19], signalStrengths[59], signalStrengths[99], signalStrengths[139], signalStrengths[179], signalStrengths[219]]))
  print()
  print("Part Two:")
  drawCRT(filename)

