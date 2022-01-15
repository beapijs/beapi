export function deprecated(name: string): void {
  return console.warn(
    `[BeAPI]: Event "${name}" appears be deprecated, skipping registration. Please report this issue here: https://github.com/MCBE-Utilities/BeAPI/issues`,
  )
}
