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

if __name__ == '__main__':
  filename = sys.argv[1]
  print("Part One:")
  signalStrengths = findSignalStrengths(filename)
  print(sum([signalStrengths[19], signalStrengths[59], signalStrengths[99], signalStrengths[139], signalStrengths[179], signalStrengths[219]]))

