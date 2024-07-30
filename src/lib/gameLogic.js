const trinityPatterns = [
  [1, 5, 9],
  [2, 6, 10],
  [3, 7, 11],
  [4, 8, 12],
  [1, 2, 3],
  [2, 3, 4],
  [5, 6, 7],
  [6, 7, 8],
  [9, 10, 11],
  [10, 11, 12],
  [1, 6, 11],
  [2, 7, 12],
  [4, 7, 10],
  [3, 6, 9],
  [3, 2, 1],
  [4, 3, 2],
  [7, 6, 5],
  [8, 7, 6],
  [11, 10, 9],
  [12, 11, 10],
  [9, 5, 1],
  [10, 6, 2],
  [11, 7, 3],
  [12, 8, 4],
  [11, 6, 1],
  [12, 7, 2],
  [10, 7, 4],
  [9, 6, 3]
]

const fourthDicePatterns = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [4, 3, 2, 1],
  [8, 7, 6, 5],
  [12, 11, 10, 9]
]

export const isTrinity = (dice) => {
  const sortedDice = [...dice].sort((a, b) => a - b)
  return trinityPatterns.some((pattern) => pattern.every((num) => sortedDice.includes(num)))
}

export const canRollFourth = (dice) => {
  return fourthDicePatterns.some(
    (pattern) => dice[0] === pattern[0] && dice[1] === pattern[1] && dice[2] === pattern[2]
  )
}

export const isOrderedTrinity = (dice) => {
  return trinityPatterns.some(
    (pattern) =>
      (dice[0] === pattern[0] && dice[1] === pattern[1] && dice[2] === pattern[2]) ||
      (dice[0] === pattern[2] && dice[1] === pattern[1] && dice[2] === pattern[0])
  )
}

export const calculateScore = (dice, previousRolls) => {
  let scoreType = ''
  let roundScore = 0

  if (dice.length === 4) {
    const matchingPattern = fourthDicePatterns.find(
      (pattern) =>
        dice[0] === pattern[0] &&
        dice[1] === pattern[1] &&
        dice[2] === pattern[2] &&
        dice[3] === pattern[3]
    )
    roundScore = matchingPattern ? 16 : 3
    scoreType = matchingPattern ? 'Four Dice Match' : 'Four Dice'
  } else if (isTrinity(dice)) {
    if (previousRolls.some((roll) => roll.join(',') === dice.join(','))) {
      roundScore = 12 // Repeated Trinity
      scoreType = 'Repeated Trinity'
    } else {
      roundScore = isOrderedTrinity(dice) ? 9 : 3
      scoreType = isOrderedTrinity(dice) ? 'Ordered Trinity' : 'Trinity'
    }
  }

  return { roundScore, scoreType }
}
