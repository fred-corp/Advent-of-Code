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
# Part two:
# Same as part one, except The correct operation for monkey root
# should be "=", which means that it still listens for two numbers
# (from the same two monkeys as before), but now checks that the two
# numbers match. Also, you got the wrong monkey for the job starting
# with "humn:". It isn't a monkey - it's you. Actually, you got the
# job wrong, too: you need to figure out what number you need to yell so
# that root's equality check passes. (The number that appears after "humn:"
# in your input is now irrelevant.)
# Find the number you have to yell.
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


@timeit
def partTwo(filename):
  with open(filename) as f:
    lines = f.read().splitlines()
  
  # Create a dictionary with the monkeys as keys and the jobs as values
  monkeys = {}
  for line in lines:
    monkey, job = line.split(": ")
    if monkey == "humn":
      continue
    monkeys[monkey] = job
    if monkey == "root":
      monkeys[monkey] = job.split()[0] + " = " + job.split()[2]


  root = "root"
  
  s = Solver()
  humn = "humn"
  # Create a Z3 variable for each monkey
  numbers = {}
  for monkey in monkeys:
    numbers[monkey] = Int(monkey)

  numbers[humn] = Int(humn)
  
  for monkey in monkeys:
    
    job = monkeys[monkey]
    if job.isdigit():
      s.add(numbers[monkey] == int(job))
    else:
      a, op, b = job.split()
      if op == "+":
        s.add(numbers[monkey] == numbers[a] + numbers[b])
      elif op == "-":
        s.add(numbers[monkey] == numbers[a] - numbers[b])
      elif op == "*":
        s.add(numbers[monkey] == numbers[a] * numbers[b])
      elif op == "/":
        # We need to make sure that the division is exact
        s.add(numbers[a] % numbers[b] == 0)
        s.add(numbers[monkey] == numbers[a] / numbers[b])
      elif op == "=":
        s.add(numbers[monkey] == numbers[a])
        s.add(numbers[a] == numbers[b])

  # Find the number that humn has to yell
  s.check()
  
  return s.model()[numbers[humn]], s.model()[numbers[root]]


if __name__ == "__main__":
  print("Part one:")
  print(partOne(sys.argv[1]))
  print()
  print("Part two:")
  print(partTwo(sys.argv[1])[0])