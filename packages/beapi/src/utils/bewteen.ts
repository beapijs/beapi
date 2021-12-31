export function between(a: number, b: number, num: number): boolean {
  const max = Math.max(a, b)
  const min = Math.min(a, b)

  return num >= min && num <= max
}
