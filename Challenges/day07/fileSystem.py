# Advent of Code 2022: Day 7: No Space Left On Device
# https://adventofcode.com/2022/day/7
#
# Part one :
# From a file containing a set of shell commands and their response, find all the 
# directories with a total size of at most 100000, and take the sum of those directories.
#
#
# Part two :
# Find the smallest directory to delete from the fs, so that the available space is at least 30000000.
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit


@timeit
def sumUnder(filename, max):
  root = findDirectories(filename)
  return calcDirSize(root, max)[1]


@timeit
def findSmallestToDelete(filename, maxSpace, minSpace):
  root = findDirectories(filename)
  _rootSize = rootSize(root)
  availSpace = maxSpace - _rootSize
  if availSpace < minSpace:
    minDirSize = _rootSize - (maxSpace - minSpace)
    return dictToDelete(root, minDirSize)[0]
  return -1

def findDirectories(filename):
  # open the file and read the lines
  with open(filename, 'r') as f:
    lines = f.readlines()

  currentDir = root = {}
  currentDirContent = []
  for line in lines:
    line = line.strip()
    words = line.split(" ")
    if words[0] == "$" and words[1] == "cd":
      if words[2] == "/":
        currentDir = root
        currentDirContent = []
      elif words[2] == "..":
        currentDir = currentDirContent.pop()
      else:
        dir = words[2]
        if dir not in currentDir:
          currentDir[dir] = {}
        currentDirContent.append(currentDir)
        currentDir = currentDir[dir]
    elif words[0] == "dir":
      if words[1] not in currentDir:
        currentDir[words[1]] = {}
    elif words[0].isdigit():
      currentDir[words[1]] = int(words[0])
    
  return root


def calcDirSize(directory, maxSize):
  if type(directory) == int:
    return directory, 0
  size = 0
  total = 0
  for sub in directory.values():
    s, t = calcDirSize(sub, maxSize)
    size += s
    total += t
  if size <= maxSize:
    total += size
  return size, total


def rootSize(dir):
  if type(dir) == int:
    return dir
  sum = 0
  for key in dir:
    sum += rootSize(dir[key])
  return sum

def dictToDelete(dir, minDirSize):
  sizeOfDictToDelete = float("inf")
  dirSize = rootSize(dir)
  if dirSize >= minDirSize:
    sizeOfDictToDelete = dirSize
  for child in dir.values():
    if type(child) == int:
      continue
    childSize = dictToDelete(child, minDirSize)
    sizeOfDictToDelete = min(sizeOfDictToDelete, childSize[0])
  return sizeOfDictToDelete, dir


if __name__ == "__main__":
  print("Part one :")
  print(sumUnder(sys.argv[1], 100000))
  print()
  print("Part two :")
  print(findSmallestToDelete(sys.argv[1], 70000000, 30000000))

