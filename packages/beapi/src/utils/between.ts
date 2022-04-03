/**
 * Checks if `cur` is between `first` and `second`.
 * @param first First number.
 * @param second Second number.
 * @param cur Number to check.
 * @returns
 */
export function between(first: number, second: number, cur: number): boolean {
  // Get highest number.
  const max = Math.max(first, second)
  // Get lowest number.
  const min = Math.min(first, second)

  // If cur more than or equal to min
  // and cur is less than or equal to max
  return cur >= min && cur <= max
}
