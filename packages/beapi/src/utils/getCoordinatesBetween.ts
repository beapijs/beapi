/**
 * Coordinates as array `[x, y, z]`.
 */
export type Coord = [number, number, number]

/**
 * Attempts to get all coordinates between two points.
 * @param a First coordinate set.
 * @param b Second coordinate set.
 * @returns
 */
export function getCoordinatesBetween(a: Coord, b: Coord): Coord[] {
  // Intialize empty coord array.
  const coords: Coord[] = []

  // For X of a; while less than X of b; X++;
  for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++)
    // For Y of a; while less than Y of b; Y++;
    for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++)
      // For Z of a; while less than Z of b; Z++
      // Push [X, Y, Z] results to coords array
      for (let z = Math.min(a[2], b[2]); z <= Math.max(a[2], b[2]); z++) coords.push([x, y, z])

  // Return results.
  return coords
}
