# # Advent of Code 2022: Day 25: Full of Hot Air
# https://adventofcode.com/2022/day/25
#
# Part one:
# Convert take the sum of SNAFU numbers (see challenge description for how to parse SNAFU numbers)
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def sumSNAFU(filename):
  with open(filename) as f:
    lines = f.read().splitlines()
  
  convertedToDecimal = []

  for SNAFU in lines:
    SNAFUtoDEC = 0
    baseCalc = [5**i for i in range(len(SNAFU))]
    baseCalc.reverse()
    for i in range(len(SNAFU)):
      multiplier = 0
      if SNAFU[i] == '-':
        multiplier = -1
      elif SNAFU[i] == '=':
        multiplier = -2
      else:
        multiplier = int(SNAFU[i])
      
      number = multiplier * baseCalc[i]
      SNAFUtoDEC += number
    convertedToDecimal.append(SNAFUtoDEC)

  totalFuel = sum(convertedToDecimal)

  # convert to SNAFU
  SNAFU = ''
  while totalFuel != 0:
    remainder = totalFuel % 5
    totalFuel //= 5
    if remainder <= 2:
      SNAFU = str(remainder) + SNAFU
    elif remainder == 3:
      SNAFU = "=" + SNAFU
      totalFuel += 1
    elif remainder == 4:
      SNAFU = "-" + SNAFU
      totalFuel += 1

  return SNAFU



if __name__ == "__main__":
  print("Part One:")
  print(sumSNAFU(sys.argv[1]))