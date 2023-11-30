# Advent of Code 2022: Day 16: Proboscidea Volcanium
# https://adventofcode.com/2022/day/16
#
#
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit
from networkx import *
from collections import defaultdict

@timeit
def singleWorker(filename):
  with open(filename) as f:
    lines = f.readlines()

  # Parse the input lines 
  firstValve, flowRates, valveGraph = parseInput(lines)
  
  pathLengths = findPathLengths(valveGraph, firstValve, flowRates)

  currentValve = firstValve
  visitedValves = set()
  minutes = 30
  pressure = 0

  return countFlowSingle(currentValve, firstValve, 0, pathLengths, flowRates, visitedValves, pressure, minutes)


@timeit
def biWorker(filename):
  with open(filename) as f:
    lines = f.readlines()

  # Parse the input lines 
  firstValve, flowRates, valveGraph = parseInput(lines)
  
  pathLengths = findPathLengths(valveGraph, firstValve, flowRates)

  currentValve = firstValve
  visitedValves = set()
  minutes = 26
  pressure = 0

  return countFlowDouble(currentValve, firstValve, 0, 0, pathLengths, flowRates, visitedValves, pressure, minutes)


def parseInput(lines):
  firstValve = "AA"
  flowRates = {firstValve: 0}
  # Create a graph for the valves and tunnels
  valveGraph = Graph()

  for line in lines:
    line = line.strip()
    line = line.split(" ")
    valve = line[1]
    flowRate = int(line[4].split("=")[1].split(";")[0])

    # only add to flowRates if the flow rate is greater than 0
    if flowRate > 0:
      flowRates[valve] = flowRate

    valveGraph.add_node(valve)

    tunnels = line[9:]
    for tunnel in tunnels:
      tunnel = tunnel.strip(",")
      valveGraph.add_edge(valve, tunnel)

  return firstValve, flowRates, valveGraph


def findPathLengths(valveGraph, firstValve, flowRates):
  # Store path lengths in a dictionary
  # Those are calculated using the shortest path algorithm
  # in networkx
  pathLengths = defaultdict(list)
  for startValve in flowRates:
    for endValve in flowRates:
      pathLengths[startValve].append((endValve, shortest_path_length(valveGraph, startValve, endValve)+1))
  return pathLengths


def countFlowSingle(pos1, pos2, destinationTime, graph, rates, visited, flow, minutes):
  if minutes == 0:
    return flow

  if destinationTime > 0:
    return countFlowSingle(pos1, pos2, destinationTime - 1, graph, rates, visited, flow, minutes - 1)

  best = flow
  if destinationTime == 0:
    found = False
    for destValve, timeToDest in graph[pos1]:
      if timeToDest >= minutes or destValve in visited:
        continue
      found = True
      visited.add(destValve)
      result = countFlowSingle(destValve, pos2, timeToDest, graph, rates, visited, flow + rates[destValve] * (minutes - timeToDest), minutes)
      visited.remove(destValve)
      if result > best:
        best = result
    if found:
      return best

  return best


def countFlowDouble(pos1, pos2, destinationTime1, destinationTime2, graph, rates, visited, flow, minutes):
  if minutes == 0:
    return flow

  if destinationTime1 > 0 and destinationTime2 > 0:
    return countFlowDouble(pos1, pos2, destinationTime1 - 1, destinationTime2 - 1, graph, rates, visited, flow, minutes - 1)

  best = flow
  if destinationTime1 == 0:
    found = False
    for destValve, timeToDest in graph[pos1]:
      if timeToDest >= minutes or destValve in visited:
        continue
      found = True
      visited.add(destValve)
      result = countFlowDouble(destValve, pos2, timeToDest, destinationTime2, graph, rates, visited, flow + rates[destValve] * (minutes - timeToDest), minutes)
      visited.remove(destValve)
      if result > best:
        best = result
    if found:
      return best
  
  if destinationTime2 == 0:
    for destValve, timeToDest in graph[pos2]:
      if timeToDest >= minutes or destValve in visited:
        continue
      visited.add(destValve)
      result = countFlowDouble(pos1, destValve, destinationTime1, timeToDest, graph, rates, visited, flow + rates[destValve] * (minutes - timeToDest), minutes)
      visited.remove(destValve)
      if result > best:
        best = result

  return best


if __name__ == "__main__":
  print("Part one :")
  print(singleWorker(sys.argv[1]))
  print()
  print("Part two :")
  print(biWorker(sys.argv[1]))