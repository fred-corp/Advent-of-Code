# Advent of Code 2022: Day 21: Monkey Math
# https://adventofcode.com/2022/day/21
#
# Part one:
# Each line in a file contains the name of a monkey, a colon, and then
# the job of that monkey: A lone number means the monkey's job 
# is simply to yell that number, job like aaaa <+, -, * or /> bbbb means the 
# monkey waits for monkeys aaaa and bbbb to yell each of their numbers; 
# the monkey then yells the result of the operation of those two numbers.
# Find the number that the monkey named root yells.
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from z3 import *

@timeit
def partOne(filename):
  with open(filename) as f:
    lines = f.read().splitlines()
  
  # Create a dictionary with the monkeys as keys and the jobs as values
  monkeys = {}
  for line in lines:
    monkey, job = line.split(": ")
    monkeys[monkey] = job

  # Create a dictionary with the monkeys as keys and the numbers as values
  numbers = {}
  for monkey in monkeys:
    numbers[monkey] = None

  # Create a dictionary with the monkeys as keys and the list of monkeys
  # that need to yell their numbers before this monkey can yell its number
  # as values
  waiting = {}
  for monkey in monkeys:
    waiting[monkey] = []

  # Fill the waiting dictionary
  for monkey in monkeys:
    job = monkeys[monkey]
    if job.isdigit():
      numbers[monkey] = int(job)
    else:
      a, op, b = job.split()
      waiting[monkey].append(a)
      waiting[monkey].append(b)

  root = "root"

  # Find the numbers of the monkeys
  while None in numbers.values():
    for monkey in waiting:
      if numbers[monkey] is None:
        if all(numbers[m] is not None for m in waiting[monkey]):
          a, b = waiting[monkey]
          operation = monkeys[monkey].split()[1]
          numbers[monkey] = eval(f"{numbers[a]} {operation} {numbers[b]}")

  return numbers[root]


if __name__ == "__main__":
  print("Part one:")
  print(partOne(sys.argv[1]))