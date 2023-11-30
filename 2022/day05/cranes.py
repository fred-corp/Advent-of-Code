# Advent of Code 2022: Day 5: Supply Stacks
# https://adventofcode.com/2022/day/5
#
# Part one :
# Parse a file containing a list of stacks of supplies, as well as the list of moves to perform on the stacks.
# The stack description ends with a line containing the stack numbers, followed by a blank line before the moves.
# The moves are phrases like "move 4 from 6 to 1", which in the-is case means to move 4 items from stack 6 to stack 1.
# The moves are performed in the order they are listed.
# The program should output the top items of each stack after all the moves have been performed.
#
# Part two :
# Same as part one, but this time multiple items can be moved at once, so their order stays the same as in the original stack.
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

@timeit
def moveStacks9000(filename):
  lines = parseFile(filename)
  
  stackLines, stacks, moveLines = findStackAndMoveLines(lines)

  stackList = findStacks(stackLines, stacks)

  # perform the moves
  # the moves look like "move 4 from 6 to 1"
  for move in moveLines:
    # find the number of items to move
    items = int(move.split()[1])
    # find the stack number to move from
    fromStack = int(move.split()[3])-1
    # find the stack number to move to
    toStack = int(move.split()[5])-1
    # move the items from the fromStack to the toStack
    for i in range(items):
      stackList[toStack].append(stackList[fromStack].pop())

  # return the top items of each stack
  return [stackList[i][-1] for i in range(stacks)]


@timeit
def moveStacks9001(filename):
  lines = parseFile(filename)
  
  stackLines, stacks, moveLines = findStackAndMoveLines(lines)

  stackList = findStacks(stackLines, stacks)

  for move in moveLines:
    items = int(move.split()[1])
    fromStack = int(move.split()[3])-1
    toStack = int(move.split()[5])-1

    # move the items from the fromStack to the toStack
    # This time, it is possible to move multiple items at once
    # so they stay in the same order
    stackList[toStack].extend(stackList[fromStack][-items:])
    stackList[fromStack] = stackList[fromStack][:-items]

    

  # return the top items of each stack
  return [stackList[i][-1] for i in range(stacks)]

def parseFile(filename):
  with open(filename, 'r') as f:
    lines = f.readlines()
  return lines

def findStackAndMoveLines(lines):
  stackLines = []
  moveLines = []
  for line in lines:
    # remove trailing newline
    line = line.rstrip()
    # if the line is empty, we are done with the stack lines
    if line == '':
      break
    stackLines.append(line)
  
  # find the number of stacks from the last line that looks like " 1   2   3 "
  stacks = len(stackLines[-1].split())
  
  # the rest of the lines are the moves
  moveLines = lines[len(stackLines)+1:]

  return stackLines, stacks, moveLines

def findStacks(stackLines, stacks):
  # create a list of stacks, each stack is a list of items
  stackList = []
  for i in range(stacks):
    stackList.append([])
  
  # Find the elements of the stacks in the stack lines, and add them to the stacks
  # The stack lines look like this:
  # "    [D]    "
  # "[N] [C]    "
  # "[Z] [M] [P]"

  # find the max number of items in the tallest stack(s)
  maxItems = len(stackLines)-1
  
  # for each stack, find the items in the stack lines
  # from bottom to top (begin from the second to last stackLine)
  # and add them to the stack
  for i in range(maxItems):
    # for each stack
    for j in range(stacks):
      # find the item in the stack line
      try:
        item = stackLines[maxItems-i-1][j*4]
        # if the item looks like "[X]", add the letter between the brackets to the stack
        if item == '[':
          stackList[j].append(stackLines[maxItems-i-1][j*4+1])
      except :
        # if the line is too short, the stack is empty
        pass

  return stackList

if __name__ == '__main__':
  print("Part one:")
  topAfterMoves9000 = moveStacks9000(sys.argv[1])
  print("Top items after moves:")
  # Print the top items of each stack as a single line
  print(''.join(topAfterMoves9000))
  print()
  print("Part two:")
  topAfterMoves9001 = moveStacks9001(sys.argv[1])
  print("Top items after moves:")
  # Print the top items of each stack as a single line
  print(''.join(topAfterMoves9001))
