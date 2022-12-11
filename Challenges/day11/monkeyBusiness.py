# Advent of Code 2022: Day 11: Monkey in the Middle
# https://adventofcode.com/2022/day/11
#
# Part one :
# Count the total number of times each monkey inspects items over 20 rounds, and multiply the number of times the two most active monkey inspects an item.
# 
# Part two :
# Same as part one, but with 10000 rounds, and we do not divide the worry level the same way as in part one.
# We'll need to save calculation time, so we'll use the modulo operator to reduce the worry level.
#
#
# Solution by Frédéric Druppel
# See repo for license


import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def partOne(filename):
  with open(filename, 'r') as file:
    lines = file.readlines()
  
  monkeyDict = monkeyInspect(lines)
  
  for i in range(20):
    monkeyDict = calcRound(monkeyDict)
  
  activity = []
  for key in monkeyDict:
    activity.append(monkeyDict[key]['total'])
  activity.sort()
    
  return activity[-1] * activity[-2]


@timeit
def partTwo(filename):
  with open(filename, 'r') as file:
    lines = file.readlines()
  
  monkeyDict = monkeyInspect(lines)

  for i in range(10000):
    monkeyDict = calcRound(monkeyDict, divider=1, modulo=True)

  activity = []
  for key in monkeyDict:
    activity.append(monkeyDict[key]['total'])
  activity.sort()

  return activity[-1] * activity[-2]



def calcRound(monkeyDict, divider=3, modulo=False):
  for key in monkeyDict:
    monkey = monkeyDict[key]

    mod = monkey['test']
    if modulo:
      mod = 1
      for key in monkeyDict:
        mod *= monkeyDict[key]['test']

    operation = monkey['operation'][0]
    opNumber = monkey['operation'][1]
    for item in monkey['items']:
      monkey['total'] += 1
      toTest = operate(item, operation, opNumber)

      toTest //= divider
      
      # If modulo is True, then toTest is reduced by the modulo <mod>.
      # This is done for part 2, where we do not divide the worry level the same way as in part one. And because the number
      # of rounds grows, we need to save calculation time.
      # This works because the modulo value is calculated as the product of all the test values of the monkeys, so the result
      # of "toTest % monkey['test']" is the same as "(toTest % mod) % monkey['test']" because "monkey['test']" is contained in "mod"
      if modulo:
        toTest %= mod
      
      if toTest % monkey['test'] == 0:
        monkeyDict[monkey['throw'][0]]['items'].append(toTest)
      else:
        monkeyDict[monkey['throw'][1]]['items'].append(toTest)
    monkey['items'] = []
  return monkeyDict

def operate(item, operation, opNumber):
  toTest = 0
  if operation == '+':
    toTest = item + opNumber
  elif operation == '-':
    toTest = item - opNumber
  elif operation == '*':
    toTest = item * opNumber
  elif operation == '/':
    toTest = item / opNumber
  elif operation == '**':
    toTest = item ** opNumber
  return toTest

def monkeyInspect(lines):
  monkeyDict = {}
  for i in range(len(lines)):
    line = lines[i].strip()
    # If the line starts "Monkey X:", then X is the monkey number
    if line.startswith('Monkey'):
      monkeyNumber = int(lines[i].split(' ')[1][:-1].strip(':'))
      monkeyDict[monkeyNumber] = {'items':[], 'operation':[], 'test': 1, 'throw': [], 'total': 0}
      # The next line, "Starting items: a, b, c" is the list of starting items of the monkey
      startingItems = lines[i+1].split()[2:]
      for item in startingItems:
        monkeyDict[monkeyNumber]['items'].append(int(item.strip(',')))
      # the next line, "Operation: new = old <math> A", contains the operation
      # <math> is either +, -, * or /, A is the number to add, subtract, multiply or divide by
      opLine = lines[i+2].split(' ')
      operation = opLine[6]
      if opLine[7].strip() == 'old':
        operation = "**"
        opNumber = 2
      else:
        opNumber = int(opLine[7])
      monkeyDict[monkeyNumber]['operation'] = [operation, opNumber]

      # the next line, "Test: divisible by A" contains the test number
      monkeyDict[monkeyNumber]['test'] = int(lines[i+3].split(' ')[5].strip(':'))
      # the next line, "  If true: throw to monkey 2", contains the monkey to throw to if the test is true
      throwTrue = int(lines[i+4].split()[5].strip())
      throwFalse = int(lines[i+5].split()[5].strip())
      monkeyDict[monkeyNumber]['throw'] = [throwTrue, throwFalse]
  return monkeyDict


if __name__ == '__main__':
  print('Part One: ')
  print(partOne(sys.argv[1]))
  print()
  print('Part Two: ')
  print(partTwo(sys.argv[1]))