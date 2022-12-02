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
#
# Part two :
# The strategy has changed; X means you need to lose, Y means you need to draw and Z means you need to win.
# The score is calculated in the same way as before.
#
#
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


@timeit
def countScore2(fileName):
  with open(fileName, "r") as f:
    lines = f.readlines()

  score = 0
  for line in lines:
    # Remove the newline character and split the line into the moves of the players
    moves = line.strip().split(" ")

    # If the strategy is to lose
    if moves[1] == 'X':
      # If player 0 plays rock, player 1 plays scissors
      if moves[0] == 'A':
        score += 3
      # If player 0 plays paper, player 1 plays rock
      elif moves[0] == 'B':
        score += 1
      # If player 0 plays scissors, player 1 plays paper
      elif moves[0] == 'C':
        score += 2

    # If the strategy is to draw
    elif moves[1] == 'Y':
      score += 3
      # If player 0 plays rock, player 1 plays rock
      if moves[0] == 'A':
        score += 1
      # If player 0 plays paper, player 1 plays paper
      elif moves[0] == 'B':
        score += 2
      # If player 0 plays scissors, player 1 plays scissors
      elif moves[0] == 'C':
        score += 3

    # If the strategy is to win
    elif moves[1] == 'Z':
      score += 6
      # If player 0 plays rock, player 1 plays paper
      if moves[0] == 'A':
        score += 2
      # If player 0 plays paper, player 1 plays scissors
      elif moves[0] == 'B':
        score += 3
      # If player 0 plays scissors, player 1 plays rock
      elif moves[0] == 'C':
        score += 1

  return score



if __name__ == "__main__":
  print("Part one :")
  print("The score is", countScore(sys.argv[1]))
  print()

  print("Part two :")
  print("The score is", countScore2(sys.argv[1]))

