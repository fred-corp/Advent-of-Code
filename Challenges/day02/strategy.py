# Advent of Code 2022: Day 2: Rock Paper Scissors
# https://adventofcode.com/2022/day/2
# 
# Part one :
# From a text file, count the score of the game of rock paper scissors.
# The text file contains the moves of the players, A B C for player 0, X Y Z for player 1.
# The score is the number of times player 2 wins.
#
# A corresponds to rock, B to paper, C to scissors. Also, X corresponds to rock, Y to paper, Z to scissors.
# If a player wins, he gets 6 points, if he loses, he gets 0 points, if it's a draw, he gets 3 points.
# Also, if a player plays rock he gets 1 point, if he plays paper he gets 2 points, if he plays scissors he gets 3 points, regardless of the outcome.
# 
# Solution by Frédéric Druppel
# See repo for license

import sys
sys.path.insert(0, '..')
from timeIt import timeit

RPC_LUT = {'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3}

@timeit
def countScore(fileName):
  with open(fileName, "r") as f:
    lines = f.readlines()

  score = 0
  for line in lines:
    # Remove the newline character and split the line into the moves of the players
    moves = line.strip().split(" ")
    
    # If the moves are the same, the score is 3
    if RPC_LUT[moves[0]] == RPC_LUT[moves[1]]:
      score += 3
    # If the moves are different, the score is 6 if player 1 wins, 0 if player 0 wins
    else:
      if (RPC_LUT[moves[0]] == 3 and RPC_LUT[moves[1]] == 1) or (RPC_LUT[moves[0]] == 1 and RPC_LUT[moves[1]] == 2) or (RPC_LUT[moves[0]] == 2 and RPC_LUT[moves[1]] == 3):
        score += 6

    score += RPC_LUT[moves[1]]

  return score

if __name__ == "__main__":
  print("Part one :")
  print("The score is", countScore(sys.argv[1]))
  print()