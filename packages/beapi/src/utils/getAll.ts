export type Coord = [number, number, number]

export function getAll(a: Coord, b: Coord): Coord[] {
  const coords: Coord[] = []
  for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++)
    for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++)
      for (let z = Math.min(a[2], b[2]); z <= Math.max(a[2], b[2]); z++) coords.push([x, y, z])

  return coords
}
