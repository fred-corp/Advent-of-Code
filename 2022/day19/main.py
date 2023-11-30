# Advent of Code 2022: Day 19:
# https://adventofcode.com/2022/day/19
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
import re

@timeit
def partOne(filename):
  with open(filename) as f:
    lines = f.readlines()

  # Parse the blueprint that looks like :
  # "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian."
  # regex for numbers
  blueprints = []
  regex = r"(\d+)"
  for line in lines:
    line = line.strip()
    if line.startswith("Blueprint"):
      blueprints.append([int(x) for x in re.findall(regex, line)])
    
  minutes = 24

  for blueprint in blueprints:
    print(blueprint)
    oreCount = 0
    clayCount = 0
    obsidianCount = 0
    geodeCount = 0
    oreRobotCost = blueprint[1]
    clayRobotCost = blueprint[2]
    obsidianRobotCost = [blueprint[3], blueprint[4]]
    geodeRobotCost = [blueprint[5], blueprint[6]]
    oreRobots = [True]
    clayRobots = []
    obsidianRobots = []
    geodeRobots = []
    for i in range(minutes):
      if obsidianCount >= geodeRobotCost[1]:
        if oreCount >= geodeRobotCost[0]:
          oreCount -= geodeRobotCost[0]
          obsidianCount -= geodeRobotCost[1]
          geodeRobots.append(False)
      if clayCount >= obsidianRobotCost[1]:
        if oreCount >= obsidianRobotCost[0]:
          oreCount -= obsidianRobotCost[0]
          clayCount -= obsidianRobotCost[1]
          obsidianRobots.append(False)
      elif oreCount >= clayRobotCost:
        oreCount -= clayRobotCost
        clayRobots.append(False)
      elif oreCount >= oreRobotCost:
        oreCount -= oreRobotCost
        oreRobots.append(False)


      # only count robots that are working
      workingOreRobots = [x for x in oreRobots if x]
      workingClayRobots = [x for x in clayRobots if x]
      workingObsidianRobots = [x for x in obsidianRobots if x]
      workingGeodeRobots = [x for x in geodeRobots if x]
      # ore robots
      oreCount += len(workingOreRobots)
      # clay robot
      clayCount += len(workingClayRobots)
      # obsidian robots
      obsidianCount += len(workingObsidianRobots)
      # geode robots
      geodeCount += len(workingGeodeRobots)

      # update the robots
      oreRobots[-1] = True
      if len(clayRobots) > 0:
        clayRobots[-1] = True
      if len(obsidianRobots) > 0:
        obsidianRobots[-1] = True
      if len(geodeRobots) > 0:
        geodeRobots[-1] = True
      


      print("{}, {}, {}, {}".format(oreCount, clayCount, obsidianCount, geodeCount))
    print(geodeCount)


    



if __name__ == "__main__":
  print("Part one:")
  partOne(sys.argv[1])