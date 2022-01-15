export function between(first: number, second: number, cur: number): boolean {
  const max = Math.max(first, second)
  const min = Math.min(first, second)

  return cur >= min && cur <= max
}
